export default {
  name: "create_en_shakir_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "en_shakir" ('id' int PRIMARY KEY, 'text' text);`,
};
