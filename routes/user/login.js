const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        error: "Invalid email or password 🤕, please try again.",
      });
    }
    const verifyPass = await bcrypt.compare(password, user.password);
    if (!verifyPass) {
      return res.status(401).json({
        status: false,
        error: "Invalid email or password 🤕, please try again.",
      });
    }
    delete User.password;
    const token = jwt.sign(
      {
        email: user.email,
        isBanned: user.isBanned,
        isVerified: user.isVerified,
        isUser: user.isUser,
        id: user._id,
      },
      SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      status: true,
      token,
      data: {
        id: user._id,
        isBanned: user.isBanned,
        isUser: user.isUser,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ error });
  }
};
