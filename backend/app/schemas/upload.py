from pydantic import BaseModel, Field
from typing import List
from app.schemas.prediction import PredictionResponse

class BatchPredictionItem(PredictionResponse):
    """Prediction result for a single student in batch."""
    student_name: str = Field(..., description="Name of the student")

class BatchPredictionResponse(BaseModel):
    """Response for batch prediction upload."""
    total_processed: int
    successful: int
    failed: int
    results: List[BatchPredictionItem]
    errors: List[str]
