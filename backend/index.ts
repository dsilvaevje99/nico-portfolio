import * as http from "http";
import App from "./app";
require("dotenv").config();
import cors = require("cors");
import { Logger } from "./logger/logger";

const mongoose = require("mongoose");

const port = process.env.PORT || 3080;
const mongoString = process.env.ATLAS_URI;

mongoose.connect(mongoString);
const database = mongoose.connection;

App.use(
  cors({
    origin: ["https://nicolas-romero.onrender.com"],
  })
);
App.set("port", port);
const server = http.createServer(App);
server.listen(port);

const logger = new Logger();

server.on("listening", function (): void {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  logger.info(`Listening on ${bind}`);
});

database.on("error", (error: any) => {
  logger.info(error);
});
database.once("connected", () => {
  logger.info("Database Connected");
});

module.exports = App;
