import React from 'react';
import { Mail, Award, BookOpen, Microscope, Calculator, Globe } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const TeachersPage = () => {
  const { content } = useContent();

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Faculty</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our dedicated team of qualified educators who are committed to 
            nurturing young minds and fostering academic excellence.
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.teachers.map((teacher, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-3 aspect-h-4">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{teacher.name}</h3>
                <p className="text-blue-800 font-semibold mb-3">{teacher.designation}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-emerald-600" />
                      Subjects
                    </h4>
                    <p className="text-gray-600 text-sm">{teacher.subjects.join(', ')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1 flex items-center">
                      <Award className="h-4 w-4 mr-2 text-yellow-600" />
                      Experience
                    </h4>
                    <p className="text-gray-600 text-sm">{teacher.experience}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Education</h4>
                    <p className="text-gray-600 text-sm">{teacher.education}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="flex items-center text-blue-800 hover:text-blue-900 text-sm font-medium">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Teacher
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Department Information */}
        <section className="mt-16">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Departments</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Microscope className="h-8 w-8 text-blue-800" />
                </div>
                <h3 className="font-bold text-gray-900">Science</h3>
                <p className="text-gray-600 text-sm">Physics, Chemistry, Biology</p>
              </div>
              <div className="text-center p-4">
                <div className="bg-emerald-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Calculator className="h-8 w-8 text-emerald-800" />
                </div>
                <h3 className="font-bold text-gray-900">Mathematics</h3>
                <p className="text-gray-600 text-sm">Pure & Applied Math</p>
              </div>
              <div className="text-center p-4">
                <div className="bg-yellow-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Globe className="h-8 w-8 text-yellow-800" />
                </div>
                <h3 className="font-bold text-gray-900">Humanities</h3>
                <p className="text-gray-600 text-sm">History, Geography, Politics</p>
              </div>
              <div className="text-center p-4">
                <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-8 w-8 text-purple-800" />
                </div>
                <h3 className="font-bold text-gray-900">Languages</h3>
                <p className="text-gray-600 text-sm">English, Malayalam, Hindi</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeachersPage;