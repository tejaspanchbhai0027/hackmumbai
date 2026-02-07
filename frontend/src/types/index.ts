export interface StudentInput {
    hours_studied: number;
    sleep_hours: number;
    attendance_percent: number;
    previous_scores: number;
}

export interface StudyCoachAdvice {
    summary: string;
    strengths: string[];
    improvements: string[];
    actionable_steps: string[];
    motivational_quote: string;
}

export interface ClassificationResult {
    status: string;
    pass_probability: number;
}

export interface PredictionResponse {
    predicted_score: number;
    confidence_lower: number | null;
    confidence_upper: number | null;
    classification?: ClassificationResult;
    feature_importance: Record<string, number>;
    interpretation: string;
    study_coach?: StudyCoachAdvice;
    prediction_id: number | null;
}

export interface BatchPredictionItem extends PredictionResponse {
    student_name: string;
}

export interface BatchPredictionResponse {
    total_processed: number;
    successful: number;
    failed: number;
    results: BatchPredictionItem[];
    errors: string[];
}

export interface PredictionHistory {
    id: number;
    student_data: StudentInput;
    predicted_score: number;
    confidence_lower: number | null;
    confidence_upper: number | null;
    model_version: string;
    created_at: string;
}

export interface PredictionHistoryResponse {
    total: number;
    predictions: PredictionHistory[];
    page: number;
    page_size: number;
}

export interface ModelInfo {
    model_version: string;
    model_type: string;
    performance: {
        r2_score: number;
        mae: number;
        rmse: number;
    };
    features: string[];
    feature_coefficients: Record<string, number>;
    status: string;
}
