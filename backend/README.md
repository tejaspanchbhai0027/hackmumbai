# RASPP Backend

Python backend for RASPP (Real-time Admission Success Prediction Platform) using FastAPI and scikit-learn.

## Setup

### Prerequisites
- Python 3.9+ (Anaconda conda base environment)
- MySQL 8.0+

### Installation

1. **Install dependencies:**
```bash
cd backend
pip install -r requirements.txt
```

2. **Configure database:**
   - Copy `.env.example` to `.env`
   - Update database credentials in `.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=raspp_db
DB_USER=your_username
DB_PASSWORD=your_password
```

3. **Create MySQL database:**
```sql
CREATE DATABASE hackraspp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

4. **Train the ML model:**
```bash
python app/ml/train_model.py
```

Expected output:
- R² Score > 0.70
- MAE < 5 points
- Model saved to `app/ml/model.pkl`

### Running the Server

```bash
# Development mode with auto-reload
uvicorn app.main:app --reload --port 8000

# Or using Python directly
python app/main.py
```

Server will start at: `http://localhost:8000`

## API Documentation

Once the server is running:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Main Endpoints

#### POST /api/predict
Predict exam score based on student profile.

**Request body:**
```json
{
  "hours_studied": 8.0,
  "sleep_hours": 7.5,
  "attendance_percent": 85.0,
  "previous_scores": 75.0
}
```

**Response:**
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

#### GET /api/model-info
Get model metadata and performance metrics.

#### GET /api/history
Get paginated prediction history.

#### GET /health
Health check endpoint.

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI app entry point
│   ├── config.py            # Configuration management
│   ├── database.py          # Database connection
│   ├── models/              # SQLAlchemy models
│   │   └── prediction.py
│   ├── schemas/             # Pydantic schemas
│   │   ├── student.py
│   │   └── prediction.py
│   ├── routers/             # API endpoints
│   │   ├── predict.py
│   │   └── history.py
│   ├── services/            # Business logic
│   │   └── ml_service.py
│   └── ml/                  # Machine learning
│       ├── train_model.py
│       ├── preprocessor.py
│       ├── model.pkl        # Trained model (generated)
│       └── scaler.pkl       # Feature scaler (generated)
├── requirements.txt
├── .env.example
└── README.md
```

## Troubleshooting

### Model not loading
```bash
# Train the model first
python app/ml/train_model.py
```

### Database connection error
- Verify MySQL is running
- Check credentials in `.env`
- Ensure database `raspp_db` exists

### CORS errors
- Frontend URL is allowed in `.env` `CORS_ORIGINS`
- Default: `http://localhost:5173,http://localhost:3000`
