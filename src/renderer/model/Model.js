import Database from "./Database";

export default class Model {
  static table = "";
  static order = [];
  static joins = [];

  static get(id, joins = []) {
    return new Promise((resolve, reject) => {
      const { selectString, joinString, conditionString, orderString } =
        this.buildQueryString({ joins, conditions: [["id", id]], order: [] });
      const querystring = `SELECT ${selectString} from ${this.table} ${joinString} ${conditionString} ${orderString}`;
      Database.query({ query: querystring, table: this.table })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  static find(joins = [], conditions = []) {
    return new Promise((resolve, reject) => {
      const { selectString, joinString, conditionString, orderString } =
        this.buildQueryString({ joins, conditions, order: [] });
      const querystring = `SELECT ${selectString} from ${this.table} ${joinString} ${conditionString} ${orderString}`;
      Database.query({ query: querystring, table: this.table })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  static all(joins = [], conditions = [], order = []) {
    return new Promise((resolve, reject) => {
      const { selectString, joinString, conditionString, orderString } =
        this.buildQueryString({ joins, conditions, order });
      const querystring = `SELECT ${selectString} FROM ${this.table} ${joinString} ${conditionString} ${orderString}`;
      Database.query({ query: querystring, table: this.table })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  // data: {id: id, value: value}
  // return id of inserted row
  static async insert(data) {
    try {
      const res = await Database.prisma(this.table, "create", { data });
      return [{ id: res.id }];
    } catch (err) {
      throw err;
    }
  }

  // conditions: [ [id, 1], [name, ''] ]
  // values: [ [id, 1], [name, ''] ]
  static async update(conditions, values) {
    try {
      const where = {};
      conditions.forEach(cond => {
        where[cond[0]] = cond[1];
      });
      
      const data = {};
      values.forEach(val => {
        data[val[0]] = val[1].replace(/^'|'$/g, '').replace(/^"|"$/g, ''); // strip manual quotes
      });
      
      const res = await Database.prisma(this.table, "updateMany", { where, data });
      return res;
    } catch (err) {
      throw err;
    }
  }

  // conditions: [ [id, 1], [name, ''] ]
  static async delete(conditions) {
    try {
      const where = {};
      conditions.forEach(cond => {
        where[cond[0]] = cond[1];
      });
      const res = await Database.prisma(this.table, "deleteMany", { where });
      return res;
    } catch (err) {
      throw err;
    }
  }

  static sync(oldRelations, newRelations) {
    const toDelete = this.difference(oldRelations, newRelations);
    const toAdd = this.difference(newRelations, oldRelations);
    return { toDelete, toAdd };
  }

  static buildQueryString({ joins, conditions, order }) {
    const selectString = this.formSelectString(joins);
    const joinString = this.formJoinString(joins);
    const conditionString = this.formConditionString(conditions);
    const orderString = this.formOrderString(order);

    return { selectString, joinString, conditionString, orderString };
  }

  static formSelectString(joins) {
    joins = joins.length ? [...joins, ...this.joins] : this.joins;

    if (joins.length) {
      let joinArray = this?.selectCols?.length
        ? [
            ...this?.selectCols?.reduce((acc, col) => {
              acc.push(`${this.table}.${col[0]} as ${col[1]}`);
              return acc;
            }, []),
          ]
        : [`${this.table}.*`];

      joins.forEach((table) =>
        table?.cols?.forEach((col) =>
          joinArray.push(`${table.to_table}.${col[0]} as ${col[1]}`)
        )
      );
      joinArray = joinArray.join(" , ");
      return joinArray;
    } else return `${this.table}.*`;
  }

  static formJoinString(joins) {
    joins = joins.length ? [...joins, ...this.joins] : this.joins;
    return joins.length
      ? joins
          .map(
            (join) =>
              ` left join ${join.to_table} on ${
                join.from_table ? join.from_table : this.table
              }.${join.from_col} = ${join.to_table}.${join.to_col} `
          )
          .join(" ")
      : "";
  }

  static formConditionString(conditions) {
    // check if conditions array is empty
    if (!conditions.length) return "";

    const conditionString = conditions
      .map((condition) => {
        // check if condition is `equals to` clause
        if (condition.length === 2)
          return `${this.table}.${condition[0]} = '${condition[1]}' `;
        // check if condition is `LIKE` clause
        if (condition[1] === "LIKE")
          return `${condition[0]} LIKE '%${condition[2]}%'`;
        return `${condition[0]} ${condition[1]} ${condition[2]} `;
      })
      .join(" and ");

    return ` where ${conditionString}`;
  }

  static formOrderString(order) {
    order = order.length ? [...order, ...this.order] : this.order;
    return order.length ? `ORDER BY ${order.join(" , ")}` : "";
  }

  static difference(a, b) {
    return a.filter((x) => !b.includes(x));
  }
}
