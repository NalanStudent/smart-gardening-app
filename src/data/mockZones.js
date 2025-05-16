// src/data/mockZones.js
export const mockZonesData = [
  {
    id: 'zone1',
    name: 'Tomatoes',
    cropType: 'Vegetable',
    data: {
      soilMoisture: 65, // percentage
      humidity: 55,     // percentage
      temperature: 24,  // Celsius
      lightIntensity: 75000, // lux
      phLevel: 6.2,
    },
    historicalData: { // Simplified, expand later for actual charting
      soilMoisture: [{time: '10:00', value: 60}, {time: '11:00', value: 65}, {time: '12:00', value: 62}],
      temperature: [{time: '10:00', value: 23}, {time: '11:00', value: 24}, {time: '12:00', value: 25}],
      // Add more for humidity, light, pH
    },
    settings: {
      desiredMoisture: 70,
      minLightIntensity: 50000,
    }
  },
  {
    id: 'zone2',
    name: 'Lettuce Patch',
    cropType: 'Leafy Green',
    data: {
      soilMoisture: 70,
      humidity: 60,
      temperature: 22,
      lightIntensity: 60000,
      phLevel: 6.5,
    },
    historicalData: {
        soilMoisture: [{time: '10:00', value: 72}, {time: '11:00', value: 70}, {time: '12:00', value: 68}],
        temperature: [{time: '10:00', value: 21}, {time: '11:00', value: 22}, {time: '12:00', value: 22}],
    },
    settings: {
        desiredMoisture: 75,
        minLightIntensity: 45000,
      }
  },
  {
    id: 'zone3',
    name: 'Herbs Garden',
    cropType: 'Herbs',
    data: { // Simulate a sensor failure for one metric
      soilMoisture: 50,
      humidity: null, // Failed sensor
      temperature: 26,
      lightIntensity: 80000,
      phLevel: 6.0,
    },
    historicalData: {
        soilMoisture: [{time: '10:00', value: 55}, {time: '11:00', value: 50}, {time: '12:00', value: 52}],
        temperature: [{time: '10:00', value: 25}, {time: '11:00', value: 26}, {time: '12:00', value: 25}],
    },
    settings: {
        desiredMoisture: 60,
        minLightIntensity: 55000,
      }
  },
];

// Function to simulate fetching data
export const fetchZones = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockZonesData);
    }, 500); // Simulate network delay
  });
};

export const fetchZoneById = async (id) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockZonesData.find(zone => zone.id === id));
      }, 300);
    });
  };

export const updateZoneData = async (zoneId, newData) => {
    // In a real app, this would be an API call.
    // Here, we'll just log it and potentially update mock data if needed for demo.
    console.log(`Updating zone ${zoneId} with data:`, newData);
    const zoneIndex = mockZonesData.findIndex(zone => zone.id === zoneId);
    if (zoneIndex !== -1) {
        // This is a shallow merge, for deep merge use libraries or spread carefully
        mockZonesData[zoneIndex].data = { ...mockZonesData[zoneIndex].data, ...newData.data };
        mockZonesData[zoneIndex].settings = { ...mockZonesData[zoneIndex].settings, ...newData.settings };
    }
    return mockZonesData[zoneIndex];
};