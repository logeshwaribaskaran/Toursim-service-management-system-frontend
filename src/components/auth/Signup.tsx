
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from "sonner";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Signup data:', formData);
      localStorage.setItem('userType', 'user');
      // Dispatch custom event to trigger navbar update
      window.dispatchEvent(new Event('userChange'));
      toast.success("Account created successfully!");
      navigate('/user-dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md">
        <div className="bg-admin-dark p-8 rounded-xl shadow-lg border border-admin-primary/30 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent">
            Create Account
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black/50 border border-admin-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-admin-primary/50"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black/50 border border-admin-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-admin-primary/50"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-black/50 border border-admin-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-admin-primary/50"
                placeholder="Create a password"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-black/50 border border-admin-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-admin-primary/50"
                placeholder="Enter your phone number"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-admin-primary to-admin-accent text-black font-bold py-3 rounded-lg hover:opacity-90 transition-opacity mt-2"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-admin-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
