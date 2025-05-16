// src/components/Homepage/ZoneTile.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ZoneTile.css';
import { FaLeaf, FaTint, FaSun, FaThermometerHalf, FaFlask } from 'react-icons/fa'; // Example icons

const ZoneTile = ({ zone }) => {
  const navigate = useNavigate();

  const handleTileClick = () => {
    navigate(`/zone/${zone.id}`);
  };

  // Quick summary of data
  const { soilMoisture, temperature, lightIntensity } = zone.data || {};

  return (
    <div className="zone-tile tile" onClick={handleTileClick}>
      <h3>{zone.name}</h3>
      <p className="crop-type">{zone.cropType || 'N/A'}</p>
      <div className="zone-summary">
        {soilMoisture !== undefined && soilMoisture !== null && (
          <span title="Soil Moisture"><FaTint className="summary-icon" /> {soilMoisture}%</span>
        )}
        {temperature !== undefined && temperature !== null && (
          <span title="Temperature"><FaThermometerHalf className="summary-icon" /> {temperature}°C</span>
        )}
        {lightIntensity !== undefined && lightIntensity !== null && (
          <span title="Light Intensity"><FaSun className="summary-icon" /> {lightIntensity / 1000}k lux</span>
        )}
      </div>
    </div>
  );
};

export default ZoneTile;