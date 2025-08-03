import React from 'react';
import { Church, Heart, Target, Star, BookOpen, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the rich history and values that make Sarvodaya Higher Secondary School 
            a beacon of educational excellence in Wayanad.
          </p>
        </div>

        {/* School History */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our History</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Established in 1975, Sarvodaya Higher Secondary School has been a cornerstone 
                  of quality education in the scenic district of Wayanad. The school was founded 
                  with the vision of providing accessible, high-quality education to the rural 
                  communities of Kerala.
                </p>
                <p>
                  From humble beginnings with just 50 students, we have grown to become one of 
                  the most respected educational institutions in the region, serving over 1200 
                  students from diverse backgrounds.
                </p>
                <p>
                  Our journey has been marked by consistent academic excellence, innovative 
                  teaching methodologies, and a commitment to holistic development that extends 
                  beyond textbooks to character formation and spiritual growth.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 p-8 rounded-xl">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-800 mb-2">1975</div>
                <p className="text-gray-600 mb-4">Year Established</p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-emerald-800">50</div>
                    <p className="text-sm text-gray-600">Years of Service</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-800">1200+</div>
                    <p className="text-sm text-gray-600">Current Students</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Jesuit Management</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Kerala Jesuit Fathers</h3>
                <p className="text-gray-700 mb-4">
                  The school is proudly managed by the Kerala Jesuit Fathers, who bring centuries 
                  of educational excellence and spiritual guidance to our institution. The Society 
                  of Jesus has been at the forefront of education worldwide, known for their 
                  commitment to academic rigor and character formation.
                </p>
                <p className="text-gray-700">
                  Under Jesuit guidance, our school follows the motto "Ad Majorem Dei Gloriam" 
                  (For the Greater Glory of God), ensuring that every student receives not just 
                  academic knowledge but also moral and spiritual development.
                </p>
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
              <p className="text-blue-100 leading-relaxed">
                To be a premier educational institution that transforms lives through 
                excellence in academics, character formation, and spiritual development, 
                creating compassionate leaders who serve society with integrity and wisdom.
              </p>
            </div>
            <div className="bg-emerald-800 text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
              <p className="text-emerald-100 leading-relaxed">
                To provide holistic education that integrates academic excellence with 
                moral values, preparing students to be responsible citizens who contribute 
                meaningfully to society while staying rooted in their cultural heritage.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-lg text-gray-600">
              The values that guide everything we do at Sarvodaya
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Academic Excellence</h3>
              <p className="text-gray-600">
                Commitment to highest standards of teaching and learning
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-emerald-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Compassion</h3>
              <p className="text-gray-600">
                Caring for each student's individual needs and growth
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-yellow-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Service</h3>
              <p className="text-gray-600">
                Developing leaders who serve others and transform society
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;