import { Parser } from "../Parser.ts";

export class LawParser extends Parser {
  constructor() {
    super("law", "hukukfakultesi.hacettepe.edu.tr", {
      undergraduate: "/tr/duyurular/lisans_duyurulari-4",
      postgraduate: "/tr/duyurular/yuksek_lisans_ve_doktora_duyurular-1",
      other: "/tr/duyurular/diger_duyurular-5",
    });
  }
}
