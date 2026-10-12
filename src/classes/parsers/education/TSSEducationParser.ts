import { Parser } from "../../Parser.ts";

export class TSSEducationParser extends Parser {
  constructor() {
    super(
      "edu-tss",
      "turkceegitimi.hacettepe.edu.tr",
      "/tr/duyurular/duyurular-1",
    );
  }
}
