import { Parser } from "../../Parser.ts";

export class EngineeringParser extends Parser {
  constructor() {
    super("eng", "muhfak.hacettepe.edu.tr", {
      student: "/tr/duyurular/ogrenci_duyurulari-11",
      staff: "/tr/duyurular/personel_duyurulari-21",
      events: "/tr/duyurular/haberler-25",
      // Will not add archived announcements for now
      // archive: "/tr/duyurular/eski_duyurular-23",
    });
  }
}

export class EnvironmentalEngineeringParser extends Parser {
  constructor() {
    super("eng-env", "cevre.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-10",
    });
  }
}

export class GeomaticsEngineeringParser extends Parser {
  constructor() {
    super("eng-geo", "geomatik.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-4",
      student: "/tr/duyurular/ogrenci_duyurulari-5",
      news: "/tr/duyurular/haberler_ve_etkinlikler-7",
    });
  }
}

export class FoodEngineeringParser extends Parser {
  constructor() {
    super("eng-food", "food.hacettepe.edu.tr", {
      general: "/tr/duyurular/guncel_duyurular-6",
    });
  }
}

export class ChemicalEngineeringParser extends Parser {
  constructor() {
    super("eng-cheng", "cheng.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-1",
      jobs: "/tr/duyurular/is_duyurulari-6",
    });
  }
}

export class MiningEngineeringParser extends Parser {
  constructor() {
    super("eng-mine", "maden.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-1",
    });
  }
}

export class MechanicalEngineeringParser extends Parser {
  constructor() {
    super("eng-me", "me.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-1",
    });
  }
}

export class NuclearEngineeringParser extends Parser {
  constructor() {
    super("eng-nuke", "nuke.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-1",
      exams: "/tr/duyurular/ders_ve_sinav_duyurulari-13",
    });
  }
}
