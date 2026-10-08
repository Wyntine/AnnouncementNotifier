import { Parser } from "../Parser.ts";

export class PharmacyParser extends Parser {
  constructor() {
    super("pharmacy", "eczacilik.hacettepe.edu.tr", {
      general: "/tr/duyurular/guncel_duyurular-43",
      meetings: "/tr/duyurular/toplanti_gundemleri-44",
    });
  }
}
