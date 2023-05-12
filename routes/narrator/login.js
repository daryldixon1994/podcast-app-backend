const User = require("../../models/Narrator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Narrator = require("../../models/Narrator");
require("dotenv").config();

module.exports = async (req, res) => {
  try {
    const SECRET_KEY = process.env.SECRET_KEY;
    const { email, password } = req.body;
    const narrator = await Narrator.findOne({ email });
    if (!narrator) {
      return res.status(400).json({
        status: false,
        error: "Invalid email or password 🤕, please try again.",
      });
    }
    const verifyPass = await bcrypt.compare(password, narrator.password);
    if (!verifyPass) {
      return res.status(401).json({
        status: false,
        error: "Invalid email or password 🤕, please try again.",
      });
    }
    delete Narrator.password;
    const token = jwt.sign(
      {
        email: narrator.email,
        isBanned: narrator.isBanned,
        isNarrator: narrator.isNarrator,
        isVerified: narrator.isVerified,
        id: narrator._id,
      },
      SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      status: true,
      data: {
        isBanned: narrator.isBanned,
        isNarrator: narrator.isNarrator,
        isVerified: narrator.isVerified,
        id: narrator._id,
        token,
      },
    });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ error });
  }
};
