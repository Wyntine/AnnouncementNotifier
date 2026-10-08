import { extractConditionally } from "../../../utils/objects.ts";
import { normalizeUnevenHTML, parseLinkByType } from "../../../utils/string.ts";
import { forceUTCTime, getNewerDate } from "../../../utils/time.ts";
import { Parser } from "../../Parser.ts";
import { load } from "cheerio";

/**
 * ".news-link > article" to get all announcements,
 * some <article>s have id's,
 * <div class="link-box"> contains multiple links,
 * <time datetime="yyyy-mm-dd"></time> gives the day,
 * <figure class="news-photo"> => <img src="internal-link"> has the photo url,
 * <p class="text-link"> has <a href="external-link">
 */
export class AIParser extends Parser {
  constructor() {
    super("ai", "ai.hacettepe.edu.tr", "/news.html");
  }

  public override parse(siteData: string) {
    const $ = load(siteData);

    const result = $(".news-list").extract({
      announcements: [
        {
          selector: "article",
          value: {
            id: "id",
            title: {
              selector: "h2",
              value: (el) => normalizeUnevenHTML($(el).text()),
            },
            date: {
              selector: "time",
              value: (el) => {
                const dateData = $(el).attr("datetime") ?? "0";
                const dateString = $(el).text();

                return getNewerDate(
                  forceUTCTime(dateData),
                  new Date(dateString),
                ).valueOf();
              },
            },
            // TODO: Find a way to split these using "\n\n" on the final array and merging back later.
            // TODO: Not important right now.
            description: [
              {
                selector: "p",
                value: (el) => normalizeUnevenHTML($(el).text()),
              },
            ],
            links: [
              {
                selector: "a",
                value: (el) => this.addBaseSiteUnsafe($(el).attr("href")),
              },
            ],
          },
        },
      ],
    });

    const announcements = result.announcements.map((ann) => ({
      title: ann.title ?? "",
      date: ann.date ?? 0,
      ...extractConditionally(ann, "description"),
      ...parseLinkByType(ann.links),
      ...extractConditionally(ann, "id"),
    }));

    return announcements;
  }
}
