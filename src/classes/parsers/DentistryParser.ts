import { Parser } from "../Parser.ts";

export class DentistryParser extends Parser {
  constructor() {
    super(
      "dent",
      "dis.hacettepe.edu.tr",
      {
        general: "/tr/duyurular/genel_duyurular-2",
        student: "/tr/duyurular/ogrenci_duyurulari-3",
      },
      ["https://universitem.hacettepe.edu.tr/katalog-tr/"],
    );
  }
}
