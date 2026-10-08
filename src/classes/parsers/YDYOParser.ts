import { Parser } from "../Parser.ts";

export class YDYOParser extends Parser {
  constructor() {
    super("ydyo", "ydyo.hacettepe.edu.tr", {
      general: "/tr/duyurular/genel-1",
      de: "/tr/duyurular/almanca_hazirlik-5",
      fr: "/tr/duyurular/fransizca_hazirlik-6",
      en: "/tr/duyurular/ingilizce_hazirlik-2",
      ml: "/tr/duyurular/modern_diller-7",
      // Fetches too much old announcements. Will not use this.
      // archive: "/tr/duyurular/duyuru_arsivi-18",
    });
  }
}
