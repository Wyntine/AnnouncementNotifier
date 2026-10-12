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
