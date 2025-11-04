const path = require('path');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose'); // Note: Mongoose is imported but not used

const multer = require('multer');
const FormData = require('form-data');

const app = express();

// --- Middleware ---
// Enable CORS for all routes
app.use(cors());
// Enable parsing of JSON data in the request body
app.use(express.json());

// Configure multer for in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- Configuration ---
// The URL where the Python ML API is running
const PYTHON_API_URL = process.env.PYTHON_API_URL
// Port for this MERN backend
const PORT = process.env.PORT || 5000;


// --- API Routes ---

/**
 * @route   GET /api
 * @desc    A simple test route
 * @access  Public
 */
app.get('/api', (req, res) => {
    res.json({ message: "Hello from the MERN backend!" });
});

/**
 * @route   POST /api/predict/diabetes
 * @desc    Get a diabetes prediction
 * @access  Public
 */
app.post('/api/predict/diabetes', async (req, res) => {
    try {
        const featureData = req.body;
        const apiResponse = await axios.post(
            `${PYTHON_API_URL}/predict/diabetes`,
            featureData
        );
        res.json(apiResponse.data);
    } catch (error) {
        console.error('Error calling Python API (Diabetes):', error.message);
        res.status(500).json({ error: 'Failed to get prediction from ML service' });
    }
});

/**
 * @route   POST /api/predict/heart_disease
 * @desc    Get a heart disease prediction
 * @access  Public
 */
app.post('/api/predict/heart_disease', async (req, res) => {
    try {
        const featureData = req.body;
        const apiResponse = await axios.post(
            `${PYTHON_API_URL}/predict/heart_disease`,
            featureData
        );
        res.json(apiResponse.data);
    } catch (error) {
        console.error('Error calling Python API (Heart):', error.message);
        res.status(500).json({ error: 'Failed to get prediction from ML service' });
    }
});

/**
 * @route   POST /api/predict/pneumonia
 * @desc    Get a pneumonia prediction from an image
 * @access  Public
 */
app.post('/api/predict/pneumonia', upload.single('imageFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file uploaded.' });
        }
        
        const form = new FormData();
        // Append the file buffer from memory
        form.append('file', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });

        const apiResponse = await axios.post(
            `${PYTHON_API_URL}/predict/pneumonia`,
            form,
            {
                headers: {
                    ...form.getHeaders(),
                },
            }
        );
        res.json(apiResponse.data);
    } catch (error) {
        console.error('Error calling Python API (Pneumonia):', error.message);
        res.status(500).json({ error: 'Failed to get prediction from ML service' });
    }
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`MERN backend server running on port ${PORT}`);
});