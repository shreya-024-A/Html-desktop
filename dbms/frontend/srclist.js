 import React, { useState, useEffect } from 'react';
import { booksAPI } from '../services/api';

const BookList = ({ onEdit }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await booksAPI.getAll();
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await booksAPI.delete(id);
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Error deleting book. Please try again.');
      }
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Category</th>
            <th>Total Copies</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.category}</td>
              <td>{book.totalCopies}</td>
              <td>{book.availableCopies}</td>
              <td>
                <button 
                  className="btn btn-primary"
                  style={{ marginRight: '5px', padding: '5px 10px' }}
                  onClick={() => onEdit(book)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger"
                  style={{ padding: '5px 10px' }}
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {books.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No books found. Add some books to get started.</p>
        </div>
      )}
    </div>
  );
};

export default BookList;