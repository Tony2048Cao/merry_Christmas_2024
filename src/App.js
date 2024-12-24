import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InputPage from './pages/InputPage';
import GreetingPage from './pages/GreetingPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<InputPage />} />
          <Route path="/greeting" element={<GreetingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;