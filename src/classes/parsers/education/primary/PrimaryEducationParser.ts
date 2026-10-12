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
