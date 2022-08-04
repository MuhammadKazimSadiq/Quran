import Model from "./Model";

export default class Topic extends Model {
  constructor() {
    super();
  }

  static table = "topics";

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
        ["id", "verse_id"],
        ["verse_id", "verse_number"],
        ["chapter_id", "chapter_id"],
        ["text_original", "verse_text"],
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
