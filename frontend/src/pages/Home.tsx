import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="flex-1 flex items-center justify-center px-4 py-20">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-6xl md:text-7xl font-display font-bold mb-6 animate-fade-in">
                        <span className="gradient-text">RASPP</span>
                    </h1>
                    <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-4 animate-slide-up">
                        Result Analyzer & Student Performance Predictor
                    </p>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        Leverage the power of machine learning to predict your exam success based on your study habits, attendance, and performance history.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <Link to="/predict">
                            <Button variant="primary" size="lg">
                                Get Started
                            </Button>
                        </Link>
                        <Link to="/bulk-predict">
                            <Button variant="outline" size="lg">
                                Bulk Analysis
                            </Button>
                        </Link>
                        <Link to="/history">
                            <Button variant="secondary" size="lg">
                                📊 View History
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-4 py-16 bg-black/20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-display font-bold text-center mb-12">
                        Why Choose <span className="gradient-text">RASPP</span>?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="card text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
                            <div className="text-5xl mb-4">🎯</div>
                            <h3 className="text-xl font-semibold mb-3 text-primary-600 dark:text-primary-300">Accurate Predictions</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Our Multiple Linear Regression model provides reliable predictions with confidence intervals.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="card text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
                            <div className="text-5xl mb-4">⚡</div>
                            <h3 className="text-xl font-semibold mb-3 text-primary-600 dark:text-primary-300">Real-time Results</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Get instant predictions in seconds. No waiting, no hassle.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="card text-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
                            <div className="text-5xl mb-4">💡</div>
                            <h3 className="text-xl font-semibold mb-3 text-primary-600 dark:text-primary-300">Actionable Insights</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Receive personalized recommendations to improve your performance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="px-4 py-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-display font-bold text-center mb-12">
                        How It <span className="gradient-text">Works</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                1
                            </div>
                            <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Enter Your Data</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Input your study habits and academic history</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                2
                            </div>
                            <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">ML Analysis</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Our algorithm analyzes your profile</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                3
                            </div>
                            <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Get Prediction</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Receive your exam score prediction</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                4
                            </div>
                            <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Take Action</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Follow personalized recommendations</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 py-16 bg-gradient-to-r from-primary-900/20 to-secondary-900/20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-display font-bold mb-6 text-gray-900 dark:text-white">
                        Ready to Predict Your Success?
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                        Join students who are making data-driven decisions about their academic performance.
                    </p>
                    <Link to="/predict">
                        <Button variant="primary" size="lg">
                            Start Prediction Now →
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-4 py-8 bg-black/30 text-center text-gray-400">
                <p>&copy; 2026 RASPP. Powered by Machine Learning.</p>
            </footer>
        </div>
    );
};

export default Home;
