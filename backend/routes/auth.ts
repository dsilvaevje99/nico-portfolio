import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../logger/logger";

class AuthAPI {
  public express: express.Application;
  public logger: Logger;

  public loggedIn: Boolean;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.loggedIn = false;
    this.logger = new Logger();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.get("/login", (req, res, next) => {
      this.logger.info("url:::::::" + req.url);
      this.loggedIn = true;
      res.json("Logging in");
    });

    this.express.get("/logout", (req, res, next) => {
      this.logger.info("url:::::::" + req.url);
      this.loggedIn = false;
      res.json("Logging out");
    });

    this.express.get("/login/status", (req, res, next) => {
      this.logger.info("url:::::::" + req.url);
      res.json(this.loggedIn);
    });

    this.express.post("/user", (req, res, next) => {
      this.logger.info("url:::::::" + req.url);
      res.json(`Adding user ${req.body}`);
    });
  }
}

export default new AuthAPI().express;
