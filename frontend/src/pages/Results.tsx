import { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { PredictionResponse, StudentInput } from '../types';
import { simulateScore } from '../services/api';
import StudyCoach from '../components/predictions/StudyCoach';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Results: React.FC = () => {
    const location = useLocation();

    const { prediction: initialPrediction, studentData: initialStudentData } = location.state as { prediction: PredictionResponse; studentData: StudentInput } || {};

    const [simulatedData, setSimulatedData] = useState<StudentInput | null>(initialStudentData || null);
    const [simulatedPrediction, setSimulatedPrediction] = useState<PredictionResponse | null>(initialPrediction || null);
    const [isSimulating, setIsSimulating] = useState(false);

    // Custom debounce implementation
    const debouncedSimulate = useCallback(
        (data: StudentInput) => {
            const timeoutId = setTimeout(async () => {
                try {
                    setIsSimulating(true);
                    const result = await simulateScore(data);
                    setSimulatedPrediction(result);
                } catch (error) {
                    console.error("Simulation failed", error);
                } finally {
                    setIsSimulating(false);
                }
            }, 500);
            return () => clearTimeout(timeoutId);
        },
        []
    );

    useEffect(() => {
        if (simulatedData) {
            const cleanup = debouncedSimulate(simulatedData);
            return () => {
                if (typeof cleanup === 'function') cleanup();
            };
        }
    }, [simulatedData, debouncedSimulate]);

    const handleSliderChange = (field: keyof StudentInput, value: number) => {
        if (!simulatedData) return;
        setSimulatedData({
            ...simulatedData,
            [field]: value
        });
    };

    if (!initialPrediction) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <Card className="max-w-md text-center">
                    <p className="text-xl mb-4">No prediction data found.</p>
                    <Link to="/predict">
                        <Button variant="primary">Make a Prediction</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    // Determine score category and color
    const getScoreCategory = (score: number) => {
        if (score >= 80) return { label: 'Excellent', color: '#22c55e', bgColor: 'bg-success-500' };
        if (score >= 70) return { label: 'Very Good', color: '#3b82f6', bgColor: 'bg-primary-500' };
        if (score >= 60) return { label: 'Good', color: '#06b6d4', bgColor: 'bg-cyan-500' };
        if (score >= 50) return { label: 'Average', color: '#f59e0b', bgColor: 'bg-warning-500' };
        if (score >= 40) return { label: 'Below Average', color: '#f97316', bgColor: 'bg-orange-500' };
        return { label: 'Needs Improvement', color: '#ef4444', bgColor: 'bg-danger-500' };
    };

    const scoreCategory = getScoreCategory(simulatedPrediction?.predicted_score || 0);

    // Prepare feature importance data for chart (using simulated prediction)
    const featureData = Object.entries(simulatedPrediction?.feature_importance || {}).map(([key, value]) => ({
        name: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        value: value * 100, // Convert to percentage
    }));

    const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

    return (
        <div className="min-h-screen px-4 py-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-5xl font-display font-bold mb-4">
                        <span className="gradient-text">What-If Simulator</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Adjust parameters to see how they impact your score in real-time!
                    </p>
                </div>

                {/* Simulator Controls */}
                {simulatedData && (
                    <Card className="mb-8 animate-slide-up bg-gradient-to-br from-primary-900/5 to-secondary-900/5 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-500/30">
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <span>🎛️</span> Simulator Controls
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Hours Studied */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Hours Studied</label>
                                    <span className="text-primary-600 dark:text-primary-400 font-bold">{simulatedData.hours_studied}h</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="24"
                                    step="0.5"
                                    value={simulatedData.hours_studied}
                                    onChange={(e) => handleSliderChange('hours_studied', parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-500"
                                />
                            </div>

                            {/* Sleep Hours */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sleep Hours</label>
                                    <span className="text-primary-600 dark:text-primary-400 font-bold">{simulatedData.sleep_hours}h</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="24"
                                    step="0.5"
                                    value={simulatedData.sleep_hours}
                                    onChange={(e) => handleSliderChange('sleep_hours', parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-500"
                                />
                            </div>

                            {/* Attendance */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Attendance</label>
                                    <span className="text-primary-600 dark:text-primary-400 font-bold">{simulatedData.attendance_percent}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={simulatedData.attendance_percent}
                                    onChange={(e) => handleSliderChange('attendance_percent', parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-500"
                                />
                            </div>

                            {/* Previous Scores */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Previous Scores</label>
                                    <span className="text-primary-600 dark:text-primary-400 font-bold">{simulatedData.previous_scores}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={simulatedData.previous_scores}
                                    onChange={(e) => handleSliderChange('previous_scores', parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-500"
                                />
                            </div>
                        </div>
                    </Card>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Prediction Gauge */}
                    <Card className="animate-scale-in relative">
                        {isSimulating && (
                            <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
                                <div className="animate-spin text-4xl">🔮</div>
                            </div>
                        )}
                        <h2 className="text-2xl font-semibold mb-6 text-center">Predicted Exam Score</h2>
                        <div className="relative w-64 h-64 mx-auto">
                            {/* Circular Progress */}
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="128"
                                    cy="128"
                                    r="100"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="20"
                                />
                                <circle
                                    cx="128"
                                    cy="128"
                                    r="100"
                                    fill="none"
                                    stroke={scoreCategory.color}
                                    strokeWidth="20"
                                    strokeDasharray={`${(simulatedPrediction?.predicted_score || 0 / 100) * 628} 628`}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="text-6xl font-bold" style={{ color: scoreCategory.color }}>
                                    {simulatedPrediction?.predicted_score.toFixed(1)}
                                </div>
                                <div className="text-xl text-gray-300 mt-2">/ 100</div>
                                <div className={`mt-3 px-4 py-1 ${scoreCategory.bgColor} rounded-full text-sm font-semibold`}>
                                    {scoreCategory.label}
                                </div>
                            </div>
                        </div>

                        {/* Confidence Interval */}
                        {simulatedPrediction?.confidence_lower && simulatedPrediction?.confidence_upper && (
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">95% Confidence Interval</p>
                                <p className="text-lg">
                                    <span className="text-primary-400 font-semibold">
                                        {simulatedPrediction.confidence_lower.toFixed(1)}
                                    </span>
                                    <span className="text-gray-400 mx-2">to</span>
                                    <span className="text-primary-400 font-semibold">
                                        {simulatedPrediction.confidence_upper.toFixed(1)}
                                    </span>
                                </p>
                            </div>
                        )}

                        {/* Pass/Fail Classification */}
                        {simulatedPrediction?.classification && (
                            <div className="mt-6 flex flex-col items-center animate-fade-in">
                                <div className={`px-4 py-2 rounded-full text-lg font-bold border ${simulatedPrediction.classification.status === 'Pass'
                                        ? 'bg-green-500/20 text-green-500 border-green-500/50'
                                        : 'bg-red-500/20 text-red-500 border-red-500/50'
                                    }`}>
                                    {simulatedPrediction.classification.status === 'Pass' ? '✅ PASS' : '❌ FAIL'}
                                </div>
                                <div className="mt-2 text-sm text-gray-400">
                                    Probability: {(simulatedPrediction.classification.pass_probability * 100).toFixed(1)}%
                                </div>
                            </div>
                        )}
                    </Card>

                    {/* Feature Importance */}
                    <Card className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
                        <h2 className="text-2xl font-semibold mb-2">What Drives Success?</h2>
                        <p className="text-gray-400 mb-6 text-sm">Relative importance of factors in the AI model</p>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={featureData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis type="number" stroke="#9ca3af" unit="%" />
                                <YAxis dataKey="name" type="category" width={150} stroke="#9ca3af" />
                                <Tooltip
                                    formatter={(value: number) => [`${value.toFixed(1)}%`, 'Impact']}
                                    contentStyle={{
                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '8px',
                                    }}
                                />
                                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                                    {featureData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                            Shows which factors contribute most to the final score calculation
                        </p>
                    </Card>
                </div>

                {/* AI Study Coach */}
                <StudyCoach
                    advice={simulatedPrediction?.study_coach}
                    isLoading={isSimulating}
                />

                {/* Interpretation */}
                <Card className="mb-8 animate-slide-up">
                    <h2 className="text-2xl font-semibold mb-4">📊 Detailed Analysis</h2>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{simulatedPrediction?.interpretation}</p>
                    </div>
                </Card>

                {/* Your Input Data */}
                {initialStudentData && (
                    <Card className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <h2 className="text-2xl font-semibold mb-4">📝 Your Input Data</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 glass rounded-lg">
                                <div className="text-3xl mb-2">📚</div>
                                <div className="text-2xl font-bold text-primary-400">{initialStudentData.hours_studied}</div>
                                <div className="text-sm text-gray-400">Hours Studied</div>
                            </div>
                            <div className="text-center p-4 glass rounded-lg">
                                <div className="text-3xl mb-2">😴</div>
                                <div className="text-2xl font-bold text-primary-400">{initialStudentData.sleep_hours}</div>
                                <div className="text-sm text-gray-400">Sleep Hours</div>
                            </div>
                            <div className="text-center p-4 glass rounded-lg">
                                <div className="text-3xl mb-2">✅</div>
                                <div className="text-2xl font-bold text-primary-400">{initialStudentData.attendance_percent}%</div>
                                <div className="text-sm text-gray-400">Attendance</div>
                            </div>
                            <div className="text-center p-4 glass rounded-lg">
                                <div className="text-3xl mb-2">📊</div>
                                <div className="text-2xl font-bold text-primary-400">{initialStudentData.previous_scores}</div>
                                <div className="text-sm text-gray-400">Previous Scores</div>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/predict">
                        <Button variant="primary" size="lg">
                            🔄 Try Another Prediction
                        </Button>
                    </Link>
                    <Link to="/history">
                        <Button variant="secondary" size="lg">
                            📜 View History
                        </Button>
                    </Link>
                    <Link to="/">
                        <Button variant="outline" size="lg">
                            🏠 Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Results;
