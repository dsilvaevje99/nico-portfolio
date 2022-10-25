import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../logger/logger";
import { Photo } from "../../common-types";

class PhotoAPI {
  public express: express.Application;
  public logger: Logger;

  public photos: Photo[];

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.photos = [];
    this.logger = new Logger();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.get("/photos", (req, res, next) => {
      this.logger.info("url:::::::" + req.url);
      res.json(this.photos);
    });

    this.express.post("/photos", (req, res, next) => {
      this.logger.info("url:::::::" + req.url);
      this.photos.push(req.body.photo);
      res.json(this.photos);
    });
  }
}

export default new PhotoAPI().express;
