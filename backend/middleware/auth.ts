import { Logger } from "../logger/logger";
import jwt = require("jsonwebtoken");
export default (req: any, res: any, next: Function) => {
  const logger = new Logger();
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    logger.info(`Authing with token ${token}`);
    const decoded = jwt.verify(token, "secret");
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Authentification Failed",
    });
  }
};
