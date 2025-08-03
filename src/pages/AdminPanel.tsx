import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Settings, 
  Home, 
  Info, 
  BookOpen, 
  Users, 
  Calendar, 
  Image as ImageIcon, 
  Phone,
  Save,
  Upload,
  Plus,
  Trash2,
  Edit3
} from 'lucide-react';

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
    deleteGalleryItem,
    addAdministration,
    updateAdministration,
    deleteAdministration
  } = useContent();
  
  const [activeSection, setActiveSection] = useState('homepage');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    designation: '',
    subjects: '',
    experience: '',
    education: '',
    image: ''
  });
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: '',
    category: 'Academic',
    isUpcoming: true
  });
  const [newGalleryItem, setNewGalleryItem] = useState({
    type: 'image' as const,
    src: '',
    thumbnail: '',
    title: '',
    category: 'academic'
  });
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    designation: '',
    image: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'sarvodaya2025') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleImageUpload = (field: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      updateContent({ [field]: imageUrl });
    };
    reader.readAsDataURL(file);
  };

  const handleNestedUpdate = (section: string, field: string, value: any) => {
    updateContent({
      [section]: {
        ...content[section as keyof typeof content],
        [field]: value
      }
    });
  };

  const handleArrayUpdate = (section: string, field: string, index: number, value: string) => {
    const currentArray = (content[section as keyof typeof content] as any)[field];
    const newArray = [...currentArray];
    newArray[index] = value;
    handleNestedUpdate(section, field, newArray);
  };

  const addArrayItem = (section: string, field: string, defaultValue: string = '') => {
    const currentArray = (content[section as keyof typeof content] as any)[field];
    const newArray = [...currentArray, defaultValue];
    handleNestedUpdate(section, field, newArray);
  };

  const removeArrayItem = (section: string, field: string, index: number) => {
    const currentArray = (content[section as keyof typeof content] as any)[field];
    const newArray = currentArray.filter((_: any, i: number) => i !== index);
    handleNestedUpdate(section, field, newArray);
  };

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subjects = newTeacher.subjects.split(',').map(s => s.trim());
    addTeacher({ ...newTeacher, subjects });
    setNewTeacher({ name: '', designation: '', subjects: '', experience: '', education: '', image: '' });
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent(newEvent);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      image: '',
      category: 'Academic',
      isUpcoming: true
    });
  };

  const handleGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGalleryItem(newGalleryItem);
    setNewGalleryItem({
      type: 'image' as const,
      src: '',
      thumbnail: '',
      title: '',
      category: 'academic'
    });
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAdministration(newAdmin);
    setNewAdmin({ name: '', designation: '', image: '' });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { key: 'homepage', label: 'Homepage', icon: Home },
    { key: 'about', label: 'About Page', icon: Info },
    { key: 'academics', label: 'Academics Page', icon: BookOpen },
    { key: 'teachers-page', label: 'Teachers Page', icon: Users },
    { key: 'events-page', label: 'Events Page', icon: Calendar },
    { key: 'gallery-page', label: 'Gallery Page', icon: ImageIcon },
    { key: 'contact', label: 'Contact Page', icon: Phone },
    { key: 'teachers', label: 'Manage Staff', icon: Users },
    { key: 'events', label: 'Manage Events', icon: Calendar },
    { key: 'gallery', label: 'Manage Gallery', icon: ImageIcon },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderHomepageEditor = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Homepage Content</h2>
      
      {/* Hero Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
            <input
              type="text"
              value={content.heroTitle}
              onChange={(e) => updateContent({ heroTitle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
            <input
              type="text"
              value={content.heroSubtitle}
              onChange={(e) => updateContent({ heroSubtitle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Description</label>
            <textarea
              value={content.heroDescription}
              onChange={(e) => updateContent({ heroDescription: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Background Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload('heroImage', file);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {content.heroImage && (
              <img src={content.heroImage} alt="Hero" className="mt-2 h-32 w-full object-cover rounded" />
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Administration Section Title</label>
            <input
              type="text"
              value={content.administrationTitle}
              onChange={(e) => updateContent({ administrationTitle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* News Banner Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Latest News Banner</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                News Banner Title
              </label>
              <input
                type="text"
                value={content.bannerTitle || ''}
                onChange={(e) => updateContent({ bannerTitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Latest News"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                News Banner Type
              </label>
              <select
                value={content.bannerType || 'info'}
                onChange={(e) => updateContent({ bannerType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="info">Info (Blue)</option>
                <option value="success">Success (Green)</option>
                <option value="warning">Warning (Yellow)</option>
                <option value="error">Error (Red)</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Latest News Content
            </label>
            <textarea
              rows={3}
              value={content.bannerMessage || ''}
              onChange={(e) => updateContent({ bannerMessage: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter latest news and announcements separated by | (pipe symbol)"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Separate multiple news items with | symbol (e.g., "News 1 | News 2 | News 3")
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Action Button Text
              </label>
              <input
                type="text"
                value={content.bannerButtonText || ''}
                onChange={(e) => updateContent({ bannerButtonText: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Read More"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Action Button Link
              </label>
              <input
                type="text"
                value={content.bannerButtonLink || ''}
                onChange={(e) => updateContent({ bannerButtonLink: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="/contact"
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={content.bannerEnabled || false}
              onChange={(e) => updateContent({ bannerEnabled: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Show Latest News Banner
            </label>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">News Banner Preview:</h4>
            <div className={`p-3 rounded-md text-white text-sm ${
              content.bannerType === 'success' ? 'bg-emerald-600' :
              content.bannerType === 'warning' ? 'bg-yellow-600' :
              content.bannerType === 'error' ? 'bg-red-600' :
              'bg-blue-600'
            }`}>
              <strong>{content.bannerTitle || 'Latest News'}</strong>: {content.bannerMessage || 'No news content'}
              {content.bannerButtonText && (
                <span className="ml-2 bg-white/20 px-2 py-1 rounded text-xs">
                  {content.bannerButtonText}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section Titles */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Section Titles</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quick Stats Title</label>
            <input
              type="text"
              value={content.quickStatsTitle}
              onChange={(e) => updateContent({ quickStatsTitle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Explore Section Title</label>
            <input
              type="text"
              value={content.exploreSectionTitle}
              onChange={(e) => updateContent({ exploreSectionTitle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Section Title</label>
            <input
              type="text"
              value={content.welcomeSectionTitle}
              onChange={(e) => updateContent({ welcomeSectionTitle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Mission & Vision</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mission Statement</label>
            <textarea
              value={content.missionStatement}
              onChange={(e) => updateContent({ missionStatement: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vision Statement</label>
            <textarea
              value={content.visionStatement}
              onChange={(e) => updateContent({ visionStatement: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Message</label>
            <textarea
              value={content.welcomeMessage}
              onChange={(e) => updateContent({ welcomeMessage: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Featured Images */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Featured Images</h3>
        
        <div className="space-y-4">
          {content.featuredImages.map((image, index) => (
            <div key={index} className="flex items-center space-x-4">
              <img src={image} alt={`Featured ${index + 1}`} className="h-20 w-20 object-cover rounded" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      const newImages = [...content.featuredImages];
                      newImages[index] = e.target?.result as string;
                      updateContent({ featuredImages: newImages });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={() => {
                  const newImages = content.featuredImages.filter((_, i) => i !== index);
                  updateContent({ featuredImages: newImages });
                }}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
          
          <button
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const newImages = [...content.featuredImages, e.target?.result as string];
                    updateContent({ featuredImages: newImages });
                  };
                  reader.readAsDataURL(file);
                }
              };
              input.click();
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Featured Image</span>
          </button>
        </div>
      </div>

      {/* School Statistics */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">School Statistics</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Years of Excellence</label>
            <input
              type="number"
              value={content.schoolStats.yearsOfExcellence}
              onChange={(e) => updateContent({ 
                schoolStats: { ...content.schoolStats, yearsOfExcellence: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Students</label>
            <input
              type="number"
              value={content.schoolStats.totalStudents}
              onChange={(e) => updateContent({ 
                schoolStats: { ...content.schoolStats, totalStudents: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Qualified Teachers</label>
            <input
              type="number"
              value={content.schoolStats.qualifiedTeachers}
              onChange={(e) => updateContent({ 
                schoolStats: { ...content.schoolStats, qualifiedTeachers: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Annual Events</label>
            <input
              type="number"
              value={content.schoolStats.annualEvents}
              onChange={(e) => updateContent({ 
                schoolStats: { ...content.schoolStats, annualEvents: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAboutPageEditor = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">About Page Content</h2>
      
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Page Header</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
            <input
              type="text"
              value={content.aboutPage.pageTitle}
              onChange={(e) => handleNestedUpdate('aboutPage', 'pageTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Subtitle</label>
            <textarea
              value={content.aboutPage.pageSubtitle}
              onChange={(e) => handleNestedUpdate('aboutPage', 'pageSubtitle', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    handleNestedUpdate('aboutPage', 'heroImage', e.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {content.aboutPage.heroImage && (
              <img src={content.aboutPage.heroImage} alt="About Hero" className="mt-2 h-32 w-full object-cover rounded" />
            )}
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">History Section</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">History Title</label>
            <input
              type="text"
              value={content.aboutPage.historyTitle}
              onChange={(e) => handleNestedUpdate('aboutPage', 'historyTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">History Content</label>
            {content.aboutPage.historyContent.map((paragraph, index) => (
              <div key={index} className="flex items-start space-x-2 mb-2">
                <textarea
                  value={paragraph}
                  onChange={(e) => handleArrayUpdate('aboutPage', 'historyContent', index, e.target.value)}
                  rows={3}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeArrayItem('aboutPage', 'historyContent', index)}
                  className="text-red-600 hover:text-red-800 mt-2"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('aboutPage', 'historyContent', 'New paragraph...')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Paragraph</span>
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">History Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    handleNestedUpdate('aboutPage', 'historyImage', e.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {content.aboutPage.historyImage && (
              <img src={content.aboutPage.historyImage} alt="History" className="mt-2 h-32 w-full object-cover rounded" />
            )}
          </div>
        </div>
      </div>

      {/* Jesuit Management Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Jesuit Management Section</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jesuit Title</label>
            <input
              type="text"
              value={content.aboutPage.jesuitTitle}
              onChange={(e) => handleNestedUpdate('aboutPage', 'jesuitTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jesuit Content</label>
            {content.aboutPage.jesuitContent.map((paragraph, index) => (
              <div key={index} className="flex items-start space-x-2 mb-2">
                <textarea
                  value={paragraph}
                  onChange={(e) => handleArrayUpdate('aboutPage', 'jesuitContent', index, e.target.value)}
                  rows={3}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeArrayItem('aboutPage', 'jesuitContent', index)}
                  className="text-red-600 hover:text-red-800 mt-2"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('aboutPage', 'jesuitContent', 'New paragraph...')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Paragraph</span>
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jesuit Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    handleNestedUpdate('aboutPage', 'jesuitImage', e.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {content.aboutPage.jesuitImage && (
              <img src={content.aboutPage.jesuitImage} alt="Jesuit" className="mt-2 h-32 w-full object-cover rounded" />
            )}
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Vision & Mission</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vision</label>
            <textarea
              value={content.aboutPage.vision}
              onChange={(e) => handleNestedUpdate('aboutPage', 'vision', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mission</label>
            <textarea
              value={content.aboutPage.mission}
              onChange={(e) => handleNestedUpdate('aboutPage', 'mission', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Core Values Section</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Core Values Title</label>
            <input
              type="text"
              value={content.aboutPage.coreValuesTitle}
              onChange={(e) => handleNestedUpdate('aboutPage', 'coreValuesTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Core Values Subtitle</label>
            <input
              type="text"
              value={content.aboutPage.coreValuesSubtitle}
              onChange={(e) => handleNestedUpdate('aboutPage', 'coreValuesSubtitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Core Values</label>
            {content.aboutPage.coreValues.map((value, index) => (
              <div key={index} className="border p-4 rounded-md mb-4">
                <div className="grid grid-cols-1 gap-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={value.title}
                    onChange={(e) => {
                      const newValues = [...content.aboutPage.coreValues];
                      newValues[index] = { ...value, title: e.target.value };
                      handleNestedUpdate('aboutPage', 'coreValues', newValues);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Description"
                    value={value.description}
                    onChange={(e) => {
                      const newValues = [...content.aboutPage.coreValues];
                      newValues[index] = { ...value, description: e.target.value };
                      handleNestedUpdate('aboutPage', 'coreValues', newValues);
                    }}
                    rows={2}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={value.icon}
                    onChange={(e) => {
                      const newValues = [...content.aboutPage.coreValues];
                      newValues[index] = { ...value, icon: e.target.value };
                      handleNestedUpdate('aboutPage', 'coreValues', newValues);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="BookOpen">BookOpen</option>
                    <option value="Heart">Heart</option>
                    <option value="Users">Users</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    const newValues = content.aboutPage.coreValues.filter((_, i) => i !== index);
                    handleNestedUpdate('aboutPage', 'coreValues', newValues);
                  }}
                  className="mt-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newValues = [...content.aboutPage.coreValues, { title: '', description: '', icon: 'BookOpen' }];
                handleNestedUpdate('aboutPage', 'coreValues', newValues);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Core Value</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAcademicsPageEditor = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Academics Page Content</h2>
      
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Page Header</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
            <input
              type="text"
              value={content.academicsPage.pageTitle}
              onChange={(e) => handleNestedUpdate('academicsPage', 'pageTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Subtitle</label>
            <textarea
              value={content.academicsPage.pageSubtitle}
              onChange={(e) => handleNestedUpdate('academicsPage', 'pageSubtitle', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    handleNestedUpdate('academicsPage', 'heroImage', e.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {content.academicsPage.heroImage && (
              <img src={content.academicsPage.heroImage} alt="Academics Hero" className="mt-2 h-32 w-full object-cover rounded" />
            )}
          </div>
        </div>
      </div>

      {/* Section Titles */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Section Titles</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Section Title</label>
            <input
              type="text"
              value={content.academicsPage.primarySectionTitle}
              onChange={(e) => handleNestedUpdate('academicsPage', 'primarySectionTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Higher Secondary Title</label>
            <input
              type="text"
              value={content.academicsPage.higherSecondaryTitle}
              onChange={(e) => handleNestedUpdate('academicsPage', 'higherSecondaryTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 ${
                  activeSection === item.key ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeSection === 'homepage' && renderHomepageEditor()}
        {activeSection === 'about' && renderAboutPageEditor()}
        {activeSection === 'academics' && renderAcademicsPageEditor()}
      </div>
    </div>
  );
};

export default AdminPanel;