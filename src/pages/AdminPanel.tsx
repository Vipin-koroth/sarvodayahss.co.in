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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facilities Title</label>
            <input
              type="text"
              value={content.academicsPage.facilitiesTitle}
              onChange={(e) => handleNestedUpdate('academicsPage', 'facilitiesTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Excellence Title</label>
            <input
              type="text"
              value={content.academicsPage.excellenceTitle}
              onChange={(e) => handleNestedUpdate('academicsPage', 'excellenceTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Excellence Description</label>
            <textarea
              value={content.academicsPage.excellenceDescription}
              onChange={(e) => handleNestedUpdate('academicsPage', 'excellenceDescription', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Academic Statistics */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Academic Statistics</h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pass Rate (%)</label>
            <input
              type="number"
              value={content.academicsPage.academicStats.passRate}
              onChange={(e) => handleNestedUpdate('academicsPage', 'academicStats', {
                ...content.academicsPage.academicStats,
                passRate: parseInt(e.target.value)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Higher Education Rate (%)</label>
            <input
              type="number"
              value={content.academicsPage.academicStats.higherEducationRate}
              onChange={(e) => handleNestedUpdate('academicsPage', 'academicStats', {
                ...content.academicsPage.academicStats,
                higherEducationRate: parseInt(e.target.value)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Annual Awards</label>
            <input
              type="number"
              value={content.academicsPage.academicStats.annualAwards}
              onChange={(e) => handleNestedUpdate('academicsPage', 'academicStats', {
                ...content.academicsPage.academicStats,
                annualAwards: parseInt(e.target.value)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeachersPageEditor = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Teachers Page Content</h2>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Page Settings</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
            <input
              type="text"
              value={content.teachersPage.pageTitle}
              onChange={(e) => handleNestedUpdate('teachersPage', 'pageTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Subtitle</label>
            <textarea
              value={content.teachersPage.pageSubtitle}
              onChange={(e) => handleNestedUpdate('teachersPage', 'pageSubtitle', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Departments Title</label>
            <input
              type="text"
              value={content.teachersPage.departmentsTitle}
              onChange={(e) => handleNestedUpdate('teachersPage', 'departmentsTitle', e.target.value)}
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
                    handleNestedUpdate('teachersPage', 'heroImage', e.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {content.teachersPage.heroImage && (
              <img src={content.teachersPage.heroImage} alt="Teachers Hero" className="mt-2 h-32 w-full object-cover rounded" />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEventsPageEditor = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Events Page Content</h2>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Page Settings</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
            <input
              type="text"
              value={content.eventsPage.pageTitle}
              onChange={(e) => handleNestedUpdate('eventsPage', 'pageTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Subtitle</label>
            <textarea
              value={content.eventsPage.pageSubtitle}
              onChange={(e) => handleNestedUpdate('eventsPage', 'pageSubtitle', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Call to Action Title</label>
            <input
              type="text"
              value={content.eventsPage.callToActionTitle}
              onChange={(e) => handleNestedUpdate('eventsPage', 'callToActionTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Call to Action Description</label>
            <textarea
              value={content.eventsPage.callToActionDescription}
              onChange={(e) => handleNestedUpdate('eventsPage', 'callToActionDescription', e.target.value)}
              rows={2}
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
                    handleNestedUpdate('eventsPage', 'heroImage', e.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {content.eventsPage.heroImage && (
              <img src={content.eventsPage.heroImage} alt="Events Hero" className="mt-2 h-32 w-full object-cover rounded" />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderGalleryPageEditor = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Gallery Page Content</h2>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Page Settings</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
            <input
              type="text"
              value={content.galleryPage.pageTitle}
              onChange={(e) => handleNestedUpdate('galleryPage', 'pageTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Subtitle</label>
            <textarea
              value={content.galleryPage.pageSubtitle}
              onChange={(e) => handleNestedUpdate('galleryPage', 'pageSubtitle', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stats Title</label>
            <input
              type="text"
              value={content.galleryPage.statsTitle}
              onChange={(e) => handleNestedUpdate('galleryPage', 'statsTitle', e.target.value)}
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
                    handleNestedUpdate('galleryPage', 'heroImage', e.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {content.galleryPage.heroImage && (
              <img src={content.galleryPage.heroImage} alt="Gallery Hero" className="mt-2 h-32 w-full object-cover rounded" />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactPageEditor = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Contact Page Content</h2>
      
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Page Header</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
            <input
              type="text"
              value={content.contactPage.pageTitle}
              onChange={(e) => handleNestedUpdate('contactPage', 'pageTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Subtitle</label>
            <textarea
              value={content.contactPage.pageSubtitle}
              onChange={(e) => handleNestedUpdate('contactPage', 'pageSubtitle', e.target.value)}
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
                    handleNestedUpdate('contactPage', 'heroImage', e.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {content.contactPage.heroImage && (
              <img src={content.contactPage.heroImage} alt="Contact Hero" className="mt-2 h-32 w-full object-cover rounded" />
            )}
          </div>
        </div>
      </div>

      {/* Section Titles */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Section Titles</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Info Title</label>
            <input
              type="text"
              value={content.contactPage.contactInfoTitle}
              onChange={(e) => handleNestedUpdate('contactPage', 'contactInfoTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Form Title</label>
            <input
              type="text"
              value={content.contactPage.contactFormTitle}
              onChange={(e) => handleNestedUpdate('contactPage', 'contactFormTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location Title</label>
            <input
              type="text"
              value={content.contactPage.locationTitle}
              onChange={(e) => handleNestedUpdate('contactPage', 'locationTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
            <input
              type="text"
              value={content.contactPage.address.line1}
              onChange={(e) => handleNestedUpdate('contactPage', 'address', {
                ...content.contactPage.address,
                line1: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
            <input
              type="text"
              value={content.contactPage.address.line2}
              onChange={(e) => handleNestedUpdate('contactPage', 'address', {
                ...content.contactPage.address,
                line2: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 3</label>
            <input
              type="text"
              value={content.contactPage.address.line3}
              onChange={(e) => handleNestedUpdate('contactPage', 'address', {
                ...content.contactPage.address,
                line3: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
            <input
              type="text"
              value={content.contactPage.address.pincode}
              onChange={(e) => handleNestedUpdate('contactPage', 'address', {
                ...content.contactPage.address,
                pincode: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Numbers</label>
            {content.contactPage.phones.map((phone, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => handleArrayUpdate('contactPage', 'phones', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeArrayItem('contactPage', 'phones', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('contactPage', 'phones', '+91 ')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Phone</span>
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Addresses</label>
            {content.contactPage.emails.map((email, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleArrayUpdate('contactPage', 'emails', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeArrayItem('contactPage', 'emails', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('contactPage', 'emails', '')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Email</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'homepage':
        return renderHomepageEditor();
      case 'about':
        return renderAboutPageEditor();
      case 'academics':
        return renderAcademicsPageEditor();
      case 'teachers-page':
        return renderTeachersPageEditor();
      case 'events-page':
        return renderEventsPageEditor();
      case 'gallery-page':
        return renderGalleryPageEditor();
      case 'contact':
        return renderContactPageEditor();
      case 'teachers':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Manage Staff</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Staff Page Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                  <input
                    type="text"
                    value={content.teachersPage.pageTitle}
                    onChange={(e) => updateContent({ 
                      teachersPage: { ...content.teachersPage, pageTitle: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Page Subtitle</label>
                  <textarea
                    value={content.teachersPage.pageSubtitle}
                    onChange={(e) => updateContent({ 
                      teachersPage: { ...content.teachersPage, pageSubtitle: e.target.value }
                    })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Add New Staff Member</h3>
              <form onSubmit={handleTeacherSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Staff Name</label>
                    <input
                      type="text"
                      required
                      value={newTeacher.name}
                      onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                    <input
                      type="text"
                      required
                      value={newTeacher.designation}
                      onChange={(e) => setNewTeacher({ ...newTeacher, designation: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subjects (comma-separated)</label>
                    <input
                      type="text"
                      required
                      value={newTeacher.subjects}
                      onChange={(e) => setNewTeacher({ ...newTeacher, subjects: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                    <input
                      type="text"
                      required
                      value={newTeacher.experience}
                      onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                    <input
                      type="text"
                      required
                      value={newTeacher.education}
                      onChange={(e) => setNewTeacher({ ...newTeacher, education: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Staff Photo URL</label>
                    <input
                      type="url"
                      required
                      value={newTeacher.image}
                      onChange={(e) => setNewTeacher({ ...newTeacher, image: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Add Staff Member
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Existing Staff Members</h3>
              <div className="space-y-4">
                {content.teachers.map((teacher) => (
                  <div key={teacher.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img src={teacher.image} alt={teacher.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <h4 className="font-semibold">{teacher.name}</h4>
                        <p className="text-sm text-gray-600">{teacher.designation}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTeacher(teacher.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                    >
                      Delete Staff Member
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Manage Events</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Events Page Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                  <input
                    type="text"
                    value={content.eventsPage.pageTitle}
                    onChange={(e) => updateContent({ 
                      eventsPage: { ...content.eventsPage, pageTitle: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Page Subtitle</label>
                  <textarea
                    value={content.eventsPage.pageSubtitle}
                    onChange={(e) => updateContent({ 
                      eventsPage: { ...content.eventsPage, pageSubtitle: e.target.value }
                    })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Add New Event</h3>
              <form onSubmit={handleEventSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                    <input
                      type="text"
                      required
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="text"
                      required
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      placeholder="March 15, 2025"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="text"
                      required
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      placeholder="10:00 AM - 4:00 PM"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      required
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newEvent.category}
                      onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Academic">Academic</option>
                      <option value="Sports">Sports</option>
                      <option value="Cultural">Cultural</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={newEvent.isUpcoming ? 'upcoming' : 'past'}
                      onChange={(e) => setNewEvent({ ...newEvent, isUpcoming: e.target.value === 'upcoming' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="past">Past</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    required
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Image URL</label>
                  <input
                    type="url"
                    required
                    value={newEvent.image}
                    onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Add Event
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Existing Events</h3>
              <div className="space-y-4">
                {content.events.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img src={event.image} alt={event.title} className="w-12 h-12 rounded object-cover" />
                      <div>
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.date} - {event.category}</p>
                        <span className={`text-xs px-2 py-1 rounded ${event.isUpcoming ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {event.isUpcoming ? 'Upcoming' : 'Past'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                    >
                      Delete Event
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Manage Gallery</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Gallery Page Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                  <input
                    type="text"
                    value={content.galleryPage.pageTitle}
                    onChange={(e) => updateContent({ 
                      galleryPage: { ...content.galleryPage, pageTitle: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Page Subtitle</label>
                  <textarea
                    value={content.galleryPage.pageSubtitle}
                    onChange={(e) => updateContent({ 
                      galleryPage: { ...content.galleryPage, pageSubtitle: e.target.value }
                    })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Add New Gallery Item</h3>
              <form onSubmit={handleGallerySubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      required
                      value={newGalleryItem.title}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={newGalleryItem.type}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, type: e.target.value as 'image' | 'video' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newGalleryItem.category}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="academic">Academic</option>
                      <option value="cultural">Cultural</option>
                      <option value="sports">Sports</option>
                      <option value="events">Events</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Source URL</label>
                    <input
                      type="url"
                      required
                      value={newGalleryItem.src}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, src: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
                  <input
                    type="url"
                    required
                    value={newGalleryItem.thumbnail}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, thumbnail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Add Gallery Item
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Existing Gallery Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {content.galleryItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <h4 className="font-semibold text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-600 capitalize">{item.category} - {item.type}</p>
                      <button
                        onClick={() => deleteGalleryItem(item.id)}
                        className="mt-2 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">School Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    value={content.logoImage}
                    onChange={(e) => updateContent({ logoImage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hero Video URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={content.heroVideo}
                    onChange={(e) => updateContent({ heroVideo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/video.mp4"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    If provided, video will play instead of background image
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Maps Embed URL
                  </label>
                  <input
                    type="url"
                    value={content.contactPage.mapUrl}
                    onChange={(e) => updateContent({
                      contactPage: { ...content.contactPage, mapUrl: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Paste Google Maps embed URL here"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Get embed URL: Google Maps → Share → Embed a map → Copy HTML → Extract src URL
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Welcome Message
                  </label>
                  <textarea
                    value={content.welcomeMessage}
                    onChange={(e) => updateContent({ welcomeMessage: e.target.value })}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">School Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
                  <input
                    type="text"
                    value={content.contactPage.address.line1}
                    onChange={(e) => updateContent({ 
                      contactPage: { 
                        ...content.contactPage, 
                        address: { ...content.contactPage.address, line1: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
                  <input
                    type="text"
                    value={content.contactPage.address.line2}
                    onChange={(e) => updateContent({ 
                      contactPage: { 
                        ...content.contactPage, 
                        address: { ...content.contactPage.address, line2: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      value={content.contactPage.address.line3}
                      onChange={(e) => updateContent({ 
                        contactPage: { 
                          ...content.contactPage, 
                          address: { ...content.contactPage.address, line3: e.target.value }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                    <input
                      type="text"
                      value={content.contactPage.address.pincode}
                      onChange={(e) => updateContent({ 
                        contactPage: { 
                          ...content.contactPage, 
                          address: { ...content.contactPage.address, pincode: e.target.value }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a section to edit</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-600">Content Management</p>
          </div>
          
          <nav className="mt-6">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors duration-200 ${
                    activeSection === item.key
                      ? 'bg-blue-800 text-white border-r-4 border-blue-600'
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

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;