import { load } from "cheerio";
import type { ParsedAnnouncement } from "../types/announcements.ts";
import {
  isLinkAFile,
  normalizeUnevenHTML,
  parseLinkByType,
  linkHasException,
} from "../utils/string.ts";
import {
  fetchSchoolSitesWithTLSOff,
  isRequestOk,
  isUnreachable,
} from "../utils/network.ts";

const unrelativeSiteRegex = /^\/{2,}.+/;

export class Parser {
  public name: string;
  public baseSite: string;
  public sites: string | SubParsers;
  public urlsAsFile: string[] = [];

  /**
   * @param name The parser's base name
   * @param baseSite The site to be parsed
   * @param sites Relative paths of (starting with `/`) sites that will be parsed.
   *  Can be mapped to assign sub-parsers to specific sites.
   */
  constructor(
    name: string,
    baseSite: string,
    sites: string | SubParsers,
    urlsAsFile?: string[],
  ) {
    this.name = name;
    this.baseSite = baseSite;
    this.sites = sites;

    if (urlsAsFile) {
      this.urlsAsFile = urlsAsFile;
    }
  }

  public parse(
    siteData: string,
  ): ParsedAnnouncement[] | Promise<ParsedAnnouncement[]> {
    const $ = load(siteData);

    const result = $("tbody > tr")
      .map((_, row) => {
        const td = $(row).find("td").first();
        const anchor = td
          .find("a")
          .filter(
            (_, el) => $(el).text().trim().replaceAll(/\S/g, "").length > 0,
          )
          .first();
        // TODO: May remove .tarih if some sites don't have it.
        const date = td.find("span.tarih").first().text();

        return {
          link: this.addBaseSite(anchor.attr("href")?.trim()),
          date: new Date(date).valueOf(),
          title: normalizeUnevenHTML(anchor.text().trim()),
        };
      })
      .get();

    // TODO: Find a non-chaotic way to fix that. May require a bigger refactor.
    return (async (): Promise<ParsedAnnouncement[]> => {
      const announcements = [];

      for (const { link, date, title } of result) {
        if (!title || !Number.isFinite(date) || !link) {
          // TODO: Log error message
          console.log("[Parser] Missing announcement data.");
          console.log(`- title: ${title}`);
          console.log(`- date: ${date.toString()}`);
          console.log(`- link: ${link ?? ""}`);
          continue;
        }

        const isFile = isLinkAFile(link) || this.urlsAsFile.includes(link);

        const isParseable =
          link.startsWith(`https://${this.baseSite}`) && !isFile;

        if (isUnreachable(link)) {
          // TODO: Error log
          console.log(`[Parser] Unreachable link detected: ${link}`);
          continue;
        }

        const links = parseLinkByType(
          !isParseable ? [link] : await this.parseSubSite(link),
          this.urlsAsFile,
        );

        announcements.push({
          title,
          date,
          ...links,
          ...(!isParseable ? {} : { url: link }),
        });
      }

      return announcements;
    })();
  }

  public async parseSubSite(siteLink: string): Promise<string[]> {
    const response = await fetchSchoolSitesWithTLSOff(siteLink);

    if (!isRequestOk(response.statusCode)) {
      // TODO: Log error message
      console.log("[Parser] Request failed");
      return [];
    }

    const siteData = await response.body.text();
    const $ = load(siteData);
    return $(".icerik").extract({
      links: [
        {
          selector: "a",
          value: (el) => this.addBaseSite($(el).attr("href")),
        },
      ],
    }).links;
  }

  /**
   * Changes the link to ensure that the link starts with "https://"
   * and if it's a relative path, adds the base site URL.
   */
  public addBaseSite<Link extends string | undefined>(link: Link): Link {
    if (!link) return undefined as Link;

    return (
      link.startsWith("http") ? link
      : link.startsWith("/") ?
        unrelativeSiteRegex.test(link) ?
          `https://${link.replace(/^\/+/, "")}`
        : `https://${this.baseSite}${link}`
      : linkHasException(link) ? link
      : link.split("/").at(0)?.includes(".") ? `https://${link}`
      : `https://${this.baseSite}/${link}`) as Link;
  }
}

/**
 * A record that consists of <sub parser name, parsed website name>
 */
type SubParsers = Record<string, string>;
