import { Parser } from "../../../Parser.ts";

export class PCParser extends Parser {
  // TODO: Remove the last announcement which has the announcement archive
  // TODO: Add a custom filter function for both initialization and
  // TODO: after initizalization
  constructor() {
    super("edu-sci-pc", "pdr.hacettepe.edu.tr", "/tr/duyurular/duyurular-1");
  }
}
