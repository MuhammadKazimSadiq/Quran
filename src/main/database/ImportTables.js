import fs from "fs";
const { parse } = require("csv-parse");

let db = null;
let pathToCsvFile = null;

export default async function importTables({ DB, table, path }) {
  db = DB;
  pathToCsvFile = path;

  if (table === "bookmarks") await importBookmarks();
  if (table === "topics") await importTopics();
  if (table === "vocabulary") await importVocabulary();
}

const importBookmarks = async () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathToCsvFile)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (row) => {
        db.db.serialize(() => {
          db.db.run(
            `INSERT INTO bookmarks (verse_id) VALUES (?)`,
            [parseInt(row[0])],
            function (error) {
              if (error) return console.log(error.message);
              console.log(`Inserted new bookmark with the id: ${this.lastID}`);
            }
          );
        });
      })
      .on("end", () => {
        console.log("Imported bookmarks successfully");
        resolve();
      })
      .on("error", (error) => {
        console.log(error.message);
        reject();
      });
  });
};

const importTopics = async () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT max(id) as id from topics`).then((res) => {
      const lastId = res[0].id;

      const rows = [];

      fs.createReadStream(pathToCsvFile)
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", (row) => {
          rows.push(row);
        })
        .on("end", async () => {
          let prevId = 0;

          const insertNewTopic = (row) => {
            return new Promise((resolve, reject) => {
              db.db.serialize(() => {
                db.db.run(
                  `INSERT INTO topics (id, name, parent_id) VALUES (?, ?, ?)`,
                  [
                    parseInt(row[0]) + lastId,
                    row[1],
                    parseInt(row[2]) === 0 ? null : parseInt(row[2]) + lastId,
                  ],
                  function (error) {
                    if (error) reject(console.log(error.message));
                    console.log(
                      `Inserted new topic with the id: ${this.lastID}`
                    );
                    prevId = parseInt(this.lastID);
                    resolve();
                  }
                );
              });
            });
          };

          const insertNewVerseTopic = (row) => {
            return new Promise((resolve, reject) => {
              db.db.serialize(() => {
                db.db.run(
                  `INSERT INTO verse_topic (verse_id, topic_id) VALUES (?, ?)`,
                  [parseInt(row[3]), parseInt(row[4]) + lastId],
                  function (error) {
                    if (error) reject(console.log(error.message));
                    console.log(
                      `Inserted new verse_topic with the id: ${this.lastID}`
                    );
                    resolve();
                  }
                );
              });
            });
          };

          for (const row of rows) {
            if (!row[4]) {
              await insertNewTopic(row);
            } else if (parseInt(row[0]) + lastId != prevId) {
              await insertNewTopic(row);
              await insertNewVerseTopic(row);
            } else {
              await insertNewVerseTopic(row);
            }
          }
          console.log("Imported bookmarks successfully");
          resolve();
        })
        .on("error", (error) => {
          console.log(error.message);
          reject();
        });
    });
  });
};

const importVocabulary = async () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathToCsvFile)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (row) => {
        db.db.serialize(() => {
          db.db.run(
            `INSERT INTO vocabulary (verse_id, word, meaning) VALUES (?, ?, ?)`,
            [parseInt(row[0]), row[1], row[2]],
            function (error) {
              if (error) return console.log(error.message);
              console.log(
                `Inserted new vocabulary with the id: ${this.lastID}`
              );
            }
          );
        });
      })
      .on("end", () => {
        console.log("Imported vocabulary successfully");
        resolve();
      })
      .on("error", (error) => {
        console.log(error.message);
        reject();
      });
  });
};
