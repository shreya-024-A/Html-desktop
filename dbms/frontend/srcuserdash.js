 import React, { useState, useEffect } from 'react';
import { booksAPI } from '../services/api';

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const filtered = books.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  const fetchBooks = async () => {
    try {
      const response = await booksAPI.getAll();
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Library Catalog</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search books by title, author, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px',
              width: '300px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
      </div>

      <div className="books-grid">
        {filteredBooks.map(book => (
          <div key={book._id} className="book-card">
            <h3>{book.title}</h3>
            <p className="author">by {book.author}</p>
            <div className="details">
              <div><strong>ISBN:</strong> {book.isbn}</div>
              <div><strong>Publisher:</strong> {book.publisher}</div>
              <div><strong>Year:</strong> {book.publicationYear}</div>
              <div><strong>Category:</strong> {book.category}</div>
              <div><strong>Available Copies:</strong> {book.availableCopies}</div>
              {book.location && <div><strong>Location:</strong> {book.location}</div>}
            </div>
            <span className={`status ${book.availableCopies > 0 ? 'status-available' : 'status-unavailable'}`}>
              {book.availableCopies > 0 ? 'Available' : 'Not Available'}
            </span>
            {book.description && (
              <div style={{ marginTop: '1rem' }}>
                <p><strong>Description:</strong></p>
                <p>{book.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No books found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;