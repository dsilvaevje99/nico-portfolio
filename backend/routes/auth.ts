import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../logger/logger";
import auth from "../middleware/auth";
import { body, validationResult } from "express-validator";

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
    this.express.post(
      "/user",
      auth,
      body("username")
        .not()
        .isEmpty()
        .isLength({ min: 3, max: 20 })
        .trim()
        .escape(),
      body("password")
        .not()
        .isEmpty()
        .isLength({ min: 7, max: 30 })
        .trim()
        .escape(),
      async (req, res, next) => {
        this.logger.info("url:::::::" + req.url);

        try {
          validationResult(req).throw();

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
        } catch (error) {
          res
            .status(400)
            .json({ message: error.message ? error.message : error.mapped() });
        }
      }
    );

    this.express.put(
      "/user",
      auth,
      body("username")
        .not()
        .isEmpty()
        .isLength({ min: 3, max: 20 })
        .trim()
        .escape(),
      body(["oldPassword", "newPassword"])
        .not()
        .isEmpty()
        .isLength({ min: 7, max: 30 })
        .trim()
        .escape(),
      async (req, res, next) => {
        this.logger.info("url:::::::" + req.url);

        try {
          validationResult(req).throw();

          const username = req.body.username;
          const oldPassword = req.body.oldPassword;
          const newPassword = req.body.newPassword;
          const user = await Model.findByCredentials(
            username,
            oldPassword
          ).catch(() => {
            throw new Error("Couldn't find user!");
          });
          const updated = await Model.findByIdAndUpdate(
            user._id,
            { password: newPassword },
            { new: true }
          );
          res.send({ old: oldPassword, new: updated.password });
        } catch (error) {
          res
            .status(400)
            .json({ message: error.message ? error.message : error.mapped() });
        }
      }
    );

    this.express.post(
      "/login",
      body("username")
        .not()
        .isEmpty()
        .isLength({ min: 3, max: 20 })
        .trim()
        .escape(),
      body("password")
        .not()
        .isEmpty()
        .isLength({ min: 7, max: 30 })
        .trim()
        .escape(),
      async (req, res, next) => {
        this.logger.info("url:::::::" + req.url);
        try {
          validationResult(req).throw();

          const username = req.body.username;
          const password = req.body.password;
          const user = await Model.findByCredentials(username, password);
          if (!user) {
            return res.status(401).json({
              error: "Login failed! Check authentication credentials",
            });
          }
          const token = await user.generateAuthToken();
          res.status(200).json({ user, token });
        } catch (error) {
          res
            .status(400)
            .json({ message: error.message ? error.message : error.mapped() });
        }
      }
    );

    this.express.post(
      "/logout",
      auth,
      body("username")
        .not()
        .isEmpty()
        .isLength({ min: 3, max: 20 })
        .trim()
        .escape(),
      async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
          res.status(400).json({ message: errors.mapped() });
        }

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
      }
    );

    this.express.get("/login/status", auth, (req, res, next) => {
      this.logger.info("url:::::::" + req.url);
      // Always return true if request passes auth middleware
      res.json(true);
    });
  }
}

export default new AuthAPI().express;
