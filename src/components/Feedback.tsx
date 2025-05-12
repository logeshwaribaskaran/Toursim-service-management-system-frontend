
import React, { useState, useEffect } from 'react';
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

interface FeedbackData {
  id: string;
  name: string;
  email: string;
  destination: string;
  rating: number;
  comments: string;
  date: string;
}

const Feedback = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    destination: '',
    rating: 0,
    comments: ''
  });
  
  const destinations = [
    "Maldives", "Paris", "Bali", "Kashmir", "London", "Dubai", 
    "Singapore", "Bangkok", "Thailand", "Malaysia", "Rome", "Sydney"
  ];
  
  useEffect(() => {
    // Check if user is logged in
    const userType = localStorage.getItem('userType');
    setIsLoggedIn(!!userType);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast.error("Please log in to submit feedback");
      setTimeout(() => navigate('/login'), 1500);
      return;
    }
    
    // Create feedback data object with unique ID
    const newFeedback: FeedbackData = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toISOString()
    };
    
    // Get existing feedback from localStorage or initialize empty array
    const existingFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
    
    // Add new feedback to array and save back to localStorage
    localStorage.setItem('userFeedback', JSON.stringify([...existingFeedback, newFeedback]));
    
    console.log("Feedback submitted:", newFeedback);
    toast.success("Thank you for your feedback!");
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      destination: '',
      rating: 0,
      comments: ''
    });
  };

  return (
    <div className="min-h-screen bg-black text-white py-10">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-admin-dark rounded-xl border border-admin-primary/30 p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent">
            Share Your Experience
          </h1>
          
          {!isLoggedIn && (
            <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-4 mb-6">
              <p className="text-amber-400">
                Please <span className="font-semibold cursor-pointer underline" onClick={() => navigate('/login')}>log in</span> to submit your feedback. Your insights help us improve our services!
              </p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
            
            <div>
              <label htmlFor="destination" className="block text-gray-300 mb-1">Destination You Visited</label>
              <select
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white focus:border-admin-primary focus:outline-none appearance-none"
              >
                <option value="">Select Destination</option>
                {destinations.map((dest) => (
                  <option key={dest} value={dest}>{dest}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Rate Your Experience</label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={28}
                    className={`cursor-pointer transition-colors ${
                      formData.rating >= star 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-500 hover:text-yellow-400'
                    }`}
                    onClick={() => handleRatingClick(star)}
                  />
                ))}
                <span className="text-gray-400 ml-2">
                  {formData.rating > 0 ? `${formData.rating}/5` : 'Click to rate'}
                </span>
              </div>
            </div>
            
            <div>
              <label htmlFor="comments" className="block text-gray-300 mb-1">Your Comments</label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows={5}
                required
                placeholder="Share your experience, suggestions, or any comments about your journey..."
                className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-white focus:border-admin-primary focus:outline-none"
              ></textarea>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-admin-primary hover:bg-admin-accent text-black font-medium rounded-md transition-colors"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
