
import React, { useState } from 'react';
import { Mail, Phone, Clock, Send } from 'lucide-react';
import { toast } from "sonner";

interface ContactFormData {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  replied: boolean;
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Generate a unique ID for the contact query
    const newId = Date.now().toString();
    
    // Create the contact data object
    const contactData: ContactFormData = {
      id: newId,
      ...formData,
      date: new Date().toISOString(),
      replied: false
    };
    
    // Get existing queries or initialize empty array
    const existingQueries = JSON.parse(localStorage.getItem('contactQueries') || '[]');
    
    // Add new query to existing queries
    localStorage.setItem('contactQueries', JSON.stringify([...existingQueries, contactData]));
    
    // Show success message
    toast.success("Thanks for reaching out! We'll get back to you soon.");
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent">
          Contact Us
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-admin-dark rounded-xl border border-white/10 p-8 order-2 lg:order-1">
            <h2 className="text-2xl font-bold text-admin-primary mb-6">Get In Touch</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white focus:border-admin-primary focus:outline-none"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white focus:border-admin-primary focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white focus:border-admin-primary focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-300 mb-1">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white focus:border-admin-primary focus:outline-none appearance-none"
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Booking Question">Booking Question</option>
                  <option value="Destination Information">Destination Information</option>
                  <option value="Package Details">Package Details</option>
                  <option value="Cancellation">Cancellation</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-1">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white focus:border-admin-primary focus:outline-none"
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-admin-primary hover:bg-admin-accent text-black font-medium rounded-md transition-colors flex items-center gap-2 disabled:opacity-70"
                >
                  {loading ? 'Sending...' : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="bg-admin-dark rounded-xl border border-white/10 p-8 mb-6">
              <h2 className="text-2xl font-bold text-admin-primary mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-admin-primary/20 p-3 rounded-full">
                    <Phone size={24} className="text-admin-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Phone</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                    <p className="text-gray-400">Toll-free: 1-800-TRAVEL-NOW</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-admin-primary/20 p-3 rounded-full">
                    <Mail size={24} className="text-admin-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Email</h3>
                    <p className="text-gray-400">info@globetrekholidays.com</p>
                    <p className="text-gray-400">bookings@globetrekholidays.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-admin-primary/20 p-3 rounded-full">
                    <Clock size={24} className="text-admin-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Business Hours</h3>
                    <p className="text-gray-400">Monday - Friday: 9am - 6pm</p>
                    <p className="text-gray-400">Saturday: 10am - 4pm</p>
                    <p className="text-gray-400">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-admin-dark rounded-xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-admin-primary mb-6">Travel Inspiration</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-lg h-40">
                  <img 
                    src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b" 
                    alt="Beach destination" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="overflow-hidden rounded-lg h-40">
                  <img 
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" 
                    alt="Mountain destination" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="overflow-hidden rounded-lg h-40">
                  <img 
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1" 
                    alt="Adventure destination" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="overflow-hidden rounded-lg h-40">
                  <img 
                    src="https://images.unsplash.com/photo-1528127269322-539801943592" 
                    alt="Cultural destination" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
