export default {
  name: "create_en_shakir_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "en_shakir" 
          (
            'id' int PRIMARY KEY
                constraint en_shakir_verses_id_fk
                references verses (id),
            'text' text
          );`,
};
