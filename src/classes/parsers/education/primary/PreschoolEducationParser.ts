import { Parser } from "../../../Parser.ts";

export class PreschoolEducationParser extends Parser {
  constructor() {
    super(
      "edu-primary-pre",
      "okuloncesi.hacettepe.edu.tr",
      {
        general: "/tr/duyurular/duyurular-1",
        // Will not use archived announcements for now.
        // archive: "/tr/duyurular/arsiv_duyurular-3",
      },
    );
  }
}
