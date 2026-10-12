import { Parser } from "../../../Parser.ts";

// TODO: use .trim() on links
export class BiologyEducationParser extends Parser {
  constructor() {
    super("edu-mse-bio", "beabd.hacettepe.edu.tr", {
      general: "/tr/duyurular/program-1",
      exams: "/tr/duyurular/sinav_programi-2",
      distLearn: "/tr/duyurular/uzaktan_egitim-3",
    });
  }
}
