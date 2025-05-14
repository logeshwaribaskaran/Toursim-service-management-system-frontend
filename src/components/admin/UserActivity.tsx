
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";

interface Booking {
  id: number;
  destination: string;
  date: string;
  status: string;
  rating: number | null;
  review: string | null;
  userName: string;
  phone: string;
}

const UserActivity = () => {
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      const bookings: Booking[] = [
        {
          id: 1,
          destination: "Bali",
          date: "2025-07-01",
          status: "Completed",
          rating: 5,
          review: "Amazing experience! The beaches were pristine and the locals were very friendly. Would definitely recommend!",
          userName: "John Doe",
          phone: "+1234567890"
        },
        {
          id: 2,
          destination: "Paris",
          date: "2025-06-10",
          status: "Completed",
          rating: 4,
          review: "Beautiful city, though a bit crowded. The Eiffel Tower at night was magnificent!",
          userName: "Jane Smith",
          phone: "+0987654321"
        },
        {
          id: 3,
          destination: "Maldives",
          date: "2025-08-15",
          status: "Confirmed",
          rating: null,
          review: null,
          userName: "Alex Johnson",
          phone: "+1122334455"
        },
        {
          id: 4,
          destination: "Kashmir",
          date: "2025-09-05",
          status: "Pending",
          rating: null,
          review: null,
          userName: "Emma Wilson",
          phone: "+5566778899"
        }
      ];
      
      setUserBookings(bookings);
      setLoading(false);
    }, 500);
  }, []);

  const handleCancelBooking = (id: number) => {
    setUserBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === id 
          ? { ...booking, status: "Canceled" } 
          : booking
      )
    );
    toast.success("Booking status updated to Canceled");
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setUserBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === id 
          ? { ...booking, status: newStatus } 
          : booking
      )
    );
    toast.success(`Booking status updated to ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-500/20 text-green-500";
      case "Confirmed": return "bg-blue-500/20 text-blue-500";
      case "Pending": return "bg-amber-500/20 text-amber-500";
      case "Canceled": return "bg-red-500/20 text-red-500";
      default: return "bg-gray-500/20 text-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-admin-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent mb-6">
        User Activity & Bookings
      </h2>
      
      <div className="space-y-6">
        {userBookings.map((booking) => (
          <div key={booking.id} className="bg-admin-dark p-6 rounded-xl border border-white/10">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-admin-primary mb-1">
                  {booking.destination}
                </h3>
                <p className="text-gray-400">Booked for {new Date(booking.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
              
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-black/20 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Customer</p>
                <p className="text-white">{booking.userName}</p>
              </div>
              <div className="bg-black/20 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Contact</p>
                <p className="text-white">{booking.phone}</p>
              </div>
            </div>
            
            {booking.status === "Completed" && (
              <div className="border-t border-white/10 pt-4 mt-4">
                <div className="mb-3">
                  <p className="text-sm text-gray-400 mb-1">Rating</p>
                  {booking.rating ? (
                    <div className="flex">
                      {Array(booking.rating).fill(0).map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                      {Array(5 - booking.rating).fill(0).map((_, i) => (
                        <span key={i} className="text-gray-600">★</span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">No rating provided</p>
                  )}
                </div>
                
                <div>
                  <p className="text-sm text-gray-400 mb-1">Review</p>
                  {booking.review ? (
                    <p className="text-white bg-black/20 p-3 rounded-lg">{booking.review}</p>
                  ) : (
                    <p className="text-gray-400">No review provided</p>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex gap-2 mt-4">
              {booking.status !== "Completed" && booking.status !== "Canceled" && (
                <>
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    className="bg-admin-dark border border-white/20 rounded px-3 py-2 text-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                  
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="bg-admin-danger px-4 py-2 rounded text-white hover:bg-red-600 transition-colors"
                  >
                    Cancel Booking
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {userBookings.length === 0 && (
        <div className="bg-admin-dark p-6 rounded-xl border border-white/10 text-center">
          <p className="text-gray-400">No booking data available</p>
        </div>
      )}
    </div>
  );
};

export default UserActivity;
