export interface StudentInput {
    hours_studied: number;
    sleep_hours: number;
    attendance_percent: number;
    previous_scores: number;
}

export interface PredictionResponse {
    predicted_score: number;
    confidence_lower: number | null;
    confidence_upper: number | null;
    feature_importance: Record<string, number>;
    interpretation: string;
    prediction_id: number | null;
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
