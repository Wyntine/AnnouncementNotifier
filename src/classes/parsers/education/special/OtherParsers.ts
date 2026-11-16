import { Parser } from "../../../Parser.ts";

export class ASDEducationParser extends Parser {
  constructor() {
    super(
      "edu-special-asd",
      "otizm.hacettepe.edu.tr",
      "/tr/duyurular/duyurular-1",
    );
  }
}

export class ESIDParser extends Parser {
  constructor() {
    super("edu-special-esid", "zihinengelliler.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-1",
      schedule: "/tr/duyurular/dersler-3",
    });
  }
}

export class GiftedEducationParser extends Parser {
  constructor() {
    super("edu-special-gifted", "ozelyetenekliler.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-1",
      // Will not add archived announcements for now
      // archive: "/tr/duyurular/arsiv_duyurular-11",
    });
  }
}

export class SpecialEducationParser extends Parser {
  constructor() {
    super("edu-special", "ozelegitim.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-17",
      // Will not add archived announcements for now
      // archive: "/tr/duyurular/arsiv_duyurular-15",
    });
  }
}
