// src/components/common/Popup/Popup.js
import React from 'react';
import './Popup.css';
import { FaTimes } from 'react-icons/fa';

const Popup = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-button" onClick={onClose} aria-label="Close popup">
          <FaTimes />
        </button>
        {title && <h2 className="popup-title">{title}</h2>}
        <div className="popup-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;