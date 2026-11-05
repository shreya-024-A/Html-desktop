 import React, { useState, useEffect } from 'react';
import { membersAPI } from '../services/api';

const MemberList = ({ onEdit }) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await membersAPI.getAll();
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await membersAPI.delete(id);
        fetchMembers();
      } catch (error) {
        console.error('Error deleting member:', error);
        alert('Error deleting member. Please try again.');
      }
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Membership ID</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member._id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>{member.membershipId}</td>
              <td>{member.membershipType}</td>
              <td>{member.status}</td>
              <td>
                <button 
                  className="btn btn-primary"
                  style={{ marginRight: '5px', padding: '5px 10px' }}
                  onClick={() => onEdit(member)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger"
                  style={{ padding: '5px 10px' }}
                  onClick={() => handleDelete(member._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {members.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No members found. Add some members to get started.</p>
        </div>
      )}
    </div>
  );
};

export default MemberList;