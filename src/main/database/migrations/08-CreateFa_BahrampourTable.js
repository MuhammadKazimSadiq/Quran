export default {
  name: "create_fa_bahrampour_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "fa_bahrampour"
          (
            'id' int PRIMARY KEY
                constraint fa_bahrampour_verses_id_fk
                references verses (id),
            'text' text
          );`,
};
