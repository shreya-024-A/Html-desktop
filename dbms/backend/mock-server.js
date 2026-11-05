const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Sample in-memory data
const books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884' },
  { id: 2, title: 'You Don\'t Know JS', author: 'Kyle Simpson', isbn: '9781491904244' }
];

const members = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const transactions = [
  { id: 1, bookId: 1, memberId: 1, date: '2025-10-01' }
];

app.get('/api/books', (req, res) => res.json(books));
app.get('/api/books/:id', (req, res) => {
  const b = books.find(x => x.id === Number(req.params.id));
  if (!b) return res.status(404).json({ error: 'Not found' });
  res.json(b);
});

app.get('/api/members', (req, res) => res.json(members));
app.get('/api/transactions', (req, res) => res.json(transactions));

app.post('/api/books/add', (req, res) => {
  const id = books.length ? books[books.length - 1].id + 1 : 1;
  const book = { id, ...req.body };
  books.push(book);
  res.json({ message: 'Book added', book });
});

app.listen(PORT, () => console.log(`Mock backend running on http://localhost:${PORT}`));
