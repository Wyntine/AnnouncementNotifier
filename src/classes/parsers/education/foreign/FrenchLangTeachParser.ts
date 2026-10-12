import { Parser } from "../../../Parser.ts";

export class FrenchLangTeachParser extends Parser {
  constructor() {
    super(
      "edu-foreign-fr",
      "fdo.hacettepe.edu.tr",
      "/tr/duyurular/duyurular-1",
    );
  }
}
