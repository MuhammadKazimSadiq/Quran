export default {
  name: "seed_settings_table",
  type: "seeder",
  query: `INSERT INTO "settings" ("id", "name", "value") VALUES
          (1, 'enabled_translations', '["fa_bahrampour"]'),
          (2, 'theme', '"dark"');`,
};
