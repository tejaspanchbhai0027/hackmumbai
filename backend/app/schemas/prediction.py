from pydantic import BaseModel, Field
from typing import Dict, Optional, List
from datetime import datetime


class PredictionRequest(BaseModel):
    """Schema for prediction request."""
    student_data: Dict[str, float]
    
    class Config:
        json_schema_extra = {
            "example": {
                "student_data": {
                    "hours_studied": 8.0,
                    "sleep_hours": 7.5,
                    "attendance_percent": 85.0,
                    "previous_scores": 75.0
                }
            }
        }


class StudyCoachAdvice(BaseModel):
    """Schema for AI Study Coach advice."""
    summary: str
    strengths: List[str]
    improvements: List[str]
    actionable_steps: List[str]
    motivational_quote: str


class ClassificationResult(BaseModel):
    status: str
    pass_probability: float


class PredictionResponse(BaseModel):
    """Schema for prediction response."""
    
    predicted_score: float = Field(..., description="Predicted exam score (0-100)")
    confidence_lower: Optional[float] = Field(None, description="Lower bound of confidence interval")
    confidence_upper: Optional[float] = Field(None, description="Upper bound of confidence interval")
    classification: Optional[ClassificationResult] = Field(None, description="Classification result (Pass/Fail)")
    feature_importance: Dict[str, float] = Field(..., description="Feature importance weights")
    interpretation: str = Field(..., description="Human-readable interpretation of the result")
    study_coach: Optional[StudyCoachAdvice] = Field(None, description="Detailed AI Study Coach advice")
    prediction_id: Optional[int] = Field(None, description="Database ID of saved prediction")
    
    class Config:
        json_schema_extra = {
            "example": {
                "predicted_score": 38.5,
                "confidence_lower": 35.2,
                "confidence_upper": 41.8,
                "feature_importance": {
                    "hours_studied": 0.45,
                    "previous_scores": 0.30,
                    "attendance_percent": 0.15,
                    "sleep_hours": 0.10
                },
                "interpretation": "Good performance expected. Your study habits and previous scores indicate above-average results.",
                "study_coach": {
                    "summary": "You are on the right track but consistency is key.",
                    "strengths": ["Good attendance"],
                    "improvements": ["Increase study hours"],
                    "actionable_steps": ["Study 2 more hours per week"],
                    "motivational_quote": "Success is the sum of small efforts repeated day in and day out."
                },
                "prediction_id": 1
            }
        }


class PredictionHistory(BaseModel):
    """Schema for prediction history item."""
    
    id: int
    student_data: Dict[str, float]
    predicted_score: float
    confidence_lower: Optional[float]
    confidence_upper: Optional[float]
    model_version: str
    created_at: datetime
    
    class Config:
        from_attributes = True


class PredictionHistoryResponse(BaseModel):
    """Schema for paginated prediction history."""
    
    total: int
    predictions: List[PredictionHistory]
    page: int
    page_size: int
