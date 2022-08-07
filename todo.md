# TODO

## Other

- Command Palette: add page and juz' and topics
- audio
- mushaf view

## Topics

- [x] Topics page: add new topic
- [x] Topics page: edit topic
- [x] Topics page: delete topic
- [ ] Topic Item page: add verse to topic
- [x] Topic Item page: remove verse from topic
- [x] Verse: Add existing topic to verse
- [x] Verse: Add new topic to verse
- [x] Verse: remove topic from verse

- [ ] use #topic in command palette to search for verses with topic (use in advanced search as well?)
- [ ] verse picker --> add verse to topic in topic item page

### Recursive Topics

- [x] Show child's parents (eg. Topic 1 . Topic 2 . Topic 3)
- [x] Nest data with recursive function
- [ ] Display recursive topics in topics page
- [x] Show total verses under topic + children topics
- [ ] Add parent field select (combobox) when creating new topic / updating existing topic
- [ ] Save new recursive topic
- [ ] Handling deleting parent topic (not allow? or ask to shift topics to another parent?)
- [ ] Drag and drop - sortable

## Vocabulary

- [ ] Vocab page: Add new vocab
- [x] Vocab page: edit vocab
- [x] Vocab page: delete vocab
- [x] Verse: Add new vocab to verse
- [ ] Verse: edit vocab
- [ ] Verse: delete vocab

- [ ] edit and delete vocab in read page (with popup?)

## Settings:

- search rules (add to settings)
- advanced search
- icons + topics + vocab + translations should all be customizable in the settings

## Refresh Data

### Refresh Verse

- [ ] Read View/ Bookmark View: Refresh verse on toggle bookmark
- [ ] Read View: Refresh verse on add/ remove topic from verse
- [ ] Read View: Refresh verse on add/ remove vocab from verse
- [ ] Topic Item View: Refresh verse on remove topic from verse
- [ ] Vocab View: Refresh verse on edit/ remove vocab

### Refresh Topic

- [ ] Topics View: Refresh topics on add/ update/ delete topic
- [ ] Read View: Refresh topics on add/ remove topics from verse
- [ ] Topic Item View: Refresh topics on remove topic from verse

### Refresh Vocab

- [ ] Read View: Refresh vocab on add/ remove vocab from verse
- [ ] Vocab View: Refresh vocab on edit/ remove vocab from verse

- on add/delete/update topic and vocab --> refetch? or add refresh btn to refresh --> implement force refresh
- multiple stores?
  - organize fetching data
  - organize grouping data
  - organize refreshing data
- make topic input skeleton loader bigger

## Features

- tafsir
- tarkib
- notes
- compareVerse notes
- topic notes
- verseTopic notes
- linked verses
- assign topics to verse ranges --> then show in read

## Compare Verses

- [ ] Use command palette like dialog to select verses to compare
- [ ] highlight same parts of the selected verses
- [ ] add notes
- [ ] save
