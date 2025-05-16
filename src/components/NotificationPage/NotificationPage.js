// src/components/NotificationPage/NotificationPage.js
import React, { useState, useEffect } from 'react';
import NotificationItem from './NotificationItem';
import './NotificationPage.css';
import { clearAllNotificationsAPI } from '../../services/api'; // Assuming this API exists or will be mocked
import { FaFilter, FaTimes } from 'react-icons/fa';

const NotificationPage = ({ notifications, setNotifications }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'warning', 'error', 'info', 'success'
  const [showFilters, setShowFilters] = useState(false);

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleClearAll = async () => {
    // Optimistic update
    setNotifications(notifications.map(n => ({ ...n, read: true }))); // Mark all as read visually immediately
    try {
      await clearAllNotificationsAPI(); // Call mock API
      // If API call is successful, frontend state is already updated.
      // If it fails, one might want to revert the optimistic update or show an error.
      // For this prototype, we'll assume success.
      // To actually remove them: setNotifications([]);
      console.log("All notifications marked as read (or cleared if API did that).");
    } catch (error) {
      console.error("Failed to clear notifications:", error);
      // Potentially revert or show error to user
      alert("Could not clear all notifications from server.");
    }
  };


  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by newest first


  const notificationTypes = ['all', 'unread', 'warning', 'error', 'info', 'success'];

  return (
    <div className="notification-page-container">
      <div className="notification-header">
        <h2>Notifications</h2>
        <div className="notification-actions">
            <button onClick={() => setShowFilters(!showFilters)} className="button-secondary filter-toggle-button">
                <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <button onClick={handleClearAll} className="button button-danger clear-all-button" disabled={notifications.length === 0}>
                Clear All Read
            </button>
        </div>
      </div>

      {showFilters && (
        <div className="notification-filters">
          <p>Filter by type:</p>
          {notificationTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`filter-button ${filter === type ? 'active' : ''}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      )}

      {filteredNotifications.length > 0 ? (
        <div className="notifications-list">
          {filteredNotifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onMarkAsRead={handleMarkAsRead}
            />
          ))}
        </div>
      ) : (
        <p className="no-notifications-message">
          {notifications.length === 0 ? "You have no notifications." : `No notifications match the filter "${filter}".`}
        </p>
      )}
    </div>
  );
};

export default NotificationPage;