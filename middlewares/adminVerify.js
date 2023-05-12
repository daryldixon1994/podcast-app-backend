const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
module.exports = async (req, res, next) => {
  try {
    let token = req.header("jwt");
    if (!token) {
      res
        .status(401)
        .json({ status: false, message: "Beware , you are unauthorized" });
    }
    let verifiedToken = jwt.verify(token, SECRET_KEY);
    if (!verifiedToken.isAdmin) {
      return res.status(401).json({
        status: false,
        message: "You are not allowed to do this action",
      });
    }
    req.admin = verifiedToken;
    next();
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ error });
  }
};
