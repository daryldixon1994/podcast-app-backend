const Podcast = require("../../models/Podcast");

module.exports = async (req, res) => {
  try {
    let { podcastId } = req.params;
    await Podcast.findOneAndRemove({ _id: podcastId });
    res.status(200).json({
      status: true,
      message: "podcast has been deleted successfully",
    });
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ status: false, error });
  }
};
