import { Parser } from "../../Parser.ts";

export class TurkishDialetcsParser extends Parser {
  constructor() {
    super("lit-trdia", "ctl.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-4",
      news: "/tr/duyurular/haberler-3",
      student: "/tr/duyurular/ogrenci_duyurulari-1",
    });
  }
}
