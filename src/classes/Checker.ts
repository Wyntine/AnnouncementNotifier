import type { AnnouncementSchema } from "../types/announcements.ts";
import { fetchSchoolSitesWithTLSOff, isRequestOk } from "../utils/network.ts";
import type { Parser } from "./Parser.ts";
import { AIParser } from "./parsers/bbbf/AIParser.ts";
import { BBBFParser } from "./parsers/bbbf/BBBFParser.ts";
import { CSParser } from "./parsers/bbbf/CSParser.ts";
import { DentistryParser } from "./parsers/DentistryParser.ts";
import { GermanLiteratureParser } from "./parsers/literature/GermanLiteratureParser.ts";
import { AmericanLiteratureParser } from "./parsers/literature/AmericanLiteratureParser.ts";
import { AnthropologyParser } from "./parsers/literature/AnthropologyParser.ts";
import { ArchaeologyParser } from "./parsers/literature/ArchaeologyParser.ts";
import { TurkishDialetcsParser } from "./parsers/literature/TurkishDialetcsParser.ts";
import { PhilosophyParser } from "./parsers/literature/PhilosophyParser.ts";
import { EnglishLinguisticsParser } from "./parsers/literature/EnglishLinguisticsParser.ts";
import { TIParser } from "./parsers/literature/TIParser.ts";
import { PsychologyParser } from "./parsers/literature/PsychologyParser.ts";
import { HistoryParser } from "./parsers/literature/HistoryParser.ts";
import { TurkishLiteratureParser } from "./parsers/literature/TurkishLiteratureParser.ts";
import { TurkishFolkloreParser } from "./parsers/literature/TurkishFolkloreParser.ts";
import { LiteratureParser } from "./parsers/literature/LiteratureParser.ts";
import { PharmacyParser } from "./parsers/PharmacyParser.ts";
import { YDYOParser } from "./parsers/YDYOParser.ts";
import { EducationParser } from "./parsers/education/EducationParser.ts";
import { EducationalSciencesParser } from "./parsers/education/sciences/EducationalSciencesParser.ts";
import { MEParser } from "./parsers/education/sciences/MEParser.ts";
import { CIParser } from "./parsers/education/sciences/CIParser.ts";
import { LLLParser } from "./parsers/education/sciences/LLLParser.ts";
import { EAParser } from "./parsers/education/sciences/EAParser.ts";
import { PCParser } from "./parsers/education/sciences/PCParser.ts";
import { MathSciEducationParser } from "./parsers/education/mse/MathSciEducationParser.ts";
import { BiologyEducationParser } from "./parsers/education/mse/BiologyEducationParser.ts";
import { SciTeachingParser } from "./parsers/education/mse/SciTeachingParser.ts";
import { PhysEducationParser } from "./parsers/education/mse/PhysEducationParser.ts";
import { ChemEducationParser } from "./parsers/education/mse/ChemEducationParser.ts";
import { MathEducationParser } from "./parsers/education/mse/mathedu/MathEducationParser.ts";
import { MathTeachingParser } from "./parsers/education/mse/mathedu/MathTeachingParser.ts";
import { ElemMathTeachParser } from "./parsers/education/mse/mathedu/ElemMathTeachParser.ts";
import { SpecialEducationParser } from "./parsers/education/special/SpecialEducationParser.ts";
import { GiftedEducationParser } from "./parsers/education/special/GiftedEducationParser.ts";
import { ESIDParser } from "./parsers/education/special/ESIDParser.ts";
import { ASDEducationParser } from "./parsers/education/special/ASDEducationParser.ts";
import { TSSEducationParser } from "./parsers/education/TSSEducationParser.ts";
import { PrimaryEducationParser } from "./parsers/education/primary/PrimaryEducationParser.ts";
import { PreschoolEducationParser } from "./parsers/education/primary/PreschoolEducationParser.ts";
import { ClassroomEducationParser } from "./parsers/education/primary/ClassroomEducationParser.ts";
import { YamlDatabase } from "./YamlDatabase.ts";

export class Checker {
  private parsers: Parser[] = [
    new BBBFParser(),
    new CSParser(),
    new AIParser(),
    new YDYOParser(),
    new DentistryParser(),
    new PharmacyParser(),
    new LiteratureParser(),
    new GermanLiteratureParser(),
    new AmericanLiteratureParser(),
    new AnthropologyParser(),
    new ArchaeologyParser(),
    new TurkishDialetcsParser(),
    new PhilosophyParser(),
    new EnglishLinguisticsParser(),
    new TIParser(),
    new PsychologyParser(),
    new HistoryParser(),
    new TurkishLiteratureParser(),
    new TurkishFolkloreParser(),
    new EducationParser(),
    new EducationalSciencesParser(),
    new MEParser(),
    new CIParser(),
    new LLLParser(),
    new EAParser(),
    new PCParser(),
    new MathSciEducationParser(),
    new BiologyEducationParser(),
    new SciTeachingParser(),
    new PhysEducationParser(),
    new ChemEducationParser(),
    new MathEducationParser(),
    new MathTeachingParser(),
    new ElemMathTeachParser(),
    new SpecialEducationParser(),
    new GiftedEducationParser(),
    new ESIDParser(),
    new ASDEducationParser(),
    new TSSEducationParser(),
    new PrimaryEducationParser(),
    new PreschoolEducationParser(),
    new ClassroomEducationParser(),
  ];
  private database = new YamlDatabase();

  /**
   * Pulls all announcements from all sites to a single array,
   * sorts them, and returns it.
   */
  public async refresh(): Promise<AnnouncementSchema[]> {
    await this.wait();
    const announcements: AnnouncementSchema[] = [];

    for (const parser of this.parsers) {
      const sites = parser.sites;
      const name = parser.name;

      if (typeof sites === "string") {
        announcements.push(...(await this.runParser(parser, name, sites)));
      } else {
        for (const [sub, siteUrl] of Object.entries(sites)) {
          announcements.push(
            ...(await this.runParser(parser, `${name}-${sub}`, siteUrl)),
          );
        }
      }
    }

    return announcements.toSorted((ann1, ann2) => ann2.date - ann1.date);
  }

  public async runParser(
    parser: Parser,
    parserName: string,
    siteUrl: string,
  ): Promise<AnnouncementSchema[]> {
    const request = await fetchSchoolSitesWithTLSOff(
      parser.addBaseSite(siteUrl),
    );

    if (!isRequestOk(request.statusCode)) {
      // TODO: Log error message
      console.log("[Checker] Request failed");
      return [];
    }

    // TODO: Do initial check (announcement downloading) with all announcements but
    // TODO: on other checks, filter the last 1 week.
    //
    // TODO: I can use a secondary database to check if initialization is complete for
    // TODO: each parser.
    const siteData = await request.body.text();
    return (await parser.parse(siteData)).map((announcement) => ({
      ...announcement,
      parser: parserName,
    }));
  }

  private async wait() {
    await this.database.waitUntilInitialized();
  }
}
