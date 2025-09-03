import React from 'react';
import Header from '../components/Header';
import HomeButton from '../components/HomeButton';
import MicroButton from '../components/MicroButton';
import SearchButton from '../components/SearchButton';

function HomePage() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center relative">
      <Header />

      {/* Centered Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <HomeButton />
        <MicroButton />
        <SearchButton />
      </div>
    </div>
  );
}

export default HomePage;
