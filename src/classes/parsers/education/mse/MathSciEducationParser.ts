import { Parser } from "../../../Parser.ts";

export class MathSciEducationParser extends Parser {
  constructor() {
    super("edu-mse", "mfb.hacettepe.edu.tr", {
      general: "/tr/duyurular/guncel_duyurular-7",
      // Will not add archived announcements for now
      // archive: "/tr/duyurular/eski_duyurular-9",
    });
  }
}
