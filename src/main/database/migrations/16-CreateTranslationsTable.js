export default {
  name: "create_translations_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "translations" ("name" varchar,"translator" varchar,"language" varchar);`,
};
