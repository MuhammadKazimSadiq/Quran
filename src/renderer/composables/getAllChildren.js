export function useGetAllChildren(data, parent) {
  const children = data.filter((topic) => topic.parent_id === parent.topic_id);
  if (!children.length) return [];

  return children.reduce(
    (acc, child) => [...acc, child, ...useGetAllChildren(data, child)],
    []
  );
}
