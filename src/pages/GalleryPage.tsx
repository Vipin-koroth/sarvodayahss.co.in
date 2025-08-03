import React, { useState } from 'react';
import { X, Play, Image, Video } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const GalleryPage = () => {
  const { content } = useContent();
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'academic', label: 'Academic' },
    { key: 'cultural', label: 'Cultural' },
    { key: 'sports', label: 'Sports' },
    { key: 'events', label: 'Events' }
  ];

  const filteredItems = activeFilter === 'all' 
    ? content.galleryItems 
    : content.galleryItems.filter(item => item.category === activeFilter);

  const openLightbox = (item: any) => {
    setSelectedMedia(item);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Photo & Video Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore moments from our school life, events, and academic activities 
            through our comprehensive gallery.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeFilter === filter.key
                  ? 'bg-blue-800 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:text-blue-800 hover:bg-blue-50 shadow-sm'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="relative group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => openLightbox(item)}
            >
              <div className="aspect-w-4 aspect-h-3 relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  {item.type === 'video' ? (
                    <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  ) : (
                    <Image className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </div>
                {item.type === 'video' && (
                  <div className="absolute top-2 right-2">
                    <Video className="h-6 w-6 text-white bg-black bg-opacity-50 rounded p-1" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 truncate">{item.title}</h3>
                <span className="text-xs text-gray-500 capitalize">{item.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedMedia && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
              >
                <X className="h-8 w-8" />
              </button>
              
              {selectedMedia.type === 'video' ? (
                <div className="bg-black rounded-lg overflow-hidden">
                  <iframe
                    src={selectedMedia.src}
                    className="w-full h-64 md:h-96"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <img
                  src={selectedMedia.src}
                  alt={selectedMedia.title}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              )}
              
              <div className="text-white text-center mt-4">
                <h3 className="text-xl font-bold">{selectedMedia.title}</h3>
                <p className="text-gray-300 capitalize">{selectedMedia.category}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-800">500+</div>
              <p className="text-gray-600">Photos</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-800">50+</div>
              <p className="text-gray-600">Videos</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-800">100+</div>
              <p className="text-gray-600">Events Documented</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-800">5</div>
              <p className="text-gray-600">Years of Memories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;