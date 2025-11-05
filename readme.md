# VITALSCAN AI : A Health Diagnosis Platform (MERN + Python ML)

A full-stack web application that uses a Python machine learning backend to provide preliminary diagnostic predictions for various health conditions.

## 🚀 Live Demo

[![Live Demo](https://img.shields.io/badge/Render-Live_Demo-46E3B7?logo=render)](https://vitalscan-app.onrender.com/)

> **Note:** This project is deployed on Render's free tier. The servers spin down after 15 minutes of inactivity and may take **30-60 seconds to "wake up"** on the first visit. Please be patient!

## ⚠️ Medical Disclaimer

This tool is for educational and demonstrational purposes ONLY. The predictions are not a substitute for professional medical advice, diagnosis, or treatment.

## Features

* **Multi-Disease Prediction:** A scalable, multi-page interface to select different diagnostic tools.
* **Diabetes Predictor:** Predicts the likelihood of diabetes based on tabular data (e.g., glucose, age).
* **Heart Disease Predictor:** Predicts the likelihood of heart disease based on tabular data (e.g., cholesterol, chest pain type).
* **Pneumonia Detector:** Analyzes uploaded chest X-ray images to detect signs of pneumonia using a Convolutional Neural Network (CNN).

## Architecture: The Two-Server Model

This project runs as two separate, decoupled services:

1.  **MERN App (This Repo):** A Node.js/Express server that serves the React frontend and acts as a "Backend for Frontend" (BFF). It handles user requests and calls the Python API.
2.  **ML API (Python):** A separate FastAPI server that loads the trained machine learning models and serves them as REST API endpoints.



**User Flow:**
`User (React)` → `MERN Backend (Node.js)` → `ML API (Python)` → `MERN Backend (Node.js)` → `User (React)`

## Tech Stack

| Category | Technology |
| --- | --- |
| **Frontend** | React.js, React Hooks, Axios |
| **Backend (BFF)** | Node.js, Express, Multer (for file uploads) |
| **ML API** | Python, FastAPI |
| **ML Models** | Scikit-learn (for tabular data), TensorFlow/Keras (for images) |
| **Deployment** | Render, Git, Git Releases |

## Project Repositories

* **MERN App (This Repo):** [https://github.com/Plabss/vitalscan-app.git](https://github.com/Plabss/vitalscan-app.git)
* **Python ML API:** [https://github.com/Plabss/vitalscan-api.git](https://github.com/Plabss/vitalscan-api.git)

## How to Run Locally

### Prerequisites

* Node.js
* Python & Conda
* You must have the [ML API running locally](https://github.com/Plabss/vitalscan-api.git) first.

### 1. Run this MERN App

1.  Clone this repository:
    ```bash
    git clone https://github.com/Plabss/vitalscan-app.git

    cd vitalscan-app
    ```
2.  Install server dependencies:
    ```bash
    npm install
    ```
3.  Install client dependencies:
    ```bash
    cd client
    npm install
    cd ..
    ```
4.  Run the server:
    ```bash
    node server.js
    ```
5.  In a **separate terminal**, run the React client:
    ```bash
    cd client
    npm start
    ```

