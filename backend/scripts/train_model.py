"""
train_model.py
Trains two models:
1. Regression: Predicts final score (0-100)
2. Classification: Predicts Pass/Fail

Data Source: ../../docs/student_performance_ml_dataset.csv
Output: ../app/ml/model_reg.pkl, ../app/ml/model_clf.pkl, ../app/ml/scaler.pkl
"""
import pandas as pd
import numpy as np
import joblib
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error, r2_score, accuracy_score, classification_report
import json

# Setup paths
BASE_DIR = Path(__file__).resolve().parent
DATA_PATH = BASE_DIR / "../../docs/student_performance_ml_dataset.csv"
MODEL_DIR = BASE_DIR / "../app/ml"
MODEL_DIR.mkdir(parents=True, exist_ok=True)

def train():
    print(f"Loading data from {DATA_PATH}...")
    df = pd.read_csv(DATA_PATH)
    
    # Feature Engineering to match StudentInput schema
    # Schema: hours_studied (daily), sleep_hours (daily), attendance_percent, previous_scores
    
    # Mappings
    # study_hours_per_week -> /7 -> hours_studied
    # sleep_hours_per_day -> sleep_hours
    # attendance_percentage -> attendance_percent
    # previous_exam_score -> previous_scores
    
    df['hours_studied'] = df['study_hours_per_week'] / 7
    df['sleep_hours'] = df['sleep_hours_per_day']
    df['attendance_percent'] = df['attendance_percentage']
    df['previous_scores'] = df['previous_exam_score']
    
    # Targets
    y_reg = df['final_exam_score']
    y_clf = df['result'].apply(lambda x: 1 if x.strip() == 'Pass' else 0)
    
    X = df[['hours_studied', 'sleep_hours', 'attendance_percent', 'previous_scores']]
    
    # Split
    X_train, X_test, y_reg_train, y_reg_test, y_clf_train, y_clf_test = train_test_split(
        X, y_reg, y_clf, test_size=0.2, random_state=42
    )
    
    # Scaling
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    print("\n--- Training Regression Model (Score) ---")
    reg_model = RandomForestRegressor(n_estimators=100, random_state=42)
    reg_model.fit(X_train_scaled, y_reg_train)
    
    y_reg_pred = reg_model.predict(X_test_scaled)
    mae = mean_absolute_error(y_reg_test, y_reg_pred)
    r2 = r2_score(y_reg_test, y_reg_pred)
    print(f"MAE: {mae:.2f}")
    print(f"R2 Score: {r2:.2f}")
    
    print("\n--- Training Classification Model (Pass/Fail) ---")
    clf_model = RandomForestClassifier(n_estimators=100, random_state=42)
    clf_model.fit(X_train_scaled, y_clf_train)
    
    y_clf_pred = clf_model.predict(X_test_scaled)
    acc = accuracy_score(y_clf_test, y_clf_pred)
    print(f"Accuracy: {acc:.2f}")
    print(classification_report(y_clf_test, y_clf_pred))
    
    # Save Artifacts
    print("\nSaving models...")
    joblib.dump(reg_model, MODEL_DIR / "model_reg.pkl")
    joblib.dump(clf_model, MODEL_DIR / "model_clf.pkl")
    joblib.dump(scaler, MODEL_DIR / "scaler.pkl")
    
    # Save Metadata with metrics
    metadata = {
        "regression": {
            "mae": round(mae, 2),
            "r2": round(r2, 2)
        },
        "classification": {
            "accuracy": round(acc, 2)
        },
        "features": list(X.columns)
    }
    
    with open(MODEL_DIR / "model_metadata.json", "w") as f:
        json.dump(metadata, f, indent=4)
        
    print(f"✓ Models saved to {MODEL_DIR}")

if __name__ == "__main__":
    train()
