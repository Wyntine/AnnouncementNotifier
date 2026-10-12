import { Parser } from "../../../Parser.ts";

export class ClassroomEducationParser extends Parser {
  constructor() {
    super(
      "edu-primary-class",
      "snf.hacettepe.edu.tr",
      "/tr/duyurular/duyurular-1",
    );
  }
}
