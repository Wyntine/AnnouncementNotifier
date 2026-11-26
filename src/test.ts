import { writeFile } from "node:fs/promises";
import { Checker } from "./classes/Checker.ts";
import { Parser } from "./classes/Parser.ts";
import * as parsers from "./classes/parsers/index.ts";

const checkedParsers = [parsers.health.SpeechTherapyParser]
  .flatMap<new () => Parser>((parser) =>
    typeof parser === "function" ? parser : Object.values(parser),
  )
  .map((parser) => new parser()) satisfies Parser[];

console.log(checkedParsers);

const checker = new Checker();
checker.enableTestMode(5);

const parserData = await checker.fetchParsers({
  parsers: checkedParsers,
});

const time = new Date();
await writeFile(
  `./test/test-${time.toLocaleDateString("tr").split(".").toReversed().join(".")}-${time.toLocaleTimeString("tr")}.json`,
  JSON.stringify(parserData, null, " "),
);
