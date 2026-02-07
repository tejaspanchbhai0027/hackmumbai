import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Prediction from './pages/Prediction';
import Results from './pages/Results';
import History from './pages/History';
import BulkPredict from './pages/BulkPredict';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './components/layout/MainLayout';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/predict" element={<Prediction />} />
                        <Route path="/results" element={<Results />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/bulk-predict" element={<BulkPredict />} />
                    </Routes>
                </MainLayout>
            </Router>
        </ThemeProvider>
    );
}

export default App;
