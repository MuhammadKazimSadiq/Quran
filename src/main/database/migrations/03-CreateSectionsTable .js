export default {
  name: "create_sections_table",
  type: "migration",
  query: `CREATE TABLE IF NOT EXISTS "sections"
          (
            id,
            joz,
            page
          );`,
};
