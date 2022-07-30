export default {
  name: "create_audio_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS 'audio' ('id', 'name', 'url', 'sort_order');`,
};
