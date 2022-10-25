import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../logger/logger";
import { Film } from "../../common-types";

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
    this.express.get("/films", (req, res, next) => {
      this.logger.info("url:::::::" + req.url);
      res.json(this.films);
    });

    this.express.get("/film/:slug", (req, res, next) => {
      this.logger.info("url:::::::" + req.url);
      const film = this.films.find(
        (film: Film) => req.params.slug === film.slug
      );
      res.json(film);
    });

    this.express.post("/films", (req, res, next) => {
      this.logger.info("url:::::::" + req.url);
      this.films.push(req.body.film);
      res.json(this.films);
    });
  }
}

export default new FilmAPI().express;
