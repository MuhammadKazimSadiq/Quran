export default {
  name: "create_verse_topic_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "verse_topic"
          (
            id integer not null
              constraint verse_topic_pk
                primary key autoincrement,
            verse_id int not null
              constraint verse_topic_verses_id_fk
                references verses,
            topic_id int not null
              constraint verse_topic_topics_id_fk
                references topics
          , note text);`,
};
