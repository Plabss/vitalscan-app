// src/features/heart_disease/HeartDiseaseForm.js

import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/Form.css';

function HeartDiseaseForm() {
    // Must match the Pydantic model, including string values
    const [formData, setFormData] = useState({
        age: 63,
        sex: "Male",
        cp: "typical angina",
        trestbps: 145.0,
        chol: 233.0,
        fbs: "True",
        restecg: "lv hypertrophy",
        thalach: 150.0,
        exang: "False",
        oldpeak: 2.3,
        slope: "downsloping",
        ca: 0.0,
        thal: "fixed defect"
    });

    // State for results, loading, and errors
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Handle changes in the form inputs
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'number' ? parseFloat(value) : value
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
                '/api/predict/heart_disease', 
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
            <h3>Heart Disease Prediction</h3>
            <p>Fill in the details to get a diagnosis prediction.</p>
            
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    
                    {/* --- Numeric Inputs --- */}
                    <div className="form-group">
                        <label>Age</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Resting Blood Pressure (trestbps)</label>
                        <input type="number" step="0.1" name="trestbps" value={formData.trestbps} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Serum Cholesterol (chol)</label>
                        <input type="number" step="0.1" name="chol" value={formData.chol} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Max Heart Rate (thalach)</label>
                        <input type="number" step="0.1" name="thalach" value={formData.thalach} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>ST Depression (oldpeak)</label>
                        <input type="number" step="0.1" name="oldpeak" value={formData.oldpeak} onChange={handleChange} required />
                    </div>

                    {/* --- Categorical Selects (Dropdowns) --- */}
                    <div className="form-group">
                        <label>Sex</label>
                        <select name="sex" value={formData.sex} onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Chest Pain Type (cp)</label>
                        <select name="cp" value={formData.cp} onChange={handleChange}>
                            <option value="typical angina">Typical Angina</option>
                            <option value="atypical angina">Atypical Angina</option>
                            <option value="non-anginal">Non-Anginal</option>
                            <option value="asymptomatic">Asymptomatic</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Fasting Blood Sugar {'>'} 120 mg/dl (fbs)</label>
                        <select name="fbs" value={formData.fbs} onChange={handleChange}>
                            <option value="True">True</option>
                            <option value="False">False</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Resting ECG (restecg)</label>
                        <select name="restecg" value={formData.restecg} onChange={handleChange}>
                            <option value="normal">Normal</option>
                            <option value="stt abnormality">ST-T Abnormality</option>
                            <option value="lv hypertrophy">LV Hypertrophy</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Exercise Induced Angina (exang)</label>
                        <select name="exang" value={formData.exang} onChange={handleChange}>
                            <option value="True">True</option>
                            <option value="False">False</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Slope</label>
                        <select name="slope" value={formData.slope} onChange={handleChange}>
                            <option value="upsloping">Upsloping</option>
                            <option value="flat">Flat</option>
                            <option value="downsloping">Downsloping</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Major Vessels (ca)</label>
                        <select name="ca" value={formData.ca} onChange={handleChange}>
                            <option value={0.0}>0</option>
                            <option value={1.0}>1</option>
                            <option value={2.0}>2</option>
                            <option value={3.0}>3</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Thal</label>
                        <select name="thal" value={formData.thal} onChange={handleChange}>
                            <option value="normal">Normal</option>
                            <option value="fixed defect">Fixed Defect</option>
                            <option value="reversible defect">Reversible Defect</option>
                        </select>
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
                    <p className={result.diagnosis === 'Heart Disease Positive' ? 'diabetic' : 'not-diabetic'}>
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

export default HeartDiseaseForm;