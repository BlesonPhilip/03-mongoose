import express from "express";
import db from "./db/index.js";
import cors from "cors";
import Book from "./db/models/bookSchema.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/book", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
app.post("/book", async (req, res) => {
  try {
    const { body } = req;
    const book = await Book.create(body);
    return res.status(201).json(book);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.get("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
});

app.delete("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
