
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-admin-dark text-white border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-admin-primary mb-4">GlobeTrek Holidays</h3>
            <p className="text-gray-400 mb-4">
              Discover the world with our expertly crafted travel experiences, tailored to create unforgettable memories.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-admin-primary hover:text-black transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-admin-primary hover:text-black transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-admin-primary hover:text-black transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-admin-primary hover:text-black transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-admin-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/feedback" className="text-gray-400 hover:text-white transition-colors">Feedback</Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-admin-primary mb-4">Top Destinations</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Maldives</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Paris, France</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Bali, Indonesia</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Kashmir, India</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">London, UK</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Dubai, UAE</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-admin-primary mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-admin-primary flex-shrink-0 mt-1" />
                <span className="text-gray-400">123 Travel Lane, Suite 500<br />New York, NY 10001</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-admin-primary flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-admin-primary flex-shrink-0" />
                <span className="text-gray-400">info@globetrekholidays.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} GlobeTrek Holidays. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
