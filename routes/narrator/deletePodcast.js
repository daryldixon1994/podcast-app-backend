const Podcast = require("../../models/Podcast");

module.exports = async (req, res) => {
  try {
    let { id } = req.auth;
    let { podcastId } = req.params;
    await Podcast.findOneAndRemove({ _id: podcastId, narrator: id });
    res.status(200).json({
      status: true,
      message: "Your podcast has been deleted successfully",
    });
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ status: false, error });
  }
};
