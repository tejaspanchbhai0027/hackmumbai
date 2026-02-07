"""
ml_service.py - ML model loading and prediction service
"""
import joblib
import json
import numpy as np
from pathlib import Path
from typing import Dict, Tuple, Optional
from app.ml.preprocessor import DataPreprocessor


class MLService:
    """Service for ML model predictions."""
    
    def __init__(self, model_path: str = "app/ml/model.pkl", scaler_path: str = "app/ml/scaler.pkl"):
        """Initialize ML service with model and scaler."""
        self.model = None
        self.scaler = None
        self.metadata = None
        self.preprocessor = None
        
        self.model_path = Path(model_path)
        self.scaler_path = Path(scaler_path)
        self.metadata_path = Path(model_path).parent / "model_metadata.json"
        
        self.load_model()
    
    def load_model(self):
        """Load model, scaler, and metadata."""
        try:
            # Load model
            if self.model_path.exists():
                self.model = joblib.load(self.model_path)
                print(f"✓ Model loaded from {self.model_path}")
            else:
                print(f"⚠ Model file not found: {self.model_path}")
                print("  Run 'python app/ml/train_model.py' to train the model first.")
                return
            
            # Load scaler
            if self.scaler_path.exists():
                self.scaler = joblib.load(self.scaler_path)
                print(f"✓ Scaler loaded from {self.scaler_path}")
            else:
                print(f"⚠ Scaler file not found: {self.scaler_path}")
            
            # Load metadata
            if self.metadata_path.exists():
                with open(self.metadata_path, 'r') as f:
                    self.metadata = json.load(f)
                print(f"✓ Metadata loaded from {self.metadata_path}")
            
            # Initialize preprocessor
            self.preprocessor = DataPreprocessor(str(self.scaler_path))
            
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            raise
    
    def is_ready(self) -> bool:
        """Check if model is loaded and ready."""
        return self.model is not None and self.scaler is not None
    
    def predict(self, student_data: Dict[str, float]) -> Tuple[float, Optional[float], Optional[float]]:
        """
        Make prediction for student data.
        
        Returns:
            Tuple of (predicted_score, confidence_lower, confidence_upper)
        """
        if not self.is_ready():
            raise RuntimeError("Model not loaded. Please train the model first.")
        
        # Validate input
        is_valid, message = self.preprocessor.validate_input(student_data)
        if not is_valid:
            raise ValueError(message)
        
        # Prepare features
        features = self.preprocessor.prepare_features(student_data)
        
        # Make prediction
        predicted_score = float(self.model.predict(features)[0])
        
        # Scale score: Dataset max is ~40. Scaling by 2.5 to approximate 0-100 scale
        scaling_factor = 2.5
        predicted_score = predicted_score * scaling_factor
        
        # Calculate confidence interval (using standard error estimate)
        # For linear regression, we can estimate confidence using residual standard error
        if self.metadata and 'test_rmse' in self.metadata:
            rmse = self.metadata['test_rmse']
            # Scale RMSE as well
            scaled_rmse = rmse * scaling_factor
            # 95% confidence interval: ±1.96 * scaled_rmse
            margin = 1.96 * scaled_rmse
            
            # Clamp prediction to 100 max for display
            display_score = min(predicted_score, 100.0)
            
            confidence_lower = max(0, display_score - margin)
            confidence_upper = min(100, display_score + margin)
            
            # Update predicted score to clamped value for return
            predicted_score = display_score
        else:
            confidence_lower = None
            confidence_upper = None
            predicted_score = min(predicted_score, 100.0)
        
        # Output is already clamped
        
        return predicted_score, confidence_lower, confidence_upper
    
    def get_feature_importance(self) -> Dict[str, float]:
        """Get normalized feature importance (absolute coefficients)."""
        if not self.is_ready() or not self.metadata:
            return {}
        
        # Get coefficients from metadata
        coefficients = self.metadata.get('feature_importance', {})
        
        # Calculate absolute values and normalize
        abs_coeffs = {k: abs(v) for k, v in coefficients.items()}
        total = sum(abs_coeffs.values())
        
        if total > 0:
            normalized = {k: round(v / total, 3) for k, v in abs_coeffs.items()}
        else:
            normalized = abs_coeffs
        
        return normalized
    
    def interpret_score(self, predicted_score: float, student_data: Dict[str, float]) -> str:
        """Generate human-readable interpretation of prediction."""
        # Performance categories
        if predicted_score >= 80:
            performance = "Excellent"
            message = "Outstanding performance expected! 🎉"
        elif predicted_score >= 70:
            performance = "Very Good"
            message = "Strong performance expected! 👏"
        elif predicted_score >= 60:
            performance = "Good"
            message = "Good performance expected. Keep up the effort! 📚"
        elif predicted_score >= 50:
            performance = "Average"
            message = "Average performance. Consider increasing study hours and attendance. 💪"
        elif predicted_score >= 40:
            performance = "Below Average"
            message = "Below average performance. Focus on improving study habits. 📖"
        else:
            performance = "Needs Improvement"
            message = "Significant improvement needed. Consider extra support and focused study. 🎯"
        
        # Add personalized insights
        insights = []
        
        if student_data['hours_studied'] < 5:
            insights.append("Increase study hours for better results")
        elif student_data['hours_studied'] > 10:
            insights.append("Great dedication to studying!")
        
        if student_data['sleep_hours'] < 6:
            insights.append("More sleep could improve cognitive performance")
        elif student_data['sleep_hours'] > 9:
            insights.append("Good sleep habits!")
        
        if student_data['attendance_percent'] < 75:
            insights.append("Improve attendance to boost learning")
        elif student_data['attendance_percent'] > 90:
            insights.append("Excellent attendance!")
        
        if student_data['previous_scores'] < 50:
            insights.append("Build on foundation from previous material")
        
        interpretation = f"{message}\n\nPredicted Performance: {performance} ({predicted_score:.1f}/100)"
        
        if insights:
            interpretation += "\n\nKey Insights:\n• " + "\n• ".join(insights)
        
        return interpretation
    
    def get_model_info(self) -> Dict:
        """Get model metadata and performance metrics."""
        if not self.metadata:
            return {"status": "Model not loaded"}
        
        return {
            "model_version": self.metadata.get('model_version', 'unknown'),
            "model_type": "Multiple Linear Regression",
            "performance": {
                "r2_score": self.metadata.get('test_r2', 0),
                "mae": self.metadata.get('test_mae', 0),
                "rmse": self.metadata.get('test_rmse', 0)
            },
            "features": self.metadata.get('feature_names', []),
            "feature_coefficients": self.metadata.get('feature_importance', {}),
            "status": "ready"
        }


# Global instance
_ml_service_instance = None


def get_ml_service() -> MLService:
    """Get or create ML service singleton."""
    global _ml_service_instance
    if _ml_service_instance is None:
        _ml_service_instance = MLService()
    return _ml_service_instance
