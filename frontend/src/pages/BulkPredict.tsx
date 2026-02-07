import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StudyCoach from '../components/predictions/StudyCoach';
import { uploadCSV } from '../services/api';
import { BatchPredictionResponse, BatchPredictionItem } from '../types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const BulkPredict: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<BatchPredictionResponse | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<BatchPredictionItem | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsLoading(true);
        try {
            const res = await uploadCSV(file);
            setResponse(res);
        } catch (error) {
            console.error("Upload failed", error);
            const message = error instanceof Error ? error.message : "Failed to process file.";
            alert(message);
        } finally {
            setIsLoading(false);
        }
    };

    const getScoreCategory = (score: number) => {
        if (score >= 80) return { label: 'Excellent', color: 'text-green-500' };
        if (score >= 70) return { label: 'Very Good', color: 'text-blue-500' };
        if (score >= 60) return { label: 'Good', color: 'text-cyan-500' };
        if (score >= 50) return { label: 'Average', color: 'text-yellow-500' };
        if (score >= 40) return { label: 'Below Avg', color: 'text-orange-500' };
        return { label: 'Action Needed', color: 'text-red-500' };
    };

    return (
        <div className="min-h-screen px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-4xl font-display font-bold mb-4">
                        <span className="gradient-text">Bulk Prediction</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Upload a CSV file to analyze multiple students at once.
                    </p>
                </div>

                {/* Upload Section */}
                <Card className="mb-8 animate-slide-up">
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8">
                        <div className="text-4xl mb-4">📂</div>
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="hidden"
                            id="csv-upload"
                        />
                        <label htmlFor="csv-upload" className="cursor-pointer mb-4">
                            <span className="text-primary-500 font-semibold hover:underline">
                                {file ? file.name : "Choose CSV File"}
                            </span>
                        </label>
                        <p className="text-sm text-gray-500 mb-6 text-center">
                            Supported files: <strong>Standard CSV</strong> or <strong>Training Dataset</strong> (e.g. <em>student_performance_ml_dataset.csv</em>)
                        </p>
                        <Button
                            variant="primary"
                            onClick={handleUpload}
                            disabled={!file || isLoading}
                        >
                            {isLoading ? 'Processing...' : 'Analyze Students'}
                        </Button>
                    </div>
                </Card>

                {/* Results Table */}
                {response && (
                    <div className="animate-slide-up">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <Card className="flex items-center justify-between p-4">
                                <span className="text-gray-500">Processed</span>
                                <span className="text-2xl font-bold">{response.total_processed}</span>
                            </Card>
                            <Card className="flex items-center justify-between p-4 border-green-500/20 bg-green-500/5">
                                <span className="text-green-600">Successful</span>
                                <span className="text-2xl font-bold text-green-600">{response.successful}</span>
                            </Card>
                            <Card className="flex items-center justify-between p-4 border-red-500/20 bg-red-500/5">
                                <span className="text-red-600">Failed</span>
                                <span className="text-2xl font-bold text-red-600">{response.failed}</span>
                            </Card>
                        </div>

                        {response.errors.length > 0 && (
                            <Card className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900">
                                <h3 className="text-red-600 font-semibold mb-2">Errors:</h3>
                                <ul className="list-disc pl-5 text-sm text-red-600">
                                    {response.errors.map((err, i) => <li key={i}>{err}</li>)}
                                </ul>
                            </Card>
                        )}

                        <Card className="overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3">Student Name</th>
                                        <th className="px-6 py-3">Predicted Score</th>
                                        <th className="px-6 py-3">Analysis</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {response.results.map((student, idx) => {
                                        const category = getScoreCategory(student.predicted_score);
                                        return (
                                            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                <td className="px-6 py-4 font-medium">{student.student_name}</td>
                                                <td className="px-6 py-4">
                                                    <span className="text-lg font-bold">{student.predicted_score}</span>
                                                    <span className="text-xs text-gray-400 ml-1">/ 100</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-opacity-10 ${category.color.replace('text-', 'bg-')} ${category.color}`}>
                                                        {category.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {student.classification ? (
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.classification.status === 'Pass'
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                            }`}>
                                                            {student.classification.status}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400">-</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => setSelectedStudent(student)}
                                                        className="text-primary-500 hover:text-primary-600 font-medium text-sm"
                                                    >
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </Card>
                    </div>
                )}

                {/* Detail Modal */}
                {selectedStudent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
                            <div className="sticky top-0 bg-white dark:bg-slate-900 p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center z-10">
                                <div>
                                    <h2 className="text-2xl font-bold">{selectedStudent.student_name}</h2>
                                    <p className="text-sm text-gray-500">Predicted Score: {selectedStudent.predicted_score}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedStudent(null)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="p-6 space-y-8">
                                {/* Score Visualization (Simplified) */}
                                <div className="flex justify-center mb-8">
                                    <div className="relative w-48 h-48">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="96" cy="96" r="80" fill="none" stroke="rgba(100,100,100,0.1)" strokeWidth="16" />
                                            <circle cx="96" cy="96" r="80" fill="none" stroke="#6366f1" strokeWidth="16"
                                                strokeDasharray={`${(selectedStudent.predicted_score / 100) * 502} 502`}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-4xl font-bold text-indigo-500">{selectedStudent.predicted_score}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Study Coach */}
                                <StudyCoach advice={selectedStudent.study_coach} />

                                {/* Feature Importance Chart */}
                                <Card>
                                    <h3 className="font-semibold mb-4">Key Factors</h3>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={Object.entries(selectedStudent.feature_importance).map(([k, v]) => ({ name: k.replace(/_/g, ' '), value: v * 100 }))} layout="vertical">
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
                                                <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]} barSize={20}>
                                                    {Object.entries(selectedStudent.feature_importance).map((_, index) => (
                                                        <Cell key={`cell-${index}`} fill={['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'][index % 4]} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BulkPredict;
