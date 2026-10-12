import { Parser } from "../../Parser.ts";

export class TurkishLiteratureParser extends Parser {
  constructor() {
    super("lit-tr", "turkoloji.hacettepe.edu.tr", "/tr/duyurular/duyurular-2");
  }
}
