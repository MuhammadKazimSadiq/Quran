import Model from "./Model";

export default class Verse extends Model {
  constructor() {
    super();
  }

  static table = "verses";

  static order = ["verses.id", "vocabulary.id", "verse_topic.id"];

  static joins = [
    {
      to_table: "chapters",
      from_col: "chapter_id",
      to_col: "id",
      cols: [["name", "chapter_name"]],
    },
    // topics
    {
      to_table: "verse_topic",
      from_col: "id",
      to_col: "verse_id",
    },
    {
      from_table: "verse_topic",
      to_table: "topics",
      from_col: "topic_id",
      to_col: "id",
      cols: [
        ["id", "topic_id"],
        ["name", "topic_name"],
        ["parent_id", "parent_id"],
      ],
    },
    // compare topics
    // {
    //     'to_table': 'verse_compare_topic', 'from_col': 'id', 'to_col': 'verse_id'
    // },
    // {
    //     'from_table': 'verse_compare_topic',
    //     'to_table': 'compare_topics',
    //     'from_col': 'compare_topic_id',
    //     'to_col': 'id',
    //     'cols': [['id', 'compare_topic_id'], ['name', 'compare_topic']]
    // },
    // vocab
    {
      to_table: "vocabulary",
      from_col: "id",
      to_col: "verse_id",
      cols: [
        ["id", "vocab_id"],
        ["word", "word"],
        ["meaning", "meaning"],
      ],
    },
    // bookmarks
    {
      to_table: "bookmarks",
      from_col: "id",
      to_col: "verse_id",
      cols: [["verse_id", "bookmarked"]],
    },
    // translations
    {
      to_table: "fa_bahrampour",
      from_col: "id",
      to_col: "id",
      cols: [["text", "fa_bahrampour"]],
    },
    {
      to_table: "fa_makarem",
      from_col: "id",
      to_col: "id",
      cols: [["text", "fa_makarem"]],
    },
    {
      to_table: "fa_ansarian",
      from_col: "id",
      to_col: "id",
      cols: [["text", "fa_ansarian"]],
    },
    {
      to_table: "fa_qaraati",
      from_col: "id",
      to_col: "id",
      cols: [["text", "fa_qaraati"]],
    },
    {
      to_table: "en_shakir",
      from_col: "id",
      to_col: "id",
      cols: [["text", "en_shakir"]],
    },
  ];
}
