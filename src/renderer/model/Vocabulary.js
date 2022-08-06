import Model from "./Model";

export default class Vocabulary extends Model {
  constructor() {
    super();
  }

  static table = "vocabulary";

  static order = ["verses.id", "vocabulary.id"];

  static selectCols = [
    ["id", "vocab_id"],
    ["word", "word"],
    ["meaning", "meaning"],
  ];

  static joins = [
    {
      from_table: "vocabulary",
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
  ];
}
