import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../logger/logger";
import { Film } from "../../common-types";
import auth from "../middleware/auth";
import { body, param, validationResult } from "express-validator";

const Model = require("../models/films");

class FilmAPI {
  public express: express.Application;
  public logger: Logger;

  public films: Film[];

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.films = [];
    this.logger = new Logger();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.get("/films", async (req, res, next) => {
      this.logger.info("GET:::::::" + req.url);
      try {
        const data = await Model.find();
        res.json(data);
        this.films = data;
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    this.express.post(
      "/films",
      body("placement").isInt({ min: 0 }),
      body(["title", "type", "date", "location"])
        .not()
        .isEmpty()
        .trim()
        .escape(),
      body(["src", "thumbnail"]).not().isEmpty().isURL().trim(),
      body("slug").isSlug().trim().escape(),
      body("description").isString().not().isEmpty().isLength({ max: 500 }),
      body(["client", "company", "framesUrl"]).trim().escape(),
      body("credits").isArray({ min: 1 }),
      body("credits.*.role").isString().not().isEmpty().trim().escape(),
      body("credits.*.name").isArray(),
      body("featured").isBoolean(),
      auth,
      async (req, res, next) => {
        this.logger.info("POST:::::::" + req.url);
        const data = new Model({ ...req.body });
        try {
          validationResult(req).throw();

          const dataToSave = await data.save();
          this.films.push(req.body);
          res.status(200).json(dataToSave);
        } catch (error) {
          res
            .status(400)
            .json({ message: error.message ? error.message : error.mapped() });
        }
      }
    );

    this.express.put(
      "/films/:id",
      param("id").not().isEmpty().trim().escape(),
      body("placement").isInt({ min: 0 }),
      body(["title", "type", "date", "location"])
        .not()
        .isEmpty()
        .trim()
        .escape(),
      body(["src", "thumbnail"]).not().isEmpty().isURL().trim(),
      body("slug").isSlug().trim().escape(),
      body("description").isString().not().isEmpty().isLength({ max: 500 }),
      body(["client", "company", "framesUrl"]).trim().escape(),
      body("credits").isArray({ min: 1 }),
      body("credits.*.role").isString().not().isEmpty().trim().escape(),
      body("credits.*.name").isArray(),
      body("featured").isBoolean(),
      auth,
      async (req, res, next) => {
        this.logger.info("PUT:::::::" + req.url);
        try {
          validationResult(req).throw();

          const id = req.params.id;
          const updatedData = req.body;
          const options = { new: true };

          const result = await Model.findByIdAndUpdate(
            id,
            updatedData,
            options
          );

          res.send(result);
        } catch (error) {
          res
            .status(400)
            .json({ message: error.message ? error.message : error.mapped() });
        }
      }
    );

    this.express.delete(
      "/films/:id",
      param("id").not().isEmpty().trim().escape(),
      auth,
      async (req, res, next) => {
        this.logger.info("DELETE:::::::" + req.url);
        try {
          validationResult(req).throw();

          const id = req.params.id;
          const data = await Model.findByIdAndDelete(id);
          res.send(`${data.title} has been deleted.`);
        } catch (error) {
          res
            .status(400)
            .json({ message: error.message ? error.message : error.mapped() });
        }
      }
    );
  }
}

export default new FilmAPI().express;
