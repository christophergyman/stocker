import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MicroPage from './pages/MicroPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/micro" element={<MicroPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
