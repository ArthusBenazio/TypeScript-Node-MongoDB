import { MongoClient } from "./database/mongo";
import express from "express";
import router from "./routes";
import { config } from "dotenv";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.use("/", router);

  const port = process.env.PORT || 5500;

  app.listen(port, () => {
    console.log(`listen on port ${port}!`);
  });
};

main();
