export default {
  name: "create_verse_word_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "verse_word" 
          (
            "id" serial,
            "verse_id" integer
                constraint verse_word_verses_id_fk
                references verses (id),
            "text" varchar,
            "fa" varchar,
            "en" varchar,
            "position" integer,
            "line_number" integer,
            "page_number" integer,
            "location" varchar,
            "char_type_name" varchar,
            PRIMARY KEY ("id")
          );`,
};
