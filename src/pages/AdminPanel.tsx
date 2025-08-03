import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, LogIn, Settings, FileText, Users, Calendar, Image } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const AdminPanel = () => {
  const { content, updateContent } = useContent();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [activeSection, setActiveSection] = useState('dashboard');
  const [editingContent, setEditingContent] = useState({
    welcomeMessage: content.welcomeMessage,
    missionStatement: content.missionStatement,
    visionStatement: content.visionStatement,
    schoolStats: { ...content.schoolStats }
  });

  const handleContentSave = () => {
    updateContent(editingContent);
    alert('Content updated successfully! Changes are now live on the website.');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo authentication - in production, this should be secure
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
    // Reset editing content when logging out
    setEditingContent({
      welcomeMessage: content.welcomeMessage,
      missionStatement: content.missionStatement,
      visionStatement: content.visionStatement,
      schoolStats: { ...content.schoolStats }
    });
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
    { key: 'content', label: 'Homepage Content', icon: FileText },
    { key: 'teachers', label: 'Teachers', icon: Users },
    { key: 'events', label: 'Events', icon: Calendar },
    { key: 'gallery', label: 'Gallery', icon: Image },
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
                      <p className="text-3xl font-bold text-blue-900">45</p>
                    </div>
                    <div className="bg-emerald-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-emerald-800">Active Events</h3>
                      <p className="text-3xl font-bold text-emerald-900">8</p>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-yellow-800">Gallery Items</h3>
                      <p className="text-3xl font-bold text-yellow-900">156</p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-purple-800">Total Students</h3>
                      <p className="text-3xl font-bold text-purple-900">1,247</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'content' && (
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
                          schoolStats: { ...content.schoolStats }
                        })}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                      >
                        Reset Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'teachers' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Teacher Management</h2>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium">
                      Add New Teacher
                    </button>
                  </div>
                  <div className="text-gray-600">
                    <p>Here you can add, edit, and remove teacher profiles, including their photos, designations, and subject assignments.</p>
                  </div>
                </div>
              )}

              {activeSection === 'events' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
                      Create New Event
                    </button>
                  </div>
                  <div className="text-gray-600">
                    <p>Manage school events, including dates, descriptions, images, and categories. Control which events appear as upcoming or past.</p>
                  </div>
                </div>
              )}

              {activeSection === 'gallery' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium">
                      Upload Media
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