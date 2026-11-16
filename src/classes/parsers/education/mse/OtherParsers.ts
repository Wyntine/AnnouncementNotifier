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

export class ChemEducationParser extends Parser {
  constructor() {
    super(
      "edu-mse-chem",
      "kimegi.hacettepe.edu.tr",
      "/tr/duyurular/duyurular-1",
    );
  }
}

export class MathSciEducationParser extends Parser {
  constructor() {
    super("edu-mse", "mfb.hacettepe.edu.tr", {
      general: "/tr/duyurular/guncel_duyurular-7",
      // Will not add archived announcements for now
      // archive: "/tr/duyurular/eski_duyurular-9",
    });
  }
}

export class PhysEducationParser extends Parser {
  constructor() {
    super("edu-mse-phys", "feabd.hacettepe.edu.tr", {
      general: "/tr/duyurular/guncel_duyurular-19",
      // Will not add archived announcements for now
      // archive: "/tr/duyurular/eski_duyurular-20",
    });
  }
}

// TODO: Use this site as a exception for
// TODO: sub site announcement description fetching
export class SciTeachingParser extends Parser {
  constructor() {
    super("edu-mse-sciteach", "fbo.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-1",
      // Will not add archived announcements for now
      // archive: "/tr/duyurular/duyurulararsiv-4",
    });
  }
}
