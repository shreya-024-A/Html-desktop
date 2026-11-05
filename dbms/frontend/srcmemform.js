 import React, { useState, useEffect } from 'react';
import { membersAPI } from '../services/api';

const MemberForm = ({ editingMember, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    membershipId: '',
    membershipType: 'General',
    status: 'Active'
  });

  useEffect(() => {
    if (editingMember) {
      setFormData({
        name: editingMember.name,
        email: editingMember.email,
        phone: editingMember.phone,
        address: editingMember.address,
        membershipId: editingMember.membershipId,
        membershipType: editingMember.membershipType,
        status: editingMember.status
      });
    }
  }, [editingMember]);

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
      if (editingMember) {
        await membersAPI.update(editingMember._id, formData);
      } else {
        await membersAPI.create(formData);
      }
      onClose();
      window.location.reload(); // Refresh to show updated data
    } catch (error) {
      console.error('Error saving member:', error);
      alert('Error saving member. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Full Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Address *</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Membership ID *</label>
        <input
          type="text"
          name="membershipId"
          value={formData.membershipId}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Membership Type *</label>
        <select
          name="membershipType"
          value={formData.membershipType}
          onChange={handleChange}
          required
        >
          <option value="Student">Student</option>
          <option value="Faculty">Faculty</option>
          <option value="Staff">Staff</option>
          <option value="General">General</option>
        </select>
      </div>

      {editingMember && (
        <div className="form-group">
          <label>Status *</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      )}

      <div className="form-actions">
        <button type="button" className="btn" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {editingMember ? 'Update Member' : 'Add Member'}
        </button>
      </div>
    </form>
  );
};

export default MemberForm;