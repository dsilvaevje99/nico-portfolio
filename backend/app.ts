import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "./logger/logger";
import Routes from "./routes/routes";
const path = require("path");
import cors = require("cors");

class App {
  public express: express.Application;
  public logger: Logger;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.logger = new Logger();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Origin",
        "https://nicolas-romero.onrender.com"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
    this.express.use(
      cors({
        origin: ["https://nicolas-romero.onrender.com"],
      })
    );
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(express.static(path.join(__dirname, "../frontend/dist/")));
  }

  private routes(): void {
    this.express.get("/", (req, res, next) => {
      res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });

    this.express.use("/api", Routes);

    // handle undefined routes
    this.express.use("*", (req, res, next) => {
      res.send("Make sure url is correct!!!");
    });
  }
}

export default new App().express;
