import { ipcRenderer } from "../electron";

export default class Database {
  static query({ query, type = "all" }) {
    return new Promise((resolve) => {
      ipcRenderer.invoke("request", { query, type }).then((data) => {
        resolve(data);
      });
    });
  }

  static prisma(model, operation, args = {}) {
    return new Promise((resolve, reject) => {
      ipcRenderer.invoke("prisma", { model, operation, args }).then(resolve).catch(reject);
    });
  }
}
