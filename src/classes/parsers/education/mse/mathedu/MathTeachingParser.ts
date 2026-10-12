import { Parser } from "../../../../Parser.ts";

export class MathTeachingParser extends Parser {
  constructor() {
    super("edu-mse-mathedu-teach", "ofmamat.hacettepe.edu.tr", {
      general: "/tr/duyurular/anabilim_dali_duyurulari-4",
      schedule: "/tr/duyurular/ders_programlari-5",
      exams: "/tr/duyurular/sinav_takvimleri-6",
      postgrad: "/tr/duyurular/lisansustu_duyurular-7",
    });
  }
}
