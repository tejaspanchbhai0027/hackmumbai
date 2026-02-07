import React from 'react';
import Card from '../common/Card';
import { StudyCoachAdvice } from '../../types';

interface StudyCoachProps {
    advice?: StudyCoachAdvice;
    isLoading?: boolean;
}

const StudyCoach: React.FC<StudyCoachProps> = ({ advice, isLoading }) => {
    if (isLoading) {
        return (
            <Card className="animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </Card>
        );
    }

    if (!advice) return null;

    return (
        <Card className="mb-8 animate-slide-up bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 border-indigo-200 dark:border-indigo-900">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                    <span className="text-2xl">🤖</span>
                </div>
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
                        AI Study Coach
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Private Roadmap to Success</p>
                </div>
            </div>

            {/* Summary */}
            <div className="mb-8 p-4 bg-white/50 dark:bg-black/20 rounded-xl backdrop-blur-sm border border-indigo-100 dark:border-indigo-900/50">
                <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                    "{advice.summary}"
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Strengths */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-green-600 dark:text-green-400">
                        <span>✅</span> What You're Doing Right
                    </h3>
                    <ul className="space-y-2">
                        {advice.strengths.length > 0 ? (
                            advice.strengths.map((strength, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                                    <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                                    <span>{strength}</span>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-400 text-sm">Keep working to build your strengths!</li>
                        )}
                    </ul>
                </div>

                {/* Improvements */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-orange-600 dark:text-orange-400">
                        <span>🚧</span> Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                        {advice.improvements.length > 0 ? (
                            advice.improvements.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                                    <span className="mt-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></span>
                                    <span>{item}</span>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-400 text-sm">You are doing great! Maintain this momentum.</li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Action Plan */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-4">
                    <span>🚀</span> Your Action Plan
                </h3>
                <div className="grid grid-cols-1 gap-3">
                    {advice.actionable_steps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs font-bold">
                                {idx + 1}
                            </span>
                            <span className="text-gray-700 dark:text-gray-200">{step}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quote */}
            <div className="text-center pt-6 border-t border-indigo-100 dark:border-indigo-900/50">
                <p className="text-indigo-600 dark:text-indigo-300 font-serif text-lg italic">
                    "{advice.motivational_quote}"
                </p>
                <p className="text-xs text-indigo-400 dark:text-indigo-500 mt-2 uppercase tracking-wider font-semibold">
                    Daily Inspiration
                </p>
            </div>
        </Card>
    );
};

export default StudyCoach;
