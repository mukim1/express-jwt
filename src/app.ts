require("dotenv").config();
import express from "express";
import config from "config";
import connectToDb from "./utils/connectToDb";
import log from "./utils/logger";
import router from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import cors from "cors";
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(deserializeUser);

app.use(router);

const port = config.get("port");

app.listen(port, () => {
  log.info(`App started at http://localhost:${port}`);

  connectToDb();
});
