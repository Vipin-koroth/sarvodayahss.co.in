import React from 'react';
import { BookOpen, Microscope, Globe, Calculator, Palette, Music } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const AcademicsPage = () => {
  const { content } = useContent();
  const { academicsPage } = content;

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{academicsPage.pageTitle}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {academicsPage.pageSubtitle}
          </p>
          {academicsPage.heroImage && (
            <div className="mt-8">
              <img src={academicsPage.heroImage} alt="Academics" className="w-full h-64 object-cover rounded-xl shadow-lg mx-auto" />
            </div>
          )}
        </div>

        {/* Primary & Secondary Education */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{academicsPage.primarySectionTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {academicsPage.primaryClasses.map((classInfo, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
                <h3 className="text-xl font-bold text-blue-800 mb-4">{classInfo.range}</h3>
                <p className="text-gray-700">{classInfo.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Higher Secondary Streams */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{academicsPage.higherSecondaryTitle}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {academicsPage.higherSecondaryStreams.map((stream, index) => {
              const getIcon = (iconName: string) => {
                switch (iconName) {
                  case 'Microscope': return Microscope;
                  case 'Globe': return Globe;
                  default: return Microscope;
                }
              };
              const IconComponent = getIcon(stream.name === 'Science Stream' ? 'Microscope' : 'Globe');
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{academicsPage.facilitiesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {academicsPage.facilities.map((facility, index) => {
              const getIcon = (iconName: string) => {
                switch (iconName) {
                  case 'Microscope': return Microscope;
                  case 'Calculator': return Calculator;
                  case 'BookOpen': return BookOpen;
                  case 'Palette': return Palette;
                  case 'Music': return Music;
                  case 'Globe': return Globe;
                  default: return BookOpen;
                }
              };
              const IconComponent = getIcon(facility.icon);
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
            <h2 className="text-3xl font-bold mb-6">{academicsPage.excellenceTitle}</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto">
              {academicsPage.excellenceDescription}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold mb-2">{academicsPage.academicStats.passRate}%</div>
                <p className="text-blue-100">Board Exam Pass Rate</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">{academicsPage.academicStats.higherEducationRate}%</div>
                <p className="text-blue-100">Higher Education Admissions</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">{academicsPage.academicStats.annualAwards}+</div>
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