// rows: Array
// config: Object{key, groupCols}
// key: String
// groupCols: Array [groupName: String, groupKey: String, groupCols: Array[[originalName, newName], [originalName, newName]] ]
export function useGroup(rows, { key, groupCols = [] }) {
  return Object.values(
    rows.reduce((acc, row) => {
      if (acc[row[key]]) {
        groupCols.forEach(({ groupName, groupKey, cols }) => {
          const newGroupKeyName = cols.filter(
            (col) => col[0] === groupKey
          )[0][1];
          if (
            acc[row[key]][groupName].length &&
            !acc[row[key]][groupName].some(
              (_row) => _row[newGroupKeyName] === row[groupKey]
            )
          ) {
            acc[row[key]][groupName].push(
              cols.reduce(
                (_acc, [originalName, newName]) => ({
                  ..._acc,
                  [newName]: row[originalName],
                }),
                {}
              )
            );
          }
        });
      } else {
        acc[row[key]] = { ...row };
        groupCols.forEach(({ groupName, groupKey, cols }) => {
          acc[row[key]][groupName] = [];

          if (!row[groupKey]) return;
          acc[row[key]][groupName].push(
            cols.reduce(
              (_acc, [originalName, newName]) => ({
                ..._acc,
                [newName]: row[originalName],
              }),
              {}
            )
          );
        });
      }
      return acc;
    }, {})
  );
}
