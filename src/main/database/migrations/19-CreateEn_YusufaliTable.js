export default {
  name: "create_en_yusufali_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "en_yusufali" 
          (
            'id' int PRIMARY KEY
                constraint en_yusufali_verses_id_fk
                references verses (id),
            'text' text
          );`,
};
