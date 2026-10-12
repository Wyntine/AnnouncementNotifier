import { Parser } from "../../../Parser.ts";

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
