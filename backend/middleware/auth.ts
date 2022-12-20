import jwt = require("jsonwebtoken");
export default (req: any, res: any, next: Function) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, "secret");
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Authentication Failed",
    });
  }
};
