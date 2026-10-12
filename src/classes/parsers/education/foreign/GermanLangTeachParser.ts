import { Parser } from "../../../Parser.ts";

export class GermanLangTeachParser extends Parser {
  constructor() {
    super("edu-foreign-de", "adea.hacettepe.edu.tr", {
      exams: "/tr/duyurular/sinav_programlari-10",
      schedule: "/tr/duyurular/ders_programlari-11",
      eduPrograms: "/tr/duyurular/ogretim_programlari-12",
      erasmus: "/tr/duyurular/erasmus-13",
      farabi: "/tr/duyurular/farabi-14",
      doubleMajor: "/tr/duyurular/cift_anadal-15",
      consultancy: "/tr/duyurular/danismanlik-16",
      courses: "/tr/duyurular/derslerle_ilgili_duyurular-17",
      newcomers: "/tr/duyurular/yeni_gelen_ogrenciler_18",
      graduation: "/tr/duyurular/mezuniyet_islemleri-19",
      other: "/tr/duyurular/diger-20",
      courseReg: "/tr/duyurular/ders_program_kaydi-21",
      news: "/tr/duyurular/haberler-34",
      events: "/tr/duyurular/etkinlikler-35",
    });
  }
}
