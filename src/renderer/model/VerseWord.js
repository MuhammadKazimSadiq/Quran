import Model from "./Model";

export default class VerseWord extends Model {
  constructor() {
    super();
  }

  static order = [
    "verse_word.page",
    "verse_word.verse_id",
    "verse_word.line",
    "verse_word.position",
  ];

  static table = "verse_word";
}
