import type { AnnouncementSchema } from "../types/announcements.ts";
import { fetchSchoolSitesWithTLSOff, isRequestOk } from "../utils/network.ts";
import type { Parser } from "./Parser.ts";
import { AIParser } from "./parsers/bbbf/AIParser.ts";
import { BBBFParser } from "./parsers/bbbf/BBBFParser.ts";
import { CSParser } from "./parsers/bbbf/CSParser.ts";
import { DentistryParser } from "./parsers/DentistryParser.ts";
import { YDYOParser } from "./parsers/YDYOParser.ts";
import { YamlDatabase } from "./YamlDatabase.ts";

export class Checker {
  private parsers: Parser[] = [
    new BBBFParser(),
    new CSParser(),
    new AIParser(),
    new YDYOParser(),
    new DentistryParser(),
  ];
  private database = new YamlDatabase();

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
      // TODO: Error log
      console.log("[Checker] Request failed");
      return [];
    }

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
