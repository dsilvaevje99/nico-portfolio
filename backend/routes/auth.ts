import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../logger/logger";
import auth from "../middleware/auth";

const Model = require("../models/users");

class AuthAPI {
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
    this.express.post("/user", auth, async (req, res, next) => {
      this.logger.info("url:::::::" + req.url);

      try {
        /* console.log(isUser);
        if (isUser.length >= 1) {
          return res.status(409).json({
            message: "username already in use",
          });
        } */
        const user = new Model({
          username: req.body.username,
          password: req.body.password,
        });
        let data = await user.save();
        const token = await user.generateAuthToken();
        res.status(200).json({ data, token });
      } catch (err) {
        res.status(400).json({ err: err });
      }
    });

    this.express.post("/login", async (req, res, next) => {
      this.logger.info("url:::::::" + req.url);
      try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await Model.findByCredentials(username, password);
        if (!user) {
          return res
            .status(401)
            .json({ error: "Login failed! Check authentication credentials" });
        }
        const token = await user.generateAuthToken();
        res.status(200).json({ user, token });
      } catch (err) {
        res.status(400).json({ err: err });
      }
    });

    this.express.post("/logout", auth, async (req, res, next) => {
      const username = req.body.username;
      this.logger.info("url::::::: logging out user " + username);
      const updated = await Model.findOneAndUpdate(
        { username },
        { tokens: [] },
        { new: true }
      );
      if (updated) {
        res.json(updated.tokens.length === 0);
      } else {
        res.status(400).json({ err: "Failed to logout" });
      }
    });

    this.express.get("/login/status", auth, (req, res, next) => {
      this.logger.info("url:::::::" + req.url);
      // Always return true if request passes auth middleware
      res.json(true);
    });
  }
}

export default new AuthAPI().express;
