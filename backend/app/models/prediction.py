from sqlalchemy import Column, Integer, Float, JSON, String, DateTime
from datetime import datetime
from app.database import Base


class Prediction(Base):
    """Model for storing prediction history."""
    
    __tablename__ = "predictions"
    
    id = Column(Integer, primary_key=True, index=True)
    student_data = Column(JSON, nullable=False)  # Stores input features as JSON
    predicted_score = Column(Float, nullable=False)
    confidence_lower = Column(Float, nullable=True)
    confidence_upper = Column(Float, nullable=True)
    classification = Column(JSON, nullable=True)
    model_version = Column(String(50), default="1.0.0")
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    def __repr__(self):
        return f"<Prediction(id={self.id}, score={self.predicted_score}, created={self.created_at})>"
