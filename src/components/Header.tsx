import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 p-6 flex items-center gap-3">
      <span className="text-6xl">📈</span>
      <span className="text-4xl font-bold text-cream" style={{ fontFamily: 'Doto, "Doto Medium", monospace' }}>
        Stocker.
      </span>
    </div>
  );
};

export default Header;
