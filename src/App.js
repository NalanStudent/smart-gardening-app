// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // Make sure dark theme styles are also linked or imported here
import AppRoutes from './routes/AppRoutes';
import Header from './components/common/Header.js';
import { fetchZones, fetchNotifications as fetchNotifsService } from './services/api';

function App() {
  const [zones, setZones] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Load theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem('appTheme') || 'light');

  const refreshAllData = async () => {
    // ... (keep existing refreshAllData function)
    setIsLoading(true);
    setError(null);
    try {
      const zonesData = await fetchZones();
      const notifsData = await fetchNotifsService();
      setZones(zonesData);
      setNotifications(notifsData);
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.className = `${theme}-theme`;
    localStorage.setItem('appTheme', theme); // Save theme choice
  }, [theme]);


  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  if (isLoading && !zones.length) {
    return <div className="loading-fullscreen">Loading Smart Garden...</div>;
  }

  if (error) {
    return <div className="error-fullscreen">{error} <button onClick={refreshAllData}>Retry</button></div>;
  }

  // Pass setTheme to SettingsPage or manage through context if preferred for deep components
  return (
    <div className={`app-container`}> {/* Removed theme-theme from here as body gets it */}
      <Header notificationCount={unreadNotificationCount} refreshData={refreshAllData} />
      <main>
        <AppRoutes
          zones={zones}
          notifications={notifications}
          setNotifications={setNotifications} // Pass this down
          refreshAllData={refreshAllData}
        />
      </main>
      {/* Footer could go here */}
    </div>
  );
}

export default App;