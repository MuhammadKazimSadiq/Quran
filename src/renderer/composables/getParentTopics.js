export function useGetParentTopics(
  data,
  child,
  { reverse = true, separator = " . " } = {}
) {
  const parent = data.find((entry) => entry.topic_id === child.parent_id) ?? {};
  if (!Object.keys(parent).length) return child.topic_name;

  let parents = [child.topic_name, useGetParentTopics(data, parent)];
  return !reverse ? parents.join(separator) : parents.reverse().join(separator);
}
