import React from 'react';
import './bookLoader.css';

const BookLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative w-[50px] h-[60px] book-loader-perspective ">
        {Array.from({ length: 10 }, (_, index) => (
          <div
            key={index}
            className={`
              w-[50px] h-[60px] bg-gradient-to-br from-white via-gray-50 to-gray-100
              border-[3px] border-primary absolute border-l-2 border-l-dashed
              book-paper-origin shadow-md rounded-sm overflow-hidden
              ${index === 1 ? 'book-paper-flipped' : ''}
              ${index >= 2 ? 'book-paper-animated' : ''}
            `}
            style={{
              animationDelay: index >= 2 ? `${index * 0.1}s` : undefined,
              borderLeftColor: 'hsl(var(--primary))',
              boxShadow: `0 ${index * 0.5}px ${index * 1}px rgba(0,0,0,0.1)`,
              zIndex: 10 - index
            }}
          >
            {/* Page Content */}
            <div className="p-1 h-full">
              {/* Title line */}
              <div className="w-full h-0.5 bg-gray-800 mb-1 rounded-full"></div>
              {/* Text lines */}
              {Array.from({ length: 6 }, (_, lineIndex) => (
                <div
                  key={lineIndex}
                  className="bg-gray-600 rounded-full mb-0.5 h-0.5 w-full opacity-50"
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        <p className="text-lg font-medium text-primary/80 animate-pulse">
          Loading books...
        </p>
      </div>
    </div>
  );
};

export default BookLoader;
