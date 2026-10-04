import { YamlDatabase } from "./YamlDatabase.ts";

export class Checker {
  private database = new YamlDatabase();

  public async start() {
    await this.database.waitUntilInitialized();
    console.log(this.database.getAnnouncements());
  }
}
