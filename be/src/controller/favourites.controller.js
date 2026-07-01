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

const getFavouritesByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const favourites = await Favourite.find({ user_id: userId })
      .populate({
        path: "book_id",
        populate: {
          path: "author_id category_id publisher_id",
        },
      });
      
    res.status(200).json({
      success: true,
      favourites,
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
  getFavouritesByUser,
};
