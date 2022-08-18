import { ipcRenderer } from "../electron";

export default class Database {
  static query({ query, type = "all" }) {
    return new Promise((resolve) => {
      ipcRenderer.invoke("request", { query, type }).then((data) => {
        resolve(data);
      });
    });
  }
}
