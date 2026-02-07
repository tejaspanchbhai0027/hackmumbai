"""
main.py - FastAPI application entry point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import get_settings
from app.database import init_db
from app.routers import predict, history
from app.services.ml_service import get_ml_service

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan events for startup and shutdown."""
    # Startup
    print("\n🚀 Starting RASPP API Server...")
    print("=" * 70)
    
    # Initialize database
    try:
        init_db()
        print("✓ Database initialized")
    except Exception as e:
        print(f"⚠ Database initialization warning: {e}")
        print("  Make sure MySQL is running and credentials are configured in .env")
    
    # Load ML model
    try:
        ml_service = get_ml_service()
        if ml_service.is_ready():
            print("✓ ML model loaded and ready")
            model_info = ml_service.get_model_info()
            print(f"  Model Version: {model_info.get('model_version', 'unknown')}")
            print(f"  R² Score: {model_info.get('performance', {}).get('r2_score', 0):.4f}")
        else:
            print("⚠ ML model not loaded")
            print("  Run 'python app/ml/train_model.py' to train the model")
    except Exception as e:
        print(f"⚠ ML model loading warning: {e}")
    
    print("=" * 70)
    print("✅ Server is ready!")
    print(f"📡 API Docs: http://localhost:{settings.API_PORT}/docs")
    print(f"📊 ReDoc: http://localhost:{settings.API_PORT}/redoc")
    print("=" * 70)
    
    yield
    
    # Shutdown
    print("\n👋 Shutting down RASPP API Server...")


# Create FastAPI app
app = FastAPI(
    title="RASPP API",
    description="Real-time Admission Success Prediction Platform - Student Exam Score Prediction API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(predict.router)
app.include_router(history.router)


@app.get("/", tags=["root"])
async def root():
    """Root endpoint - API information."""
    return {
        "name": "RASPP API",
        "version": "1.0.0",
        "description": "Student Exam Score Prediction API",
        "docs": "/docs",
        "endpoints": {
            "predict": "/api/predict",
            "model_info": "/api/model-info",
            "history": "/api/history"
        }
    }


@app.get("/health", tags=["health"])
async def health_check():
    """Health check endpoint."""
    ml_service = get_ml_service()
    
    return {
        "status": "healthy",
        "model_ready": ml_service.is_ready() if ml_service else False,
        "api_version": "1.0.0"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.DEBUG
    )
