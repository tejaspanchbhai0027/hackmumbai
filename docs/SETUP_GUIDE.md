# RASPP Setup Guide

## Quick Setup Instructions

### Prerequisites Installed ✓
- Python (Anaconda conda base)
- MySQL 8.0+
- Node.js & npm

### Step 1: MySQL Database Setup

1. **Open MySQL Command Line or MySQL Workbench**

2. **Create the database:**
```sql
CREATE DATABASE hackraspp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. **Note your MySQL credentials** (you'll need them in Step 2)

### Step 2: Backend Configuration

1. **Navigate to backend directory:**
```bash
cd d:\Chaibytes-raspp\backend
```

2. **Update database credentials in `.env` file:**
   - Open `d:\Chaibytes-raspp\backend\.env`
   - Update these values:
     ```env
     DB_HOST=localhost
     DB_PORT=3306
     DB_NAME=hackraspp
     DB_USER=your_mysql_username
     DB_PASSWORD=your_mysql_password
     ```

### Step 3: Start the Backend

```bash
cd d:\Chaibytes-raspp\backend
uvicorn app.main:app --reload --port 8000
```

**Backend will start at:** `http://localhost:8000`  
**API Docs:** `http://localhost:8000/docs`

### Step 4: Start the Frontend

Open a **new terminal** window:

```bash
cd d:\Chaibytes-raspp\frontend
npm run dev
```

**Frontend will start at:** `http://localhost:5173`

### Step 5: Access the Application

Open your browser and go to: **http://localhost:5173**

---

## Testing the Application

### 1. Test Prediction Flow

1. Click "Get Started" on the home page
2. Enter test data:
   - Hours Studied: 8.0
   - Sleep Hours: 7.5  
   - Attendance: 85.0
   - Previous Scores: 75.0
3. Click "Predict Score"
4. Review the results page showing prediction, confidence interval, and insights

### 2. Test History

1. Navigate to "View History"
2. You should see your test prediction listed
3. Verify statistics are displayed correctly

### 3. Test API Directly

```bash
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d "{\"hours_studied\": 8.0, \"sleep_hours\": 7.5, \"attendance_percent\": 85.0, \"previous_scores\": 75.0}"
```

---

## Model Performance

✅ **Model Training Complete!**

- **R² Score:** 0.854 (Target: > 0.70) ✓ EXCELLENT
- **Mean Absolute Error:** 2.31 (Target: < 5.0) ✓ EXCELLENT  
- **RMSE:** 2.79

**Feature Importance:**
1. Hours Studied: ~47% (Most important)
2. Previous Scores: ~27%
3. Attendance: ~15%
4. Sleep Hours: ~12%

---

## Troubleshooting

### Backend Issues

**Issue:** `ModuleNotFoundError`  
**Solution:** Ensure all dependencies are installed:
```bash
cd d:\Chaibytes-raspp\backend
pip install -r requirements.txt
```

**Issue:** Database connection error  
**Solution:**  
- Verify MySQL is running
- Check credentials in `.env` file
- Ensure database `hackraspp` exists

**Issue:** Model not found error  
**Solution:** Model is already trained! Check `backend/app/ml/` directory for:
- `model.pkl`
- `scaler.pkl`
- `model_metadata.json`

### Frontend Issues

**Issue:** `npm install` fails  
**Solution:**
```bash
cd d:\Chaibytes-raspp\frontend
npm cache clean --force
npm install
```

**Issue:** Cannot connect to backend  
**Solution:**
- Verify backend is running on port 8000
- Check `.env` file in frontend directory has `VITE_API_URL=http://localhost:8000`

**Issue:** CORS errors  
**Solution:** Backend `.env` should have:
```env
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

---

## Project Features

### 🎯 Core Features Implemented
- ✅ ML-powered prediction (Multiple Linear Regression)
- ✅ Real-time score prediction with confidence intervals
- ✅ Beautiful, modern UI with glassmorphism design
- ✅ Interactive data visualizations (Recharts)
- ✅ Prediction history with statistics
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Input validation and error handling
- ✅ Personalized recommendations

### 🛠️ Tech Stack
- **Backend:** FastAPI, SQLAlchemy, MySQL, scikit-learn
- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS
- **ML:** Multiple Linear Regression (scikit-learn)

---

## Next Steps

1. **Configure MySQL database** (update `.env` with your credentials)
2. **Start both backend and frontend** servers  
3. **Test the application** using the testing guide above
4. **Enjoy predicting exam scores!** 🎉

---

## Support

For issues or questions:
- Check the troubleshooting section above
- Review [README.md](../README.md) for detailed documentation
- Check backend API docs at http://localhost:8000/docs

---

**Created:** February 7, 2026  
**Status:** ✅ Ready for Use  
**Model Version:** 1.0.0
