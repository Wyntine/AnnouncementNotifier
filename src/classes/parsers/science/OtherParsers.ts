import { Parser } from "../../Parser.ts";

export class StatisticsParser extends Parser {
  constructor() {
    super("sci-stat", "stat.hacettepe.edu.tr", "/tr/duyurular/duyurular-1");
  }
}

export class ChemistryParser extends Parser {
  constructor() {
    super("sci-chem", "chem.hacettepe.edu.tr", {
      student: "/tr/duyurular/ogrenci_duyurulari-15",
      general: "/tr/duyurular/genel_duyurular-10",
      schedule: "/tr/duyurular/ders_programlari_ve_sinav_takv-12",
      staff: "/tr/duyurular/personel_duyurulari-11",
    });
  }
}

export class BiologyParser extends Parser {
  constructor() {
    super("sci-bio", "biology.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyuru-6",
      conference: "/tr/duyurular/konferans-16",
    });
  }
}
