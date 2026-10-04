import { Parser } from "../Parser.ts";

export class CSParser extends Parser {
  constructor() {
    super(
      "cs",
      "cs.hacettepe.edu.tr",
      "https://cs.hacettepe.edu.tr/json/announcements.json",
    );
  }

  public override parse(siteData: string) {
    const data = JSON.parse(siteData) as CSAPIAnnouncement[];
    // TODO: Maybe sanitize/format given raw HTML data.
    return data.map((ann) => ({
      id: ann.id,
      date: +new Date(ann.date.split(".").toReversed().join("-")),
      title: ann.title,
      description: ann.body,
    }));
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
