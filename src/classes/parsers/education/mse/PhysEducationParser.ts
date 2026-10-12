import { Parser } from "../../../Parser.ts";

export class PhysEducationParser extends Parser {
  constructor() {
    super("edu-mse-phys", "feabd.hacettepe.edu.tr", {
      general: "/tr/duyurular/guncel_duyurular-19",
      // Will not add archived announcements for now
      // archive: "/tr/duyurular/eski_duyurular-20",
    });
  }
}
