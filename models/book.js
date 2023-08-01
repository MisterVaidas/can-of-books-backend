const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema(
    {
        title: String,
        author: String,
        description: String,
        status: Array,
        coverImageUrl: String,
    }
);

const Book = mongoose.model('Book', bookSchema)

module.exports = Book;