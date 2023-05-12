const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = async (req, res, next) => {
  try {
    let id = req.header("id");
    let token = req.header("jwt");
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "Beware , you are unauthorized" });
    }
    let verifiedToken = jwt.verify(token, SECRET_KEY);
    if (!verifiedToken.isNarrator) {
      return res
        .status(401)
        .json({ status: false, message: "Token error: Access denied" });
    }
    if (verifiedToken.id !== id) {
      return res
        .status(401)
        .json({ status: false, message: "Token error: Access denied" });
    }
    req.auth = verifiedToken;
    next();
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ error });
  }
};
