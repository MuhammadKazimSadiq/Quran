import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import Database from "./database/Database";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // fullscreen: true,
    autoHideMenuBar: true,
    icon: join(__dirname, "./static/icon.ico"),
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === "development") {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    mainWindow.loadFile(join(app.getAppPath(), "renderer", "index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// database
const pathToDbFile =
  process.env.NODE_ENV === "development"
    ? join(__dirname, "./static/database.sqlite")
    : "./resources/database/database.sqlite";

const db = new Database(pathToDbFile);
db.init();

ipcMain.on("request", async (event, { query, type = "all" }) => {
  const response = await db.query(query, type);
  event.reply("response", response);
});
