import type { AnnouncementSchema } from "../types/announcements.ts";
import type { Parser } from "./Parser.ts";
import { CSParser } from "./parsers/CSParser.ts";
import { YamlDatabase } from "./YamlDatabase.ts";

export class Checker {
  private parsers: Parser[] = [new CSParser()];
  private database = new YamlDatabase();

  /**
   * Pulls all announcements from all sites to a single array,
   * sorts them, and returns it.
   */
  public async refresh(): Promise<AnnouncementSchema[]> {
    await this.wait();
    const announcements: AnnouncementSchema[] = [];

    for (const parser of this.parsers) {
      for (const siteUrl of parser.sites) {
        const request = await fetch(siteUrl);

        if (!request.ok) {
          // TODO: Error log
          continue;
        }

        const siteData = await request.text();
        const parserAnnouncements: AnnouncementSchema[] = parser
          .parse(siteData)
          .map((announcement) => ({
            ...announcement,
            parser: parser.name,
          }));

        announcements.push(...parserAnnouncements);
      }
    }

    return announcements;
  }

  private async wait() {
    await this.database.waitUntilInitialized();
  }
}
