const express = require("express");
const router = express.Router();
const {
  getFavouriteCountByBookId,
} = require("../controller/favourites.controller");

router.get("/count/:bookId", getFavouriteCountByBookId);
