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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
