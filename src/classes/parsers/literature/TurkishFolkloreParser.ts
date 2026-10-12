import { Parser } from "../../Parser.ts";

export class TurkishFolkloreParser extends Parser {
  constructor() {
    super("lit-trfolk", "halkbilimi.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-4",
      student: "/tr/duyurular/ogrenci-5",
    });
  }
}
