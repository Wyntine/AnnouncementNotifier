import { load } from "cheerio";
import type { ParsedAnnouncement } from "../types/announcements.ts";
import {
  isLinkAFile,
  normalizeUnevenHTML,
  parseLinkByType,
} from "../utils/string.ts";
import {
  fetchSchoolSitesWithTLSOff,
  isRequestOk,
  isUnreachable,
} from "../utils/network.ts";

export class Parser {
  public name: string;
  public baseSite: string;
  public sites: string | SubParsers;

  /**
   * @param name The parser's base name
   * @param baseSite The site to be parsed
   * @param sites Relative paths of (starting with `/`) sites that will be parsed.
   *  Can be mapped to assign sub-parsers to specific sites.
   */
  constructor(name: string, baseSite: string, sites?: string | SubParsers) {
    this.name = name;
    this.baseSite = baseSite;
    this.sites = sites ?? baseSite;
  }

  public parse(
    siteData: string,
  ): ParsedAnnouncement[] | Promise<ParsedAnnouncement[]> {
    const $ = load(siteData);

    const result = $("tbody > tr").extract({
      announcements: [
        {
          selector: "td",
          value: {
            link: {
              selector: "a",
              value: (el) => this.addBaseSite($(el).attr("href") ?? ""),
            },
            date: {
              selector: "span",
              value: (el) => new Date($(el).text()).valueOf(),
            },
            title: {
              selector: "a",
              value: (el) => normalizeUnevenHTML($(el).text()),
            },
          },
        },
      ],
    });

    // TODO: Find a non-chaotic way to fix that. May require a bigger refactor.
    return (async (): Promise<ParsedAnnouncement[]> => {
      const announcements = [];

      for (const { link = "", date, title } of result.announcements) {
        if (!title || !date) {
          // TODO: Log error message
          continue;
        }

        const isFile =
          isLinkAFile(link) ||
          (!link.includes("hacettepe.edu.tr") && !link.startsWith("/"));

        if (!isFile && isUnreachable(link)) {
          // TODO: Error log
          continue;
        }

        const links = parseLinkByType(
          isFile ? [link] : await this.parseSubSite(link),
        );

        announcements.push({
          title,
          date,
          ...links,
        });
      }

      return announcements;
    })();
  }

  public async parseSubSite(siteLink: string): Promise<string[]> {
    const response = await fetchSchoolSitesWithTLSOff(siteLink);

    if (!isRequestOk(response.statusCode)) {
      // TODO: Log error message
      return [];
    }

    const siteData = await response.body.text();
    const $ = load(siteData);
    return $(".icerik").extract({
      links: [
        {
          selector: "a",
          value: (el) => this.addBaseSite($(el).attr("href") ?? ""),
        },
      ],
    }).links;
  }

  /**
   * Changes the link to ensure that the link starts with "https://"
   * and if it's a relative path, adds the base site URL.
   */
  public addBaseSite(link: string) {
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
