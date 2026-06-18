const express = require("express");
const router = express.Router();

const { getAllCategories } = require("../controller/category.controller");

router.get("/", getAllCategories);

module.exports = router;
