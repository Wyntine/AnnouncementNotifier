import { Parser } from "../../../Parser.ts";

export class ESIDParser extends Parser {
  constructor() {
    super("edu-special-esid", "zihinengelliler.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-1",
      schedule: "/tr/duyurular/dersler-3",
    });
  }
}
