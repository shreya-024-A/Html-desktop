 import React, { useState, useEffect } from 'react';
import { booksAPI } from '../services/api';

const BookForm = ({ editingBook, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    publicationYear: new Date().getFullYear(),
    category: '',
    totalCopies: 1,
    description: '',
    location: ''
  });

  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title,
        author: editingBook.author,
        isbn: editingBook.isbn,
        publisher: editingBook.publisher,
        publicationYear: editingBook.publicationYear,
        category: editingBook.category,
        totalCopies: editingBook.totalCopies,
        description: editingBook.description || '',
        location: editingBook.location || ''
      });
    }
  }, [editingBook]);

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
      if (editingBook) {
        await booksAPI.update(editingBook._id, formData);
      } else {
        await booksAPI.create(formData);
      }
      onClose();
      window.location.reload(); // Refresh to show updated data
    } catch (error) {
      console.error('Error saving book:', error);
      alert('Error saving book. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Author *</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>ISBN *</label>
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Publisher *</label>
        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Publication Year *</label>
        <input
          type="number"
          name="publicationYear"
          value={formData.publicationYear}
          onChange={handleChange}
          min="1000"
          max={new Date().getFullYear()}
          required
        />
      </div>

      <div className="form-group">
        <label>Category *</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Total Copies *</label>
        <input
          type="number"
          name="totalCopies"
          value={formData.totalCopies}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {editingBook ? 'Update Book' : 'Add Book'}
        </button>
      </div>
    </form>
  );
};

export default BookForm;