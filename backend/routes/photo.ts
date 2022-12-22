import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../logger/logger";
import auth from "../middleware/auth";
import { body, param, validationResult } from "express-validator";
import { sanitizeUrl } from "../helpers/UrlSanitizer";
import axios from "axios";

const Model = require("../models/photos");

class PhotoAPI {
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
    this.express.get("/photos", async (req, res, next) => {
      this.logger.info("GET:::::::" + req.url);
      try {
        const data = await Model.find();
        res.json(data[0]);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    this.express.get(
      "/photos/imgur/:hash",
      param("hash").not().isEmpty().isString().isLength({ min: 4, max: 10 }),
      async (req, res, next) => {
        this.logger.info("GET:::::::" + req.url);
        try {
          validationResult(req).throw();

          const hash = req.params.hash;

          const data = await axios.get(
            `https://api.imgur.com/3/album/${hash}/images`,
            {
              headers: {
                Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
              },
            }
          );
          res.status(200).json(data.data.data);
        } catch (error) {
          console.log(error);
          res.status(error.status).json({ message: error.message });
        }
      }
    );

    this.express.put(
      "/photos",
      body(["_id", "photoPageAlbum", "carouselAlbum"])
        .not()
        .isEmpty()
        .isString()
        .trim()
        .escape(),
      body(["processOne", "processTwo", "processThree"])
        .not()
        .isEmpty()
        .isURL()
        .trim()
        .customSanitizer((url) => sanitizeUrl(url)),
      auth,
      async (req, res, next) => {
        this.logger.info("POST:::::::" + req.url);
        try {
          validationResult(req).throw();

          const { _id, ...updatedData } = req.body;

          const result = await Model.findByIdAndUpdate(_id, updatedData, {
            new: true,
          });

          res.send(result);
        } catch (error) {
          res
            .status(400)
            .json({ message: error.message ? error.message : error.mapped() });
        }
      }
    );
  }
}

export default new PhotoAPI().express;
