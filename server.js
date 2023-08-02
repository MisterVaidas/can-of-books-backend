
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bp = require('body-parser');
const Book = require('./models/book');

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

app.post('/books', async (req, res) => {
  const newBook = new Book(req.body);

  try {
    const saveBook = await newBook.save();
    res.status(201).json(saveBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));
