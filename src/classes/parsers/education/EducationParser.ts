import { Parser } from "../../Parser.ts";

export class EducationParser extends Parser {
  constructor() {
    super("edu", "egitim.hacettepe.edu.tr", {
      general: "/tr/duyurular/guncel_duyurular-1",
      news: "/tr/duyurular/haberler-4",
      events: "/tr/duyurular/etkinlikler-3",
    });
  }
}
