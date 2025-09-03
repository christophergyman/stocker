import React from 'react';

interface SearchButtonProps {
  onClick?: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center">
      <button 
        className="text-terracotta text-2xl font-bold hover:text-cream transition-colors duration-200"
        onClick={onClick}
      >
        Search
      </button>
    </div>
  );
};

export default SearchButton;
