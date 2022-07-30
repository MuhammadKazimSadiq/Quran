export default {
  name: "create_fa_bahrampour_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "fa_bahrampour" ('id' int PRIMARY KEY, 'text' text);`,
};
