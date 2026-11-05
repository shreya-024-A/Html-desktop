 import React, { useState, useEffect } from 'react';
import { transactionsAPI } from '../services/api';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await transactionsAPI.getAll();
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleReturnBook = async (transactionId) => {
    try {
      await transactionsAPI.returnBook(transactionId);
      fetchTransactions();
    } catch (error) {
      console.error('Error returning book:', error);
      alert('Error returning book. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Issued': 'status-available',
      'Returned': 'status-unavailable',
      'Overdue': 'status-unavailable'
    };
    
    return (
      <span className={`status ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Member Name</th>
            <th>Issue Date</th>
            <th>Due Date</th>
            <th>Return Date</th>
            <th>Status</th>
            <th>Fine Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.book?.title}</td>
              <td>{transaction.member?.name}</td>
              <td>{formatDate(transaction.issueDate)}</td>
              <td>{formatDate(transaction.dueDate)}</td>
              <td>{transaction.returnDate ? formatDate(transaction.returnDate) : '-'}</td>
              <td>{getStatusBadge(transaction.status)}</td>
              <td>${transaction.fineAmount}</td>
              <td>
                {transaction.status === 'Issued' && (
                  <button 
                    className="btn btn-success"
                    style={{ padding: '5px 10px' }}
                    onClick={() => handleReturnBook(transaction._id)}
                  >
                    Return
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {transactions.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No transactions found.</p>
        </div>
      )}
    </div>
  );
};

export default TransactionList;