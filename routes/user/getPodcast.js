const Podcast = require("../../models/Podcast");
const Narrator = require("../../models/Podcast");

module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    const podcast = await Podcast.findById(id).populate(
      "narrator",
      "narratorName narratorImg"
    );

    res.status(200).json({
      status: true,
      data: podcast,
    });
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ status: false, error });
  }
};
