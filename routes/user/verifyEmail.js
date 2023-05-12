const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    let { email } = req.query;
    let verifiedUser = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          isVerified: true,
        },
      },
      { new: true }
    );
    if (!verifiedUser) {
      return res.status(401).json({ status: false, message: "Wrong data" });
    }
    res.status(200).json({ status: true, message: "Your account is verified" });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
