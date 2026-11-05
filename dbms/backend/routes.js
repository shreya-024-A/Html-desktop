const router = require('express').Router();
let Book = require('./model');

// Get all books
router.route('/').get((req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get a specific book
router.route('/:id').get((req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new book
router.route('/add').post((req, res) => {
  const { title, author, isbn, publisher, publicationYear, category, totalCopies, description, location } = req.body;
  
  const availableCopies = totalCopies;

  const newBook = new Book({
    title,
    author,
    isbn,
    publisher,
    publicationYear,
    category,
    totalCopies,
    availableCopies,
    description,
    location
  });

  newBook.save()
    .then(() => res.json('Book added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update a book
router.route('/update/:id').post((req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      book.title = req.body.title;
      book.author = req.body.author;
      book.isbn = req.body.isbn;
      book.publisher = req.body.publisher;
      book.publicationYear = req.body.publicationYear;
      book.category = req.body.category;
      book.totalCopies = req.body.totalCopies;
      book.description = req.body.description;
      book.location = req.body.location;

      book.save()
        .then(() => res.json('Book updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a book
router.route('/:id').delete((req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => res.json('Book deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;