
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";

interface Feedback {
  id: string;
  name: string;
  email: string;
  destination: string;
  rating: number;
  comments: string;
  date: string;
}

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    // Load feedback from localStorage
    const storedFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
    setFeedbacks(storedFeedback);
  }, []);

  const handleDelete = (id: string) => {
    const updatedFeedbacks = feedbacks.filter(feedback => feedback.id !== id);
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('userFeedback', JSON.stringify(updatedFeedbacks));
    toast.success("Feedback deleted successfully");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {Array(5).fill(0).map((_, i) => (
          <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-600"}>★</span>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent mb-6">
        Customer Feedbacks
      </h2>
      
      {feedbacks.length === 0 ? (
        <div className="bg-admin-dark p-6 rounded-xl border border-white/10 text-center">
          <p className="text-gray-400">No feedback received yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="bg-admin-dark p-6 rounded-xl border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-admin-primary">{feedback.destination}</h3>
                  <p className="text-sm text-gray-400">From: {feedback.name} ({feedback.email})</p>
                  <p className="text-sm text-gray-400">Date: {formatDate(feedback.date)}</p>
                </div>
                <div className="flex flex-col items-end">
                  {renderStars(feedback.rating)}
                  <p className="text-sm text-gray-400 mt-1">{feedback.rating}/5</p>
                </div>
              </div>
              
              <div className="bg-black/20 p-4 rounded-lg mb-4">
                <p className="text-white">{feedback.comments}</p>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(feedback.id)}
                  className="px-4 py-2 bg-admin-danger text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feedbacks;
