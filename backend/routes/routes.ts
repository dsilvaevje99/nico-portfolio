import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../logger/logger";
import Film from "./film";
import Photo from "./photo";
import Contact from "./contact";
import Auth from "./auth";
import Paragraph from "./paragraph";

class Routes {
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
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.use("/", Film);
    this.express.use("/", Photo);
    this.express.use("/", Contact);
    this.express.use("/", Auth);
    this.express.use("/", Paragraph);
  }
}

export default new Routes().express;
