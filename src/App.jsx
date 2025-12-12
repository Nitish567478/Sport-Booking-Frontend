// App.jsx
import React from 'react';
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard';
import BookingHistory from './pages/BookingHistory';

import './App.css';

export default function App() {
  const [view, setView] = React.useState('booking');

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="header-title">Booking Platform</h1>
        <nav className="nav-menu">
          <button
            className={`nav-button ${view === 'booking' ? 'active' : ''}`}
            onClick={() => setView('booking')}
          >
            Book
          </button>
          <button
            className={`nav-button ${view === 'history' ? 'active' : ''}`}
            onClick={() => setView('history')}
          >
            History
          </button>
          <button
            className={`nav-button ${view === 'admin' ? 'active' : ''}`}
            onClick={() => setView('admin')}
          >
            Admin
          </button>
        </nav>
      </header>

      <main className="main-content">
        {view === 'booking' && <BookingPage />}
        {view === 'history' && <BookingHistory />}
        {view === 'admin' && <AdminDashboard />}
      </main>
    </div>
  );
}
