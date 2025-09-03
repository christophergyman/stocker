import React from 'react';

interface HomeButtonProps {
  onClick?: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center">
      <button 
        className="text-terracotta text-2xl font-bold hover:text-cream transition-colors duration-200"
        onClick={onClick}
      >
        Home
      </button>
    </div>
  );
};

export default HomeButton;
