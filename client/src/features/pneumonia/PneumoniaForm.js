// src/features/pneumonia/PneumoniaForm.js

import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/Form.css';

// A new, separate CSS file for the image upload styles
import './PneumoniaForm.css'; 

function PneumoniaForm() {
    // State to hold the actual file object
    const [selectedFile, setSelectedFile] = useState(null);
    // State to hold the URL for the image preview
    const [preview, setPreview] = useState(null);

    // State for results, loading, and errors
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle file input changes
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setError(''); 
            // Create a temporary URL for the image preview
            setPreview(URL.createObjectURL(file));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            setError('Please select an X-ray image first.');
            return;
        }

        setLoading(true);
        setResult(null);
        setError('');

        const formData = new FormData();
        formData.append('imageFile', selectedFile);
        try {
            const response = await axios.post(
                '/api/predict/pneumonia',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
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
            <h3>Pneumonia Detector</h3>
            <p>Upload a chest X-ray image to get a diagnosis prediction.</p>
            
            <form onSubmit={handleSubmit}>
                
                {/* File Input */}
                <div className="file-upload-container">
                    <input 
                        type="file" 
                        id="xray-upload"
                        className="file-input"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleFileChange} 
                    />
                    <label htmlFor="xray-upload" className="file-label">
                        {selectedFile ? selectedFile.name : 'Choose an X-Ray Image...'}
                    </label>
                </div>

                {/* Image Preview */}
                {preview && (
                    <div className="image-preview-container">
                        <p>Image Preview:</p>
                        
                        <img src={preview} alt="X-Ray Preview" className="image-preview" />
                    </div>
                )}

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Analyzing...' : 'Get Prediction'}
                </button>
            </form>

            {/* Display the error message if one exists */} 
            {error && <div className="result error">{error}</div>}

            {/* Display the prediction result */}
            {result && (
                <div className="result">
                    <h4>Prediction Result</h4>
                    <p className={result.diagnosis === 'Pneumonia' ? 'diabetic' : 'not-diabetic'}>
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

export default PneumoniaForm;