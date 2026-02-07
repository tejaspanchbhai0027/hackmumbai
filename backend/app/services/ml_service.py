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
    
    def __init__(self, model_dir: str = "app/ml"):
        """Initialize ML service with model directory."""
        self.model_reg = None
        self.model_clf = None
        self.scaler = None
        self.metadata = None
        
        self.model_dir = Path(model_dir)
        self.model_reg_path = self.model_dir / "model_reg.pkl"
        self.model_clf_path = self.model_dir / "model_clf.pkl"
        self.scaler_path = self.model_dir / "scaler.pkl"
        self.metadata_path = self.model_dir / "model_metadata.json"
        
        self.load_models()
    
    def load_models(self):
        """Load models, scaler, and metadata."""
        try:
            # Load Regression Model
            if self.model_reg_path.exists():
                self.model_reg = joblib.load(self.model_reg_path)
                print(f"✓ Regression Model loaded from {self.model_reg_path}")
            else:
                print(f"⚠ Regression Model not found: {self.model_reg_path}")

            # Load Classification Model
            if self.model_clf_path.exists():
                self.model_clf = joblib.load(self.model_clf_path)
                print(f"✓ Classification Model loaded from {self.model_clf_path}")
            else:
                print(f"⚠ Classification Model not found: {self.model_clf_path}")

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
            
        except Exception as e:
            print(f"❌ Error loading models: {e}")
            raise
    
    def is_ready(self) -> bool:
        """Check if both models are loaded."""
        return self.model_reg is not None and self.model_clf is not None and self.scaler is not None
    
    def predict(self, student_data: Dict[str, float]) -> Tuple[float, float, float, Dict[str, any]]:
        """
        Predict student performance.
        Returns: (predicted_score, confidence_lower, confidence_upper, classification_result)
        """
        if not self.is_ready():
            raise RuntimeError("Models not loaded. Please train the model first.")
        
        # Prepare features array (hours_studied, sleep_hours, attendance_percent, previous_scores)
        features = np.array([[
            student_data['hours_studied'],
            student_data['sleep_hours'],
            student_data['attendance_percent'],
            student_data['previous_scores']
        ]])
        
        # Scale input
        features_scaled = self.scaler.transform(features)
        
        # 1. Regression Prediction
        predicted_score = float(self.model_reg.predict(features_scaled)[0])
        predicted_score = max(0, min(100, predicted_score)) # Clamp
        
        # Calculate confidence interval
        mae = 5.0 # Default
        if self.metadata and 'regression' in self.metadata:
            mae = self.metadata['regression'].get('mae', 5.0)
            
        confidence_lower = max(0, predicted_score - mae)
        confidence_upper = min(100, predicted_score + mae)
        
        # 2. Classification Prediction
        pass_prob = float(self.model_clf.predict_proba(features_scaled)[0][1])
        status = "Pass" if pass_prob >= 0.5 else "Fail"
        
        classification_result = {
            "status": status,
            "pass_probability": round(pass_prob, 2)
        }
        
        return predicted_score, confidence_lower, confidence_upper, classification_result
    
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
    
    def generate_study_advice(self, predicted_score: float, student_data: Dict[str, float]) -> Dict:
        """Generate structured AI coach advice."""
        import random
        
        advice = {
            "summary": "",
            "strengths": [],
            "improvements": [],
            "actionable_steps": [],
            "motivational_quote": ""
        }
        
        # 1. Summary based on score
        if predicted_score >= 80:
            advice["summary"] = "You're showcasing excellent potential! Your current habits are highly effective."
        elif predicted_score >= 60:
            advice["summary"] = "You're doing well, but there's room to push for excellence with a few adjustments."
        elif predicted_score >= 40:
            advice["summary"] = "You have a solid foundation, but consistency and valid study strategies are needed to improve."
        else:
            advice["summary"] = "It looks like you might struggle with the current approach. Let's revamp your study plan."

        # 2. Key factors analysis
        hours = student_data.get('hours_studied', 0)
        sleep = student_data.get('sleep_hours', 0)
        attendance = student_data.get('attendance_percent', 0)
        previous = student_data.get('previous_scores', 0)
        
        # Hours Studied
        if hours >= 7:
            advice["strengths"].append(f"Dedication: {hours} hours of study is impressive.")
        elif hours >= 4:
            advice["improvements"].append("Study Time: Try to add 1-2 more hours of focused study.")
            advice["actionable_steps"].append("Use the Pomodoro technique (25m study / 5m break) to stay focused.")
        else:
            advice["improvements"].append("Study Time: Your study hours are quite low.")
            advice["actionable_steps"].append("Create a fixed daily schedule with at least 2 hours of study time.")
            
        # Sleep
        if 7 <= sleep <= 9:
            advice["strengths"].append("Health: You're getting optimal sleep for memory consolidation.")
        elif sleep < 6:
            advice["improvements"].append("Rest: You're likely sleep-deprived, which hurts memory retention.")
            advice["actionable_steps"].append("Set a 'digital curfew' 1 hour before bed to improve sleep quality.")
        elif sleep > 10:
            advice["improvements"].append("Routine: You might be oversleeping, which can cause grogginess.")
            
        # Attendance
        if attendance >= 90:
            advice["strengths"].append("Consistency: Your class attendance is excellent.")
        elif attendance < 75:
            advice["improvements"].append("Attendance: Missing classes creates gaps in your knowledge.")
            advice["actionable_steps"].append("Review missed lecture notes with a peer or TA this week.")
            
        # Previous Scores
        if previous >= 80:
            advice["strengths"].append("Foundation: You have a strong academic background.")
        elif previous < 50:
             advice["actionable_steps"].append("Focus on mastering the basics from previous modules before advancing.")

        # 3. Random Quote
        quotes = [
            "Success is the sum of small efforts, repeated day in and day out. – Robert Collier",
            "The secret of getting ahead is getting started. – Mark Twain",
            "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
            "Quality is not an act, it is a habit. – Aristotle",
            "Believe you can and you're halfway there. – Theodore Roosevelt",
            "It always seems impossible until it's done. – Nelson Mandela",
            "There are no shortcuts to any place worth going. – Beverly Sills"
        ]
        advice["motivational_quote"] = random.choice(quotes)
        
        return advice
    
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
