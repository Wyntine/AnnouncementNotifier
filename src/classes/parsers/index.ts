import type { Parser } from "../Parser.ts";

// Multiple parsers imported from departments
import * as bbbf from "./bbbf/index.ts";
import * as education from "./education/index.ts";
import * as feas from "./feas/index.ts";
import * as literature from "./literature/index.ts";
import * as finearts from "./finearts/index.ts";
import * as science from "./science/index.ts";

// Other parsers
import { DentistryParser } from "./DentistryParser.ts";
import { PharmacyParser } from "./PharmacyParser.ts";
import { YDYOParser } from "./YDYOParser.ts";
import { PhysicalTherapyParser } from "./PhysicalTherapyParser.ts";
import { LawParser } from "./LawParser.ts";
import { NursingParser } from "./NursingParser.ts";

// Namespace exports for "import * as parsers from '..."
export { bbbf, education, feas, literature, finearts, science };
export { DentistryParser };
export { PharmacyParser };
export { YDYOParser };
export { PhysicalTherapyParser };
export { LawParser };
export { NursingParser };

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
    literature,
    finearts,
    science,
  ]
    .flatMap((department) => Object.values(department))
    .concat(additionalParsers);

  return allParserConstructors.map((parser) => new parser());
}
