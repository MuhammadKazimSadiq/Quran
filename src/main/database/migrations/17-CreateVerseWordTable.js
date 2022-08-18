export default {
  name: "create_verse_word_table",
  type: "migration",
  query: `CREATE TABLE "verse_word" 
          (
            "id" serial,
            "verse_id" integer
                constraint verse_word_verses_id_fk
                references verses (id),
            "text" varchar,
            "fa" varchar,
            "en" varchar,
            "position" integer,
            "line" integer,
            "page" integer,
            "chapter" integer, 
            "section" integer,
            "location" varchar,
            "char_type_name" varchar, 
            PRIMARY KEY ("id")
          );`,
};
