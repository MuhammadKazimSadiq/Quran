export function useGetTopicVersesCount(data, parent) {
  const children = data.filter((topic) => topic.parent_id === parent.topic_id);
  if (!children.length) {
    return parent?.verses?.length;
  }
  return children.reduce((acc, child) => {
    return acc + useGetTopicVersesCount(data, child);
  }, parent?.verses?.length);
}
