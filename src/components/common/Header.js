// src/components/common/Header/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBell, FaSync } from 'react-icons/fa';
import './Header.css';

const Header = ({ notificationCount, refreshData }) => {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <Link to="/" className="logo-link">
        <h1 className="app-title">SmartGarden</h1>
      </Link>
      <div className="header-actions">
        <button onClick={refreshData} className="icon-button refresh-button" title="Refresh Data">
          <FaSync />
        </button>
        <div className="notification-icon-container icon-button" onClick={() => navigate('/notifications')} title="Notifications">
          <FaBell />
          {notificationCount > 0 && (
            <span className="notification-badge">{notificationCount}</span>
          )}
        </div>
        <FaUserCircle className="profile-icon icon-button" onClick={() => navigate('/settings')} title="Settings" />
      </div>
    </header>
  );
};

export default Header;