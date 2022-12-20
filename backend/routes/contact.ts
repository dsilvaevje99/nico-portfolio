import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../logger/logger";
import { Inquiry } from "../../common-types";
import auth from "../middleware/auth";

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

    this.express.post("/inquiries", async (req, res, next) => {
      this.logger.info("POST:::::::" + req.url);
      const data = new Model({ ...req.body });
      try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });

    this.express.put("/inquiries/:id", auth, async (req, res, next) => {
      this.logger.info("PUT:::::::" + req.url);
      try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(id, updatedData, options);

        res.send(result);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });

    this.express.delete("/inquiries/:id", auth, async (req, res, next) => {
      this.logger.info("DELETE:::::::" + req.url);
      try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Message from ${data.name} has been deleted.`);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
  }
}

export default new InquiryAPI().express;
