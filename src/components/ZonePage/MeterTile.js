// src/components/ZonePage/MeterTile.js
import React from 'react';
import './MeterTile.css';
import { FaTint, FaThermometerHalf, FaSun, FaFlask, FaExclamationTriangle, FaWind } from 'react-icons/fa'; // FaWind for humidity

const getIconForVariable = (variable) => {
  switch (variable.toLowerCase()) {
    case 'soil moisture':
      return <FaTint />;
    case 'humidity':
      return <FaWind />; // Using FaWind as a proxy for humidity
    case 'temperature':
      return <FaThermometerHalf />;
    case 'light intensity':
      return <FaSun />;
    case 'ph level':
      return <FaFlask />;
    default:
      return null;
  }
};

const MeterTile = ({ label, value, unit, status }) => {
  const icon = getIconForVariable(label);

  if (value === null || value === undefined) {
    return (
      <div className="meter-tile tile error">
        <div className="meter-icon error-icon"><FaExclamationTriangle /></div>
        <div className="meter-label">{label}</div>
        <div className="meter-value">Data Unavailable</div>
        <div className="meter-status">Sensor Error</div>
      </div>
    );
  }

  return (
    <div className={`meter-tile tile status-${status || 'normal'}`}>
      {icon && <div className="meter-icon">{icon}</div>}
      <div className="meter-label">{label}</div>
      <div className="meter-value">
        {value}
        {unit && <span className="meter-unit">{unit}</span>}
      </div>
      {/* Optionally, add a status message based on 'status' prop */}
      {/* <div className="meter-status">{statusText}</div> */}
    </div>
  );
};

export default MeterTile;