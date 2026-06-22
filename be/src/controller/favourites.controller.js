const Favourite = require("../model/favourite.model");

const getFavouriteCountByBookId = async (req, res) => {
  try {
    const { bookId } = req.params;

    const totalLikes = await Favourite.countDocuments({
      book_id: bookId,
    });

    res.status(200).json({
      success: true,
      bookId,
      totalLikes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getFavouriteCountByBookId,
};
