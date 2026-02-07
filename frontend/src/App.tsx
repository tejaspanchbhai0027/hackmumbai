import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Prediction from './pages/Prediction';
import Results from './pages/Results';
import History from './pages/History';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/predict" element={<Prediction />} />
                <Route path="/results" element={<Results />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </Router>
    );
}

export default App;
