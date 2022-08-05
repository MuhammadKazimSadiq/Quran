## Read:

- new page & new juz' signs

## Command Palette

- add page and juz'

## Audio

## Settings:

- search rules (add to settings)
- advanced search
- icons + topics + vocab + translations should all be customizable in the settings

## Store

- combine all fetch request --> make one function (fetchResource?)

## other

- mushaf view

## Vocab

- inline edit for vocab page?
- edit and delete vocab in read page (with popup?)

## Topics

  <!-- - recursive topics query: `with RECURSIVE numbers as ( select 1 as n union select n + 1 from numbers where n < 10 ) select * from numbers` -->
  <!-- - recursive topics groupBy js function -->
<!-- - display recursive topics in topics page -->

- display recursive topics in dropdown
  - use custom dropdown component
  - on select child, show appended parent appropriately
- add new topic under parent in select dropdown
- allow same child under different parents?
- delete topics
- use #topic in command palette to search for verses with topic (use in advanced search as well?)
- able to make existing topic as child of another topic
- drag and drop ui + sortable

## Compare Verses

- Use command palette like dialog to select verses to compare
- highlight same parts of the selected verses
- add notes
- save

# TODO:

- implement edit and delete for vocab and topics
- remove from topic icon (topic item page)
- search bar for topics and vocab
- on add topic and vocab --> refetch? or add refresh btn to refetch --> implement force refresh
