 import React, { useState, useEffect } from 'react';
import { transactionsAPI, booksAPI, membersAPI } from '../services/api';

const TransactionForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    bookId: '',
    memberId: '',
    dueDate: ''
  });
  
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchMembers();
  }, []);

  useEffect(() => {
    // Filter available books
    const available = books.filter(book => book.availableCopies > 0);
    setAvailableBooks(available);
  }, [books]);

  const fetchBooks = async () => {
    try {
      const response = await booksAPI.getAll();
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await membersAPI.getAll();
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await transactionsAPI.issueBook(formData);
      onClose();
      window.location.reload(); // Refresh to show updated data
    } catch (error) {
      console.error('Error issuing book:', error);
      alert('Error issuing book. Please try again.');
    }
  };

  // Calculate minimum due date (tomorrow)
  const minDueDate = new Date();
  minDueDate.setDate(minDueDate.getDate() + 1);
  const minDueDateString = minDueDate.toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Book *</label>
        <select
          name="bookId"
          value={formData.bookId}
          onChange={handleChange}
          required
        >
          <option value="">Select a book</option>
          {availableBooks.map(book => (
            <option key={book._id} value={book._id}>
              {book.title} by {book.author} (Available: {book.availableCopies})
            </option>
          ))}
        </select>
        {availableBooks.length === 0 && (
          <p style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '5px' }}>
            No books available for issuing.
          </p>
        )}
      </div>

      <div className="form-group">
        <label>Member *</label>
        <select
          name="memberId"
          value={formData.memberId}
          onChange={handleChange}
          required
        >
          <option value="">Select a member</option>
          {members.map(member => (
            <option key={member._id} value={member._id}>
              {member.name} ({member.membershipId})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Due Date *</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          min={minDueDateString}
          required
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn" onClick={onClose}>
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={availableBooks.length === 0}
        >
          Issue Book
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;