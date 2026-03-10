import { join } from "path";
import fs from "fs";
import DB from "../prisma";

export default class Database {
  pathToMigrationsDir = join(__dirname, "/migrations");
  migrations = [];
  completedMigrations = [];

  constructor() {
    console.log("Database initialized via Prisma.");
  }

  async init() {
    try {
      // fetch all migrations
      this.migrations = await this.fetchMigrations();

      // fetch already run migrations
      this.completedMigrations = await this.fetchCompletedMigrations();

      // run migrations
      await this.runMigrations();

      // create FTS5 table
      try {
        await this.query(`CREATE VIRTUAL TABLE IF NOT EXISTS verses_fts USING fts5(id UNINDEXED, text_clean);`, 'run');
        // populate it if empty
        const count = await this.query(`SELECT count(*) as c FROM verses_fts;`, 'all');
        if (Number(count[0].c) === 0) {
           await this.query(`INSERT INTO verses_fts(id, text_clean) SELECT id, text_clean FROM verses;`, 'run');
           console.log("Populated FTS5 table successfully.");
        }
      } catch(ftsError) {
        console.error("FTS5 creation error:", ftsError);
      }

      console.log("Migrations and FTS5 completed successfully");
    } catch (err) {
      console.error("Migrations error: ", err);
    }
  }

  async query(command, method = "all") {
    try {
      if (method === "run") {
        await DB.$executeRawUnsafe(command);
        return [];
      } else {
        const result = await DB.$queryRawUnsafe(command);
        return result;
      }
    } catch (err) {
      throw err;
    }
  }

  async runMigrations() {
    const migrations = this.migrations.filter(
      (migration) => migration.type === "migration"
    );
    const seeders = this.migrations.filter(
      (migration) => migration.type === "seeder"
    );

    for (const migration of migrations) {
      if (this.completedMigrations.includes(migration.name)) continue;
      for (const query of migration.query) {
        if (query.trim()) await this.query(query, "run");
      }
      await this.addToMigrationsTable(migration.name);
    }

    // run seeders with delay
    setTimeout(async () => {
      for (const migration of seeders) {
        if (this.completedMigrations.includes(migration.name)) continue;
        for (const query of migration.query) {
          if (query.trim()) await this.query(query, "run");
        }
        await this.addToMigrationsTable(migration.name);
      }
    }, 1000);
  }

  async fetchMigrations() {
    const migrations = [];
    fs.readdirSync(this.pathToMigrationsDir).forEach((file) => {
      const { name, type, query } = require(`./migrations/${file}`).default;
      migrations.push({ name, type, query: query.split(/(?=INSERT)/g) });
    });
    return migrations;
  }

  async fetchCompletedMigrations() {
    try {
      const migrations = await this.query(`SELECT migration FROM migrations`);
      return migrations.map((migration) => migration.migration);
    } catch (err) {
      return [];
    }
  }

  async addToMigrationsTable(migration) {
    await this.query(
      `INSERT INTO migrations (migration) VALUES ('${migration}')`,
      "run"
    );
  }
}
