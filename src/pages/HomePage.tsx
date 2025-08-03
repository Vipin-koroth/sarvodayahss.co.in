import { ArrowRight, BookOpen, Users, Award, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const HomePage = () => {
  const { content } = useContent();

  const getTransitionClass = (type: string) => {
    if (!content.transitionSettings.cardTransitions) return '';
    
    const duration = content.transitionSettings.fadeInDuration;
    switch (type) {
      case 'hero':
        return content.transitionSettings.heroTransition === 'slide' 
          ? `transform transition-all duration-${duration} ease-in-out hover:scale-105`
          : `transition-opacity duration-${duration} ease-in-out`;
      case 'card':
        return `transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`;
      case 'fadeIn':
        return `animate-fade-in`;
      default:
        return '';
    }
  };
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-800 via-blue-700 to-emerald-600 text-white overflow-hidden">
        {/* Background Image */}
        {content.heroImage && (
          <div className="absolute inset-0">
            <img
              src={content.heroImage}
              alt="School Background"
              className={`w-full h-full object-cover opacity-20 ${getTransitionClass('hero')}`}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800/80 via-blue-700/80 to-emerald-600/80"></div>
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className={`text-center relative z-10 ${getTransitionClass('fadeIn')}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {content.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              {content.heroSubtitle}
            </p>
            <p className="text-lg mb-8 text-blue-100 max-w-3xl mx-auto">
              {content.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/about"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Learn About Us</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission & Vision
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">Mission</h3>
                <p className="text-gray-700 leading-relaxed">{content.missionStatement}</p>
              </div>
              <div className="bg-emerald-50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-emerald-800 mb-4">Vision</h3>
                <p className="text-gray-700 leading-relaxed">{content.visionStatement}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {content.quickStatsTitle}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-800 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{content.schoolStats.yearsOfExcellence}+</h3>
              <p className="text-gray-600">Years of Excellence</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-600 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{content.schoolStats.totalStudents}+</h3>
              <p className="text-gray-600">Students</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-600 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{content.schoolStats.qualifiedTeachers}+</h3>
              <p className="text-gray-600">Qualified Teachers</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{content.schoolStats.annualEvents}+</h3>
              <p className="text-gray-600">Annual Events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {content.exploreSectionTitle}
          </h2>
          
          {/* Featured Images */}
          {content.featuredImages.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {content.featuredImages.map((image, index) => (
                <div key={index} className={`relative rounded-xl overflow-hidden shadow-lg ${getTransitionClass('card')}`}>
                  <img
                    src={image}
                    alt={`Featured ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              ))}
            </div>
          )}
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/academics" className="group">
              <div className={`bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl hover:shadow-xl ${getTransitionClass('card')}`}>
                <BookOpen className="h-12 w-12 text-blue-800 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Academic Programs</h3>
                <p className="text-gray-700 mb-4">
                  Comprehensive education from Class 1 to 12 with Science and Humanities streams.
                </p>
                <span className="text-blue-800 font-semibold flex items-center">
                  Learn More <ArrowRight className="h-4 w-4 ml-2" />
                </span>
              </div>
            </Link>

            <Link to="/teachers" className="group">
              <div className={`bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-xl hover:shadow-xl ${getTransitionClass('card')}`}>
                <Users className="h-12 w-12 text-emerald-800 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Faculty</h3>
                <p className="text-gray-700 mb-4">
                  Meet our dedicated team of qualified and experienced educators.
                </p>
                <span className="text-emerald-800 font-semibold flex items-center">
                  Meet Our Teachers <ArrowRight className="h-4 w-4 ml-2" />
                </span>
              </div>
            </Link>

            <Link to="/events" className="group">
              <div className={`bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-xl hover:shadow-xl ${getTransitionClass('card')}`}>
                <Calendar className="h-12 w-12 text-yellow-800 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Events & Activities</h3>
                <p className="text-gray-700 mb-4">
                  Stay updated with school events, cultural programs, and academic activities.
                </p>
                <span className="text-yellow-800 font-semibold flex items-center">
                  View Events <ArrowRight className="h-4 w-4 ml-2" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="py-16 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {content.welcomeSectionTitle}
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {content.welcomeMessage}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;