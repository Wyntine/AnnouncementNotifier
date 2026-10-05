import { Parser } from "../Parser.ts";
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
    super(
      "ai",
      "ai.hacettepe.edu.tr",
      "https://ai.hacettepe.edu.tr/news.html"
    );
  }

  public override parse(siteData: string) {
    const $ = load(siteData);

  }
}
