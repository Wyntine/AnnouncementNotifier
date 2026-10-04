import type { AnnouncementSchema } from "./announcements.ts";

/**
 * Common functions to be used across different database providers.
 *
 * The helper should keep a copy of announcements and last check date in itself.
 */
export interface DatabaseHelper {
  getAnnouncements(options?: GetAnnouncementsOptions): AnnouncementSchema[];
  /**
   * Adds given announcements to the temporary announcements.
   */
  addAnnouncements(data: AnnouncementSchema[]): this;
  /**
   * Replaces temporary last check date with a specific time or current time.
   */
  updateLastChecked(date?: number): this;
  /**
   * Saves current announcement and last check date data to the database file.
   */
  save(): Promise<void>;
  /**
   * Loads current announcement and last check date data from the file,
   * and replaces the data inside the helper.
   */
  load(): Promise<void>;
  /**
   * Waits until the database is initialized. Used for server start-up.
   */
  waitUntilInitialized(): Promise<void>;
}

export interface GetAnnouncementsOptions {
  /**
   * Return announcements from selected parsers
   */
  parsers?: string[];
  after?: number;
}

export interface DatabaseSchema {
  announcements?: AnnouncementSchema[];
  lastChecked?: number;
}
