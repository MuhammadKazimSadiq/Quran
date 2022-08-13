import { useGetParentTopics } from "./getParentTopics";

export function useGetChildren(data, parent) {
  const children = data.filter((topic) => topic.parent_id === parent.topic_id);
  if (!children.length) {
    return [];
  }
  return children.map((child) => {
    return {
      ...child,
      parents: useGetParentTopics(data, child),
      children: useGetChildren(data, child),
    };
  });
}
