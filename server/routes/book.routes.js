const express = require("express");
const {
  handleBookStoreController,
  handleBookListController,
} = require("../controller/book.controller");

const router = express.Router();

router.post("/addbook", handleBookStoreController);
router.get("/bookLists", handleBookListController);

module.exports = router;
