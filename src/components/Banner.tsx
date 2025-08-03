import React, { useState, useEffect } from 'react';
import { X, Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const Banner = () => {
  const { content } = useContent();
  const [isVisible, setIsVisible] = useState(true);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Split news items by line breaks
  const newsItems = content.bannerMessage.split('\n').filter(item => item.trim() !== '');

  // Auto-scroll through news items
  useEffect(() => {
    if (newsItems.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [newsItems.length]);

  if (!isVisible || !content.bannerEnabled || newsItems.length === 0) return null;

  const getBannerStyles = () => {
    switch (content.bannerType) {
      case 'success':
        return 'bg-emerald-600 border-emerald-700';
      case 'warning':
        return 'bg-yellow-600 border-yellow-700';
      case 'error':
        return 'bg-red-600 border-red-700';
      default:
        return 'bg-blue-600 border-blue-700';
    }
  };

  const getBannerIcon = () => {
    switch (content.bannerType) {
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      case 'error':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  return (
    <div className={`${getBannerStyles()} text-white border-b-2 relative z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3 flex-1">
            {getBannerIcon()}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <div className="flex items-center space-x-4">
                  <span className="font-semibold">{content.bannerTitle}</span>
                  <div className="relative h-6 overflow-hidden">
                    <div 
                      key={currentNewsIndex}
                      className="animate-slide-up text-sm opacity-90"
                    >
                      {newsItems[currentNewsIndex]}
                    </div>
                  </div>
                  {newsItems.length > 1 && (
                    <div className="flex space-x-1">
                      {newsItems.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentNewsIndex ? 'bg-white' : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {content.bannerButtonText && content.bannerButtonLink && (
                  <Link
                    to={content.bannerButtonLink}
                    className="mt-2 sm:mt-0 bg-white/20 hover:bg-white/30 text-white px-4 py-1 rounded-md text-sm font-medium transition-colors duration-200 inline-block"
                  >
                    {content.bannerButtonText}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 text-white/80 hover:text-white transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;