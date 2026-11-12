import { Parser } from "../Parser.ts";

export class PhysicalTherapyParser extends Parser {
  constructor() {
    super("ftr", "ftrfakulte.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-1",
      news: "/tr/duyurular/haberler-3",
      events: "/tr/duyurular/etkinlikler-5",
    });
  }
}
