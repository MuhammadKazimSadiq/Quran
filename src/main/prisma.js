import { app } from "electron";
import { join } from "path";
import { PrismaClient } from "@prisma/client";

const pathToDbFile = join(
  app.getPath("userData"),
  process.env.NODE_ENV === "development" ? "quran_dev.sqlite" : "quran.sqlite",
);

console.log("Connecting Prisma to: ", pathToDbFile);

const DB = new PrismaClient({
  datasources: {
    db: {
      url: `file:${pathToDbFile}`,
    },
  },
});

export default DB;
