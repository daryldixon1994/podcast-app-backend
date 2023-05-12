const User = require("../../models/User");
module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    const bannedUsr = await User.findByIdAndUpdate(
      id,
      {
        $set: { isBanned: true },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ status: true, message: "User was banned", data: bannedUsr });
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ status: false, error });
  }
};
