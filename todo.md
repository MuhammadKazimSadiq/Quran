# TODO

## Topics

- use #topic in command palette to search for verses with topic (use in advanced search as well?)
- verse picker --> add verse to topic in topic item page

### Recursive Topics

  <!-- - recursive topics query: `with RECURSIVE numbers as ( select 1 as n union select n + 1 from numbers where n < 10 ) select * from numbers` -->
  <!-- - recursive topics groupBy js function -->
  <!-- - display recursive topics in topics page -->

- display recursive topics in dropdown
  - use custom dropdown component
  - on select child, show appended parent appropriately
- add new topic under parent in select dropdown
- allow same child under different parents?
- able to make existing topic as child of another topic
- drag and drop ui + sortable

## Vocabulary

- edit and delete vocab in read page (with popup?)

## Compare Verses

- Use command palette like dialog to select verses to compare
- highlight same parts of the selected verses
- add notes
- save

## Settings:

- search rules (add to settings)
- advanced search
- icons + topics + vocab + translations should all be customizable in the settings

## Other

- Read: new page & new juz' signs
- Command Palette: add page and juz' and topics
- audio
- combine all fetch request --> make one function (fetchResource?)
- mushaf view

## Check List

### Topics

- [x] Topics page: add new topic
- [x] Topics page: edit topic
- [x] Topics page: delete topic
- [ ] Topic Item page: add verse to topic
- [x] Topic Item page: remove verse from topic
- [x] Verse: Add existing topic to verse
- [x] Verse: Add new topic to verse
- [x] Verse: remove topic from verse

### Vocabulary

- [ ] Vocab page: Add new vocab
- [x] Vocab page: edit vocab
- [x] Vocab page: delete vocab
- [x] Verse: Add new vocab to verse
- [ ] Verse: edit vocab
- [ ] Verse: delete vocab

- on add/delete/update topic and vocab --> refetch? or add refresh btn to refresh --> implement force refresh
- multiple stores?
  - organize fetching data
  - organize grouping data
  - organize refreshing data
