export default {
  name: "create_fa_qaraati_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "fa_qaraati" 
          (
            'id' int PRIMARY KEY
                constraint fa_qaraati_verses_id_fk
                references verses (id),
            'text' text
          );`,
};
