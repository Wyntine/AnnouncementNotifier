import { Parser } from "../../Parser.ts";

export class TIParser extends Parser {
  constructor() {
    super("lit-ti", "mtb.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-1",
      activities: "/tr/duyurular/guncel_etkinlikler-5",
      exams: "/tr/duyurular/dersler_ve_sinavlar-3",
    });
  }
}
