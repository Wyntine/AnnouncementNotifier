import type { Parser } from "../Parser.ts";

// Multiple parsers imported from departments
import * as bbbf from "./bbbf/index.ts";
import * as education from "./education/index.ts";
import * as literature from "./literature/index.ts";

// Other parsers
import { DentistryParser } from "./DentistryParser.ts";
import { PharmacyParser } from "./PharmacyParser.ts";
import { YDYOParser } from "./YDYOParser.ts";

// Physical Therapy
import { PhysicalTherapyParser } from "./PhysicalTherapyParser.ts";

// Law
import { LawParser } from "./LawParser.ts";

// Namespace exports for "import * as parsers from '..."
export { bbbf, education, literature };
export { DentistryParser };
export { PharmacyParser };
export { YDYOParser };
export { PhysicalTherapyParser };
export { LawParser };

export function collectAllParsers(): Parser[] {
  const additionalParsers = [
    DentistryParser,
    PharmacyParser,
    YDYOParser,
    PhysicalTherapyParser,
    LawParser,
  ] as const;

  const allParserConstructors = [bbbf, education, literature]
    .flatMap((department) => Object.values(department))
    .concat(additionalParsers);

  return allParserConstructors.map((parser) => new parser());
}
