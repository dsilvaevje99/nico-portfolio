import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../logger/logger";
import { Inquiry } from "../../common-types";

class InquiryAPI {
  public express: express.Application;
  public logger: Logger;

  public inquiries: Inquiry[];

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.inquiries = [];
    this.logger = new Logger();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.get("/inquiries", (req, res, next) => {
      this.logger.info("url:::::::" + req.url);
      res.json(this.inquiries);
    });

    this.express.post("/inquiries", (req, res, next) => {
      this.logger.info("url:::::::" + req.url);
      this.inquiries.push(req.body.inquiry);
      res.json(this.inquiries);
    });
  }
}

export default new InquiryAPI().express;
