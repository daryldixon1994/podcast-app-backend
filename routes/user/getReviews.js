const Review = require("../../models/Review");
module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    const reviews = await Review.find({ podcast: id }).populate(
      "user",
      "userName userImg"
    );

    res.status(200).json({
      status: true,
      data: reviews,
    });
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ status: false, error });
  }
};
