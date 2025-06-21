// src/components/VoiceAssistantPage/VoiceAssistantPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VoiceAssistantPage.css';
import { FaMicrophone, FaArrowLeft } from 'react-icons/fa';

const VoiceAssistantPage = () => {
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="voice-assistant-container">
      <button onClick={() => navigate('/')} className="back-button va-back-button">
        <FaArrowLeft /> Back to Zones
      </button>

      <div className="status-indicator">
        {isListening ? (
          <button className="status-button listening-active">Listening...</button>
        ) : (
          <button className="status-button" onClick={toggleListening}>
            Speak now
          </button>
        )}
      </div>

      <div
        className={`mic-wrapper ${isListening ? 'listening' : ''}`}
        onClick={toggleListening}
      >
        <div className="mic-pulse-ring"></div>
        <div className="mic-pulse-ring"></div>
        <div className="mic-icon-container">
          <FaMicrophone className="mic-icon" />
        </div>
      </div>

      <div className="transcript-area">
        <div className="chat-bubble user-bubble">
          <span className="speaker-label">You:</span>
          <p>What's the weather like today?</p>
        </div>
        <div className="chat-bubble assistant-bubble">
          <span className="speaker-label">Assistant:</span>
          <p>Today's weather in Serdang is sunny with a high of 32°C and partly cloudy skies. Perfect for your garden!</p>
        </div>
        <div className="chat-bubble user-bubble">
          <span className="speaker-label">You:</span>
          <p>Activate watering for the Tomatoes zone.</p>
        </div>
        <div className="chat-bubble assistant-bubble">
          <span className="speaker-label">Assistant:</span>
          <p>Affirmative. I've activated the watering system for the Tomatoes zone for 5 minutes.</p>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistantPage;