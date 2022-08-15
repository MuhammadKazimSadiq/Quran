export default {
  name: "seed_translations_table",
  type: "seeder",
  query: `INSERT INTO "translations" ("name", "translator", "language") VALUES
          ('en_shakir', 'Shakir', 'en'),
          ('en_qarai', "Ali Quli Qara'i", 'en'),
          ('en_yusufali', 'Abdullah Yusuf Ali', 'en'),
          ('fa_ansarian', 'انصاریان', 'fa'),
          ('fa_bahrampour', 'بهرامپور', 'fa'),
          ('fa_makarem', 'مکارم', 'fa'),
          ('fa_qaraati', 'قرائتی', 'fa');`,
};
