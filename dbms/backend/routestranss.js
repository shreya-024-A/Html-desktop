 const router = require('express').Router();
let Transaction = require('../models/Transaction');
let Book = require('../models/Book');

// Get all transactions
router.route('/').get((req, res) => {
  Transaction.find()
    .populate('book')
    .populate('member')
    .then(transactions => res.json(transactions))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get transactions for a specific member
router.route('/member/:memberId').get((req, res) => {
  Transaction.find({ member: req.params.memberId })
    .populate('book')
    .populate('member')
    .then(transactions => res.json(transactions))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Issue a book
router.route('/issue').post(async (req, res) => {
  try {
    const { bookId, memberId, dueDate } = req.body;
    
    // Check if book is available
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json('Book not found');
    }
    
    if (book.availableCopies < 1) {
      return res.status(400).json('No copies available');
    }
    
    // Create transaction
    const newTransaction = new Transaction({
      book: bookId,
      member: memberId,
      dueDate: new Date(dueDate)
    });
    
    // Update book available copies
    book.availableCopies -= 1;
    
    await newTransaction.save();
    await book.save();
    
    res.json('Book issued successfully');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Return a book
router.route('/return/:id').post(async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json('Transaction not found');
    }
    
    // Update transaction
    transaction.returnDate = new Date();
    transaction.status = 'Returned';
    
    // Update book available copies
    const book = await Book.findById(transaction.book);
    book.availableCopies += 1;
    
    await transaction.save();
    await book.save();
    
    res.json('Book returned successfully');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;