const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getAvailableQuantityByBookId,
} = require("../controller/book.controller");
const { verifyToken } = require("../middleware/auth");

router.get("/available/:id", getAvailableQuantityByBookId);
router.get("/", getAllBooks);
router.get("/:id", verifyToken, getBookById);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
