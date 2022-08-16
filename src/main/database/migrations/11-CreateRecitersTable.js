export default {
  name: "create_reciters_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS 'reciters' 
          ('id' int primary key, 'name', 'url');`,
};
