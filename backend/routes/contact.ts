import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../logger/logger";
import { Inquiry } from "../../common-types";
import auth from "../middleware/auth";
import { body, param, validationResult } from "express-validator";

const Model = require("../models/inquiries");

class InquiryAPI {
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
    this.express.get("/inquiries", auth, async (req, res, next) => {
      this.logger.info("GET:::::::" + req.url);
      try {
        const data = await Model.find();
        res.json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    this.express.post(
      "/inquiries",
      body("name").not().isEmpty().isLength({ min: 2 }).trim().escape(),
      body("email").isEmail().normalizeEmail(),
      body("company").trim().escape(),
      body("body").isString().isLength({ min: 10, max: 300 }).trim().escape(),
      body("date").not().isEmpty().isString().trim().escape(),
      body("opened").isBoolean(),
      async (req, res, next) => {
        this.logger.info("POST:::::::" + req.url);
        const data = new Model({ ...req.body });
        try {
          validationResult(req).throw();

          const dataToSave = await data.save();
          res.status(200).json(dataToSave);
        } catch (error) {
          res
            .status(400)
            .json({ message: error.message ? error.message : error.mapped() });
        }
      }
    );

    this.express.put(
      "/inquiries/:id",
      param("id").not().isEmpty().trim().escape(),
      body("name").not().isEmpty().isLength({ min: 2 }).trim().escape(),
      body("email").isEmail().normalizeEmail(),
      body("company").trim().escape(),
      body("body").not().isEmpty().isLength({ min: 10 }).trim().escape(),
      body("date").not().isEmpty().isDate().trim().escape(),
      body("opened").isBoolean(),
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
      "/inquiries/:id",
      param("id").not().isEmpty().trim().escape(),
      auth,
      async (req, res, next) => {
        this.logger.info("DELETE:::::::" + req.url);
        try {
          validationResult(req).throw();

          const id = req.params.id;
          const data = await Model.findByIdAndDelete(id);
          res.send(`Message from ${data.name} has been deleted.`);
        } catch (error) {
          res
            .status(400)
            .json({ message: error.message ? error.message : error.mapped() });
        }
      }
    );
  }
}

export default new InquiryAPI().express;
