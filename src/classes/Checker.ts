import type { AnnouncementSchema } from "../types/announcements.ts";
import type { Parser } from "./Parser.ts";
import { AIParser } from "./parsers/bbbf/AIParser.ts";
import { CSParser } from "./parsers/bbbf/CSParser.ts";
import { YamlDatabase } from "./YamlDatabase.ts";

export class Checker {
  private parsers: Parser[] = [new CSParser(), new AIParser()];
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

    return announcements;
  }

  public async runParser(
    parser: Parser,
    parserName: string,
    siteUrl: string,
  ): Promise<AnnouncementSchema[]> {
    const request = await fetch(siteUrl);

    if (!request.ok) {
      // TODO: Error log
      return [];
    }

    const siteData = await request.text();
    return parser.parse(siteData).map((announcement) => ({
      ...announcement,
      parser: parserName,
    }));
  }

  private async wait() {
    await this.database.waitUntilInitialized();
  }
}
