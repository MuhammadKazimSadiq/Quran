export default {
  name: "create_topics_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS topics
          (
            id integer not null
              constraint topics_pk
                primary key autoincrement,
            name varchar not null
          , note text);`,
};
