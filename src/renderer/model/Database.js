import { ipcRenderer } from "../electron";

export default class Database {
  static isFetching = [];

  static query({ query, table }) {
    return new Promise((resolve, reject) => {
      // if currently fetching, return
      if (this.isFetching.includes(table)) return reject("currently fetching");
      // add table name to isFetching
      this.isFetching.push(table);
      // send fetch request to main process
      ipcRenderer.send("request", query);
      // listen for response
      ipcRenderer.receive("response", (data) => {
        resolve(data);
        // remove table name from isFetching
        this.isFetching.splice(this.isFetching.indexOf(table), 1);
      });
    });
  }
}
