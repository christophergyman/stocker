import React, { useState } from 'react';

interface HomeButtonProps {
  onClick?: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="text-center">
        <button 
          className="text-cream text-4xl font-bold hover:text-terracotta transition-colors duration-200"
          style={{ fontFamily: 'Doto, "Doto Medium", monospace' }}
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Home
        </button>
        <div className="mt-2 flex justify-center">
          <div className="flex space-x-1">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 bg-terracotta rounded-sm"
                style={{
                  animation: isHovered 
                    ? `drawLine 0.3s ease-in-out ${index * 0.04}s both`
                    : `drawLineReverse 0.2s ease-in-out ${(7 - index) * 0.025}s both`,
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'scale(1)' : 'scale(0)'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeButton;
