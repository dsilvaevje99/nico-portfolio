import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../logger/logger";
import { Film } from "../../common-types";
import auth from "../middleware/auth";

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

    this.express.post("/films", auth, async (req, res, next) => {
      this.logger.info("POST:::::::" + req.url);
      console.log(req.body);
      const data = new Model({ ...req.body });
      try {
        const dataToSave = await data.save();
        this.films.push(req.body);
        res.status(200).json(dataToSave);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });

    this.express.put("/films/:id", auth, async (req, res, next) => {
      this.logger.info("PUT:::::::" + req.url);
      console.log(req.body);
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
  }
}

export default new FilmAPI().express;
