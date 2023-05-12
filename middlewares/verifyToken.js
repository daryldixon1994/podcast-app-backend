const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = async (req, res, next) => {
  try {
    let token = req.header("jwt");
    let id = req.header("id");
    if (!token) {
      res
        .status(401)
        .json({ status: false, message: "Beware , you are unauthorized" });
    }
    let verifiedToken = jwt.verify(token, SECRET_KEY);
    if (verifiedToken.id !== id) {
      return res.status(401).json({ status: false, message: "Access denied" });
    }
    req.auth = verifiedToken;
    next();
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ error });
  }
};
