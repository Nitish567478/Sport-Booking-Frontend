import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard';
import BookingHistory from './pages/BookingHistory';

import './App.css';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1 className="header-title">Booking Platform</h1>

          <nav className="nav-menu">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-button ${isActive ? 'active' : ''}`
              }
            >
              Book
            </NavLink>

            <NavLink
              to="/history"
              className={({ isActive }) =>
                `nav-button ${isActive ? 'active' : ''}`
              }
            >
              History
            </NavLink>

            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `nav-button ${isActive ? 'active' : ''}`
              }
            >
              Admin
            </NavLink>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<BookingPage />} />
            <Route path="/history" element={<BookingHistory />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
