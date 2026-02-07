"""
train_model.py - Train Multiple Linear Regression model for exam score prediction
"""
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
import joblib
import json
from pathlib import Path


def load_data(csv_path: str = "../../docs/raspp.csv") -> pd.DataFrame:
    """Load the dataset from CSV."""
    print(f"📂 Loading data from {csv_path}...")
    df = pd.read_csv(csv_path)
    print(f"✓ Loaded {len(df)} records")
    print(f"✓ Columns: {list(df.columns)}")
    return df


def explore_data(df: pd.DataFrame) -> None:
    """Explore and display data statistics."""
    print("\n📊 Data Exploration:")
    print("\nDataset Info:")
    print(df.info())
    print("\nStatistical Summary:")
    print(df.describe())
    print("\nMissing Values:")
    print(df.isnull().sum())
    
    # Drop non-numeric columns for correlation
    numeric_df = df.select_dtypes(include=[np.number])
    if 'exam_score' in numeric_df.columns:
        print("\nCorrelation with Exam Score:")
        correlations = numeric_df.corr()['exam_score'].sort_values(ascending=False)
        print(correlations)


def prepare_features(df: pd.DataFrame):
    """Prepare features and target variable."""
    print("\n🔧 Preparing features...")
    
    # Define features and target
    feature_columns = ['hours_studied', 'sleep_hours', 'attendance_percent', 'previous_scores']
    target_column = 'exam_score'
    
    # Check for missing values
    if df[feature_columns + [target_column]].isnull().any().any():
        print("⚠ Warning: Missing values detected. Filling with median...")
        df[feature_columns] = df[feature_columns].fillna(df[feature_columns].median())
        df[target_column] = df[target_column].fillna(df[target_column].median())
    
    X = df[feature_columns]
    y = df[target_column]
    
    print(f"✓ Features shape: {X.shape}")
    print(f"✓ Target shape: {y.shape}")
    print(f"✓ Feature columns: {feature_columns}")
    
    return X, y, feature_columns


def train_model(X_train, y_train, X_test, y_test, feature_names):
    """Train Multiple Linear Regression model."""
    print("\n🤖 Training Multiple Linear Regression model...")
    
    # Initialize and train scaler
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Initialize and train model
    model = LinearRegression()
    model.fit(X_train_scaled, y_train)
    
    # Make predictions
    y_train_pred = model.predict(X_train_scaled)
    y_test_pred = model.predict(X_test_scaled)
    
    # Calculate metrics
    train_r2 = r2_score(y_train, y_train_pred)
    test_r2 = r2_score(y_test, y_test_pred)
    train_mae = mean_absolute_error(y_train, y_train_pred)
    test_mae = mean_absolute_error(y_test, y_test_pred)
    train_rmse = np.sqrt(mean_squared_error(y_train, y_train_pred))
    test_rmse = np.sqrt(mean_squared_error(y_test, y_test_pred))
    
    print("\n📈 Model Performance:")
    print(f"  Training Set:")
    print(f"    R² Score: {train_r2:.4f}")
    print(f"    MAE: {train_mae:.4f}")
    print(f"    RMSE: {train_rmse:.4f}")
    print(f"\n  Test Set:")
    print(f"    R² Score: {test_r2:.4f}")
    print(f"    MAE: {test_mae:.4f}")
    print(f"    RMSE: {test_rmse:.4f}")
    
    # Feature importance (coefficients)
    feature_importance = dict(zip(feature_names, model.coef_))
    print(f"\n🔍 Feature Coefficients:")
    for feature, coef in sorted(feature_importance.items(), key=lambda x: abs(x[1]), reverse=True):
        print(f"    {feature}: {coef:.4f}")
    
    metrics = {
        'train_r2': float(train_r2),
        'test_r2': float(test_r2),
        'train_mae': float(train_mae),
        'test_mae': float(test_mae),
        'train_rmse': float(train_rmse),
        'test_rmse': float(test_rmse),
        'feature_importance': {k: float(v) for k, v in feature_importance.items()},
        'intercept': float(model.intercept_),
        'feature_names': feature_names,
        'model_version': '1.0.0'
    }
    
    return model, scaler, metrics


def save_artifacts(model, scaler, metrics):
    """Save model, scaler, and metadata."""
    print("\n💾 Saving model artifacts...")
    
    # Create ml directory if it doesn't exist
    ml_dir = Path(__file__).parent
    ml_dir.mkdir(exist_ok=True)
    
    # Save model
    model_path = ml_dir / "model.pkl"
    joblib.dump(model, model_path)
    print(f"✓ Model saved to {model_path}")
    
    # Save scaler
    scaler_path = ml_dir / "scaler.pkl"
    joblib.dump(scaler, scaler_path)
    print(f"✓ Scaler saved to {scaler_path}")
    
    # Save metadata
    metadata_path = ml_dir / "model_metadata.json"
    with open(metadata_path, 'w') as f:
        json.dump(metrics, f, indent=2)
    print(f"✓ Metadata saved to {metadata_path}")


def main():
    """Main training pipeline."""
    print("=" * 70)
    print("🎓 RASPP - Student Exam Score Prediction Model Training")
    print("=" * 70)
    
    # Determine the correct path to the CSV file
    script_dir = Path(__file__).parent
    csv_path = script_dir.parent.parent.parent / "docs" / "raspp.csv"
    
    # Load and explore data
    df = load_data(str(csv_path))
    explore_data(df)
    
    # Prepare features
    X, y, feature_names = prepare_features(df)
    
    # Split data
    print("\n✂ Splitting data (80% train, 20% test)...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    print(f"✓ Training set: {X_train.shape[0]} samples")
    print(f"✓ Test set: {X_test.shape[0]} samples")
    
    # Train model
    model, scaler, metrics = train_model(X_train, y_train, X_test, y_test, feature_names)
    
    # Save artifacts
    save_artifacts(model, scaler, metrics)
    
    # Final summary
    print("\n" + "=" * 70)
    print("✅ Model Training Complete!")
    print("=" * 70)
    print(f"📊 Test R² Score: {metrics['test_r2']:.4f} {'✓ PASS' if metrics['test_r2'] > 0.70 else '⚠ Below target (0.70)'}")
    print(f"📉 Test MAE: {metrics['test_mae']:.4f} {'✓ PASS' if metrics['test_mae'] < 5 else '⚠ Above target (5.0)'}")
    print(f"📉 Test RMSE: {metrics['test_rmse']:.4f}")
    print("\n🚀 Model is ready for production use!")
    print("=" * 70)


if __name__ == "__main__":
    main()
