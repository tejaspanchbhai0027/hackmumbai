import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { StudentInput, PredictionResponse } from '../types';
import { predictScore } from '../services/api';

const Prediction: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<StudentInput>();

    const onSubmit = async (data: StudentInput) => {
        setIsLoading(true);
        setError(null);

        try {
            const prediction = await predictScore(data);
            // Navigate to results page with prediction data
            navigate('/results', { state: { prediction, studentData: data } });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to get prediction');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-5xl font-display font-bold mb-4">
                        <span className="gradient-text">Predict Your Success</span>
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Enter your academic details to get an AI-powered prediction of your exam performance.
                    </p>
                </div>

                <Card className="animate-slide-up">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Hours Studied */}
                        <Input
                            label="Hours Studied Per Day"
                            type="number"
                            step="0.1"
                            placeholder="e.g., 8.0"
                            helperText="Daily study hours (0-24)"
                            error={errors.hours_studied?.message}
                            {...register('hours_studied', {
                                required: 'Hours studied is required',
                                min: { value: 0, message: 'Must be at least 0' },
                                max: { value: 24, message: 'Cannot exceed 24 hours' },
                                valueAsNumber: true,
                            })}
                        />

                        {/* Sleep Hours */}
                        <Input
                            label="Sleep Hours Per Day"
                            type="number"
                            step="0.1"
                            placeholder="e.g., 7.5"
                            helperText="Average daily sleep hours (0-24)"
                            error={errors.sleep_hours?.message}
                            {...register('sleep_hours', {
                                required: 'Sleep hours is required',
                                min: { value: 0, message: 'Must be at least 0' },
                                max: { value: 24, message: 'Cannot exceed 24 hours' },
                                valueAsNumber: true,
                            })}
                        />

                        {/* Attendance */}
                        <Input
                            label="Attendance Percentage"
                            type="number"
                            step="0.1"
                            placeholder="e.g., 85.0"
                            helperText="Class attendance percentage (0-100)"
                            error={errors.attendance_percent?.message}
                            {...register('attendance_percent', {
                                required: 'Attendance is required',
                                min: { value: 0, message: 'Must be at least 0%' },
                                max: { value: 100, message: 'Cannot exceed 100%' },
                                valueAsNumber: true,
                            })}
                        />

                        {/* Previous Scores */}
                        <Input
                            label="Previous Exam Scores"
                            type="number"
                            step="0.1"
                            placeholder="e.g., 75.0"
                            helperText="Your average previous exam scores (0-100)"
                            error={errors.previous_scores?.message}
                            {...register('previous_scores', {
                                required: 'Previous scores is required',
                                min: { value: 0, message: 'Must be at least 0' },
                                max: { value: 100, message: 'Cannot exceed 100' },
                                valueAsNumber: true,
                            })}
                        />

                        {/* Error Message */}
                        {error && (
                            <div className="p-4 bg-danger-500/10 border border-danger-500/50 rounded-lg text-danger-400">
                                <p className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex gap-4">
                            <Button
                                type="submit"
                                variant="primary"
                                className="flex-1"
                                isLoading={isLoading}
                            >
                                🔮 Predict Score
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/')}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Card>

                <div className="mt-6 text-center text-sm text-gray-400">
                    <p>🔒 Your data is processed securely and saved for your reference.</p>
                </div>
            </div>
        </div>
    );
};

export default Prediction;
