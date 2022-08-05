<template>
  <div class="text-center font-english text-3xl font-bold dark:text-white">
    Test
  </div>

  <div class="mt-12 flex justify-center"></div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import { useStore } from "../store/useStore";
const store = useStore();

// Helper function, returns {ID -> set of child IDs}
const getAdjMatrix = (data) => {
  const adjMatrix = new Map();
  for (const entry of data) {
    if (!adjMatrix.has(entry.id)) {
      adjMatrix.set(entry.id, new Set());
    }
    if (entry.parent_id !== null) {
      if (!adjMatrix.has(entry.parent_id)) {
        adjMatrix.set(entry.parent_id, new Set());
      }
      adjMatrix.get(entry.parent_id).add(entry.id);
    }
  }
  return adjMatrix;
};

// Helper function, returns grouped data for the given ID
const getGroupedDataForId = (id, idToData, adjMatrix, processedIds) => {
  if (!idToData.has(id) || !adjMatrix.has(id) || processedIds.has(id)) {
    return null;
  }
  const result = idToData.get(id);
  result.children = [];
  // Add children
  for (const childId of adjMatrix.get(id)) {
    const childIdData = getGroupedDataForId(
      /*id=*/ childId,
      idToData,
      adjMatrix,
      processedIds
    );
    if (childIdData !== null) {
      result.children.push(childIdData);
    }
    processedIds.add(childId);
  }
  processedIds.add(id);
  return result;
};

// Returns the final grouped data
const getGroupedData = (data) => {
  // A map of ID to its data
  const idToData = new Map(data.map((entry) => [entry.id, entry]));
  // Adjacency matrix
  // Represented by {id -> set of children}
  const adjMatrix = getAdjMatrix(data);

  // Root IDs (no parents)
  const rootIds = data
    .filter((entry) => entry.parent_id === null)
    .map((entry) => entry.id);
  // IDs that have been grouped with children
  const processedIds = new Set();
  // Final result
  const result = [];

  // Recursively add IDs
  let groupedData = undefined;
  for (const rootId of rootIds) {
    groupedData = getGroupedDataForId(
      /*id=*/ rootId,
      idToData,
      adjMatrix,
      processedIds
    );
    if (groupedData !== null) {
      result.push(groupedData);
    }
  }

  return result;
};

// Test
const data = [
  { id: 1, name: "Topic 1", parent_id: null },
  { id: 2, name: "Topic 2", parent_id: 1 },
  { id: 3, name: "Topic 3", parent_id: 2 },
  { id: 4, name: "Topic 4", parent_id: 2 },
  { id: 5, name: "Topic 5", parent_id: 4 },
  { id: 6, name: "Topic 6", parent_id: null },
  { id: 7, name: "Topic 7", parent_id: 1 },
  { id: 8, name: "Topic 8", parent_id: 7 },
  { id: 9, name: "Topic 9", parent_id: 5 },
  { id: 10, name: "Topic 10", parent_id: 1 },
];

console.log(getGroupedData(data));
</script>
