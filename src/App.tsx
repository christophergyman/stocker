import React from 'react';
import HomeButton from './components/HomeButton';
import MicroButton from './components/MicroButton';
import SearchButton from './components/SearchButton';

function App() {
  return (
    <div className="min-h-screen bg-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <HomeButton />
          <MicroButton />
          <SearchButton />
        </div>
      </div>
    </div>
  );
}

export default App;
