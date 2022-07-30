import fs from "fs";

const sqlite3 = require("sqlite3").verbose();

export default class Database {
  pathToDbFile;
  pathToMigrationsDir = "./build/main/database/migrations";
  db;
  migrations;
  completedMigrations;

  constructor(pathToDbFile) {
    this.pathToDbFile = pathToDbFile;

    // open database || create new database
    this.db = new sqlite3.Database(pathToDbFile, (err) => {
      if (err) console.error("Database opening error: ", err);
    });
  }

  async init() {
    // fetch all migrations
    this.migrations = await this.fetchMigrations();

    // fetch already run migrations
    this.completedMigrations = await this.fetchCompletedMigrations();

    // run migrations
    await this.runMigrations();
  }

  async query(command, method = "all") {
    return new Promise((resolve, reject) => {
      this.db[method](command, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }

  runMigrations() {
    this.db.serialize(() => {
      const migrations = this.migrations.filter(
        (migration) => migration.type === "migration"
      );
      const seeders = this.migrations.filter(
        (migration) => migration.type === "seeder"
      );

      // run migrations
      migrations.forEach(async (migration) => {
        if (this.completedMigrations.includes(migration.name)) return;
        migration.query.forEach(async (query) => {
          await this.query(query, "run");
        });
        this.addToMigrationsTable(migration.name);
      });

      // run seeders with 1000ms delay
      setTimeout(() => {
        seeders.forEach(async (migration) => {
          if (this.completedMigrations.includes(migration.name)) return;
          migration.query.forEach(async (query) => {
            await this.query(query, "run");
          });
          this.addToMigrationsTable(migration.name);
        });
      }, 1000);
    });
  }

  async fetchMigrations() {
    const migrations = [];
    // loop through migrations folder
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
