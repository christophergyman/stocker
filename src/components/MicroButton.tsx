import React from 'react';
import { motion } from 'motion/react';

interface MicroButtonProps {
  onClick?: () => void;
}

const MicroButton: React.FC<MicroButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center">
      <motion.button 
        className="text-terracotta text-4xl font-bold hover:text-cream transition-colors duration-200"
        style={{ fontFamily: 'Doto, "Doto Medium", monospace' }}
        onClick={onClick}
        whileHover={{ 
          scale: 1.1,
          rotate: 2,
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          scale: 0.95,
          transition: { duration: 0.1 }
        }}
      >
        Micro
      </motion.button>
    </div>
  );
};

export default MicroButton;
