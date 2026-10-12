import { Parser } from "../../Parser.ts";

export class AmericanLiteratureParser extends Parser {
  constructor() {
    super(
      "lit-en",
      "ake.hacettepe.edu.tr",
      {
        general: "/tr/duyurular/genel_duyurular-16",
        // Will not add archived announcements for now
        // archive: "/tr/duyurular/eski_duyurular-15",
        talk: "/tr/duyurular/ake_talk_series-11",
        drama: "/tr/duyurular/drama-13",
        schedule: "/tr/duyurular/ders-programi-4"
      }
    );
  }
}
