import { Parser } from "../../Parser.ts";

export class ConsumerSciencesParser extends Parser {
  constructor() {
    super("feas-cons", "atb.hacettepe.edu.tr", {
      general: "/tr/duyurular/genel-17",
      undergrad: "/tr/duyurular/lisans_dersleri_ve_sinavlari-12",
      postgrad: "/tr/duyurular/lisansustu-16",
      internship: "/tr/duyurular/staj-14",
    });
  }
}

export class EconomicsParser extends Parser {
  constructor() {
    super("feas-econ", "econ.hacettepe.edu.tr", {
      undergrad: "/tr/duyurular/lisans_ogrencileri-12",
      postgrad: "/tr/duyurular/lisansustu_ogrencileri-13",
      other: "/tr/duyurular/diger-11",
    });
  }
}

export class HealthManagementParser extends Parser {
  constructor() {
    super(
      "feas-hm",
      "sid.hacettepe.edu.tr",
      "/tr/duyurular/guncel_duyurular-2",
    );
  }
}

export class FEASParser extends Parser {
  constructor() {
    super("feas", "iibf.hacettepe.edu.tr", {
      student: "/tr/duyurular/ogrenci_duyurulari-5",
      staff: "/tr/duyurular/personel_duyurulari-7",
    });
  }
}

export class InternationalRelationsParser extends Parser {
  constructor() {
    super("feas-ir", "ir.hacettepe.edu.tr", {
      general: "/tr/duyurular/genel_duyurular-5",
      undergrad: "/tr/duyurular/lisans_duyurulari-6",
      postgrad: "/tr/duyurular/lisansustu_duyurulari-7",
    });
  }
}

export class PoliticalScienceParser extends Parser {
  constructor() {
    super("feas-polsci", "sbky.hacettepe.edu.tr", {
      undergrad: "/tr/duyurular/lisans-2",
      postgrad: "/tr/duyurular/lisansustu-7",
      exams: "/tr/duyurular/sinavtelafi-20",
      exchange: "/tr/duyurular/degisim-14",
      internship: "/tr/duyurular/bursstaj-15",
      events: "/tr/duyurular/etkinlik-18",
      fromdepartment: "/tr/duyurular/bolumden-19",
      // Will not add archived announcements for now
      // archive: "/tr/duyurular/arsiv-17",
    });
  }
}

export class PublicFinanceParser extends Parser {
  constructor() {
    super("feas-pfin", "maliye.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-1",
      // Will not add archived announcements for now
      // archive: "/tr/duyurular/20192020_donemi_ve_oncesi-6",
    });
  }
}

export class SocialWorkParser extends Parser {
  constructor() {
    super("feas-sw", "shy.hacettepe.edu.tr", {
      general: "/tr/duyurular/genel_duyuru-8",
      undergrad: "/tr/duyurular/lisans_duyuru-9",
      postgrad: "/tr/duyurular/lisansustu_duyuru-10",
    });
  }
}
