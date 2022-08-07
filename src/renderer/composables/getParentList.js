export function useGetParentList(
  data,
  child,
  {
    primaryId = "id",
    foreignId = "parent_id",
    nameField = "name",
    reverse = true,
    separator = " . ",
  } = {}
) {
  const parent =
    data.find((entry) => entry[primaryId] === child[foreignId]) ?? {};
  if (!Object.keys(parent).length) return child[nameField];

  let parents = [
    child[nameField],
    useGetParentList(data, parent, {
      primaryId,
      foreignId,
      nameField,
      reverse,
      separator,
    }),
  ];
  return !reverse ? parents.join(separator) : parents.reverse().join(separator);
}
