import React from 'react';
import { MapPin, Phone, Mail, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const Footer = () => {
  const { content } = useContent();
  const { footerContent } = content;

  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* School Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <GraduationCap className="h-8 w-8 text-emerald-400" />
              <div>
                <h3 className="text-xl font-bold">{footerContent.schoolName}</h3>
                <p className="text-sm text-gray-300">{footerContent.tagline}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              {footerContent.description}
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-gray-300">{footerContent.address.line1}</p>
                  <p className="text-gray-300">{footerContent.address.line2}</p>
                  <p className="text-gray-300">{footerContent.address.line3} - {footerContent.address.pincode}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400" />
                <p className="text-gray-300">{footerContent.phone}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-400" />
                <p className="text-gray-300">{footerContent.email}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {footerContent.quickLinks.map((link, index) => (
                link.isExternal ? (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={index}
                    to={link.url}
                    className="block text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            {footerContent.copyrightText}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            {footerContent.managementText}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;