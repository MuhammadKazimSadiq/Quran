export function useGetParentTopics(data, child) {
  const parent = data.find((entry) => entry.topic_id === child.parent_id) ?? {};
  if (!Object.keys(parent).length)
    return [{ id: child?.topic_id, name: child?.topic_name }];

  return [
    { id: child.topic_id, name: child.topic_name },
    ...useGetParentTopics(data, parent),
  ];
}
