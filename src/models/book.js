const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Title is required'],
    maxlength: [100, 'Title cannot be more than 100 characters long']
  },
  author: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Author is required'],
  },
  summary: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Summary is required'],
    minlength: [200, 'Summary cannot be less than 100 characters long'],
    maxlength: [500, 'Summary cannot be more than 500 characters long']
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;