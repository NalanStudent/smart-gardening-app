// src/data/mockNotifications.js
export const mockNotificationsData = [
  {
    id: 'notif1',
    type: 'warning', // warning, info, success, error
    message: 'Moisture level in Tomatoes zone is too low, watering activated for 5 mins.',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    read: false,
  },
  {
    id: 'notif2',
    type: 'error',
    message: 'Temperature in Lettuce Patch is beyond the ideal range (28°C).',
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    read: false,
  },
  {
    id: 'notif3',
    type: 'info',
    message: 'Herbs Garden lights turned ON due to low light intensity.',
    timestamp: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
    read: true,
  },
  {
    id: 'notif4',
    type: 'success',
    message: 'All sensors are fully functional.',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    read: true,
  },
];

export const fetchNotifications = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockNotificationsData);
    }, 300);
  });
};