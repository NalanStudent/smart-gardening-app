// src/components/ZonePage/WaterControlPopup.js
import React, { useState, useEffect } from 'react';
import Popup from '../common/Popup.js';
import './WaterControlPopup.css';

const WaterControlPopup = ({ isOpen, onClose, currentMoisture, desiredMoisture, onUpdate, zoneName }) => {
  const [newDesiredMoisture, setNewDesiredMoisture] = useState(desiredMoisture);
  const [timerDuration, setTimerDuration] = useState(0); // 0 means not active

  useEffect(() => {
    if (isOpen) {
      setNewDesiredMoisture(desiredMoisture);
      setTimerDuration(0); // Reset timer when popup opens
    }
  }, [isOpen, desiredMoisture]);

  const handleSave = () => {
    onUpdate({ desiredMoisture: parseInt(newDesiredMoisture, 10) });
    onClose();
  };

  const handleQuickOn = (duration) => {
    setTimerDuration(duration);
    // In a real app, this would send a command to the IoT device
    console.log(`Watering ${zoneName} for ${duration} minutes.`);
    // Optionally, close the popup after a delay or show a confirmation
    setTimeout(() => {
        // onClose(); // Or update UI to show watering is active
        alert(`${zoneName} watering started for ${duration} minutes!`); // Simple feedback
        setTimerDuration(0); // Reset button state
    }, 500);
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} title={`Water Control: ${zoneName}`}>
      <div className="water-control-content">
        <p>Current Soil Moisture: <strong>{currentMoisture}%</strong></p>

        <div className="control-group">
          <label htmlFor="desiredMoisture">Set Desired Soil Moisture Level:</label>
          <div className="range-container">
            <input
              type="range"
              id="desiredMoisture"
              min="0"
              max="100"
              value={newDesiredMoisture}
              onChange={(e) => setNewDesiredMoisture(e.target.value)}
              className="moisture-slider"
            />
            <span className="range-value">{newDesiredMoisture}%</span>
          </div>
        </div>

        <div className="control-group">
          <label>Quick Water ON (Manual):</label>
          <div className="quick-on-buttons">
            <button onClick={() => handleQuickOn(5)} className="button" disabled={timerDuration > 0}>
              5 min
            </button>
            <button onClick={() => handleQuickOn(10)} className="button" disabled={timerDuration > 0}>
              10 min
            </button>
            <button onClick={() => handleQuickOn(15)} className="button" disabled={timerDuration > 0}>
              15 min
            </button>
          </div>
          {timerDuration > 0 && <p className="timer-active-message">Watering for {timerDuration} minutes...</p>}
        </div>
      </div>
      <div className="popup-controls">
        <button onClick={onClose} className="button button-secondary">Cancel</button>
        <button onClick={handleSave} className="button">Save Setting</button>
      </div>
    </Popup>
  );
};

export default WaterControlPopup;