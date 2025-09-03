import React from 'react';
import HomeButton from './components/HomeButton';
import MicroButton from './components/MicroButton';
import SearchButton from './components/SearchButton';

function App() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center relative">
      {/* Stock Emoji and Title - Top Left */}
      <div className="absolute top-0 left-0 p-6 flex items-center gap-3">
        <span className="text-6xl">📈</span>
        <span className="text-4xl font-bold text-cream" style={{ fontFamily: 'Doto, "Doto Medium", monospace' }}>Stocker</span>
      </div>

      {/* Centered Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HomeButton />
        <MicroButton />
        <SearchButton />
      </div>
    </div>
  );
}

export default App;
