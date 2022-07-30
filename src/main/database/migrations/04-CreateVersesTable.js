export default {
  name: "create_verses_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "verses"
          (
            id int
              primary key,
            section_id int
              constraint verses_sections_id_fk
                references sections (id),
            page_id int,
            chapter_id int
              constraint verses_chapters_id_fk
                references chapters (id),
            verse_id int,
            text_original text,
            text_clean text
          );`,
};
