import { Parser } from "../../Parser.ts";

export class GermanLiteratureParser extends Parser {
  constructor() {
    super("lit-de", "ade.hacettepe.edu.tr", {
      general: "/tr/duyurular/guncel_duyurular-2",
      // Will not add archived announcements for now
      // archive: "/tr/duyurular/duyuru_arsivi-12"
    });
  }
}
