import React, { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const PosterPopup = () => {
  const { content } = useContent();
  const { posterSettings } = content;
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    if (!posterSettings.enabled) return;

    // Check if poster should show only once
    if (posterSettings.showOnce) {
      const hasShown = localStorage.getItem('sarvodaya-poster-shown');
      if (hasShown) {
        setHasBeenShown(true);
        return;
      }
    }

    // Show poster after a brief delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [posterSettings.enabled, posterSettings.showOnce]);

  useEffect(() => {
    if (!isVisible || !posterSettings.autoClose) return;

    const autoCloseTimer = setTimeout(() => {
      handleClose();
    }, posterSettings.autoCloseDelay * 1000);

    return () => clearTimeout(autoCloseTimer);
  }, [isVisible, posterSettings.autoClose, posterSettings.autoCloseDelay]);

  const handleClose = () => {
    setIsVisible(false);
    if (posterSettings.showOnce) {
      localStorage.setItem('sarvodaya-poster-shown', 'true');
      setHasBeenShown(true);
    }
  };

  if (!posterSettings.enabled || hasBeenShown || !isVisible) {
    return null;
  }

  const getOverlayClass = () => {
    switch (posterSettings.overlayColor) {
      case 'light':
        return 'bg-white/80';
      case 'dark':
        return 'bg-black/70';
      case 'blur':
        return 'bg-black/50 backdrop-blur-sm';
      default:
        return 'bg-black/70';
    }
  };

  const getPositionClass = () => {
    switch (posterSettings.position) {
      case 'top':
        return 'items-start pt-20';
      case 'bottom':
        return 'items-end pb-20';
      case 'center':
      default:
        return 'items-center justify-center';
    }
  };

  const isExternalLink = posterSettings.buttonLink.startsWith('http');

  return (
    <div className={`fixed inset-0 z-50 flex ${getPositionClass()} p-4 ${getOverlayClass()}`}>
      <div className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Poster Image */}
        {posterSettings.image && (
          <div className="relative">
            <img
              src={posterSettings.image}
              alt={posterSettings.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {posterSettings.title}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {posterSettings.message}
          </p>

          {/* Action Button */}
          {posterSettings.buttonText && posterSettings.buttonLink && (
            <div className="flex justify-center">
              {isExternalLink ? (
                <a
                  href={posterSettings.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  onClick={handleClose}
                >
                  <span>{posterSettings.buttonText}</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  to={posterSettings.buttonLink}
                  className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  onClick={handleClose}
                >
                  {posterSettings.buttonText}
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Auto-close indicator */}
        {posterSettings.autoClose && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-blue-800 transition-all ease-linear"
              style={{
                animation: `shrink ${posterSettings.autoCloseDelay}s linear forwards`
              }}
            ></div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default PosterPopup;