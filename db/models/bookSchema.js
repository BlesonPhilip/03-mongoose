import { Schema, model } from "mongoose";

const bookSchema = Schema({ title: String, author: String, price: Number });

const Book = model("books", bookSchema);

export default Book;
