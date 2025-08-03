import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const ContactPage = () => {
  const { content } = useContent();
  const { contactPage } = content;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message. We will get back to you soon!');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{contactPage.pageTitle}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {contactPage.pageSubtitle}
          </p>
          {contactPage.heroImage && (
            <div className="mt-8">
              <img src={contactPage.heroImage} alt="Contact Us" className="w-full h-64 object-cover rounded-xl shadow-lg mx-auto" />
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{contactPage.contactInfoTitle}</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-800" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">
                    {contactPage.address.line1}<br />
                    {contactPage.address.line2}<br />
                    {contactPage.address.line3} - {contactPage.address.pincode}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-emerald-800" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  {contactPage.phones.map((phone, index) => (
                    <p key={index} className="text-gray-600">{phone}</p>
                  ))}
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-yellow-800" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  {contactPage.emails.map((email, index) => (
                    <p key={index} className="text-gray-600">{email}</p>
                  ))}
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-800" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Office Hours</h3>
                  <p className="text-gray-600">{contactPage.officeHours.weekdays}</p>
                  <p className="text-gray-600">{contactPage.officeHours.saturday}</p>
                  <p className="text-gray-600">{contactPage.officeHours.sunday}</p>
                </div>
              </div>
            </div>

            {/* Google Maps Placeholder */}
            <div className="mt-8">
              <h3 className="font-semibold text-gray-900 mb-4">{contactPage.locationTitle}</h3>
              {contactPage.mapUrl && contactPage.mapUrl.trim() !== '' ? (
                <div className="h-64 rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src={contactPage.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="School Location"
                  ></iframe>
                </div>
              ) : (
                <div className="bg-gray-200 h-64 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-600">Google Maps Integration</p>
                    <p className="text-sm text-gray-500">{contactPage.address.line2}</p>
                    <p className="text-xs text-gray-400 mt-2">Add map URL in admin settings</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{contactPage.contactFormTitle}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select a subject</option>
                    <option value="admission">Admission Inquiry</option>
                    <option value="academic">Academic Information</option>
                    <option value="transport">Transportation</option>
                    <option value="fees">Fee Structure</option>
                    <option value="general">General Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Please describe your inquiry or message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Quick Contact Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-800 text-white p-6 rounded-xl text-center">
                <Phone className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Call Us</h3>
                <p className="text-blue-100">For immediate assistance</p>
                <p className="text-sm mt-2">{contactPage.phones[0]}</p>
              </div>
              
              <div className="bg-emerald-800 text-white p-6 rounded-xl text-center">
                <Mail className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Email Us</h3>
                <p className="text-emerald-100">For detailed inquiries</p>
                <p className="text-sm mt-2">{contactPage.emails[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;