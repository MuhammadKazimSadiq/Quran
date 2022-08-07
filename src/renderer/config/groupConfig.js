export const versesConfig = {
  // verses
  key: "id",
  groupCols: [
    {
      groupName: "topics",
      groupKey: "topic_id",
      cols: [
        ["topic_id", "topic_id"],
        ["topic_name", "topic_name"],
        ["parent_id", "parent_id"],
      ],
    },
    {
      groupName: "vocab",
      groupKey: "word",
      cols: [
        ["vocab_id", "vocab_id"],
        ["word", "word"],
        ["meaning", "meaning"],
      ],
    },
  ],
};

export const topicsConfig = {
  // topics
  key: "topic_id",
  groupCols: [
    {
      groupName: "verses",
      groupKey: "id",
      cols: [
        ["id", "id"],
        ["verse_id", "verse_id"],
        ["chapter_id", "chapter_id"],
        ["chapter_name", "chapter_name"],
        ["text_clean", "text_clean"],
        ["text_original", "text_original"],
        ["fa_bahrampour", "fa_bahrampour"],
        ["fa_makarem", "fa_makarem"],
        ["fa_ansarian", "fa_ansarian"],
        ["fa_qaraati", "fa_qaraati"],
        ["en_shakir", "en_shakir"],
      ],
    },
  ],
};
