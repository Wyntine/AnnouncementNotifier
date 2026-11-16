import { writeFile } from "node:fs/promises";
import { Checker } from "./classes/Checker.ts";
import type { Parser } from "./classes/Parser.ts";
import * as parsers from "./classes/parsers/index";

const checkedParsers = [parsers.PhysicalTherapyParser].map(
  (parser) => new parser(),
) satisfies Parser[];

const checker = new Checker();
checker.enableTestMode(0);

const parserData = await checker.fetchParsers({
  parsers: checkedParsers,
});

await writeFile("./test.json", JSON.stringify(parserData, null, " "));
