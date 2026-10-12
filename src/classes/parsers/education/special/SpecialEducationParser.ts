import { Parser } from "../../../Parser.ts";

export class SpecialEducationParser extends Parser {
  constructor() {
    super("edu-special", "ozelegitim.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-17",
      // Will not add archived announcements for now
      // archive: "/tr/duyurular/arsiv_duyurular-15",
    });
  }
}
