
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // This will run on every location change
    const storedUserType = localStorage.getItem('userType');
    setIsLoggedIn(!!storedUserType);
    setUserType(storedUserType);
    
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    setUserType(null);
    navigate('/');
    
    // Dispatch custom event for other components to react to auth changes
    window.dispatchEvent(new Event('userChange'));
  };

  return (
    <nav className="bg-admin-dark border-b border-admin-primary/30 py-4 px-6 sticky top-0 z-30 backdrop-blur-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-admin-primary">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-gradient">GlobeTrek Holidays</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-white hover:text-admin-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-admin-primary transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-white hover:text-admin-primary transition-colors">
              Contact
            </Link>
            <Link to="/feedback" className="text-white hover:text-admin-primary transition-colors">
              Feedback
            </Link>
            
            {!isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-white hover:text-admin-primary transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="text-black bg-admin-primary hover:bg-admin-accent px-4 py-2 rounded-md transition-colors">
                  Sign Up
                </Link>
              </div>
            ) : (
              <button 
                onClick={handleLogout} 
                className="text-black bg-admin-primary hover:bg-admin-accent px-4 py-2 rounded-md transition-colors flex items-center gap-2"
              >
                Logout
              </button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white hover:text-admin-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-white hover:text-admin-primary transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-white hover:text-admin-primary transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-white hover:text-admin-primary transition-colors">
                Contact
              </Link>
              <Link to="/feedback" className="text-white hover:text-admin-primary transition-colors">
                Feedback
              </Link>
              
              {!isLoggedIn ? (
                <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                  <Link to="/login" className="text-white hover:text-admin-primary transition-colors">
                    Login
                  </Link>
                  <Link to="/signup" className="text-white bg-admin-primary hover:bg-admin-accent px-4 py-2 rounded-md transition-colors text-center">
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                  <button 
                    className="text-white bg-admin-primary hover:bg-admin-accent px-4 py-2 rounded-md transition-colors text-center"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
