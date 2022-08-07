CREATE TABLE topics
          (
            id integer not null
              constraint topics_pk
                primary key autoincrement,
            name varchar not null
          , "parent_id" integer);

