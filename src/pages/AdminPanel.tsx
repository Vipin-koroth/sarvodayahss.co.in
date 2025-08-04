import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Save, Upload, Eye, RotateCcw } from 'lucide-react';

const AdminPanel = () => {
  const { content, updateContent } = useContent();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [unsavedCount, setUnsavedCount] = useState(0);

  const handleInputChange = (field: string, value: any, section?: string) => {
    if (section) {
      updateContent({
        ...content,
        [section]: {
          ...content[section as keyof typeof content],
          [field]: value
        }
      });
    } else {
      updateContent({
        ...content,
        [field]: value
      });
    }
    
    if (!hasUnsavedChanges) {
      setHasUnsavedChanges(true);
      setUnsavedCount(prev => prev + 1);
    }
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    
    // Simulate save process
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setHasUnsavedChanges(false);
    setUnsavedCount(0);
    setSaveStatus('saved');
    
    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      setSaveStatus('idle');
    }, 3000);
  };

  const handleImageUpload = (field: string, section?: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          handleInputChange(field, imageUrl, section);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const resetPosterPreview = () => {
    // Clear the "seen" flag from localStorage to allow preview
    localStorage.removeItem('posterSeen');
    // Trigger a page reload to show the poster
    window.location.reload();
  };

  const getSaveButtonText = () => {
    switch (saveStatus) {
      case 'saving': return 'Saving...';
      case 'saved': return 'Saved ✓';
      case 'error': return 'Error ✗';
      default: return 'Save Changes';
    }
  };

  const getSaveButtonColor = () => {
    switch (saveStatus) {
      case 'saving': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'saved': return 'bg-green-500 hover:bg-green-600';
      case 'error': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      {(hasUnsavedChanges || saveStatus !== 'idle') && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {hasUnsavedChanges && (
                <div className="flex items-center space-x-2 text-yellow-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    {unsavedCount} unsaved change{unsavedCount !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
              {saveStatus === 'saved' && (
                <div className="flex items-center space-x-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">All changes saved</span>
                </div>
              )}
            </div>
            {hasUnsavedChanges && (
              <button
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className={`px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors ${getSaveButtonColor()}`}
              >
                <Save className="w-4 h-4 inline mr-2" />
                {getSaveButtonText()}
              </button>
            )}
          </div>
        </div>
      )}

      <div className={`max-w-7xl mx-auto p-6 ${hasUnsavedChanges || saveStatus !== 'idle' ? 'pt-20' : ''}`}>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
              <span className="text-white font-bold">A</span>
            </div>
            Admin Panel
          </h1>

          {/* School Information */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-2">School Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
                <input
                  type="text"
                  value={content.schoolName}
                  onChange={(e) => handleInputChange('schoolName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter school name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School Logo</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleImageUpload('logoImage')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </button>
                  {content.logoImage && (
                    <img
                      src={content.logoImage}
                      alt="Logo Preview"
                      className="w-12 h-12 object-contain border rounded"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-2">Hero Section</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                <input
                  type="text"
                  value={content.heroTitle}
                  onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter hero title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
                <textarea
                  value={content.heroSubtitle}
                  onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter hero subtitle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Video URL</label>
                <input
                  type="url"
                  value={content.heroVideoUrl}
                  onChange={(e) => handleInputChange('heroVideoUrl', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter video URL (YouTube, Vimeo, or Google Drive)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Supports YouTube, Vimeo, Google Drive, or direct video file URLs
                </p>
              </div>
            </div>
          </div>

          {/* Poster/Popup Settings */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-2">Poster/Popup Settings</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="enablePoster"
                  checked={content.posterSettings.enabled}
                  onChange={(e) => handleInputChange('enabled', e.target.checked, 'posterSettings')}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="enablePoster" className="text-sm font-medium text-gray-700">
                  Enable Poster
                </label>
              </div>
              
              {content.posterSettings.enabled && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Poster Image URL</label>
                    <input
                      type="url"
                      value={content.posterSettings.image}
                      onChange={(e) => handleInputChange('image', e.target.value, 'posterSettings')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter poster image URL"
                    />
                  </div>
                  
                  {content.posterSettings.image && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                      <img
                        src={content.posterSettings.image}
                        alt="Poster Preview"
                        className="max-w-xs max-h-48 object-contain border rounded-lg"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="showOnce"
                      checked={content.posterSettings.showOnce}
                      onChange={(e) => handleInputChange('showOnce', e.target.checked, 'posterSettings')}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="showOnce" className="text-sm font-medium text-gray-700">
                      Show only once per visitor
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={resetPosterPreview}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset & Preview
                    </button>
                    <span className="text-sm text-gray-500">
                      Click to test the poster popup
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-2">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={content.contactInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value, 'contactInfo')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={content.contactInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value, 'contactInfo')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={content.contactInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value, 'contactInfo')}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter school address"
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-2">About Section</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">About Title</label>
                <input
                  type="text"
                  value={content.aboutTitle}
                  onChange={(e) => handleInputChange('aboutTitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter about section title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">About Description</label>
                <textarea
                  value={content.aboutDescription}
                  onChange={(e) => handleInputChange('aboutDescription', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter about description"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Save Button */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className={`px-6 py-3 text-white font-medium rounded-full shadow-lg transition-all transform hover:scale-105 ${getSaveButtonColor()}`}
          >
            <Save className="w-5 h-5 inline mr-2" />
            {getSaveButtonText()}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;