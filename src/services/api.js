// src/services/api.js
import {
    mockZonesData,
    fetchZones as fetchZonesMock,
    fetchZoneById as fetchZoneByIdMock,
    updateZoneData as updateZoneDataMock
  } from '../data/mockZones';

import {
    mockNotificationsData,
    fetchNotifications as fetchNotificationsMock
} from '../data/mockNotifications';

// Simulate API calls
export const fetchZones = async () => {
    console.log("API: Fetching all zones...");
    return fetchZonesMock();
};

export const fetchZoneById = async (id) => {
    console.log(`API: Fetching zone by ID: ${id}...`);
    return fetchZoneByIdMock(id);
};

export const updateZoneData = async (zoneId, updatedData) => {
    console.log(`API: Updating zone ${zoneId}...`, updatedData);
    // In a real app, this would be a PUT/POST request
    // For now, we'll update the mock data directly if needed for persistence in the session
    // This simple mock won't persist across reloads without local storage or more complex state.
    return updateZoneDataMock(zoneId, updatedData);
};

export const fetchNotifications = async () => {
    console.log("API: Fetching notifications...");
    return fetchNotificationsMock();
};

export const clearAllNotificationsAPI = async () => {
    console.log("API: Clearing all notifications...");
    // Simulate API call
    return new Promise(resolve => {
        setTimeout(() => {
            // In a real app, the backend would handle this.
            // For the mock, we can update the mockNotificationsData if we want persistence
            // or just let the frontend manage its state.
            // mockNotificationsData.forEach(n => n.read = true); // Example if modifying mock
            resolve({ success: true, message: "All notifications cleared." });
        }, 300);
    });
};

// Simulate user login
export const loginUser = async (username, password) => {
    console.log("API: Attempting login...", { username });
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === "user" && password === "password") {
                resolve({
                    success: true,
                    user: {
                        name: "Gardener Joe",
                        email: "joe@example.com",
                        profileIconUrl: "https://via.placeholder.com/150/A9D6A9/333333?text=GJ" // Placeholder image
                    }
                });
            } else {
                reject({ success: false, message: "Invalid credentials" });
            }
        }, 500);
    });
};

// Simulate updating user profile
export const updateUserProfile = async (profileData) => {
    console.log("API: Updating profile...", profileData);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ success: true, message: "Profile updated successfully." });
        }, 500);
    });
};