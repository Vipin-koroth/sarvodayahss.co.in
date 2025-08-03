import React from 'react';
import { Church, Heart, Target, Star, BookOpen, Users } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const AboutPage = () => {
  const { content } = useContent();
  const { aboutPage } = content;

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{aboutPage.pageTitle}</h1>
          <div className="flex justify-center mb-4">
            <img 
              src="/Sravodaya_Small.png" 
              alt="Sarvodaya HSS Logo" 
              className="h-16 w-16 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {aboutPage.pageSubtitle}
          </p>
          {aboutPage.heroImage && (
            <div className="mt-8">
              <img src={aboutPage.heroImage} alt="About Us" className="w-full h-64 object-cover rounded-xl shadow-lg mx-auto" />
            </div>
          )}
        </div>

        {/* School History */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{aboutPage.historyTitle}</h2>
              <div className="space-y-4 text-gray-700">
                {aboutPage.historyContent.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div>
              {aboutPage.historyImage && (
                <img src={aboutPage.historyImage} alt="School History" className="w-full h-64 object-cover rounded-xl shadow-lg mb-6" />
              )}
              <div className="bg-gradient-to-br from-blue-50 to-emerald-50 p-8 rounded-xl">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-800 mb-2">{aboutPage.establishedYear}</div>
                  <p className="text-gray-600 mb-4">Year Established</p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-emerald-800">50</div>
                      <p className="text-sm text-gray-600">Years of Service</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-800">{aboutPage.currentStudents}+</div>
                      <p className="text-sm text-gray-600">Current Students</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Jesuit Management */}
        <section className="mb-16">
          <div className="bg-slate-50 p-8 md:p-12 rounded-xl">
            <div className="text-center mb-8">
              <Church className="h-16 w-16 text-blue-800 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{aboutPage.jesuitTitle}</h2>
              {aboutPage.jesuitImage && (
                <img src={aboutPage.jesuitImage} alt="Jesuit Management" className="w-full max-w-md h-48 object-cover rounded-xl shadow-lg mx-auto mb-6" />
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Kerala Jesuit Fathers</h3>
                {aboutPage.jesuitContent.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Jesuit Educational Tradition</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <span>Excellence in academic standards</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Heart className="h-5 w-5 text-red-600 mt-0.5" />
                    <span>Care for the whole person</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Target className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Service to others, especially the poor</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Church className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span>Spiritual and moral formation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-800 text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
              <p className="text-blue-100 leading-relaxed">{aboutPage.vision}</p>
            </div>
            <div className="bg-emerald-800 text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
              <p className="text-emerald-100 leading-relaxed">{aboutPage.mission}</p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{aboutPage.coreValuesTitle}</h2>
            <p className="text-lg text-gray-600">
              {aboutPage.coreValuesSubtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {aboutPage.coreValues.map((value, index) => {
              const getIcon = (iconName: string) => {
                switch (iconName) {
                  case 'BookOpen': return BookOpen;
                  case 'Heart': return Heart;
                  case 'Users': return Users;
                  default: return BookOpen;
                }
              };
              const IconComponent = getIcon(value.icon);
              const colorClasses = ['bg-blue-100 text-blue-800', 'bg-emerald-100 text-emerald-800', 'bg-yellow-100 text-yellow-800'];
              
              return (
                <div key={index} className="text-center p-6">
                  <div className={`p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 ${colorClasses[index] || 'bg-gray-100 text-gray-800'}`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;