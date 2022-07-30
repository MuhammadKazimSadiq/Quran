export default {
  name: "create_migrations_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "migrations" (
            id integer primary key,
            migration varchar
          );`,
};
