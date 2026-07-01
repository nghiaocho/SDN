const express = require("express");
const router = express.Router();
const {
  getFavouriteCountByBookId,
  getFavouritesByUser,
} = require("../controller/favourites.controller");
const { verifyToken } = require("../middleware/auth");

router.get("/count/:bookId", getFavouriteCountByBookId);
router.get("/my-favourites", verifyToken, getFavouritesByUser);

module.exports = router;
