// src/components/SettingsPage/SettingsPage.js
import React, { useState, useEffect } from 'react';
import './SettingsPage.css';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaBell, FaCloudUploadAlt, FaPalette, FaInfoCircle, FaSignOutAlt, FaChevronRight, FaUserCircle as LargeProfileIcon } from 'react-icons/fa';
import { loginUser, updateUserProfile } from '../../services/api'; // Mock API calls

const SettingsPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null); // Simulating a logged-in user
  const [appTheme, setAppTheme] = useState(document.body.className.includes('dark-theme') ? 'dark' : 'light');

  // Simulate fetching user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // In a real app, you'd get the user from context or a session
        // For now, we'll simulate a login to get user data
        const userData = await loginUser("user", "password"); // Use mock credentials
        if (userData.success) {
          setCurrentUser(userData.user);
        }
      } catch (error) {
        console.error("Failed to load user data for settings:", error);
        // Handle error, maybe redirect to login if no user found
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    console.log('User logged out');
    setCurrentUser(null); // Clear user state
    // In a real app, clear tokens, redirect to login page
    navigate('/'); // Navigate to homepage for this prototype
    alert("You have been logged out.");
  };

  const toggleTheme = () => {
    const newTheme = appTheme === 'light' ? 'dark' : 'light';
    setAppTheme(newTheme);
    document.body.className = `${newTheme}-theme`; // Update body class directly
    localStorage.setItem('appTheme', newTheme); // Persist theme choice
    // You might need to communicate this to App.js if it controls the theme class on a higher level element
  };

  // Placeholder functions for other settings
  const handleEditProfile = () => alert('Edit Profile clicked - functionality to be implemented.');
  const handleNotificationSettings = () => alert('Notification Settings clicked - functionality to be implemented.');
  const handleDataBackupSync = () => alert('Data Backup & Sync clicked - functionality to be implemented.');
  const handleAboutApp = () => alert('Smart Garden App v1.0.0\nDeveloped by: AI Assistant\nContact: support@smartgarden.com');

  if (!currentUser) {
    return (
        <div className="settings-page-container centered-message">
            <p>Loading user settings or please log in.</p>
            {/* Optionally, add a login button here if not auto-redirecting */}
        </div>
    );
  }


  return (
    <div className="settings-page-container">
      <h2>Settings</h2>

      <div className="profile-section">
        <LargeProfileIcon className="large-profile-icon" />
        <div className="user-details">
          <h3>{currentUser.name || 'User Name'}</h3>
          <p>{currentUser.email || 'user@example.com'}</p>
        </div>
      </div>

      <div className="settings-list">
        <div className="settings-category">
            <h4>Account</h4>
            <button className="setting-item" onClick={handleEditProfile}>
                <FaUserEdit className="setting-icon" />
                <span>Edit Profile</span>
                <FaChevronRight className="arrow-icon" />
            </button>
        </div>

        <div className="settings-category">
            <h4>Preferences</h4>
            <button className="setting-item" onClick={handleNotificationSettings}>
                <FaBell className="setting-icon" />
                <span>Notification Settings</span>
                <FaChevronRight className="arrow-icon" />
            </button>
            <button className="setting-item" onClick={handleDataBackupSync}>
                <FaCloudUploadAlt className="setting-icon" />
                <span>Data Backup & Sync</span>
                <FaChevronRight className="arrow-icon" />
            </button>
            <div className="setting-item theme-toggle">
                <FaPalette className="setting-icon" />
                <span>App Theme</span>
                <div className="theme-switcher">
                    <span>Light</span>
                    <label className="switch">
                        <input type="checkbox" checked={appTheme === 'dark'} onChange={toggleTheme} />
                        <span className="slider round"></span>
                    </label>
                    <span>Dark</span>
                </div>
            </div>
        </div>

        <div className="settings-category">
            <h4>About</h4>
            <button className="setting-item" onClick={handleAboutApp}>
                <FaInfoCircle className="setting-icon" />
                <span>About App</span>
                <FaChevronRight className="arrow-icon" />
            </button>
        </div>

      </div>

      <button className="logout-button button button-danger" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default SettingsPage;