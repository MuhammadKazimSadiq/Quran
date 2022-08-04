<template>
  <div class="text-center font-english text-3xl font-bold">Test</div>
</template>

<script setup>
import { ref, computed } from "vue";

import { useStore } from "../store/useStore";
const store = useStore();

const rows = [
  {
    id: 1,
    verse_id: 1,
    chapter_id: 1,
    text: "Verse 1",
    topic_id: 1,
    topic_name: "Topic 1",
    word: "Word 1",
    meaning: "Meaning 1",
  },
  {
    id: 1,
    verse_id: 1,
    chapter_id: 1,
    text: "Verse 1",
    topic_id: 2,
    topic_name: "Topic 2",
    word: "Word 1",
    meaning: "Meaning 1",
  },
  {
    id: 1,
    verse_id: 1,
    chapter_id: 1,
    text: "Verse 1",
    topic_id: 3,
    topic_name: "Topic 3",
    word: "Word 1",
    meaning: "Meaning 1",
  },
  {
    id: 1,
    verse_id: 1,
    chapter_id: 1,
    text: "Verse 1",
    topic_id: 1,
    topic_name: "Topic 1",
    word: "Word 2",
    meaning: "Meaning 2",
  },
  {
    id: 1,
    verse_id: 1,
    chapter_id: 1,
    text: "Verse 1",
    topic_id: 2,
    topic_name: "Topic 2",
    word: "Word 2",
    meaning: "Meaning 2",
  },
  {
    id: 1,
    verse_id: 1,
    chapter_id: 1,
    text: "Verse 1",
    topic_id: 3,
    topic_name: "Topic 3",
    word: "Word 2",
    meaning: "Meaning 2",
  },
  {
    id: 2,
    verse_id: 2,
    chapter_id: 1,
    text: "Verse 2",
    topic_id: 2,
    topic_name: "Topic 2",
  },
];

const grouped = store.groupRows({
  rows,
  key: "id",
  groupCols: [
    {
      groupName: "topics",
      groupKey: "topic_id",
      cols: [
        ["topic_id", "id"],
        ["topic_name", "name"],
      ],
    },
    {
      groupName: "vocab",
      groupKey: "word",
      cols: [
        ["word", "word"],
        ["meaning", "meaning"],
      ],
    },
  ],
});
</script>
