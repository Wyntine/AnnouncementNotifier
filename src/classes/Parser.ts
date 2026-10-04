import type { ParsedAnnouncement } from "../types/announcements.ts";

export class Parser {
  public name: string;
  public baseSite: string;
  public sites: string[];

  constructor(name: string, baseSite: string, sites?: string | string[]) {
    this.name = name;
    this.baseSite = baseSite;
    this.sites =
      !sites ? [baseSite]
      : typeof sites === "string" ? [sites]
      : sites;
  }

  public parse(siteData: string): ParsedAnnouncement[] {
    // TODO: Implement a generic parser for most of the sites.
    return [];
  }
}
