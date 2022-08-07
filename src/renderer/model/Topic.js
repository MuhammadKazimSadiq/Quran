import Model from "./Model";

export default class Topic extends Model {
  constructor() {
    super();
  }

  static table = "topics";

  static selectCols = [
    ["id", "topic_id"],
    ["name", "topic_name"],
    ["parent_id", "parent_id"],
  ];

  static joins = [
    {
      to_table: "verse_topic",
      from_col: "id",
      to_col: "topic_id",
    },
    {
      from_table: "verse_topic",
      to_table: "verses",
      from_col: "verse_id",
      to_col: "id",
      cols: [
        ["id", "id"],
        ["verse_id", "verse_id"],
        ["chapter_id", "chapter_id"],
        ["text_clean", "text_clean"],
        ["text_original", "text_original"],
      ],
    },
    // chapters
    {
      from_table: "verses",
      to_table: "chapters",
      from_col: "chapter_id",
      to_col: "id",
      cols: [["name", "chapter_name"]],
    },
    // translations
    {
      from_table: "verses",
      to_table: "fa_bahrampour",
      from_col: "id",
      to_col: "id",
      cols: [["text", "fa_bahrampour"]],
    },
    {
      from_table: "verses",
      to_table: "fa_makarem",
      from_col: "id",
      to_col: "id",
      cols: [["text", "fa_makarem"]],
    },
    {
      from_table: "verses",
      to_table: "fa_ansarian",
      from_col: "id",
      to_col: "id",
      cols: [["text", "fa_ansarian"]],
    },
    {
      from_table: "verses",
      to_table: "fa_qaraati",
      from_col: "id",
      to_col: "id",
      cols: [["text", "fa_qaraati"]],
    },
    {
      from_table: "verses",
      to_table: "en_shakir",
      from_col: "id",
      to_col: "id",
      cols: [["text", "en_shakir"]],
    },
  ];
}
