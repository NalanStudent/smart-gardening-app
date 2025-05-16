// src/components/ZonePage/LightControlPopup.js
import React, { useState, useEffect } from 'react';
import Popup from '../common/Popup.js';
import './LightControlPopup.css'; // Create this if specific styles are needed

const LightControlPopup = ({ isOpen, onClose, currentIntensity, minIntensity, onUpdate, zoneName }) => {
  const [newMinIntensity, setNewMinIntensity] = useState(minIntensity);
  const [timerDuration, setTimerDuration] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setNewMinIntensity(minIntensity);
      setTimerDuration(0);
    }
  }, [isOpen, minIntensity]);

  const handleSave = () => {
    onUpdate({ minLightIntensity: parseInt(newMinIntensity, 10) });
    onClose();
  };

  const handleQuickOn = (duration) => {
    setTimerDuration(duration);
    console.log(`Lights for ${zoneName} ON for ${duration} minutes.`);
    // Simulate action
    setTimeout(() => {
        alert(`${zoneName} lights turned ON for ${duration} minutes!`);
        setTimerDuration(0);
    }, 500);
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} title={`Light Control: ${zoneName}`}>
      <div className="light-control-content">
        <p>Current Light Intensity: <strong>{currentIntensity} lux</strong></p>

        <div className="control-group">
          <label htmlFor="minIntensity">Set Minimum Light Intensity (lux) for Auto ON:</label>
          <div className="range-container">
            <input
              type="number" // Or range if preferred
              id="minIntensity"
              min="0"
              max="100000" // Adjust max as needed
              step="1000"
              value={newMinIntensity}
              onChange={(e) => setNewMinIntensity(e.target.value)}
              className="intensity-input"
            />
             <span className="range-value">{newMinIntensity} lux</span>
          </div>
        </div>

        <div className="control-group">
          <label>Quick Light ON (Manual):</label>
          <div className="quick-on-buttons">
            <button onClick={() => handleQuickOn(30)} className="button" disabled={timerDuration > 0}>
              30 min
            </button>
            <button onClick={() => handleQuickOn(60)} className="button" disabled={timerDuration > 0}>
              1 Hour
            </button>
            <button onClick={() => handleQuickOn(120)} className="button" disabled={timerDuration > 0}>
              2 Hours
            </button>
          </div>
          {timerDuration > 0 && <p className="timer-active-message">Lights ON for {timerDuration} minutes...</p>}
        </div>
      </div>
      <div className="popup-controls">
        <button onClick={onClose} className="button button-secondary">Cancel</button>
        <button onClick={handleSave} className="button">Save Setting</button>
      </div>
    </Popup>
  );
};

export default LightControlPopup;