import { Parser } from "../Parser.ts";

export class PharmacyParser extends Parser {
  constructor() {
    super("pharmacy", "eczacilik.hacettepe.edu.tr", {
      general: "/tr/duyurular/guncel_duyurular-43",
      // Will not add archived announcements for now
      // archive: "/tr/duyurular/duyuru_arsivi-24",
      meetings: "/tr/duyurular/toplanti_gundemleri-44",
    });
  }
}
