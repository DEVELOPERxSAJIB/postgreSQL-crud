const express = require("express");
const colors = require("colors");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const pool = require("./config/db");

// init app
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init port
const PORT = process.env.PORT || 3000;

// init routes

// Get all books
app.get("/books", async (req, res) => {
  try {

    const getAllBooks = await pool.query("SELECT * FROM book") 

    res.status(200).json({
      message: "All books successfully fetched",
      data: getAllBooks.rows,
    });

  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

// get single book
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const singleBook = await pool.query("SELECT * FROM book WHERE id=$1", [id])

    res.status(200).json({
      message: `${id} book successfully fetched`,
      data : singleBook.rows,
    });
  } catch (error) {
    res.send("error", error.message);
  }
});

// create a book
app.post("/create-book", async (req, res) => {
  try {
    const id = uuidv4();
    const { name, description } = req.body;

    // creating a new book
    const newBook = await pool.query(
      "INSERT INTO book (id, name, description) VALUES ($1, $2, $3) RETURNING *",
      [id, name, description]
    );

    res.status(200).json({
      message: `book successfully created`,
      data: newBook.rows,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

// delete a book
app.delete("/delete-book/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const findById = await pool.query("SELECT * FROM book WHERE id=$1", [id])

    if(findById.rows[0].id === id) {
      await pool.query("DELETE FROM book WHERE id=$1", [id])
    }


    res.status(200).json({
      message: `book successfully deleted with this id ${id}`,
      data : findById.rows,
    });
  } catch (error) {
    res.send("error", error.message);
  }
});

// update a book
app.put("/update-book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedBook = await pool.query("UPDATE book SET name=$1, description=$2 WHERE id=$3 RETURNING *", [name, description, id])

    res.status(200).json({
      message: `book successfully updated with this id: ${id}`,
      data: updatedBook.rows,
    });
  } catch (error) {
    res.send("error", error.message);
  }
});

// listen server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.cyan.bgBlue);
});
