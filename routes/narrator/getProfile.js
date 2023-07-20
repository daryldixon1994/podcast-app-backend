const Narrator = require("../../models/Narrator");

module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    let narrator = await Narrator.findById(id);
    if (!narrator) {
      return res.status(401).json({ status: false, message: "Wrong data" });
    }
    res.status(200).json({ status: true, data: narrator });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
