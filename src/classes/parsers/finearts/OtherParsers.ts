import { Parser } from "../../Parser";

export class FineArtsParser extends Parser {
  constructor() {
    super("arts", "gsf.hacettepe.edu.tr", "/tr/duyurular/duyurular-1");
  }
}

export class GraphicDesignParser extends Parser {
  constructor() {
    super("arts-graph", "grafik.hacettepe.edu.tr", "/tr/duyurular/duyurular-1");
  }
}

export class SculptureParser extends Parser {
  constructor() {
    super("arts-sculp", "heykel.hacettepe.edu.tr", "/tr/duyurular/duyurular-1");
  }
}

export class InteriorArchitectureParser extends Parser {
  constructor() {
    super("arts-iarch", "ict.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-1",
      // Will not add archived announcements for now
      // archive: "/tr/duyurular/eski_duyurular-25",
    });
  }
}

export class PaintingParser extends Parser {
  constructor() {
    super("arts-paint", "resim.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-1",
      events: "/tr/duyurular/etkinlik_haberleri-4",
    });
  }
}

export class CeramicsParser extends Parser {
  constructor() {
    super(
      "arts-ceram",
      "seramikvecam.hacettepe.edu.tr",
      "/tr/duyurular/duyurular-1",
    );
  }
}
