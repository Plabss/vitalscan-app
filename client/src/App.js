// src/App.js

import React, { useState } from 'react';
import './styles/App.css';

import Selector from './components/Selector';
import DiabetesForm from './features/diabetes/DiabetesForm';
import HeartDiseaseForm from './features/heart_disease/HeartDiseaseForm';
import PneumoniaForm from './features/pneumonia/PneumoniaForm';

function App() {
  const [selectedDisease, setSelectedDisease] = useState(null);

  const renderSelectedForm = () => {
  switch (selectedDisease) {
    case 'diabetes':
      return <DiabetesForm />;
    case 'heart_disease':
      return <HeartDiseaseForm />;
    case 'pneumonia':
      return <PneumoniaForm />;
    default:
      return <Selector setSelectedDisease={setSelectedDisease} />;
  }
};

  // "Back" button
  const renderBackButton = () => {
    if (selectedDisease) {
      return (
        <button 
          className="back-btn" 
          onClick={() => setSelectedDisease(null)} 
        >
          &larr; Back to Tool Selection
        </button>
      );
    }
    return null; // Don't show the button
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Vital Scan AI: Health Diagnosis Platform</h2>
      </header>
      <main>
        {renderBackButton()}
        {renderSelectedForm()}
      </main>
    </div>
  );
}

export default App;