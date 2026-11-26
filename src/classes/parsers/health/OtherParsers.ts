import { Parser } from "../../Parser.ts";

/**
 * Health Sciences Faculty parsers.
 *
 * These sites share the same listing format as the other Hacettepe department
 * sites: a category page whose rows are <tr> elements with a <td> containing an
 * anchor and a <span class="tarih">. They are parsed by the default
 * Parser#parse() strategy.
 */

export class HealthSciencesParser extends Parser {
  constructor() {
    super("hs", "sbf.hacettepe.edu.tr", "/tr/duyurular/duyurular-3");
  }
}

export class NutritionDieteticsParser extends Parser {
  constructor() {
    super("hs-bdb", "bdb.hacettepe.edu.tr", "/tr/duyurular/duyurular-1");
  }
}

export class ChildDevelopmentParser extends Parser {
  constructor() {
    super("hs-cge", "cge.hacettepe.edu.tr", "/tr/duyurular/anasayfa-3");
  }
}

export class OccupationalTherapyParser extends Parser {
  constructor() {
    super(
      "hs-ergo",
      "ergoterapi.hacettepe.edu.tr",
      "/tr/duyurular/guncel_duyurular-6",
    );
  }
}

export class AudiologyParser extends Parser {
  constructor() {
    super("hs-odyoloji", "sbfodyoloji.hacettepe.edu.tr", "/tr/duyurular/duyurular-1");
  }
}

export class ParamedicParser extends Parser {
  constructor() {
    super("hs-paramedik", "paramedik.hacettepe.edu.tr", "/tr/duyurular/duyurular-1");
  }
}
