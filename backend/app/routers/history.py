"""
history.py - Prediction history API endpoints
"""
from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List
from app.schemas.prediction import PredictionHistory, PredictionHistoryResponse
from app.database import get_db
from app.models.prediction import Prediction

router = APIRouter(prefix="/api", tags=["history"])


@router.get("/history", response_model=PredictionHistoryResponse)
async def get_prediction_history(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=100, description="Items per page"),
    db: Session = Depends(get_db)
):
    """
    Get paginated prediction history.
    
    - **page**: Page number (default: 1)
    - **page_size**: Number of items per page (default: 10, max: 100)
    
    Returns list of past predictions with pagination info.
    """
    try:
        # Get total count
        total = db.query(Prediction).count()
        
        # Calculate offset
        offset = (page - 1) * page_size
        
        # Get predictions
        predictions = (
            db.query(Prediction)
            .order_by(desc(Prediction.created_at))
            .offset(offset)
            .limit(page_size)
            .all()
        )
        
        # Convert to response schema
        prediction_list = [
            PredictionHistory.model_validate(pred) for pred in predictions
        ]
        
        return PredictionHistoryResponse(
            total=total,
            predictions=prediction_list,
            page=page,
            page_size=page_size
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching history: {str(e)}")


@router.get("/history/{prediction_id}", response_model=PredictionHistory)
async def get_prediction_by_id(
    prediction_id: int,
    db: Session = Depends(get_db)
):
    """
    Get specific prediction by ID.
    
    - **prediction_id**: Prediction ID to retrieve
    
    Returns the prediction details.
    """
    try:
        prediction = db.query(Prediction).filter(Prediction.id == prediction_id).first()
        
        if not prediction:
            raise HTTPException(status_code=404, detail=f"Prediction {prediction_id} not found")
        
        return PredictionHistory.model_validate(prediction)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching prediction: {str(e)}")


@router.delete("/history/{prediction_id}")
async def delete_prediction(
    prediction_id: int,
    db: Session = Depends(get_db)
):
    """
    Delete a prediction from history.
    
    - **prediction_id**: Prediction ID to delete
    
    Returns success message.
    """
    try:
        prediction = db.query(Prediction).filter(Prediction.id == prediction_id).first()
        
        if not prediction:
            raise HTTPException(status_code=404, detail=f"Prediction {prediction_id} not found")
        
        db.delete(prediction)
        db.commit()
        
        return {"message": f"Prediction {prediction_id} deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting prediction: {str(e)}")
