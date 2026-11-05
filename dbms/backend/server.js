 const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digital-library', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes - require the existing route files in this folder
const bookRouter = require('./routes');
const memberRouter = require('./routesmem');
const transactionRouter = require('./routestranss');

app.use('/api/books', bookRouter);
app.use('/api/members', memberRouter);
app.use('/api/transactions', transactionRouter);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Digital Library Management System API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});