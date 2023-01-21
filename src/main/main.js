import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { autoUpdater } from "electron-updater";
import fs from "fs";
import { join } from "path";
import Database from "./database/Database";
import exportTables from "./database/ExportTables";
import importTables from "./database/ImportTables";

// set app name
app.setName("Quran");

// connect to database
const pathToDbFile = join(
  app.getPath("userData"),
  process.env.NODE_ENV === "development" ? "quran_dev.sqlite" : "quran.sqlite"
);

const DB = new Database(pathToDbFile);

let mainWindow = null;

// create window
function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: true,
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

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("event", "Finished Loading");
  });

  // after saving zip of exported tables, delete zip & export files
  mainWindow.webContents.session.on(
    "will-download",
    (event, item, webContents) => {
      item.once("done", (event, state) => {
        // delete zip
        const pathToZipFile = join(app.getPath("userData"), "quran.zip");
        fs.unlink(pathToZipFile, (err) => {
          if (err) throw err;
        });
        // delete export files
        const folder = join(app.getPath("userData"), "exports");
        fs.readdir(folder, (err, files) => {
          if (err) throw err;

          for (const file of files) {
            fs.unlinkSync(`${folder}/${file}`);
            console.log(file + " : File Deleted Successfully.");
          }
        });
      });
    }
  );
}

app.whenReady().then(async () => {
  // initialize database and run migrations
  await DB.init();

  // create window
  createWindow();

  // check for updates
  autoUpdater.checkForUpdates();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// auto updater
autoUpdater.on("update-available", (_event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: "info",
    buttons: ["باشد"],
    title: "آپدیت جدید موجود است",
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail:
      "آپدیت جدید در حال دانلود است. بعد از دانلود، برنامه ری استارت خواهد شد.",
  };
  dialog.showMessageBox(dialogOpts);
});

autoUpdater.on("update-downloaded", (_event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: "info",
    buttons: ["ری استارت", "بعداً"],
    title: "آپدیت جدید",
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail:
      "آپدیت جدید دانلود شده است. برای نصب آپدیت، برنامه را ری استارت کنید.",
  };
  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall();
  });
});

// listen for db requests
ipcMain.handle("request", async (event, { query, type = "all" }) => {
  const response = await DB.query(query, type);
  return response;
});

// listen for export requests
ipcMain.handle("export", async (event, { tables }) => {
  exportTables({
    DB,
    mainWindow,
    tables: JSON.parse(tables),
  });
});

// listen for import requests
ipcMain.handle("import", async (event, { table, path }) => {
  importTables({
    DB,
    table,
    path,
  });
});
