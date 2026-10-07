import type { ParsedAnnouncement } from "../types/announcements.ts";

export class Parser {
  public name: string;
  public baseSite: string;
  public sites: string | SubParsers;

  constructor(name: string, baseSite: string, sites?: string | SubParsers) {
    this.name = name;
    this.baseSite = baseSite;
    this.sites = sites ?? baseSite;
  }

  // @ts-expect-error Unused variable error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public parse(siteData: string): ParsedAnnouncement[] {
    // TODO: Implement a generic parser for most of the sites.
    return [];
  }

  /**
   * Changes the link to ensure that the link starts with "https://"
   * and if it's a relative path, adds the base site URL.
   */
  protected addBaseSite(link: string) {
    return (
      link.startsWith("http") ? link
      : link.startsWith("/") ? `https://${this.baseSite}${link}`
      : link.split("/").at(0)?.includes(".") ? `https://${link}`
      : `https://${this.baseSite}/${link}`
    );
  }
}

/**
 * A record that consists of <sub parser name, parsed website name>
 */
type SubParsers = Record<string, string>;
