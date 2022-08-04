import Model from "./Model";

export default class Topic extends Model {
  constructor() {
    super();
  }

  static table = "topics";

  static selectCols = [
    ["id", "topic_id"],
    ["name", "topic_name"],
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
  ];
}
