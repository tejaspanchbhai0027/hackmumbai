# RASPP - Result Analysis & Student Performance Predictor

RASPP is a comprehensive educational management system designed to track student performance, predict academic outcomes using Machine Learning, and facilitate the campus placement process.

## 🚀 Key Features

### 🎓 Student Portal
- **Dashboard**: Real-time overview of attendance and CGPA.
- **Result Analysis**: Visual breakdown of semester-wise performance (marks, trends).
- **Resume Builder**: Integrated tool to build ATS-friendly resumes.
- **Placement Cell**: View job openings and placement predictions.
- **Transcript**: View and download academic transcripts.

### 👩‍🏫 Teacher Portal
- **Marks Entry**: Streamlined interface for entering student grades efficiently.
- **Analytics**: Class-wise performance reports and trends.
- **Bulk Prediction**: Upload CSVs to predict performance for entire batches using ML.
- **Attendance Management**: Track and update student attendance status.

### 💼 Placement Portal (New!)
- **Coordinator Dashboard**: Track key metrics like Placement Rate, Avg Package, and Highest Package.
- **Job Management**: Post and manage job listings for students.
- **AI Predictions**: Predict student placement probability using the specialized Random Forest model.
- **Records**: Manage student placement records and history.

### 🛠 Admin Portal
- **User Management**: Manage Students, Teachers, and Coordinators.
- **System Configuration**: Manage branches, subjects, and academic sessions.
- **Predictive Analytics**: System-wide performance overview.

## 🤖 Machine Learning Models

The system powers two core predictive features:

1.  **Academic Performance Predictor**
    *   **Goal**: Identify "At Risk" students early.
    *   **Algorithm**: Ensemble Voting Classifier (Random Forest + XGBoost).
    *   **Features Used**: Attendance Rate, Marks Consistency, internal assessment scores.

2.  **Placement Probability Predictor**
    *   **Goal**: Estimate likelihood of securing a job.
    *   **Algorithm**: Random Forest Classifier (~95% Accuracy).
    *   **Features Used**: CGPA, DSA Skills, Projects, Internship count.

## 💻 Tech Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Framer Motion, Recharts.
- **Backend**: FastAPI (Python), SQLAlchemy, Pydantic, Uvicorn.
- **Database**: MySQL.
- **ML**: Scikit-Learn, Pandas, XGBoost, Joblib.

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- MySQL Server

### 1. Database Setup
Create a MySQL database named `raspp_db` (or configure in `.env` if using a different name).

### 2. Backend Setup
```bash
cd backend
# Create virtual environment (recommended)
python -m venv venv
# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload
```
Server will start at `http://localhost:8000`.

### 3. Frontend Setup
```bash
cd frontend
# Install dependencies
npm install

# Run development server
npm run dev
```
Client will start at `http://localhost:5173`.

## 📂 Project Structure
```
raspp/
├── backend/            # FastAPI Application
│   ├── app/
│   │   ├── api/        # API Endpoints
│   │   ├── core/       # Config & Security
│   │   ├── ml/         # Machine Learning Models & Scripts
│   │   └── models/     # Database Models
│   └── ...
├── frontend/           # React Application
│   ├── src/
│   │   ├── components/ # Reusable UI Components
│   │   ├── pages/      # Application Pages
│   │   └── context/    # React Context (Auth, Theme)
│   └── ...
└── docs/               # Documentation
```

## 🔐 Default Test Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `admin123` |
| **Teacher** | `teacher@example.com` | `teacher123` |
| **Student** | `student@example.com` | `student123` |
| **Coordinator** | `coordinator@example.com` | `coordinator123` |

---
*Built for the Future of Education.*
