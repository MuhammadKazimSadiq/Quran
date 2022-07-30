export default {
  name: "create_fa_qaraati_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "fa_qaraati" ('id' int PRIMARY KEY, 'text' text);`,
};
