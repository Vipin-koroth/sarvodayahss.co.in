import React from 'react';
import { BookOpen, Microscope, Globe, Calculator, Palette, Music } from 'lucide-react';

const AcademicsPage = () => {
  const primaryClasses = [
    { range: "Class 1-5", description: "Foundation years focusing on basic literacy, numeracy, and life skills" },
    { range: "Class 6-8", description: "Middle school curriculum with introduction to specialized subjects" },
    { range: "Class 9-10", description: "Secondary education preparing for board examinations" }
  ];

  const higherSecondaryStreams = [
    {
      name: "Science Stream",
      icon: Microscope,
      subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Malayalam"],
      description: "Comprehensive science education preparing students for medical and engineering careers",
      color: "blue"
    },
    {
      name: "Humanities Stream",
      icon: Globe,
      subjects: ["History", "Political Science", "Economics", "Geography", "English", "Malayalam"],
      description: "Liberal arts education fostering critical thinking and social awareness",
      color: "emerald"
    }
  ];

  const facilities = [
    { name: "Science Laboratory", icon: Microscope, description: "Well-equipped labs for Physics, Chemistry, and Biology" },
    { name: "Computer Lab", icon: Calculator, description: "Modern computer facilities with internet connectivity" },
    { name: "Library", icon: BookOpen, description: "Extensive collection of books and digital resources" },
    { name: "Art Studio", icon: Palette, description: "Creative space for artistic expression and learning" },
    { name: "Music Room", icon: Music, description: "Dedicated space for music lessons and cultural activities" },
    { name: "Sports Ground", icon: Globe, description: "Athletic facilities for physical education and sports" }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Academic Programs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive education from foundation to higher secondary levels, 
            preparing students for success in academics and life.
          </p>
        </div>

        {/* Primary & Secondary Education */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Primary & Secondary Education</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {primaryClasses.map((classInfo, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
                <h3 className="text-xl font-bold text-blue-800 mb-4">{classInfo.range}</h3>
                <p className="text-gray-700">{classInfo.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Higher Secondary Streams */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Higher Secondary Education (Classes 11 & 12)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {higherSecondaryStreams.map((stream, index) => {
              const IconComponent = stream.icon;
              const colorClasses = {
                blue: "from-blue-50 to-blue-100 border-blue-200",
                emerald: "from-emerald-50 to-emerald-100 border-emerald-200"
              };
              const iconColors = {
                blue: "text-blue-800",
                emerald: "text-emerald-800"
              };
              const textColors = {
                blue: "text-blue-800",
                emerald: "text-emerald-800"
              };

              return (
                <div key={index} className={`bg-gradient-to-br ${colorClasses[stream.color]} border-2 p-8 rounded-xl`}>
                  <div className="flex items-center mb-6">
                    <IconComponent className={`h-12 w-12 ${iconColors[stream.color]} mr-4`} />
                    <h3 className={`text-2xl font-bold ${textColors[stream.color]}`}>{stream.name}</h3>
                  </div>
                  <p className="text-gray-700 mb-6">{stream.description}</p>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Subjects Offered:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {stream.subjects.map((subject, idx) => (
                        <span key={idx} className="bg-white px-3 py-1 rounded-md text-sm text-gray-700">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Academic Facilities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Academic Facilities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {facilities.map((facility, index) => {
              const IconComponent = facility.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                  <IconComponent className="h-10 w-10 text-blue-800 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{facility.name}</h3>
                  <p className="text-gray-600 text-sm">{facility.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Academic Excellence */}
        <section>
          <div className="bg-gradient-to-r from-blue-800 to-emerald-800 text-white p-8 md:p-12 rounded-xl text-center">
            <h2 className="text-3xl font-bold mb-6">Academic Excellence</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto">
              Our students consistently achieve outstanding results in board examinations, 
              with many securing admissions to prestigious universities and professional courses.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold mb-2">95%</div>
                <p className="text-blue-100">Board Exam Pass Rate</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">80%</div>
                <p className="text-blue-100">Higher Education Admissions</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <p className="text-blue-100">Academic Awards (Annual)</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AcademicsPage;