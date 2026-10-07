import {
  normalizeUnevenHTMLToArray,
  parseLinkByType,
} from "../../../utils/string.ts";
import { forceUTCTime } from "../../../utils/time.ts";
import { Parser } from "../../Parser.ts";
import { load } from "cheerio";

export class CSParser extends Parser {
  constructor() {
    super("cs", "cs.hacettepe.edu.tr", "/json/announcements.json");
  }

  // TODO: Add HTML-like href functionality later.
  public override parse(siteData: string) {
    const data = JSON.parse(siteData) as CSAPIAnnouncement[];
    return data.map((ann) => {
      const { id, date, title, body } = ann;
      const $ = load(body);
      const t = load(title);

      const additionalData = $.extract({
        links: [
          {
            selector: "a",
            value: (el) => {
              const link = $(el).attr("href");
              return link && this.addBaseSite(link);
            },
          },
        ],
      });

      const links = parseLinkByType(additionalData.links);

      return {
        id,
        date: forceUTCTime(date.split(".").toReversed().join("-")).valueOf(),
        title: t.text(),
        description: normalizeUnevenHTMLToArray($.text()),
        ...links,
      };
    });
  }
}

interface CSAPIAnnouncement {
  /**
   * HTML text of the announcement
   */
  body: string;
  title: string;
  /**
   * Date format: dd.mm.yyyy
   */
  date: string;
  id: string;
  visible: boolean;
  important: boolean;
  relevant: boolean;
}
