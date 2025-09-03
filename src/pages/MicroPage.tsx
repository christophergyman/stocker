import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function MicroPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center relative">
      <Header />

      {/* Back to Home Button */}
      <div className="absolute top-0 right-0 p-6">
        <button
          onClick={() => navigate('/')}
          className="text-cream hover:text-terracotta text-xl font-bold transition-colors duration-200"
          style={{ fontFamily: 'Doto, "Doto Medium", monospace' }}
        >
          ← Back to Home
        </button>
      </div>

      {/* Main Content */}
      <div className="text-center">
        <h1 className="text-6xl font-bold text-cream mb-8" style={{ fontFamily: 'Doto, "Doto Medium", monospace' }}>
          Micro
        </h1>
        <p className="text-2xl text-beige mb-8">
          Micro trading features coming soon...
        </p>
        <div className="bg-charcoal p-8 rounded-lg shadow-lg">
          <p className="text-cream text-lg">
            This is where your micro trading functionality will be implemented.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MicroPage;
