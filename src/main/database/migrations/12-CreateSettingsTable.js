export default {
  name: "create_settings_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS settings
          (
            id integer
              constraint settings_pk
                primary key autoincrement,
            name varchar,
            value text
          );`,
};
