import type { Parser } from "../Parser.ts";

import * as bbbf from "./bbbf/index.ts";
import { DentistryParser } from "./DentistryParser.ts";
import * as education from "./education/index.ts";
import * as engineering from "./engineering/index.ts";
import * as feas from "./feas/index.ts";
import * as finearts from "./finearts/index.ts";
import * as health from "./health/index.ts";
import { LawParser } from "./LawParser.ts";
import * as literature from "./literature/index.ts";
import { NursingParser } from "./NursingParser.ts";
import { PharmacyParser } from "./PharmacyParser.ts";
import { PhysicalTherapyParser } from "./PhysicalTherapyParser.ts";
import * as science from "./science/index.ts";
import { YDYOParser } from "./YDYOParser.ts";

export {
  bbbf,
  DentistryParser,
  education,
  engineering,
  feas,
  finearts,
  health,
  LawParser,
  literature,
  NursingParser,
  PharmacyParser,
  PhysicalTherapyParser,
  science,
  YDYOParser,
};

export function collectAllParsers(): Parser[] {
  const additionalParsers = [
    DentistryParser,
    PharmacyParser,
    YDYOParser,
    PhysicalTherapyParser,
    LawParser,
    NursingParser,
  ] as const;

  const allParserConstructors = [
    bbbf,
    education,
    feas,
    engineering,
    literature,
    finearts,
    health,
    science,
  ]
    .flatMap((department) => Object.values(department))
    .concat(additionalParsers);

  return allParserConstructors.map((parser) => new parser());
}
