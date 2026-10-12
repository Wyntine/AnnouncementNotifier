import { Parser } from "../../../Parser.ts";

export class GiftedEducationParser extends Parser {
  constructor() {
    super("edu-special-gifted", "ozelyetenekliler.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-1",
      // Will not add archived announcements for now
      // archive: "/tr/duyurular/arsiv_duyurular-11",
    });
  }
}
