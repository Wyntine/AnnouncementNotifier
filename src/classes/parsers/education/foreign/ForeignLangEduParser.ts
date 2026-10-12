import { Parser } from "../../../Parser.ts";

export class ForeignLangEduParser extends Parser {
  constructor() {
    super(
      "edu-foreign",
      "yde.hacettepe.edu.tr",
      "/tr/duyurular/yabanci_diller_egitimi_bolum_d-1",
    );
  }
}
