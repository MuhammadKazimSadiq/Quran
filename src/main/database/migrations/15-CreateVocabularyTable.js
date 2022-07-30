export default {
  name: "create_vocabulary_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "vocabulary"
          (
            id integer
              primary key,
            verse_id integer
              constraint vocabulary_verses_id_fk
                references verses,
            word text,
            meaning text
          );`,
};
