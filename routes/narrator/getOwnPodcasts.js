const Podcast = require("../../models/Podcast");

module.exports = async (req, res) => {
  try {
    let { id } = req.auth;
    const podcasts = await Podcast.find({narrator : id });
    res.status(200).json({
      status: true,
      data: podcasts,
    });
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ status: false, error });
  }
};
