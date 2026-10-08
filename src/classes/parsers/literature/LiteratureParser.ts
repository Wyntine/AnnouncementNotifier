import { Parser } from "../../Parser.ts";

export class LiteratureParser extends Parser {
  constructor() {
    super("lit", "edebiyat.hacettepe.edu.tr", {
      student: "/tr/duyurular/ogrenci-8",
      staff: "/tr/duyurular/personel-10",
      // Will not add archived announcements for now
      // archive: "/tr/duyurular/arsiv-6",
    });
  }
}
