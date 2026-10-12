import { Parser } from "../../Parser.ts";

export class HistoryParser extends Parser {
  constructor() {
    super("lit-hist", "history.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-1",
      news: "/tr/duyurular/haberler-3",
      events: "/tr/duyurular/etkinlikler-5",
    });
  }
}
