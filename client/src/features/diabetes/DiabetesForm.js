// src/features/diabetes/DiabetesForm.js

import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/Form.css';

function DiabetesForm() {
    // State for form inputs
    const [formData, setFormData] = useState({
        Pregnancies: 6,
        Glucose: 148.0,
        BloodPressure: 72.0,
        SkinThickness: 35.0,
        Insulin: 0.0,
        BMI: 33.6,
        DiabetesPedigreeFunction: 0.627,
        Age: 50
    });

    // State for results, loading, and errors
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle changes in the form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: parseFloat(value) 
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form reload
        setLoading(true);   
        setResult(null);    
        setError('');       

        try {
            const response = await axios.post(
                '/api/predict/diabetes', 
                formData
            );
            setResult(response.data); 
        } catch (err) {
            console.error('Error getting prediction:', err);
            setError('Failed to get prediction. Please check the server and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h3>Diabetes Prediction</h3>
            <p>Fill in the details to get a diagnosis prediction.</p>
            
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    {/* Create an input for each feature */}
                    <div className="form-group">
                        <label>Pregnancies</label>
                        <input type="number" name="Pregnancies" value={formData.Pregnancies} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Glucose</label>
                        <input type="number" step="0.1" name="Glucose" value={formData.Glucose} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Blood Pressure</label>
                        <input type="number" step="0.1" name="BloodPressure" value={formData.BloodPressure} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Skin Thickness</label>
                        <input type="number" step="0.1" name="SkinThickness" value={formData.SkinThickness} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Insulin</label>
                        <input type="number" step="0.1" name="Insulin" value={formData.Insulin} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>BMI</label>
                        <input type="number" step="0.1" name="BMI" value={formData.BMI} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Diabetes Pedigree Func.</label>
                        <input type="number" step="0.001" name="DiabetesPedigreeFunction" value={formData.DiabetesPedigreeFunction} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <input type="number" name="Age" value={formData.Age} onChange={handleChange} required />
                    </div>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Predicting...' : 'Get Prediction'}
                </button>
            </form>

            {/* Display the error message if one exists */}
            {error && <div className="result error">{error}</div>}

            {/* Display the prediction result */}
            {result && (
                <div className="result">
                    <h4>Prediction Result</h4>
                    <p className={result.diagnosis === 'Diabetic' ? 'diabetic' : 'not-diabetic'}>
                        <strong>Diagnosis: {result.diagnosis}</strong>
                    </p>
                    <p>
                        Confidence Score: {(result.confidence_score * 100).toFixed(2)}%
                    </p>
                </div>
            )}
        </div>
    );
}

export default DiabetesForm;