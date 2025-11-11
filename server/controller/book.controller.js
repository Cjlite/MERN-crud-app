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

const handleBookDeleteController = async (req, res) => {
  const body = req.body;
  try {
    const deleted = await Book.deleteOne({ _id: body.Id });
    console.log("deleted", deleted);
    if (deleted.acknowledged) {
      return res.json({
        message: "Book deleted successfully!",
        Success: true,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message, Success: false });
  }
};

const handleBookUpdateController = async (req, res) => {
  const body = req.body;
  try {
    const updating = await Book.updateOne({ _id: body?._id }, { $set: body });
    console.log("updating", updating);

    if (updating?.acknowledged) {
      return res.json({
        message: "Book updated successfully!",
        Success: true,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message, Success: false });
  }
};

module.exports = {
  handleBookStoreController,
  handleBookListController,
  handleBookDeleteController,
  handleBookUpdateController,
};
