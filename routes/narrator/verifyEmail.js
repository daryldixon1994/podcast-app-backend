const User = require("../../models/Narrator");

module.exports = async (req, res) => {
  try {
    let { email } = req.query;
    let verifiedNarrator = await Narrator.findOneAndUpdate(
      { email },
      {
        $set: {
          isVerified: true,
        },
      },
      { new: true }
    );
    if (!verifiedNarrator) {
      return res.status(401).json({ status: false, message: "Wrong data" });
    }
    res.status(200).json({ status: true, message: "Your account is verified" });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
