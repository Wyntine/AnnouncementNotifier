import { Parser } from "../../Parser.ts";

export class AmericanLiteratureParser extends Parser {
  constructor() {
    super("lit-en", "ake.hacettepe.edu.tr", {
      general: "/tr/duyurular/genel_duyurular-16",
      // Will not add archived announcements for now
      // archive: "/tr/duyurular/eski_duyurular-15",
      talk: "/tr/duyurular/ake_talk_series-11",
      drama: "/tr/duyurular/drama-13",
      schedule: "/tr/duyurular/ders-programi-4",
    });
  }
}

export class AnthropologyParser extends Parser {
  constructor() {
    super("lit-anthr", "antropoloji.hacettepe.edu.tr", "/tr/duyurular");
  }
}

export class ArchaeologyParser extends Parser {
  constructor() {
    super("lit-archaeo", "arkeo.hacettepe.edu.tr", "/tr/duyurular");
  }
}

export class EnglishLinguisticsParser extends Parser {
  constructor() {
    super("lit-enling", "idb.hacettepe.edu.tr", "/tr/duyurular/duyurular-1");
  }
}

export class GermanLiteratureParser extends Parser {
  constructor() {
    super("lit-de", "ade.hacettepe.edu.tr", {
      general: "/tr/duyurular/guncel_duyurular-2",
      // Will not add archived announcements for now
      // archive: "/tr/duyurular/duyuru_arsivi-12"
    });
  }
}

export class HistoryParser extends Parser {
  constructor() {
    super("lit-hist", "history.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-1",
      news: "/tr/duyurular/haberler-3",
      events: "/tr/duyurular/etkinlikler-5",
    });
  }
}

export class LiteratureParser extends Parser {
  constructor() {
    super("lit", "edebiyat.hacettepe.edu.tr", {
      student: "/tr/duyurular/ogrenci-8",
      staff: "/tr/duyurular/personel-10",
      // Will not add archived announcements for now
      // archive: "/tr/duyurular/arsiv-6",
    });
  }
}

export class PhilosophyParser extends Parser {
  constructor() {
    super("lit-phil", "felsefe.hacettepe.edu.tr", "/tr/duyurular");
  }
}

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

export class TIParser extends Parser {
  constructor() {
    super("lit-ti", "mtb.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-1",
      activities: "/tr/duyurular/guncel_etkinlikler-5",
      exams: "/tr/duyurular/dersler_ve_sinavlar-3",
    });
  }
}

export class TurkishDialetcsParser extends Parser {
  constructor() {
    super("lit-trdia", "ctl.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-4",
      news: "/tr/duyurular/haberler-3",
      student: "/tr/duyurular/ogrenci_duyurulari-1",
    });
  }
}

export class TurkishFolkloreParser extends Parser {
  constructor() {
    super("lit-trfolk", "halkbilimi.hacettepe.edu.tr", {
      general: "/tr/duyurular/duyurular-4",
      student: "/tr/duyurular/ogrenci-5",
    });
  }
}

export class TurkishLiteratureParser extends Parser {
  constructor() {
    super("lit-tr", "turkoloji.hacettepe.edu.tr", "/tr/duyurular/duyurular-2");
  }
}
