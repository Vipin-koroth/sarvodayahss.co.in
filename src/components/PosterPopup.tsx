import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const PosterPopup = () => {
  const { content } = useContent();
  const { posterSettings } = content;
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    if (!posterSettings.enabled || !posterSettings.image) return;

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
  }, [posterSettings.enabled, posterSettings.showOnce, posterSettings.image]);

  const handleClose = () => {
    setIsVisible(false);
    if (posterSettings.showOnce) {
      localStorage.setItem('sarvodaya-poster-shown', 'true');
      setHasBeenShown(true);
    }
  };

  if (!posterSettings.enabled || hasBeenShown || !isVisible || !posterSettings.image) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Poster Image */}
        <div className="relative">
          <img
            src={posterSettings.image}
            alt="School Poster"
            className="w-full h-auto object-cover max-h-[80vh]"
            onClick={handleClose}
          />
        </div>
      </div>
    </div>
  );
};

export default PosterPopup;