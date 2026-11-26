import { load } from "cheerio";
import type { ParsedAnnouncement } from "../../../types/announcements.ts";
import {
  encodeLink,
  linkHasException,
  normalizeNewlines,
  parseLinkByType,
} from "../../../utils/string.ts";
import { Parser } from "../../Parser.ts";

/**
 * Parses the Speech and Language Therapy department page.
 *
 * The page is legacy ISO-8859-9 (see `siteEncoding`) and lists announcements
 * as <p> elements inside #icerik_yazi instead of a <tbody> table. Announcements
 * are mostly file attachments; dates appear as a trailing <span class="tarih">
 * (e.g. "(09.03.21)" or "(Son güncelleme: 27.03.20 Saat:20:30)").
 *
 * Plain-text paragraphs (contact info, mourning notices, banners, text-only
 * updates without an anchor or a readable date) are not announcements and are
 * skipped.
 */
export class SpeechTherapyParser extends Parser {
  constructor() {
    super(
      "hs-dkt",
      "dilkonusmaterapisi.hacettepe.edu.tr",
      "/duyurular.shtml",
      undefined,
      "iso-8859-9",
    );
  }

  /**
   * Plain filenames are resolved against the site root; the base implementation
   * would mistake a bare "*.pdf" for a full domain.
   */
  public override addBaseSite<Link extends string | undefined>(link: Link): Link {
    if (!link) return undefined as Link;

    const trimmed = link.trim();
    let finalLink: string;
    if (trimmed.startsWith("http")) {
      finalLink = trimmed;
    } else if (trimmed.startsWith("mailto:") || trimmed.startsWith("tel:")) {
      finalLink = trimmed;
    } else if (trimmed.startsWith("/")) {
      finalLink = `https://${this.baseSite}${trimmed}`;
    } else if (linkHasException(trimmed)) {
      finalLink = trimmed;
    } else {
      finalLink = `https://${this.baseSite}/${trimmed}`;
    }

    return encodeLink(finalLink) as Link;
  }

  public override parse(siteData: string, limit?: number) {
    const $ = load(siteData);
    $("style, script").remove();

    const announcements: ParsedAnnouncement[] = [];

    $("#icerik_yazi p").each((_, p) => {
      // Skip paragraphs without a visible anchor (image banners, text updates).
      const anchors = $(p)
        .find("a")
        .filter(
          (_, el) => $(el).text().trim().replaceAll(/\S/g, "").length > 0,
        );
      if (anchors.length === 0) return;

      const date = parseDate($(p).find("span.tarih").first().text().trim());
      if (date === undefined) return;

      // Prefer an explicit headline (bold/underline text, or the anchor-wrapped
      // headline itself); fall back to the anchor text.
      const headline = $(p)
        .find("strong, u, b")
        .filter((_, el) => $(el).text().trim().length >= 25)
        .first()
        .text()
        .trim();
      const anchorText = anchors.first().text().trim();
      const title = normalizeNewlines(headline || anchorText).trim();
      if (!title) return;

      const links = new Set<string>();
      $(p)
        .find("a")
        .each((_, el) => {
          const href = $(el).attr("href")?.trim().replaceAll("\n", " ");
          if (!href) return;
          const resolved = this.addBaseSite(href);
          if (resolved) links.add(resolved);
        });

      const { links: regularLinks, files } = parseLinkByType([...links]);

      announcements.push({
        title,
        date,
        ...(files ? { files } : {}),
        ...(regularLinks ? { links: regularLinks } : {}),
      });
    });

    announcements.sort((a, b) => b.date - a.date);
    return limit ? announcements.slice(0, limit) : announcements;
  }
}

function parseDate(text: string): number | undefined {
  const match = /(\d{2})\.(\d{2})\.(\d{2})(?:\s+Saat:(\d{2}):(\d{2}))?/.exec(text);
  if (!match) return undefined;

  const [, day, month, year, hour, minute] = match;
  const date = new Date(
    2000 + Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour ?? 0),
    Number(minute ?? 0),
    0,
    0,
  );

  return Number.isFinite(date.valueOf()) ? date.valueOf() : undefined;
}
