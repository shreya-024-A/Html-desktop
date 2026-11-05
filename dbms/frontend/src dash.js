 import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import BookForm from './BookForm';
import MemberList from './MemberList';
import MemberForm from './MemberForm';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('books');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'books':
        return <BookForm editingBook={editingItem} onClose={handleCloseForm} />;
      case 'members':
        return <MemberForm editingMember={editingItem} onClose={handleCloseForm} />;
      case 'transactions':
        return <TransactionForm onClose={handleCloseForm} />;
      default:
        return null;
    }
  };

  const getFormTitle = () => {
    if (editingItem) {
      return `Edit ${activeTab.slice(0, -1)}`;
    }
    return `Add New ${activeTab.slice(0, -1)}`;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Add New {activeTab.slice(0, -1)}
        </button>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'books' ? 'active' : ''}`}
          onClick={() => setActiveTab('books')}
        >
          Books
        </button>
        <button 
          className={`tab ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          Members
        </button>
        <button 
          className={`tab ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
      </div>

      <div className="tab-content active">
        {activeTab === 'books' && <BookList onEdit={handleEdit} />}
        {activeTab === 'members' && <MemberList onEdit={handleEdit} />}
        {activeTab === 'transactions' && <TransactionList />}
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h3>{getFormTitle()}</h3>
              <button className="close-btn" onClick={handleCloseForm}>×</button>
            </div>
            {renderForm()}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;