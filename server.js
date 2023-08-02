
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bp = require('body-parser');

const app = express();
app.use(cors());
app.use(bp.json());

const Book = require('./models/book');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => console.error('Connection error:', error));
db.once('open', () => console.log('Database connected'));


const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {

  res.send('Hello there!')

});

app.get('/books', async (req, res) => {
  const allBooks = await Book.find(req.query);
  res.status(200).json(allBooks);
});

// Adding new book
app.post('/books', async (req, res) => {
  const { title, author, description, status, coverImageUrl } = req.body;
  
  const newBook = new Book({
    title,
    author,
    description,
    status,
    coverImageUrl
  });

  try {
    const saveBook = await newBook.save();
    res.status(201).json(saveBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a specific book by id
app.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Cannot find book' })
    }

    res.json({ message: 'Deleted book' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
