import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { autoUpdater } from "electron-updater";
import { join } from "path";
import fs from "fs";
import { parse } from "csv-parse";
import Database from "./database/Database";

const Json2csvParser = require("json2csv").Parser;

// set app name
app.setName("Quran");

// connect to database
const pathToDbFile = join(
  app.getPath("userData"),
  process.env.NODE_ENV === "development" ? "quran_dev.sqlite" : "quran.sqlite"
);

// connect to database
const DB = new Database(pathToDbFile);

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

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("event", "Finished Loading");
  });
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

const pathToCSVFile = join(app.getPath("userData"), "test.csv");

// export to csv file
// DB.query(`SELECT * FROM topics`)
//   .then((data) => {
//     const json2csvParser = new Json2csvParser({ header: true });
//     const csv = json2csvParser.parse(data);

//     // TODO: parse data

//     fs.writeFile(pathToCSVFile, csv, (error) => {
//       if (error) throw error;
//       console.log("Process Successful!");
//     });
//   })
//   .catch((e) => console.log(`Error: ${e}`));

// import from csv
// fs.createReadStream(pathToCSVFile)
//   .pipe(parse({ delimiter: ",", from_line: 2 }))
//   .on("data", (row) => {
//     // DB.db.exec()

//     DB.db.serialize(() => {
//       DB.db.run(
//         `INSERT INTO test VALUES (?, ?, ?)`,
//         [row[0], row[1], row[2]],
//         function (error) {
//           if (error) return console.log(error.message);
//           console.log(`Inserted a row with the id: ${this.lastID}`);
//         }
//       );
//     });
//   })
//   .on("end", () => {
//     console.log("finished");
//   })
//   .on("error", (error) => {
//     console.log(error.message);
//   });

// TODO: splash screen
// TODO: update verse_word migration file
// TODO: format data before exporting
// TODO: import dependent tables
// TODO: show loading message when migrating tables
