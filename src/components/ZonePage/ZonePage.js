// src/components/ZonePage/ZonePage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchZoneById, updateZoneData } from '../../services/api';
import MeterTile from './MeterTile';
import DataGraph from './DataGraph';
import WaterControlPopup from './WaterControlPopup';
import LightControlPopup from './LightControlPopup';
import './ZonePage.css';
import { FaArrowLeft, FaTint, FaLightbulb } from 'react-icons/fa';

const ZonePage = () => {
  const { zoneId } = useParams();
  const navigate = useNavigate();
  const [zone, setZone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isWaterPopupOpen, setIsWaterPopupOpen] = useState(false);
  const [isLightPopupOpen, setIsLightPopupOpen] = useState(false);

  const loadZoneData = async () => {
    setLoading(true);
    setError(null);
    try {
      const zoneData = await fetchZoneById(zoneId);
      if (zoneData) {
        setZone(zoneData);
      } else {
        setError('Zone not found.');
      }
    } catch (err) {
      setError('Failed to load zone data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadZoneData();
  }, [zoneId]);

  const handleUpdateZoneSettings = async (updatedSettings) => {
    if (!zone) return;
    try {
      // Simulate API call to update settings
      const updatedZone = await updateZoneData(zone.id, { settings: updatedSettings });
      setZone(prevZone => ({ ...prevZone, settings: { ...prevZone.settings, ...updatedSettings }}));
      // Add a notification or toast message for success
      alert("Settings updated successfully!");
    } catch (err) {
      console.error("Failed to update settings", err);
      alert("Failed to update settings.");
    }
  };


  if (loading) {
    return <div className="zone-page-loading">Loading zone data...</div>;
  }

  if (error) {
    return <div className="zone-page-error">{error} <button onClick={() => navigate('/')}>Go Home</button></div>;
  }

  if (!zone) {
    return <div className="zone-page-error">Zone data is unavailable. <button onClick={() => navigate('/')}>Go Home</button></div>;
  }

  const { data = {}, historicalData = {}, settings = {}, name } = zone;

  return (
    <div className="zone-page-container">
      <button onClick={() => navigate('/')} className="back-button">
        <FaArrowLeft /> Back to Zones
      </button>
      <h2>{name} - Real-time Data</h2>

      <div className="meter-tiles-grid">
        <MeterTile label="Soil Moisture" value={data.soilMoisture} unit="%" />
        <MeterTile label="Humidity" value={data.humidity} unit="%" />
        <MeterTile label="Temperature" value={data.temperature} unit="°C" />
        <MeterTile label="Light Intensity" value={data.lightIntensity} unit="lux" />
        <MeterTile label="pH Level" value={data.phLevel} unit="" />
      </div>

      <div className="zone-controls">
        <h3>Controls</h3>
        <div className="control-buttons-container">
            <button className="button control-button" onClick={() => setIsWaterPopupOpen(true)}>
                <FaTint /> Water Control
            </button>
            <button className="button control-button" onClick={() => setIsLightPopupOpen(true)}>
                <FaLightbulb /> Light Control
            </button>
        </div>
      </div>

      <div className="historical-data-section">
        <h3>Historical Data</h3>
        {/* Example for one graph, repeat for others or make DataGraph more generic */}
        <DataGraph title="Soil Moisture Trend" data={historicalData.soilMoisture} variableName="Soil Moisture" />
        <DataGraph title="Temperature Trend" data={historicalData.temperature} variableName="Temperature" />
        {/* Add more DataGraph components for humidity, light, pH if data exists */}
      </div>

      {isWaterPopupOpen && (
        <WaterControlPopup
          isOpen={isWaterPopupOpen}
          onClose={() => setIsWaterPopupOpen(false)}
          currentMoisture={data.soilMoisture}
          desiredMoisture={settings.desiredMoisture || 60} // Default if not set
          onUpdate={(newSettings) => handleUpdateZoneSettings({ ...settings, desiredMoisture: newSettings.desiredMoisture })}
          zoneName={name}
        />
      )}

      {isLightPopupOpen && (
        <LightControlPopup
          isOpen={isLightPopupOpen}
          onClose={() => setIsLightPopupOpen(false)}
          currentIntensity={data.lightIntensity}
          minIntensity={settings.minLightIntensity || 5000} // Default if not set
          onUpdate={(newSettings) => handleUpdateZoneSettings({ ...settings, minLightIntensity: newSettings.minLightIntensity })}
          zoneName={name}
        />
      )}
    </div>
  );
};

export default ZonePage;