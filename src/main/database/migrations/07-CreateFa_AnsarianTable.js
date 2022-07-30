export default {
  name: "create_fa_ansarian_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "fa_ansarian" ('id' int PRIMARY KEY, 'text' text);`,
};
