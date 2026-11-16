import { Parser } from "../Parser.ts";

// May have more branches
export class NursingParser extends Parser {
  constructor() {
    super("nurs", "hemsirelik.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-2",
      news: "/tr/duyurular/haberler-15",
      events: "/tr/duyurular/etkinlikler-17",
    });
  }
}
