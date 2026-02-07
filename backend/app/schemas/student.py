from pydantic import BaseModel, Field, field_validator
from typing import Optional


class StudentInput(BaseModel):
    """Schema for student profile input."""
    
    hours_studied: float = Field(
        ..., 
        ge=0, 
        le=24,
        description="Hours studied per day (0-24)"
    )
    sleep_hours: float = Field(
        ..., 
        ge=0, 
        le=24,
        description="Average sleep hours per day (0-24)"
    )
    attendance_percent: float = Field(
        ..., 
        ge=0, 
        le=100,
        description="Class attendance percentage (0-100)"
    )
    previous_scores: float = Field(
        ..., 
        ge=0, 
        le=100,
        description="Previous exam scores (0-100)"
    )
    
    @field_validator('hours_studied', 'sleep_hours')
    @classmethod
    def validate_daily_hours(cls, v, info):
        """Validate that daily hours are reasonable."""
        if v < 0 or v > 24:
            raise ValueError(f"{info.field_name} must be between 0 and 24 hours")
        return round(v, 1)
    
    @field_validator('attendance_percent', 'previous_scores')
    @classmethod
    def validate_percentage(cls, v, info):
        """Validate percentage values."""
        if v < 0 or v > 100:
            raise ValueError(f"{info.field_name} must be between 0 and 100")
        return round(v, 1)
    
    class Config:
        json_schema_extra = {
            "example": {
                "hours_studied": 8.0,
                "sleep_hours": 7.5,
                "attendance_percent": 85.0,
                "previous_scores": 75.0
            }
        }
