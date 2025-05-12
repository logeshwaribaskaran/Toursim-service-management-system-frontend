
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface ContactQuery {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  replied: boolean;
}

const Queries = () => {
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  useEffect(() => {
    // Load queries from localStorage
    const storedQueries = JSON.parse(localStorage.getItem('contactQueries') || '[]');
    setQueries(storedQueries);
  }, []);

  const handleSendReply = (id: string) => {
    if (!replyText.trim()) {
      toast.error("Reply message cannot be empty");
      return;
    }

    // In a real app, you would send an email here
    // For now, just mark as replied in localStorage
    const updatedQueries = queries.map(query => 
      query.id === id ? { ...query, replied: true } : query
    );
    
    setQueries(updatedQueries);
    localStorage.setItem('contactQueries', JSON.stringify(updatedQueries));
    toast.success("Reply sent successfully!");
    setReplyText('');
    setReplyingTo(null);
  };

  const handleDelete = (id: string) => {
    const updatedQueries = queries.filter(query => query.id !== id);
    setQueries(updatedQueries);
    localStorage.setItem('contactQueries', JSON.stringify(updatedQueries));
    toast.success("Query deleted successfully");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent mb-6">
        Customer Queries
      </h2>
      
      {queries.length === 0 ? (
        <div className="bg-admin-dark p-6 rounded-xl border border-white/10 text-center">
          <p className="text-gray-400">No queries received yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {queries.map((query) => (
            <div key={query.id} className="bg-admin-dark p-6 rounded-xl border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-admin-primary">{query.subject}</h3>
                  <p className="text-sm text-gray-400">From: {query.name} ({query.email})</p>
                  <p className="text-sm text-gray-400">Date: {formatDate(query.date)}</p>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    query.replied 
                      ? "bg-green-500/20 text-green-500" 
                      : "bg-amber-500/20 text-amber-500"
                  }`}>
                    {query.replied ? "Replied" : "Pending"}
                  </span>
                </div>
              </div>
              
              <div className="bg-black/20 p-4 rounded-lg mb-4">
                <p className="text-white whitespace-pre-wrap">{query.message}</p>
              </div>
              
              {replyingTo === query.id ? (
                <div className="border-t border-white/10 pt-4 mt-4">
                  <label className="block text-gray-300 mb-2">Your Reply</label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full bg-black/40 border border-white/20 rounded-md px-4 py-2 text-white mb-3"
                    rows={4}
                  ></textarea>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setReplyingTo(null)}
                      className="px-4 py-2 border border-white/20 text-white rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSendReply(query.id)}
                      className="px-4 py-2 bg-admin-primary text-black rounded-md"
                    >
                      Send Reply
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setReplyingTo(query.id)}
                    className="px-4 py-2 bg-admin-primary text-black rounded-md"
                    disabled={query.replied}
                  >
                    {query.replied ? "Replied" : "Reply"}
                  </button>
                  <button
                    onClick={() => handleDelete(query.id)}
                    className="px-4 py-2 bg-admin-danger text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Queries;
