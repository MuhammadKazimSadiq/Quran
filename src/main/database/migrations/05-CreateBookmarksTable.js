export default {
  name: "create_bookmarks_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "bookmarks"
          (
            id integer
              constraint bookmarks_pk
                primary key autoincrement,
            verse_id integer
              constraint bookmarks_verses_id_fk
                references verses
          );`,
};
