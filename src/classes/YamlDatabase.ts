import { parse, stringify } from "yaml";
import type {
  DatabaseHelper,
  DatabaseSchema,
  GetAnnouncementsOptions,
} from "../types/databases.ts";
import type { AnnouncementSchema } from "../types/announcements.ts";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { promisify } from "node:util";

const sleep = promisify(setTimeout);

export class YamlDatabase implements DatabaseHelper {
  private static filePath = join(".", "database", "announcements.yml");

  private lastChecked = 0;
  private announcements: AnnouncementSchema[] = [];
  private isInitialized = false;

  constructor() {
    // TODO: Handle load() rejection (unhandled promise rejection) and set isInitialized on error
    void this.load().then(() => (this.isInitialized = true));
  }

  public getAnnouncements(
    options: GetAnnouncementsOptions = {},
  ): AnnouncementSchema[] {
    const { parsers = [], after } = options;

    const parserFiltered =
      parsers.length ?
        this.announcements.filter((announcement) =>
          parsers.includes(announcement.parser),
        )
      : this.announcements;

    const timeFiltered =
      after ?
        parserFiltered.filter((announcement) => announcement.date > after)
      : parserFiltered;

    return timeFiltered;
  }

  public addAnnouncements(data: AnnouncementSchema[]): this {
    // TODO: Deduplicate announcements (by id/link/title+date) to avoid unbounded growth
    const newAnnouncements = this.announcements.concat(data);
    const sortedAnnouncements = newAnnouncements.toSorted(
      (a, b) => b.date - a.date,
    );

    this.announcements = sortedAnnouncements;
    return this;
  }

  public updateLastChecked(date = Date.now()): this {
    this.lastChecked = date;
    return this;
  }

  public getLastChecked(): number {
    return this.lastChecked;
  }

  public async save() {
    // TODO: Ensure database directory exists before writing
    const newData: DatabaseSchema = {
      announcements: this.announcements,
      lastChecked: this.lastChecked,
    };

    await writeFile(YamlDatabase.filePath, stringify(newData), "utf-8");
  }

  public async load() {
    if (!existsSync(YamlDatabase.filePath)) {
      await writeFile(YamlDatabase.filePath, "{}", "utf-8");
      // TODO: Warn about new database creation.
    }

    // TODO: Handle malformed YAML (parse can throw)
    const data = parse(
      await readFile(YamlDatabase.filePath, "utf-8"),
    ) as DatabaseSchema;

    if (data.lastChecked) {
      this.lastChecked = data.lastChecked;
    }

    if (data.announcements) {
      this.announcements = data.announcements;
    }
  }

  public async waitUntilInitialized() {
    // TODO: Replace recursive busy-wait with a proper promise/timeout; handle load failure
    if (!this.isInitialized) {
      await sleep(500);
      await this.waitUntilInitialized();
    }
  }
}
