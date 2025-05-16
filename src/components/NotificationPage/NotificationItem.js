// src/components/NotificationPage/NotificationItem.js
import React from 'react';
import './NotificationItem.css';
import { FaBell, FaExclamationTriangle, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';

const getNotificationIconAndClass = (type) => {
  switch (type) {
    case 'warning':
      return { icon: <FaExclamationTriangle />, className: 'notification-warning' };
    case 'error':
      return { icon: <FaExclamationTriangle />, className: 'notification-error' };
    case 'info':
      return { icon: <FaInfoCircle />, className: 'notification-info' };
    case 'success':
      return { icon: <FaCheckCircle />, className: 'notification-success' };
    default:
      return { icon: <FaBell />, className: 'notification-default' };
  }
};

const NotificationItem = ({ notification, onMarkAsRead }) => {
  const { icon, className } = getNotificationIconAndClass(notification.type);
  const timeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }
    return 'just now';
  };


  return (
    <div className={`notification-item ${className} ${notification.read ? 'read' : 'unread'}`} onClick={() => !notification.read && onMarkAsRead(notification.id)}>
      <div className="notification-icon-wrapper">
        {icon}
      </div>
      <div className="notification-content">
        <p className="notification-message">{notification.message}</p>
        <span className="notification-timestamp">{timeAgo(notification.timestamp)}</span>
      </div>
      {!notification.read && <div className="unread-dot" title="Mark as read"></div>}
    </div>
  );
};

export default NotificationItem;