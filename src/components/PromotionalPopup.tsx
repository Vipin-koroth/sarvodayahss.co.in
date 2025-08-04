import React, { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const PromotionalPopup = () => {
  const { content } = useContent();
  const { promotionalPopup } = content;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!promotionalPopup.enabled || !promotionalPopup.imageUrl) {
      return;
    }

    // Check if popup should show only once
    if (promotionalPopup.showOnce) {
      const hasSeenPopup = localStorage.getItem('promotional-popup-seen');
      if (hasSeenPopup) {
        return;
      }
    }

    // Show popup after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [promotionalPopup]);

  const handleClose = () => {
    setIsVisible(false);
    
    // Mark as seen if showOnce is enabled
    if (promotionalPopup.showOnce) {
      localStorage.setItem('promotional-popup-seen', 'true');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible || !promotionalPopup.enabled || !promotionalPopup.imageUrl) {
    return null;
  }

  const isExternalLink = promotionalPopup.buttonLink.startsWith('http');

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header with close button */}
        <div className="relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Image */}
          <div className="relative">
            <img
              src={promotionalPopup.imageUrl}
              alt={promotionalPopup.title}
              className="w-full h-64 object-cover"
              onError={(e) => {
                console.error('Promotional popup image failed to load:', promotionalPopup.imageUrl);
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {promotionalPopup.title}
          </h2>
          
          {promotionalPopup.description && (
            <p className="text-gray-600 mb-6 leading-relaxed">
              {promotionalPopup.description}
            </p>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {promotionalPopup.buttonText && promotionalPopup.buttonLink && (
              isExternalLink ? (
                <a
                  href={promotionalPopup.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                  onClick={handleClose}
                >
                  <span>{promotionalPopup.buttonText}</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  to={promotionalPopup.buttonLink}
                  className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-center"
                  onClick={handleClose}
                >
                  {promotionalPopup.buttonText}
                </Link>
              )
            )}
            
            <button
              onClick={handleClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalPopup;