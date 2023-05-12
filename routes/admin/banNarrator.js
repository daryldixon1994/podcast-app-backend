const Narrator = require("../../models/Narrator");
module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    const bannedNar = await Narrator.findByIdAndUpdate(
      id,
      {
        $set: { isBanned: true },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ status: true, message: "Narrator was banned", data: bannedNar });
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ status: false, error });
  }
};
