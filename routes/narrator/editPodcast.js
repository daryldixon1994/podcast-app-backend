const Podcast = require("../../models/Podcast");
const cloudinary = require("../../middlewares/cloudinary");
const fs = require("fs");
module.exports = async (req, res) => {
  try {
    const { id } = req.auth;
    const { podcastId } = req.params;
    const { title, desc, date, episodeNumber, category, tags } = req.body;
    // const uploader = async (path) => await cloudinary.uploads(path, "uploads");
    if (req.file) {
      // const { path } = req.file;
      // const { url } = await uploader(path);
      // fs.unlinkSync(path);
      const newPodcast = await Podcast.findOneAndUpdate(
        {
          narrator: id,
          _id: podcastId,
        },
        {
          $set: {
            title,
            desc,
            date,
            episodeNumber,
            category,
            tags,
            podcastImage: `${req.protocol}://${req.get("host")}/uploads/${
              req.file.filename
            }`,
          },
        },
        { new: true }
      );
      return res.status(200).json({
        status: true,
        message: "Your podcast has been updated successfully",
        data: newPodcast,
      });
    } else {
      const newPodcast = await Podcast.findOneAndUpdate(
        {
          narrator: id,
          _id: podcastId,
        },
        {
          $set: {
            ...req.body,
          },
        },
        { new: true }
      );
      return res.status(200).json({
        status: true,
        message: "your podcast has been updated successfully",
        data: newPodcast,
      });
    }
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ error });
  }
};
