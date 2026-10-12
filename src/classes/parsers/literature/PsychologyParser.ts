import { Parser } from "../../Parser.ts";

export class PsychologyParser extends Parser {
  constructor() {
    super("lit-psych", "psikoloji.hacettepe.edu.tr", {
      general: "/tr/duyurular/genel-2",
      undergrad: "/tr/duyurular/lisans-4",
      postgrad: "/tr/duyurular/lisansustu-5",
      events: "/tr/duyurular/etkinlik-3",
    });
  }
}
