import { app } from "electron";
import fs from "fs";
import { join } from "path";
const Json2csvParser = require("json2csv").Parser;
const AdmZip = require("adm-zip");

let db = null;

export default async function exportTables({ DB, mainWindow, tables }) {
  db = DB;

  if (tables.includes("bookmarks")) await exportBookmarks();
  if (tables.includes("topics")) await exportTopics();
  if (tables.includes("vocabulary")) await exportVocabulary();

  // zip files
  const pathToZipFile = await zip();

  // download prompt
  mainWindow.webContents.downloadURL(pathToZipFile);
}

const exportBookmarks = async () => {
  try {
    const data = await db.query(`SELECT * FROM bookmarks`);
    const fields = ["verse_id"];
    if (data.length) await convertToCSV({ data, fields, table: "bookmarks" });
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

const exportTopics = async () => {
  try {
    const data = await db.query(`select t.*, vt.verse_id, vt.topic_id
                                 from topics as t
                                 left join verse_topic as vt on vt.topic_id = t.id`);
    const fields = ["id", "name", "parent_id", "verse_id", "topic_id"];
    if (data.length) await convertToCSV({ data, fields, table: "topics" });
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

const exportVocabulary = async () => {
  try {
    const data = await db.query(`SELECT * FROM vocabulary`);
    const fields = ["verse_id", "word", "meaning"];
    if (data.length) await convertToCSV({ data, fields, table: "vocabulary" });
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

const convertToCSV = ({ data, table, fields }) => {
  return new Promise((resolve, reject) => {
    const json2csvParser = new Json2csvParser({ fields });
    const csv = json2csvParser.parse(data);

    // create `exports` directory if does not exist
    const path = join(app.getPath("userData"), `exports`);
    if (!fs.existsSync(path)) fs.mkdirSync(path);
    const pathToCSVFile = join(path, `${table}.csv`);

    // write to csv file
    fs.writeFile(pathToCSVFile, csv, (error) => {
      if (error) throw error;
      console.log(`Exported ${table} to CSV successfully`);
      resolve();
    });
  });
};

const zip = async () => {
  return new Promise((resolve, reject) => {
    try {
      const zip = new AdmZip();
      const outputFile = join(app.getPath("userData"), `quran.zip`);
      zip.addLocalFolder(join(app.getPath("userData"), `exports`));
      zip.writeZip(outputFile);
      console.log(`Created ${outputFile} successfully`);
      resolve(outputFile);
    } catch (e) {
      console.log(`Something went wrong. ${e}`);
      reject();
    }
  });
};
