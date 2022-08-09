export default {
  name: "create_fa_ansarian_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "fa_ansarian" 
          (
            'id' int PRIMARY KEY
                constraint fa_ansarian_verses_id_fk
                references verses (id),
             'text' text
          );`,
};
