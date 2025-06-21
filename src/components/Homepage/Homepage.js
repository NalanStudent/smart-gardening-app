import React from 'react';
import { useNavigate } from 'react-router-dom';
import ZoneTile from './ZoneTile';
import './Homepage.css';
import { FaMicrophone, FaQuestionCircle, FaPlus } from 'react-icons/fa';

const Homepage = ({ zones, refreshAllData }) => {
  const navigate = useNavigate();

  // If there are no zones, display a message but still show the add button
  if (!zones || zones.length === 0) {
    return (
      <div className="homepage-container">
        <p className="no-zones-message">No plant zones configured yet.</p>
        <button
          className="fab-add-zone"
          aria-label="Add New Zone"
          onClick={() => alert('Add new zone clicked!')}
        >
          <FaPlus />
        </button>
      </div>
    );
  }

  // Event handler for the voice command icon
  const handleVoiceCommandClick = () => {
    navigate('/voice-assistant');
  };

  // Event handler for the help icon
  const handleHelpClick = () => {
    navigate('/help'); // CHANGED: Navigate to the new HelpPage route
  };

  // Event handler for the floating action button
  const handleAddNewZoneClick = () => {
    alert('Add new zone clicked!');
  };

  return (
    <div className="homepage-container">
      {/* Container for the title and its icons */}
      <div className="homepage-title-container">
        <FaMicrophone className="title-icon" onClick={handleVoiceCommandClick} />
        <h2>My Garden Zones</h2>
        <FaQuestionCircle className="title-icon" onClick={handleHelpClick} />
      </div>

      <div className="zones-grid">
        {zones.map((zone) => (
          <ZoneTile key={zone.id} zone={zone} />
        ))}
      </div>

      {/* Floating Action Button for adding a new zone */}
      <button
        className="fab-add-zone"
        aria-label="Add New Zone"
        onClick={handleAddNewZoneClick}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default Homepage;