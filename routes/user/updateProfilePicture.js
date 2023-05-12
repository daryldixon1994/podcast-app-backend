const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    let { id } = req.auth;
    const newUserPic = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          userImg: `${req.protocol}://${req.get("host")}/uploads/${
            req.file.filename
          }`,
        },
      },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "photo has been updated successfully",
      data: newUserPic,
    });
  } catch (error) {
    if (error) throw error;
    res.status(402).json({ status: false, error });
  }
};
