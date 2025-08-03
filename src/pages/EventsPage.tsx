import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingEvents = [
    {
      title: "Annual Science Exhibition",
      date: "March 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "School Auditorium",
      description: "Students showcase their innovative science projects and experiments.",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Academic"
    },
    {
      title: "Sports Day Celebrations",
      date: "March 28, 2025",
      time: "8:00 AM - 5:00 PM",
      location: "School Sports Ground",
      description: "Annual athletic meet with various sports competitions and cultural programs.",
      image: "https://images.pexels.com/photos/159581/rugby-sports-game-ball-159581.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Sports"
    },
    {
      title: "Malayalam Literary Fest",
      date: "April 10, 2025",
      time: "2:00 PM - 6:00 PM",
      location: "School Auditorium",
      description: "Celebration of Malayalam literature with poetry, storytelling, and debates.",
      image: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Cultural"
    },
    {
      title: "Parent-Teacher Conference",
      date: "April 22, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "School Premises",
      description: "Important meeting to discuss student progress and academic development.",
      image: "https://images.pexels.com/photos/8500607/pexels-photo-8500607.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Academic"
    }
  ];

  const pastEvents = [
    {
      title: "Christmas Celebration 2024",
      date: "December 20, 2024",
      time: "10:00 AM - 2:00 PM",
      location: "School Auditorium",
      description: "Festive celebration with carol singing, nativity play, and cultural programs.",
      image: "https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Cultural"
    },
    {
      title: "Annual Day Celebration",
      date: "November 15, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "School Auditorium",
      description: "Grand celebration showcasing student talents in dance, music, and drama.",
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Cultural"
    },
    {
      title: "Inter-School Quiz Competition",
      date: "October 8, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "School Auditorium",
      description: "Regional quiz competition with participation from 15 schools.",
      image: "https://images.pexels.com/photos/5427674/pexels-photo-5427674.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Academic"
    },
    {
      title: "Gandhi Jayanti Celebration",
      date: "October 2, 2024",
      time: "8:00 AM - 11:00 AM",
      location: "School Assembly Hall",
      description: "Special assembly honoring Mahatma Gandhi with speeches and cultural programs.",
      image: "https://images.pexels.com/photos/8926991/pexels-photo-8926991.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Cultural"
    }
  ];

  const currentEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Academic': return 'bg-blue-100 text-blue-800';
      case 'Sports': return 'bg-emerald-100 text-emerald-800';
      case 'Cultural': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Events & Activities</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with our school events, cultural programs, and academic activities 
            throughout the year.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-2 rounded-lg shadow-md">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                activeTab === 'upcoming'
                  ? 'bg-blue-800 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-800'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                activeTab === 'past'
                  ? 'bg-blue-800 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-800'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {currentEvents.map((event, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                  {activeTab === 'upcoming' && (
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                      Upcoming
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                {activeTab === 'upcoming' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>Register Interest</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-800 to-emerald-800 text-white p-8 md:p-12 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
            <p className="text-xl text-blue-100 mb-6">
              Don't miss out on important school events and announcements.
            </p>
            <button className="bg-white text-blue-800 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Subscribe to Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;