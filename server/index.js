const express = require("express");
const cors = require("cors");
const databaseConnection = require("./database");
const bookRouter = require("./routes/book.routes");

const port = 8000;
databaseConnection();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello word!");
});
app.use("/book", bookRouter);

app.listen(port, () => {
  console.log(`Port listing on ${port}`);
});
