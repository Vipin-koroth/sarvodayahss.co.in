import React from 'react';
import { MapPin, Phone, Mail, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* School Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/Sravodaya_Small.png" 
                alt="Sarvodaya HSS Logo" 
                className="h-10 w-10 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'block';
                }}
              />
              <GraduationCap className="h-8 w-8 text-emerald-400 hidden" />
              <div>
                <h3 className="text-xl font-bold">Sarvodaya HSS</h3>
                <p className="text-sm text-gray-300">Excellence in Education</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              A Kerala Government Aided School managed by the Kerala Jesuit Fathers, 
              committed to providing quality education and holistic development.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-gray-300">Sarvodaya Higher Secondary School</p>
                  <p className="text-gray-300">Eachome, Wayanad District</p>
                  <p className="text-gray-300">Kerala, India - 673592</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400" />
                <p className="text-gray-300">+91 493 622 3456</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-400" />
                <p className="text-gray-300">info@sarvodayahss.edu.in</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                About Us
              </Link>
              <Link to="/academics" className="block text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                Academic Programs
              </Link>
              <Link to="/teachers" className="block text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                Our Teachers
              </Link>
              <Link to="/events" className="block text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                Events & News
              </Link>
              <a 
                href="https://sarvodayapay.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-emerald-400 transition-colors duration-200"
              >
                School Accounts
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Sarvodaya Higher Secondary School, Eachome. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Managed by Kerala Jesuit Fathers | Government Aided Institution
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;