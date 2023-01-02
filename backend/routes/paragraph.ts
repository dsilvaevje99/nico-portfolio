import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../logger/logger";
import auth from "../middleware/auth";
import { body, validationResult } from "express-validator";
import { Paragraph } from "../../common-types";

const Model = require("../models/paragraphs");

class ParagraphAPI {
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
    this.express.get("/paragraphs", async (req, res, next) => {
      this.logger.info("GET:::::::" + req.url);
      try {
        const data = await Model.find();
        res.json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    this.express.put(
      "/paragraphs",
      auth,
      body(["paragraphs.*._id", "paragraphs.*.name"])
        .not()
        .isEmpty()
        .trim()
        .escape(),
      body("paragraphs.*.body")
        .isString()
        .isLength({ min: 200 })
        .trim()
        .escape(),
      async (req, res, next) => {
        this.logger.info("PUT:::::::" + req.url);
        try {
          validationResult(req).throw();

          let updated: Paragraph[] = [];
          req.body.paragraphs.forEach(
            async ({ _id, ...updatedData }: Paragraph) => {
              const result = await Model.findByIdAndUpdate(_id, updatedData, {
                new: true,
              });
              if (result) updated.push(result);
            }
          );

          res.send(updated);
        } catch (error) {
          res
            .status(400)
            .json({ message: error.message ? error.message : error.mapped() });
        }
      }
    );
  }
}

export default new ParagraphAPI().express;
