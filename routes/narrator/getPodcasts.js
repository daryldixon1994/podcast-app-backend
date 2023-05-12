const Podcast = require("../../models/Podcast");

module.exports = async (req, res) => {
  try {
    const podcasts = await Podcast.find().populate(
      "narrator",
      "narratorName narratorImg"
    );
    res.status(200).json({
      status: true,
      data: podcasts,
    });
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ status: false, error });
  }
};
