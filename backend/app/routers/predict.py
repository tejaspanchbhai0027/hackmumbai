"""
predict.py - Prediction API endpoints
"""
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Dict
from app.schemas.student import StudentInput
from app.schemas.prediction import PredictionResponse
from app.services.ml_service import get_ml_service, MLService
from app.database import get_db
from app.models.prediction import Prediction

router = APIRouter(prefix="/api", tags=["predictions"])


@router.post("/predict", response_model=PredictionResponse)
async def predict_score(
    student_input: StudentInput,
    db: Session = Depends(get_db),
    ml_service: MLService = Depends(get_ml_service)
):
    """
    Predict exam score based on student profile.
    
    - **hours_studied**: Hours studied per day (0-24)
    - **sleep_hours**: Average sleep hours per day (0-24)
    - **attendance_percent**: Class attendance percentage (0-100)
    - **previous_scores**: Previous exam scores (0-100)
    
    Returns predicted exam score with confidence interval and interpretation.
    """
    try:
        # Check if model is ready
        if not ml_service.is_ready():
            raise HTTPException(
                status_code=503,
                detail="ML model not ready. Please train the model first by running: python app/ml/train_model.py"
            )
        
        # Convert student input to dict
        student_data = student_input.model_dump()
        
        # Make prediction
        predicted_score, conf_lower, conf_upper, classification = ml_service.predict(student_data)
        
        # Get feature importance
        feature_importance = ml_service.get_feature_importance()
        
        # Generate interpretation
        interpretation = ml_service.interpret_score(predicted_score, student_data)
        
        # Generate AI Study Coach advice
        study_coach_advice = ml_service.generate_study_advice(predicted_score, student_data)
        
        # Save prediction to database
        prediction_record = Prediction(
            student_data=student_data,
            predicted_score=predicted_score,
            confidence_lower=conf_lower,
            confidence_upper=conf_upper,
            classification=classification,
            model_version="1.0.0"
        )
        db.add(prediction_record)
        db.commit()
        db.refresh(prediction_record)
        
        # Return response
        return PredictionResponse(
            predicted_score=round(predicted_score, 2),
            confidence_lower=round(conf_lower, 2) if conf_lower else None,
            confidence_upper=round(conf_upper, 2) if conf_upper else None,
            classification=classification,
            feature_importance=feature_importance,
            interpretation=interpretation,
            study_coach=study_coach_advice,
            prediction_id=prediction_record.id
        )
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


@router.get("/model-info")
async def get_model_info(ml_service: MLService = Depends(get_ml_service)):
    """
    Get ML model information and performance metrics.
    
    Returns model version, type, performance metrics, and feature list.
    """
    try:
        model_info = ml_service.get_model_info()
        
        if model_info.get("status") == "Model not loaded":
            raise HTTPException(
                status_code=503,
                detail="Model not loaded. Please train the model first."
            )
        
        return model_info
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving model info: {str(e)}")


@router.post("/simulate", response_model=PredictionResponse)
async def simulate_score(
    student_input: StudentInput,
    ml_service: MLService = Depends(get_ml_service)
):
    """
    Simulate exam score based on student profile (no DB save).
    
    Used for "What-If" scenarios in the frontend.
    """
    try:
        # Check if model is ready
        if not ml_service.is_ready():
            raise HTTPException(
                status_code=503,
                detail="ML model not ready."
            )
        
        # Convert student input to dict
        student_data = student_input.model_dump()
        
        # Make prediction
        predicted_score, conf_lower, conf_upper, classification = ml_service.predict(student_data)
        
        # Get feature importance (reused from model metadata)
        feature_importance = ml_service.get_feature_importance()
        
        # Generate interpretation
        interpretation = ml_service.interpret_score(predicted_score, student_data)
        
        # Generate AI Study Coach advice
        study_coach_advice = ml_service.generate_study_advice(predicted_score, student_data)
        
        # Return response (without saving to DB)
        return PredictionResponse(
            predicted_score=round(predicted_score, 2),
            confidence_lower=round(conf_lower, 2) if conf_lower else None,
            confidence_upper=round(conf_upper, 2) if conf_upper else None,
            classification=classification,
            feature_importance=feature_importance,
            interpretation=interpretation,
            study_coach=study_coach_advice,
            prediction_id=0  # 0 indicates simulation
        )
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Simulation error: {str(e)}")
