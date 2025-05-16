// src/components/Homepage/Homepage.js
import React from 'react';
import ZoneTile from './ZoneTile';
import './Homepage.css';

const Homepage = ({ zones, refreshAllData }) => {
  if (!zones || zones.length === 0) {
    return (
      <div className="homepage-container">
        <p className="no-zones-message">No plant zones configured yet.</p>
        {/* Optionally, add a button to guide user to add a zone if that feature exists */}
      </div>
    );
  }

  return (
    <div className="homepage-container">
      <h2>My Garden Zones</h2>
      <div className="zones-grid">
        {zones.map((zone) => (
          <ZoneTile key={zone.id} zone={zone} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;