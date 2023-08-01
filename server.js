
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bp = require('body-parser');

const app = express();
app.use(cors());
app.use(bp.json());

const Book = require('./models/book');
mongoose.connect(process.env.DATABASE_URL);

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {

  res.send('Hello there!')

});

app.get('/books', async (req, res) => {
  const allBooks = await Book.find(req.query);
  res.status(200).json(allBooks);
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
