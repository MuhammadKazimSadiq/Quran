import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { autoUpdater } from "electron-updater";
import { join } from "path";
import Database from "./database/Database";

// set app name
app.setName("Quran");

// connect to database
const pathToDbFile = join(
  app.getPath("userData"),
  process.env.NODE_ENV === "development" ? "quran_dev.sqlite" : "quran.sqlite"
);

const db = new Database(pathToDbFile);

function createWindow() {
  const mainWindow = new BrowserWindow({
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
}

app.whenReady().then(async () => {
  // initialize database and run migrations
  await db.init();

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
  const response = await db.query(query, type);
  return response;
});
