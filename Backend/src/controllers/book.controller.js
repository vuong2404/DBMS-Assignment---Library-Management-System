const BookModel = require("../models/book.model");
const db = require("../loaders/db");
// let bookModel = new BookModel();

exports.getAllBook = async (req, res, next) => {
  const query = "SELECT * FROM Sach";
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
};

exports.getBookDetails = (req, res) => {
  const MaSoSach = "S001";
  const query = "SELECT * FROM Sach WHERE MaSoSach = ?";
  const params = [MaSoSach];

  db.query(query, params, (error, results) => {
    if (error) throw error;
    res.json(results[0]);
  });
};

exports.filterBooks = (req, res) => {
  const selectedCategories = req.query.categories.split(","); // Split categories if they are sent as a comma-separated string
  console.log("selectedCategories", selectedCategories);

  // Generate a placeholder string for each category in the list
  const placeholders = selectedCategories.map(() => "?").join(",");

  // SQL query with IN clause and parameters
  const query = `SELECT * FROM Sach JOIN DanhMuc ON Sach.DanhMuc = DanhMuc.MaSoDanhMuc WHERE DanhMuc.ten IN (${placeholders})`;
  const params = selectedCategories;
  console.log(params);

  db.query(query, params, (error, results) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An internal server error occurred" });
    } else {
      res.json(results);
    }
  });
};

exports.createNewBook = async (req, res, next) => {
  const { title, price, author } = req.body;
  const result = await bookModel.create({ title, price, author });
  res.status(200).send({
    result,
  });
};

exports.createNewBook = async (req, res, next) => {
  const { title, price, author } = req.body;
  const result = await bookModel.create({ title, price, author });
  res.status(200).send({
    result,
  });
};
exports.updateBook = async (req, res, next) => {
  const { id } = req.params;
  const { title, price, author } = req.body;
  try {
    const result = await bookModel.update(id, { title, price, author });
    res.status(200).send({ result });
  } catch (error) {
    console.error("Error in updateBook:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

exports.deleteBook = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await bookModel.delete(id);
    res.status(200).send({ result });
  } catch (error) {
    console.error("Error in deleteBook:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};
