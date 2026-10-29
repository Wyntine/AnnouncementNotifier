import type { Parser } from "../Parser.ts";

// Multiple parsers imported from departments
import * as bbbf from "./bbbf/index.ts";
import * as education from "./education/index.ts";
import * as literature from "./literature/index.ts";

// Other parsers
import { DentistryParser } from "./DentistryParser.ts";
import { PharmacyParser } from "./PharmacyParser.ts";
import { YDYOParser } from "./YDYOParser.ts";

export function collectAllParsers(): Parser[] {
  const additionalParsers = [DentistryParser, PharmacyParser, YDYOParser];
  return [bbbf, education, literature]
    .flatMap((department) => Object.values(department))
    .concat(additionalParsers)
    .map((parser) => new parser());
}
