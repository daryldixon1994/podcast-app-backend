const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
  try {
    const SECRET_KEY = process.env.SECRET_KEY;
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        status: false,
        error: "Invalid email or password, please try again",
      });
    }
    const verifyPass = await bcrypt.compare(password, admin.password);
    if (!verifyPass) {
      return res.status(401).json({
        status: false,
        error: "Invalid email or password, Please try again",
      });
    }
    delete admin.password;
    const token = jwt.sign(
      {
        email: admin.email,
        isBanned: admin.isBanned,
        isAdmin: admin.isAdmin,
        isVerified: admin.isVerified,
        id: admin._id,
      },
      SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      status: true,
      data: {
        isBanned: admin.isBanned,
        isAdmin: admin.isAdmin,
        isVerified: admin.isVerified,
        id: admin._id,
        token,
      },
    });
  } catch (error) {
    if (error) throw error;
    res.status(400).json({ error });
  }
};
