// src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../components/Homepage/Homepage';
import ZonePage from '../components/ZonePage/ZonePage';
import NotificationPage from '../components/NotificationPage/NotificationPage';
import SettingsPage from '../components/SettingsPage/SettingsPage';
import VoiceAssistantPage from '../components/VoiceAssistantPage/VoiceAssistantPage';
import HelpPage from '../components/HelpPage/HelpPage'; // NEW: Import the new HelpPage

const AppRoutes = ({ zones, notifications, setNotifications, refreshAllData }) => {
  return (
    <Routes>
      <Route path="/" element={<Homepage zones={zones} refreshAllData={refreshAllData} />} />
      <Route path="/zone/:zoneId" element={<ZonePage zones={zones} />} />
      <Route
        path="/notifications"
        element={<NotificationPage notifications={notifications} setNotifications={setNotifications} />}
      />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/voice-assistant" element={<VoiceAssistantPage />} />
      <Route path="/help" element={<HelpPage />} /> {/* NEW: Add the route for HelpPage */}
    </Routes>
  );
};

export default AppRoutes;