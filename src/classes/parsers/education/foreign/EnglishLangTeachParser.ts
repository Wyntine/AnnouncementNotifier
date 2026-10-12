import { Parser } from "../../../Parser.ts";

export class EnglishLangTeachParser extends Parser {
  constructor() {
    super("edu-foreign-en", "elt.hacettepe.edu.tr", {
      schedule: "/tr/duyurular/ders_programlari-3",
      exams: "/tr/duyurular/sinav_takvimleri-4",
      postGrad: "/tr/duyurular/lisansustu_duyurular-5",
      general: "/tr/duyurular/anabilim_dali_duyurulari-6",
    });
  }
}
