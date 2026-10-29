import type { AnnouncementSchema } from "../types/announcements.ts";
import { fetchSchoolSitesWithTLSOff, isRequestOk } from "../utils/network.ts";
import type { Parser } from "./Parser.ts";
import { collectAllParsers } from "./parsers/index.ts";
import { YamlDatabase } from "./YamlDatabase.ts";

export class Checker {
  public parsers: Parser[];
  private database = new YamlDatabase();

  constructor() {
    this.parsers = collectAllParsers();
  }

  /**
   * Pulls all announcements from all sites to a single array,
   * sorts them, and returns it.
   */
  public async refresh(): Promise<AnnouncementSchema[]> {
    await this.wait();
    const announcements: AnnouncementSchema[] = [];

    for (const parser of this.parsers) {
      const sites = parser.sites;
      const name = parser.name;

      if (typeof sites === "string") {
        announcements.push(...(await this.runParser(parser, name, sites)));
      } else {
        for (const [sub, siteUrl] of Object.entries(sites)) {
          announcements.push(
            ...(await this.runParser(parser, `${name}-${sub}`, siteUrl)),
          );
        }
      }
    }

    return announcements.toSorted((ann1, ann2) => ann2.date - ann1.date);
  }

  public async runParser(
    parser: Parser,
    parserName: string,
    siteUrl: string,
  ): Promise<AnnouncementSchema[]> {
    const request = await fetchSchoolSitesWithTLSOff(
      parser.addBaseSite(siteUrl),
    );

    if (!isRequestOk(request.statusCode)) {
      // TODO: Log error message
      console.log("[Checker] Request failed");
      return [];
    }

    // TODO: Do initial check (announcement downloading) with all announcements but
    // TODO: on other checks, filter the last 1 week.
    //
    // TODO: I can use a secondary database to check if initialization is complete for
    // TODO: each parser.
    const siteData = await request.body.text();
    return (await parser.parse(siteData)).map((announcement) => ({
      ...announcement,
      parser: parserName,
    }));
  }

  private async wait() {
    await this.database.waitUntilInitialized();
  }
}
