export default {
  name: "create_en_qarai_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "en_qarai" 
          (
            'id' int PRIMARY KEY
                constraint en_qarai_verses_id_fk
                references verses (id),
            'text' text
          );`,
};
