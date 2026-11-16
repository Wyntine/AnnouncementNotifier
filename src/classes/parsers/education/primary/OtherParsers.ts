import { Parser } from "../../../Parser.ts";

export class PrimaryEducationParser extends Parser {
  constructor() {
    super(
      "edu-primary",
      "temelegitim.hacettepe.edu.tr",
      "/tr/duyurular/duyurular-1",
    );
  }
}

export class ClassroomEducationParser extends Parser {
  constructor() {
    super(
      "edu-primary-class",
      "snf.hacettepe.edu.tr",
      "/tr/duyurular/duyurular-1",
    );
  }
}

export class PreschoolEducationParser extends Parser {
  constructor() {
    super("edu-primary-pre", "okuloncesi.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-1",
      // Will not use archived announcements for now.
      // archive: "/tr/duyurular/arsiv_duyurular-3",
    });
  }
}
