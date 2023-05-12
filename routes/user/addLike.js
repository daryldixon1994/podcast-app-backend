const Podcast = require("../../models/Podcast");

module.exports = async (req, res) => {
  try {
    let { podcastId } = req.params;
    console.log("podcastId", podcastId);
    let { id } = req.auth;

    let alreradyLiked = await Podcast.findOne({
      _id: podcastId,
      likes: "645bcd631637a46b3ae883e2",
    });
    console.log("alreradyLiked", alreradyLiked);
    if (!alreradyLiked) {
      res.status(200).json({
        status: true,
        message: "Like has already been added",
      });
    }
    const likedPodcast = await Podcast.findByIdAndUpdate(
      podcastId,
      {
        $push: {
          likes: id,
        },
      },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Your like has been added successfully",
    });
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ status: true, error });
  }
};
