import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { PredictionHistory as PredictionHistoryType } from '../types';
import { getPredictionHistory } from '../services/api';

const History: React.FC = () => {
    const [predictions, setPredictions] = useState<PredictionHistoryType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const data = await getPredictionHistory(1, 20);
            setPredictions(data.predictions);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load history');
        } finally {
            setIsLoading(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-success-400';
        if (score >= 70) return 'text-primary-400';
        if (score >= 60) return 'text-cyan-400';
        if (score >= 50) return 'text-warning-400';
        if (score >= 40) return 'text-orange-400';
        return 'text-danger-400';
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader size="lg" text="Loading prediction history..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <Card className="max-w-md text-center">
                    <div className="text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-semibold mb-2">Error Loading History</h2>
                    <p className="text-gray-400 mb-4">{error}</p>
                    <Button variant="primary" onClick={loadHistory}>
                        Try Again
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 py-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-5xl font-display font-bold mb-4">
                        <span className="gradient-text">Prediction History</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Review your past predictions and track your progress
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="text-center">
                        <div className="text-4xl mb-2">📊</div>
                        <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">{predictions.length}</div>
                        <div className="text-gray-600 dark:text-gray-400">Total Predictions</div>
                    </Card>
                    <Card className="text-center">
                        <div className="text-4xl mb-2">📈</div>
                        <div className="text-3xl font-bold text-success-600 dark:text-success-400">
                            {predictions.length > 0
                                ? (predictions.reduce((sum, p) => sum + p.predicted_score, 0) / predictions.length).toFixed(1)
                                : '0'}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">Average Score</div>
                    </Card>
                    <Card className="text-center">
                        <div className="text-4xl mb-2">🏆</div>
                        <div className="text-3xl font-bold text-warning-600 dark:text-warning-400">
                            {predictions.length > 0 ? Math.max(...predictions.map(p => p.predicted_score)).toFixed(1) : '0'}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">Best Score</div>
                    </Card>
                </div>

                {/* Predictions List */}
                {predictions.length === 0 ? (
                    <Card className="text-center py-12">
                        <div className="text-6xl mb-4">📭</div>
                        <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">No Predictions Yet</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">Start by making your first prediction!</p>
                        <Link to="/predict">
                            <Button variant="primary" size="lg">
                                Make a Prediction
                            </Button>
                        </Link>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {predictions.map((pred, index) => (
                            <Card key={pred.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className={`text-4xl font-bold ${getScoreColor(pred.predicted_score)}`}>
                                                {pred.predicted_score.toFixed(1)}
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(pred.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </div>
                                                {pred.confidence_lower && pred.confidence_upper && (
                                                    <div className="text-xs text-gray-500">
                                                        Confidence: {pred.confidence_lower.toFixed(1)} - {pred.confidence_upper.toFixed(1)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                                            <div className="text-gray-600 dark:text-gray-400">
                                                📚 Study: <span className="text-gray-900 dark:text-white">{pred.student_data.hours_studied}h</span>
                                            </div>
                                            <div className="text-gray-600 dark:text-gray-400">
                                                😴 Sleep: <span className="text-gray-900 dark:text-white">{pred.student_data.sleep_hours}h</span>
                                            </div>
                                            <div className="text-gray-600 dark:text-gray-400">
                                                ✅ Attendance: <span className="text-gray-900 dark:text-white">{pred.student_data.attendance_percent}%</span>
                                            </div>
                                            <div className="text-gray-600 dark:text-gray-400">
                                                📊 Previous: <span className="text-gray-900 dark:text-white">{pred.student_data.previous_scores}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs">
                                            v{pred.model_version}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Back Button */}
                <div className="mt-8 text-center">
                    <Link to="/">
                        <Button variant="secondary" size="lg">
                            ← Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default History;
