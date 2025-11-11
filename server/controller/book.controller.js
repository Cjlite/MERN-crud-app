const { Book } = require("../modal/book.modal");

const handleBookStoreController = async (req, res) => {
  try {
    const body = req.body;
    if (
      !body.BookName ||
      !body.BookTitle ||
      !body.Author ||
      !body.SellingPrice ||
      !body.PublishDate
    ) {
      return res
        .status(400)
        .json({ Message: "All fields are requires", Success: false });
    }

    const bookAdd = await Book.insertOne(body);

    if (bookAdd) {
      return res.status(201).json({
        message: "Data created successfully !",
        Success: true,
        Id: bookAdd?._id,
      });
    }

    console.log("bookAdd", bookAdd);
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
};

const handleBookListController = async (req, res) => {
  try {
    const bookList = await Book.find({});
    return res.status(200).json({
      Message: "All books fetch successfully",
      Success: true,
      TotalCount: bookList.length,
      BookList: bookList,
    });
  } catch (error) {}
};

module.exports = { handleBookStoreController, handleBookListController };
