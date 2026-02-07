"""
upload.py - Batch prediction endpoints
"""
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from typing import List
import pandas as pd
import io
from app.schemas.upload import BatchPredictionResponse, BatchPredictionItem
from app.services.ml_service import get_ml_service, MLService
from app.schemas.prediction import PredictionResponse

router = APIRouter(prefix="/api/upload", tags=["upload"])

REQUIRED_COLUMNS = ['Student Name', 'Hours Studied', 'Sleep Hours', 'Attendance', 'Previous Scores']

@router.post("/csv", response_model=BatchPredictionResponse)
async def upload_csv(
    file: UploadFile = File(...),
    ml_service: MLService = Depends(get_ml_service)
):
    """
    Upload CSV for batch prediction.
    
    Required columns:
    - Student Name
    - Hours Studied (0-24)
    - Sleep Hours (0-24)
    - Attendance (0-100)
    - Previous Scores (0-100)
    """
    if not ml_service.is_ready():
        raise HTTPException(status_code=503, detail="ML model not ready.")

    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="File must be a CSV.")

    try:
        content = await file.read()
        df = pd.read_csv(io.StringIO(content.decode('utf-8')))

        # Normalize columns if training dataset format
        column_mapping = {
            'study_hours_per_week': 'Hours Studied',
            'sleep_hours_per_day': 'Sleep Hours',
            'attendance_percentage': 'Attendance',
            'previous_exam_score': 'Previous Scores',
            'student_id': 'Student Name'
        }
        
        # Renaissance mapping
        for old_col, new_col in column_mapping.items():
            if old_col in df.columns and new_col not in df.columns:
                if old_col == 'study_hours_per_week':
                    # Special handling: convert weekly to daily
                    df[new_col] = df[old_col] / 7
                else:
                    df[new_col] = df[old_col]
        
        # Ensure Student Name exists
        if 'Student Name' not in df.columns:
            df['Student Name'] = [f"Student {i+1}" for i in range(len(df))]

        # Validate columns
        missing_cols = [col for col in REQUIRED_COLUMNS if col not in df.columns]
        if missing_cols:
            raise HTTPException(
                status_code=400, 
                detail=f"Missing columns: {', '.join(missing_cols)}. Supported formats: Standard or Training Dataset."
            )

        results = []
        errors = []
        successful = 0
        failed = 0

        for index, row in df.iterrows():
            try:
                student_name = str(row['Student Name'])
                
                # Extract and validate features
                student_data = {
                    "hours_studied": float(row['Hours Studied']),
                    "sleep_hours": float(row['Sleep Hours']),
                    "attendance_percent": float(row['Attendance']),
                    "previous_scores": float(row['Previous Scores'])
                }

                # Predict
                predicted_score, conf_lower, conf_upper, classification = ml_service.predict(student_data)
                
                # Get interpretation and advice
                interpretation = ml_service.interpret_score(predicted_score, student_data)
                study_coach = ml_service.generate_study_advice(predicted_score, student_data)
                feature_importance = ml_service.get_feature_importance()

                results.append(BatchPredictionItem(
                    student_name=student_name,
                    predicted_score=round(predicted_score, 2),
                    confidence_lower=round(conf_lower, 2) if conf_lower else None,
                    confidence_upper=round(conf_upper, 2) if conf_upper else None,
                    classification=classification,
                    feature_importance=feature_importance,
                    interpretation=interpretation,
                    study_coach=study_coach,
                    prediction_id=0 # 0 for batch/simulated
                ))
                successful += 1

            except Exception as e:
                failed += 1
                errors.append(f"Row {index + 2}: {str(e)}")

        return BatchPredictionResponse(
            total_processed=len(df),
            successful=successful,
            failed=failed,
            results=results,
            errors=errors
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")
