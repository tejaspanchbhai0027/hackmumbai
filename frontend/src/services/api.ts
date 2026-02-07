import axios from 'axios';
import { StudentInput, PredictionResponse, PredictionHistoryResponse, ModelInfo, BatchPredictionResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // You can add auth tokens here if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        let message = error.response?.data?.detail || error.message || 'An error occurred';
        if (typeof message === 'object') {
            message = JSON.stringify(message);
        }
        console.error('API Error:', message);
        return Promise.reject(new Error(message));
    }
);

export const predictScore = async (studentData: StudentInput): Promise<PredictionResponse> => {
    const response = await api.post<PredictionResponse>('/api/predict', studentData);
    return response.data;
};

export const simulateScore = async (studentData: StudentInput): Promise<PredictionResponse> => {
    const response = await api.post<PredictionResponse>('/api/simulate', studentData);
    return response.data;
};

export const uploadCSV = async (file: File): Promise<BatchPredictionResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<BatchPredictionResponse>('/api/upload/csv', formData);
    return response.data;
};

export const getModelInfo = async (): Promise<ModelInfo> => {
    const response = await api.get<ModelInfo>('/api/model-info');
    return response.data;
};

export const getPredictionHistory = async (page: number = 1, pageSize: number = 10): Promise<PredictionHistoryResponse> => {
    const response = await api.get<PredictionHistoryResponse>('/api/history', {
        params: { page, page_size: pageSize },
    });
    return response.data;
};

export const deletePrediction = async (predictionId: number): Promise<void> => {
    await api.delete(`/api/history/${predictionId}`);
};

export default api;
