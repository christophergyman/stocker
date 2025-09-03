import React from 'react';

interface MicroButtonProps {
  onClick?: () => void;
}

const MicroButton: React.FC<MicroButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center">
      <button 
        className="text-terracotta text-2xl font-bold hover:text-cream transition-colors duration-200"
        onClick={onClick}
      >
        Micro
      </button>
    </div>
  );
};

export default MicroButton;
