"""
preprocessor.py - Data preprocessing utilities for ML model
"""
import numpy as np
from typing import Dict, Tuple
import joblib
from pathlib import Path


class DataPreprocessor:
    """Handles data preprocessing for model input."""
    
    def __init__(self, scaler_path: str = None):
        """Initialize preprocessor with scaler."""
        self.feature_names = ['hours_studied', 'sleep_hours', 'attendance_percent', 'previous_scores']
        self.scaler = None
        
        if scaler_path:
            self.load_scaler(scaler_path)
    
    def load_scaler(self, scaler_path: str):
        """Load the fitted scaler from file."""
        scaler_file = Path(scaler_path)
        if scaler_file.exists():
            self.scaler = joblib.load(scaler_file)
        else:
            raise FileNotFoundError(f"Scaler file not found: {scaler_path}")
    
    def validate_input(self, student_data: Dict[str, float]) -> Tuple[bool, str]:
        """Validate student input data."""
        # Check required fields
        for field in self.feature_names:
            if field not in student_data:
                return False, f"Missing required field: {field}"
        
        # Validate ranges
        validations = {
            'hours_studied': (0, 24, "Hours studied must be between 0 and 24"),
            'sleep_hours': (0, 24, "Sleep hours must be between 0 and 24"),
            'attendance_percent': (0, 100, "Attendance must be between 0 and 100"),
            'previous_scores': (0, 100, "Previous scores must be between 0 and 100")
        }
        
        for field, (min_val, max_val, error_msg) in validations.items():
            value = student_data[field]
            if not isinstance(value, (int, float)):
                return False, f"{field} must be a number"
            if value < min_val or value > max_val:
                return False, error_msg
        
        return True, "Valid"
    
    def prepare_features(self, student_data: Dict[str, float]) -> np.ndarray:
        """Prepare features for model prediction."""
        # Extract features in correct order
        features = [student_data[field] for field in self.feature_names]
        features_array = np.array(features).reshape(1, -1)
        
        # Scale features if scaler is available
        if self.scaler is not None:
            features_array = self.scaler.transform(features_array)
        
        return features_array
    
    def handle_outliers(self, student_data: Dict[str, float]) -> Dict[str, float]:
        """Handle potential outliers by clipping to reasonable ranges."""
        cleaned_data = student_data.copy()
        
        # Clip values to valid ranges
        cleaned_data['hours_studied'] = np.clip(cleaned_data['hours_studied'], 0, 24)
        cleaned_data['sleep_hours'] = np.clip(cleaned_data['sleep_hours'], 0, 24)
        cleaned_data['attendance_percent'] = np.clip(cleaned_data['attendance_percent'], 0, 100)
        cleaned_data['previous_scores'] = np.clip(cleaned_data['previous_scores'], 0, 100)
        
        return cleaned_data
