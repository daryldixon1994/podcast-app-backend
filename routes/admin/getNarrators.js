const Narrator = require("../../models/Narrator");

module.exports = async (req, res) => {
  try {
    const narrators = await Narrator.find().select({
      password: 0,
      email: 0,
      bio: 0,
    });

    res.status(200).json({
      status: true,
      data: narrators,
    });
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ status: false, error });
  }
};
