import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, LogIn, Settings, FileText, Users, Calendar, Image, Upload, X, Plus, Edit, Trash2, Save } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const AdminPanel = () => {
  const { 
    content, 
    updateContent, 
    addTeacher, 
    updateTeacher, 
    deleteTeacher,
    addEvent,
    updateEvent,
    deleteEvent,
    addGalleryItem,
    deleteGalleryItem
  } = useContent();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [activeSection, setActiveSection] = useState('dashboard');
  const [editingContent, setEditingContent] = useState({
    // Homepage content
    welcomeMessage: content.welcomeMessage,
    missionStatement: content.missionStatement,
    visionStatement: content.visionStatement,
    heroImage: content.heroImage,
    featuredImages: [...content.featuredImages],
    transitionSettings: { ...content.transitionSettings },
    schoolStats: { ...content.schoolStats },
    
    // About page content
    aboutPage: { ...content.aboutPage },
    
    // Academics page content
    academicsPage: { ...content.academicsPage },
    
    // Contact page content
    contactPage: { ...content.contactPage }
  });

  const [editingTeacher, setEditingTeacher] = useState<any>(null);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);

  const handleContentSave = () => {
    updateContent(editingContent);
    alert('Content updated successfully! Changes are now live on the website.');
  };

  const handleImageUpload = (type: 'hero' | 'featured', index?: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = `https://images.pexels.com/photos/${Math.floor(Math.random() * 9000000) + 1000000}/pexels-photo-${Math.floor(Math.random() * 9000000) + 1000000}.jpeg?auto=compress&cs=tinysrgb&w=800`;
        
        if (type === 'hero') {
          setEditingContent({
            ...editingContent,
            heroImage: imageUrl
          });
        } else if (type === 'featured' && typeof index === 'number') {
          const newFeaturedImages = [...editingContent.featuredImages];
          newFeaturedImages[index] = imageUrl;
          setEditingContent({
            ...editingContent,
            featuredImages: newFeaturedImages
          });
        }
        alert(`Image uploaded successfully! (Demo: Using placeholder image)`);
      }
    };
    input.click();
  };

  const addFeaturedImage = () => {
    const newImage = `https://images.pexels.com/photos/${Math.floor(Math.random() * 9000000) + 1000000}/pexels-photo-${Math.floor(Math.random() * 9000000) + 1000000}.jpeg?auto=compress&cs=tinysrgb&w=800`;
    setEditingContent({
      ...editingContent,
      featuredImages: [...editingContent.featuredImages, newImage]
    });
  };

  const removeFeaturedImage = (index: number) => {
    const newFeaturedImages = editingContent.featuredImages.filter((_, i) => i !== index);
    setEditingContent({
      ...editingContent,
      featuredImages: newFeaturedImages
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === 'admin' && loginData.password === 'sarvodaya2025') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Demo: username: admin, password: sarvodaya2025');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ username: '', password: '' });
    setActiveSection('dashboard');
    setEditingContent({
      welcomeMessage: content.welcomeMessage,
      missionStatement: content.missionStatement,
      visionStatement: content.visionStatement,
      heroImage: content.heroImage,
      featuredImages: [...content.featuredImages],
      transitionSettings: { ...content.transitionSettings },
      schoolStats: { ...content.schoolStats },
      aboutPage: { ...content.aboutPage },
      academicsPage: { ...content.academicsPage },
      contactPage: { ...content.contactPage }
    });
  };

  const handleTeacherSave = (teacherData: any) => {
    if (editingTeacher && editingTeacher.id) {
      updateTeacher(editingTeacher.id, teacherData);
    } else {
      addTeacher(teacherData);
    }
    setEditingTeacher(null);
    setShowAddTeacher(false);
  };

  const handleEventSave = (eventData: any) => {
    if (editingEvent && editingEvent.id) {
      updateEvent(editingEvent.id, eventData);
    } else {
      addEvent(eventData);
    }
    setEditingEvent(null);
    setShowAddEvent(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-800 to-emerald-800 flex items-center justify-center py-16">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl">
            <div className="text-center mb-8">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-blue-800" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
              <p className="text-gray-600">Sarvodaya HSS Content Management</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="username"
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <LogIn className="h-5 w-5" />
                <span>Login to Admin Panel</span>
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Demo Credentials:</strong><br />
                Username: admin<br />
                Password: sarvodaya2025
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: Settings },
    { key: 'homepage', label: 'Homepage Content', icon: FileText },
    { key: 'about', label: 'About Page', icon: FileText },
    { key: 'academics', label: 'Academics Page', icon: FileText },
    { key: 'teachers', label: 'Teachers Management', icon: Users },
    { key: 'events', label: 'Events Management', icon: Calendar },
    { key: 'gallery', label: 'Gallery Management', icon: Image },
    { key: 'contact', label: 'Contact Page', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Management</h2>
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setActiveSection(item.key)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                        activeSection === item.key
                          ? 'bg-blue-800 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              {activeSection === 'dashboard' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-800">Total Teachers</h3>
                      <p className="text-3xl font-bold text-blue-900">{content.teachers.length}</p>
                    </div>
                    <div className="bg-emerald-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-emerald-800">Active Events</h3>
                      <p className="text-3xl font-bold text-emerald-900">{content.events.filter(e => e.isUpcoming).length}</p>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-yellow-800">Gallery Items</h3>
                      <p className="text-3xl font-bold text-yellow-900">{content.galleryItems.length}</p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-purple-800">Total Students</h3>
                      <p className="text-3xl font-bold text-purple-900">{content.schoolStats.totalStudents}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'homepage' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Homepage Content Management</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Message</label>
                      <textarea
                        rows={4}
                        value={editingContent.welcomeMessage}
                        onChange={(e) => setEditingContent({
                          ...editingContent,
                          welcomeMessage: e.target.value
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter homepage welcome message..."
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mission Statement</label>
                        <textarea
                          rows={3}
                          value={editingContent.missionStatement}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            missionStatement: e.target.value
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter mission statement..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Vision Statement</label>
                        <textarea
                          rows={3}
                          value={editingContent.visionStatement}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            visionStatement: e.target.value
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter vision statement..."
                        />
                      </div>
                    </div>

                    {/* Hero Image Management */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hero Background Image</label>
                      <div className="flex items-center space-x-4">
                        {editingContent.heroImage && (
                          <img 
                            src={editingContent.heroImage} 
                            alt="Hero" 
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        )}
                        <button
                          onClick={() => handleImageUpload('hero')}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                        >
                          <Upload className="h-4 w-4" />
                          <span>Upload Hero Image</span>
                        </button>
                      </div>
                    </div>

                    {/* Featured Images Management */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Featured Images</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {editingContent.featuredImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={image} 
                              alt={`Featured ${index + 1}`} 
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center space-x-2">
                              <button
                                onClick={() => handleImageUpload('featured', index)}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded"
                              >
                                <Upload className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => removeFeaturedImage(index)}
                                className="bg-red-600 hover:bg-red-700 text-white p-1 rounded"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={addFeaturedImage}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Featured Image</span>
                      </button>
                    </div>

                    {/* Transition Settings */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Animation & Transition Settings</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Hero Transition</label>
                          <select
                            value={editingContent.transitionSettings.heroTransition}
                            onChange={(e) => setEditingContent({
                              ...editingContent,
                              transitionSettings: {
                                ...editingContent.transitionSettings,
                                heroTransition: e.target.value
                              }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="fade">Fade</option>
                            <option value="slide">Slide</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Animation Duration (ms)</label>
                          <input
                            type="number"
                            min="200"
                            max="2000"
                            step="100"
                            value={editingContent.transitionSettings.fadeInDuration}
                            onChange={(e) => setEditingContent({
                              ...editingContent,
                              transitionSettings: {
                                ...editingContent.transitionSettings,
                                fadeInDuration: parseInt(e.target.value) || 800
                              }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="cardTransitions"
                            checked={editingContent.transitionSettings.cardTransitions}
                            onChange={(e) => setEditingContent({
                              ...editingContent,
                              transitionSettings: {
                                ...editingContent.transitionSettings,
                                cardTransitions: e.target.checked
                              }
                            })}
                            className="mr-2"
                          />
                          <label htmlFor="cardTransitions" className="text-sm font-medium text-gray-700">
                            Enable Card Animations
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Years of Excellence</label>
                        <input
                          type="number"
                          value={editingContent.schoolStats.yearsOfExcellence}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            schoolStats: {
                              ...editingContent.schoolStats,
                              yearsOfExcellence: parseInt(e.target.value) || 0
                            }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Students</label>
                        <input
                          type="number"
                          value={editingContent.schoolStats.totalStudents}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            schoolStats: {
                              ...editingContent.schoolStats,
                              totalStudents: parseInt(e.target.value) || 0
                            }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Qualified Teachers</label>
                        <input
                          type="number"
                          value={editingContent.schoolStats.qualifiedTeachers}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            schoolStats: {
                              ...editingContent.schoolStats,
                              qualifiedTeachers: parseInt(e.target.value) || 0
                            }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Annual Events</label>
                        <input
                          type="number"
                          value={editingContent.schoolStats.annualEvents}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            schoolStats: {
                              ...editingContent.schoolStats,
                              annualEvents: parseInt(e.target.value) || 0
                            }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <button 
                        onClick={handleContentSave}
                        className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                      >
                        Update Content
                      </button>
                      <button 
                        onClick={() => setEditingContent({
                          welcomeMessage: content.welcomeMessage,
                          missionStatement: content.missionStatement,
                          visionStatement: content.visionStatement,
                          heroImage: content.heroImage,
                          featuredImages: [...content.featuredImages],
                          transitionSettings: { ...content.transitionSettings },
                          schoolStats: { ...content.schoolStats },
                          aboutPage: { ...content.aboutPage },
                          academicsPage: { ...content.academicsPage },
                          contactPage: { ...content.contactPage }
                        })}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                      >
                        Reset Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'about' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">About Page Content</h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                        <input
                          type="text"
                          value={editingContent.aboutPage.pageTitle}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            aboutPage: {
                              ...editingContent.aboutPage,
                              pageTitle: e.target.value
                            }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">History Title</label>
                        <input
                          type="text"
                          value={editingContent.aboutPage.historyTitle}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            aboutPage: {
                              ...editingContent.aboutPage,
                              historyTitle: e.target.value
                            }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Page Subtitle</label>
                      <textarea
                        rows={2}
                        value={editingContent.aboutPage.pageSubtitle}
                        onChange={(e) => setEditingContent({
                          ...editingContent,
                          aboutPage: {
                            ...editingContent.aboutPage,
                            pageSubtitle: e.target.value
                          }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">History Content (Paragraph 1)</label>
                      <textarea
                        rows={3}
                        value={editingContent.aboutPage.historyContent[0] || ''}
                        onChange={(e) => {
                          const newHistoryContent = [...editingContent.aboutPage.historyContent];
                          newHistoryContent[0] = e.target.value;
                          setEditingContent({
                            ...editingContent,
                            aboutPage: {
                              ...editingContent.aboutPage,
                              historyContent: newHistoryContent
                            }
                          });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Vision Statement</label>
                        <textarea
                          rows={4}
                          value={editingContent.aboutPage.vision}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            aboutPage: {
                              ...editingContent.aboutPage,
                              vision: e.target.value
                            }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mission Statement</label>
                        <textarea
                          rows={4}
                          value={editingContent.aboutPage.mission}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            aboutPage: {
                              ...editingContent.aboutPage,
                              mission: e.target.value
                            }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button 
                        onClick={handleContentSave}
                        className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                      >
                        Update About Page
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'academics' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Academics Page Content</h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                        <input
                          type="text"
                          value={editingContent.academicsPage.pageTitle}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            academicsPage: {
                              ...editingContent.academicsPage,
                              pageTitle: e.target.value
                            }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Page Subtitle</label>
                        <input
                          type="text"
                          value={editingContent.academicsPage.pageSubtitle}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            academicsPage: {
                              ...editingContent.academicsPage,
                              pageSubtitle: e.target.value
                            }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Statistics</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Pass Rate (%)</label>
                          <input
                            type="number"
                            value={editingContent.academicsPage.academicStats.passRate}
                            onChange={(e) => setEditingContent({
                              ...editingContent,
                              academicsPage: {
                                ...editingContent.academicsPage,
                                academicStats: {
                                  ...editingContent.academicsPage.academicStats,
                                  passRate: parseInt(e.target.value) || 0
                                }
                              }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Higher Education Rate (%)</label>
                          <input
                            type="number"
                            value={editingContent.academicsPage.academicStats.higherEducationRate}
                            onChange={(e) => setEditingContent({
                              ...editingContent,
                              academicsPage: {
                                ...editingContent.academicsPage,
                                academicStats: {
                                  ...editingContent.academicsPage.academicStats,
                                  higherEducationRate: parseInt(e.target.value) || 0
                                }
                              }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Annual Awards</label>
                          <input
                            type="number"
                            value={editingContent.academicsPage.academicStats.annualAwards}
                            onChange={(e) => setEditingContent({
                              ...editingContent,
                              academicsPage: {
                                ...editingContent.academicsPage,
                                academicStats: {
                                  ...editingContent.academicsPage.academicStats,
                                  annualAwards: parseInt(e.target.value) || 0
                                }
                              }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button 
                        onClick={handleContentSave}
                        className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                      >
                        Update Academics Page
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'contact' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Page Content</h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                        <input
                          type="text"
                          value={editingContent.contactPage.pageTitle}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            contactPage: {
                              ...editingContent.contactPage,
                              pageTitle: e.target.value
                            }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Page Subtitle</label>
                        <input
                          type="text"
                          value={editingContent.contactPage.pageSubtitle}
                          onChange={(e) => setEditingContent({
                            ...editingContent,
                            contactPage: {
                              ...editingContent.contactPage,
                              pageSubtitle: e.target.value
                            }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
                          <input
                            type="text"
                            value={editingContent.contactPage.address.line1}
                            onChange={(e) => setEditingContent({
                              ...editingContent,
                              contactPage: {
                                ...editingContent.contactPage,
                                address: {
                                  ...editingContent.contactPage.address,
                                  line1: e.target.value
                                }
                              }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone 1</label>
                          <input
                            type="text"
                            value={editingContent.contactPage.phones[0] || ''}
                            onChange={(e) => {
                              const newPhones = [...editingContent.contactPage.phones];
                              newPhones[0] = e.target.value;
                              setEditingContent({
                                ...editingContent,
                                contactPage: {
                                  ...editingContent.contactPage,
                                  phones: newPhones
                                }
                              });
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email 1</label>
                          <input
                            type="email"
                            value={editingContent.contactPage.emails[0] || ''}
                            onChange={(e) => {
                              const newEmails = [...editingContent.contactPage.emails];
                              newEmails[0] = e.target.value;
                              setEditingContent({
                                ...editingContent,
                                contactPage: {
                                  ...editingContent.contactPage,
                                  emails: newEmails
                                }
                              });
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                          <input
                            type="text"
                            value={editingContent.contactPage.address.pincode}
                            onChange={(e) => setEditingContent({
                              ...editingContent,
                              contactPage: {
                                ...editingContent.contactPage,
                                address: {
                                  ...editingContent.contactPage.address,
                                  pincode: e.target.value
                                }
                              }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button 
                        onClick={handleContentSave}
                        className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                      >
                        Update Contact Page
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'teachers' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Teachers Management</h2>
                    <button 
                      onClick={() => setShowAddTeacher(true)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add New Teacher</span>
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.teachers.map((teacher) => (
                      <div key={teacher.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <img src={teacher.image} alt={teacher.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                        <h3 className="font-bold text-gray-900">{teacher.name}</h3>
                        <p className="text-blue-800 text-sm">{teacher.designation}</p>
                        <p className="text-gray-600 text-sm">{teacher.subjects.join(', ')}</p>
                        <div className="flex space-x-2 mt-3">
                          <button
                            onClick={() => setEditingTeacher(teacher)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                          >
                            <Edit className="h-3 w-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => deleteTeacher(teacher.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'events' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Events Management</h2>
                    <button 
                      onClick={() => setShowAddEvent(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create New Event</span>
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {content.events.map((event) => (
                      <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <img src={event.image} alt={event.title} className="w-full h-32 object-cover rounded-lg mb-3" />
                        <h3 className="font-bold text-gray-900">{event.title}</h3>
                        <p className="text-gray-600 text-sm">{event.date} • {event.time}</p>
                        <p className="text-gray-600 text-sm">{event.location}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-2 ${
                          event.isUpcoming ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {event.isUpcoming ? 'Upcoming' : 'Past'}
                        </span>
                        <div className="flex space-x-2 mt-3">
                          <button
                            onClick={() => setEditingEvent(event)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                          >
                            <Edit className="h-3 w-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => deleteEvent(event.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'gallery' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
                      <Upload className="h-4 w-4" />
                      <span>Upload Media</span>
                    </button>
                  </div>
                  <div className="text-gray-600">
                    <p>Upload and organize photos and videos for the school gallery. Categorize media by events, academics, sports, and cultural activities.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;