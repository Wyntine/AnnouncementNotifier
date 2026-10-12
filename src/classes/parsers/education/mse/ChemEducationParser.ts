import { Parser } from "../../../Parser.ts";

export class ChemEducationParser extends Parser {
  constructor() {
    super(
      "edu-mse-chem",
      "kimegi.hacettepe.edu.tr",
      "/tr/duyurular/duyurular-1",
    );
  }
}
