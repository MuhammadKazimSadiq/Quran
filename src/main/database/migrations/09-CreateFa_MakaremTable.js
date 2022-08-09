export default {
  name: "create_fa_makarem_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "fa_makarem"
          (
            'id' int PRIMARY KEY
                constraint fa_makarem_verses_id_fk
                references verses (id),
            'text' text
          );`,
};
