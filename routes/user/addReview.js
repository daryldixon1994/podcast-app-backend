const Review = require("../../models/Review");

module.exports = async (req, res) => {
  try {
    let { review } = req.body;
    let { podcastId } = req.params;
    let { id } = req.auth;
    const newReview = await new Review({
      review,
      user: id,
      podcast: podcastId,
    });
    const savedReview = await newReview.save();
    res.status(200).json({
      status: true,
      message: "your review has been added successfully",
      data: savedReview,
    });
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ status: true, error });
  }
};
