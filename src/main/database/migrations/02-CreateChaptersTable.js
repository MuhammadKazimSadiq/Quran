export default {
  name: "create_chapters_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "chapters"
          (
            id integer not null
              constraint chapters_pk
              primary key autoincrement,
            name,
            page, section, "verses_count" integer, "translation" varchar, "revelation_place" varchar
          );`,
};
