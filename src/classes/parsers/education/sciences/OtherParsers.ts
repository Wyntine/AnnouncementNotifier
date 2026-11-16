import { Parser } from "../../../Parser.ts";

export class CIParser extends Parser {
  constructor() {
    super("edu-sci-ci", "epo.hacettepe.edu.tr", "/tr/duyurular/duyurular-1");
  }
}

export class EAParser extends Parser {
  constructor() {
    super("edu-sci-ea", "eytpe.hacettepe.edu.tr", "/tr/duyurular/duyurular-1");
  }
}

export class EducationalSciencesParser extends Parser {
  constructor() {
    super("edu-sci", "ebb.hacettepe.edu.tr", "/tr/duyurular/duyurular-1");
  }
}

export class LLLParser extends Parser {
  constructor() {
    super("edu-sci-lll", "hbo.hacettepe.edu.tr", "/tr/duyurular/duyurular-1");
  }
}

export class MEParser extends Parser {
  constructor() {
    super("edu-sci-me", "eod.hacettepe.edu.tr", "/tr/duyurular/duyurular-1");
  }
}

export class PCParser extends Parser {
  // TODO: Remove the last announcement which has the announcement archive
  // TODO: Add a custom filter function for both initialization and
  // TODO: after initizalization
  constructor() {
    super("edu-sci-pc", "pdr.hacettepe.edu.tr", "/tr/duyurular/duyurular-1");
  }
}
