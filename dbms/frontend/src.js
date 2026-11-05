 import React, { useState } from 'react';
import './App.css';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

function App() {
  const [currentView, setCurrentView] = useState('user'); // 'user' or 'admin'

  return (
    <div className="App">
      <header className="app-header">
        <h1>Digital Library Management System</h1>
        <div className="view-toggle">
          <button 
            className={currentView === 'user' ? 'active' : ''}
            onClick={() => setCurrentView('user')}
          >
            User View
          </button>
          <button 
            className={currentView === 'admin' ? 'active' : ''}
            onClick={() => setCurrentView('admin')}
          >
            Admin View
          </button>
        </div>
      </header>
      
      <main>
        {currentView === 'admin' ? <AdminDashboard /> : <UserDashboard />}
      </main>
      
      <footer>
        <p>Developed by: Tessa George, Faithima Janna, Neha Manoj, Dhiya P A</p>
      </footer>
    </div>
  );
}

export default App;