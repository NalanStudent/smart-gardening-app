import React, { useState } from 'react';
import './HelpPage.css'; // Import the CSS for this component
import {
  FaSearch, FaSeedling, FaLeaf, FaCogs, FaLightbulb, FaTools, FaChevronDown, FaPlay, FaTimes
} from 'react-icons/fa'; // Import icons from react-icons

const helpContentData = {
  'App Overview': {
    title: 'App Overview',
    content: `
      <p>Welcome to Smart Garden! This app helps you monitor and manage your garden using IoT sensors and automation.</p>
      <div class="sample-image">📱 App Dashboard Preview</div>
      <p>Key features include:</p>
      <p>• Real-time sensor monitoring<br>• Automated watering schedules<br>• Plant care recommendations<br>• Weather integration</p>
    `,
  },
  'Initial Setup': {
    title: 'Initial Setup',
    content: `
      <p>Follow these steps to set up your smart garden system:</p>
      <div class="diagram-placeholder">📡 IoT Device Setup Diagram</div>
      <p>1. Unbox your sensor kit<br>2. Download the companion app<br>3. Connect sensors to WiFi<br>4. Place sensors in your garden<br>5. Calibrate readings</p>
    `,
  },
  'Creating Your First Garden': {
    title: 'Creating Your First Garden',
    content: `
      <p>Learn how to create and configure your first garden profile in the app.</p>
      <div class="video-thumbnail">
          <div class="play-icon">▶</div>
          Setup Tutorial Video
      </div>
      <p>This 5-minute video walks you through the entire process of adding plants, setting up zones, and configuring your first automated watering schedule.</p>
    `,
  },
  'Dashboard Navigation': {
    title: 'Dashboard Navigation',
    content: `
      <p>Understanding your Smart Garden dashboard and navigation.</p>
      <div class="sample-image">🏡 Dashboard Layout</div>
      <p>Main sections include:</p>
      <p>• Live sensor data<br>• Plant health status<br>• Watering schedules<br>• Weather forecast<br>• Alerts and notifications</p>
    `,
  },
  // You can add more content for other topics here if needed, following the same structure
};

const HelpPage = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const showContent = (topic) => {
    const data = helpContentData[topic];
    if (data) {
      setModalContent({ title: data.title, body: data.content });
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent({ title: '', body: '' }); // Clear content when closing
  };

  return (
    <div className="help-page-container">
      {/* Search Container - Adapted from your HTML */}
      <div className="search-container">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" className="search-input" placeholder="Search help topics..." />
        </div>
      </div>

      {/* Content Area - Adapted from your HTML */}
      <div className="content">
        {/* Getting Started Category */}
        <div className={`category-card ${expandedCategory === 'getting-started' ? 'expanded' : ''}`} id="getting-started">
          <div className="category-header" onClick={() => toggleCategory('getting-started')}>
            <div className="category-icon"><FaSeedling /></div>
            <div className="category-info">
              <div className="category-title">Getting Started</div>
              <div className="category-subtitle">4 topics</div>
            </div>
            <FaChevronDown className="expand-arrow" />
          </div>
          <div className="subcategories">
            <div className="subcategory-item" onClick={() => showContent('App Overview')}>
              <div className="subcategory-title">App Overview</div>
            </div>
            <div className="subcategory-item" onClick={() => showContent('Initial Setup')}>
              <div className="subcategory-title">Initial Setup</div>
            </div>
            <div className="subcategory-item" onClick={() => showContent('Creating Your First Garden')}>
              <div className="subcategory-title">Creating Your First Garden</div>
            </div>
            <div className="subcategory-item" onClick={() => showContent('Dashboard Navigation')}>
              <div className="subcategory-title">Dashboard Navigation</div>
            </div>
          </div>
        </div>

        {/* Plant Knowledge Base - Mock */}
        <div className="category-card">
          <div className="category-header" onClick={() => toggleCategory('plant-knowledge')}>
            <div className="category-icon"><FaLeaf /></div>
            <div className="category-info">
              <div className="category-title">Plant Knowledge Base</div>
              <div className="category-subtitle">4 topics</div>
            </div>
            <FaChevronDown className="expand-arrow" />
          </div>
          <div className="subcategories">
            {/* Add mock subcategory items here if desired, e.g.: */}
            {/* <div className="subcategory-item"><div className="subcategory-title">Understanding Plant Needs</div></div> */}
          </div>
        </div>

        {/* IoT Device Management - Mock */}
        <div className="category-card">
          <div className="category-header" onClick={() => toggleCategory('iot-device-management')}>
            <div className="category-icon"><FaCogs /></div>
            <div className="category-info">
              <div className="category-title">IoT Device Management</div>
              <div className="category-subtitle">5 topics</div>
            </div>
            <FaChevronDown className="expand-arrow" />
          </div>
          <div className="subcategories"></div>
        </div>

        {/* Smart Features - Mock */}
        <div className="category-card">
          <div className="category-header" onClick={() => toggleCategory('smart-features')}>
            <div className="category-icon"><FaLightbulb /></div>
            <div className="category-info">
              <div className="category-title">Smart Features</div>
              <div className="category-subtitle">4 topics</div>
            </div>
            <FaChevronDown className="expand-arrow" />
          </div>
          <div className="subcategories"></div>
        </div>

        {/* Troubleshooting - Mock */}
        <div className="category-card">
          <div className="category-header" onClick={() => toggleCategory('troubleshooting')}>
            <div className="category-icon"><FaTools /></div>
            <div className="category-info">
              <div className="category-title">Troubleshooting</div>
              <div className="category-subtitle">3 topics</div>
            </div>
            <FaChevronDown className="expand-arrow" />
          </div>
          <div className="subcategories"></div>
        </div>
      </div>

      {/* Content Modal - Controlled by React State */}
      {modalVisible && (
        <div className="content-modal" onClick={(e) => e.target.classList.contains('content-modal') && closeModal()}>
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">{modalContent.title}</div>
              <button className="close-btn" onClick={closeModal}><FaTimes /></button>
            </div>
            <div className="modal-body" dangerouslySetInnerHTML={{ __html: modalContent.body }}>
              {/* Content will be populated from state */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpPage;