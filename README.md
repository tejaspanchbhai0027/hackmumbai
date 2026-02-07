# RASPP - Real-time Student Exam Success Prediction Platform

<div align="center">

![RASPP Logo](https://img.shields.io/badge/RASPP-ML_Powered-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.9+-green?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)

**Predict student exam performance using Machine Learning**

[Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Tech Stack](#tech-stack)

</div>

---

## 📖 Overview

**RASPP** is an intelligent web application that predicts student exam scores based on their study habits, attendance, and previous performance using **Multiple Linear Regression**. The platform provides real-time predictions with confidence intervals and actionable insights to help students improve their performance.

### Key Features

- 🤖 **ML-Powered Predictions** - Train models on historical data for accurate score predictions
- ⚡ **Real-time Results** - Get instant predictions with confidence intervals
- 📊 **Data Visualization** - Beautiful charts showing feature importance and trends
- 💡 **Actionable Insights** - Personalized recommendations based on predictions
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Stunning glassmorphism design with smooth animations
- 📜 **Prediction History** - Track and review past predictions

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.9+** (Anaconda recommended)
- **Node.js 18+** and npm
- **MySQL 8.0+**

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Chaibytes-raspp
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Configure database
cp .env.example .env
# Edit .env and add your MySQL credentials

# Create MySQL database
mysql -u root -p -e "CREATE DATABASE hackraspp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Train the ML model
python app/ml/train_model.py

# Start the backend server
uvicorn app.main:app --reload --port 8000
```

Backend will be available at: `http://localhost:8000`  
API documentation: `http://localhost:8000/docs`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to `http://localhost:5173`

---

## 🏗️ Project Structure

```
Chaibytes-raspp/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── main.py         # FastAPI application entry
│   │   ├── config.py       # Configuration management
│   │   ├── database.py     # Database connection
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── routers/        # API endpoints
│   │   ├── services/       # Business logic
│   │   └── ml/             # Machine learning
│   │       ├── train_model.py
│   │       ├── model.pkl   # Trained model
│   │       └── scaler.pkl  # Feature scaler
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── types/         # TypeScript interfaces
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
└── docs/                  # Documentation
    ├── project_documentation.md
    ├── raspp.csv          # Training dataset
    └── *.md               # Additional documentation
```

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database management
- **MySQL** - Relational database
- **scikit-learn** - Machine learning library
- **Pydantic** - Data validation
- **pandas/numpy** - Data processing

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework  
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **React Hook Form** - Form handling

### Machine Learning
- **Algorithm**: Multiple Linear Regression
- **Features**: hours_studied, sleep_hours, attendance_percent, previous_scores
- **Target**: exam_score (0-100)
- **Performance**: R² > 0.70, MAE < 5 points

---

## 📊 How It Works

1. **Input Student Data** - User enters study hours, sleep, attendance, and previous scores
2. **ML Processing** - Data is preprocessed and fed to the trained regression model
3. **Prediction** - Model predicts exam score with 95% confidence interval
4. **Insights** - System provides personalized recommendations
5. **History** - Prediction is saved to database for future reference

---

## 🎯 API Endpoints

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/health` | Health check |
| POST | `/api/predict` | Get exam score prediction |
| GET | `/api/model-info` | Model metadata and metrics |
| GET | `/api/history` | Prediction history (paginated) |
| GET | `/api/history/{id}` | Get specific prediction |
| DELETE | `/api/history/{id}` | Delete prediction |

### Example Request

```bash
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "hours_studied": 8.0,
    "sleep_hours": 7.5,
    "attendance_percent": 85.0,
    "previous_scores": 75.0
  }'
```

### Example Response

```json
{
  "predicted_score": 38.5,
  "confidence_lower": 35.2,
  "confidence_upper": 41.8,
  "feature_importance": {
    "hours_studied": 0.45,
    "previous_scores": 0.30,
    "attendance_percent": 0.15,
    "sleep_hours": 0.10
  },
  "interpretation": "Good performance expected...",
  "prediction_id": 1
}
```

---

## 📚 Documentation

- [Project Documentation](docs/project_documentation.md) - Complete project overview
- [Backend README](backend/README.md) - Backend setup and API docs
- [Frontend README](frontend/README.md) - Frontend setup and components
- [API Documentation](http://localhost:8000/docs) - Interactive Swagger UI (when running)

---

## 🧪 Development

### Backend Development

```bash
# Run with auto-reload
uvicorn app.main:app --reload

# Run tests
pytest

# Retrain model
python app/ml/train_model.py
```

### Frontend Development

```bash
# Development server
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🌟 Features Showcase

### Home Page
- Modern hero section with gradient text
- Feature highlights
- Call-to-action buttons
- Responsive design

### Prediction Form
- Clean, intuitive input fields
- Real-time validation
- Helpful error messages
- Loading states

### Results Dashboard
- Circular score gauge with color coding
- Feature importance bar chart
- Detailed interpretation
- Confidence intervals
- Input data summary

### History Page
- Paginated prediction list
- Statistics (total, average, best)
- Individual prediction cards
- Date/time tracking

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Authors

Built with ❤️ for the hackathon challenge

---

## 🙏 Acknowledgments

- **Dataset**: Student performance data (raspp.csv)
- **ML Framework**: scikit-learn
- **UI Inspiration**: Modern glassmorphism design trends
- **Typography**: Inter & Outfit fonts from Google Fonts

---

<div align="center">

**Made with FastAPI, React, and Machine Learning**

⭐ Star us on GitHub if you find this project helpful!

</div>
