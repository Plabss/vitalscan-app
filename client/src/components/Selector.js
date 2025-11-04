// src/components/Selector.js

import React from 'react';
import '../styles/Selector.css';

// This component takes the 'setSelectedDisease' function from App.js as a prop
function Selector({ setSelectedDisease }) {
    return (
        <div className="selector-container">
            <h2>Select a Diagnostic Tool</h2>
            <p>Choose which model you would like to use.</p>
            <div className="selector-buttons">
                <button
                    className="disease-btn"
                    onClick={() => setSelectedDisease('diabetes')}
                >
                    Diabetes Predictor
                </button>

                <button
                    className="disease-btn"
                    onClick={() => setSelectedDisease('heart_disease')}
                >
                    Heart Disease Predictor
                </button>

                <button
                    className="disease-btn"
                    onClick={() => setSelectedDisease('pneumonia')}
                >
                    Pneumonia Detector
                </button>
            </div>
        </div>
    );
}

export default Selector;