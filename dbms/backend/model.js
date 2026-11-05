 const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  publisher: {
    type: String,
    required: true
  },
  publicationYear: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  totalCopies: {
    type: Number,
    required: true,
    default: 1
  },
  availableCopies: {
    type: Number,
    required: true,
    default: 1
  },
  description: {
    type: String
  },
  location: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', BookSchema);