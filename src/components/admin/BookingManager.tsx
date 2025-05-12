
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

interface Booking {
  id: string;
  user: string;
  destination: string;
  date: string;
  status: string;
  email: string;
  phone: string;
  people: number;
}

const BookingManager = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    setBookings(savedBookings);
  }, []);

  const handleDelete = (id: string) => {
    const updated = bookings.filter((booking) => booking.id !== id);
    setBookings(updated);
    localStorage.setItem('userBookings', JSON.stringify(updated));
    toast.success("Booking successfully deleted");
  };
  
  const handleStatusChange = (id: string, newStatus: string) => {
    const updated = bookings.map((booking) => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updated);
    localStorage.setItem('userBookings', JSON.stringify(updated));
    toast.success(`Booking status updated to ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-green-500/20 text-green-500";
      case "Completed": return "bg-blue-500/20 text-blue-500";
      case "Canceled": return "bg-red-500/20 text-red-500";
      default: return "bg-gray-500/20 text-gray-500";
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent mb-6">
        Manage Bookings
      </h2>
      
      {bookings.length === 0 ? (
        <div className="bg-admin-dark p-6 rounded-xl border border-white/10 text-center">
          <p className="text-gray-400">No bookings found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-admin-dark border-b border-white/10">
                <th className="text-left p-4 text-admin-primary">User</th>
                <th className="text-left p-4 text-admin-primary">Destination</th>
                <th className="text-left p-4 text-admin-primary">Date</th>
                <th className="text-left p-4 text-admin-primary">Status</th>
                <th className="text-right p-4 text-admin-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 text-white">
                    {booking.user}
                    <div className="text-xs text-gray-400">
                      {booking.email}<br/>{booking.phone}
                    </div>
                  </td>
                  <td className="p-4 text-white">
                    {booking.destination}
                    <div className="text-xs text-gray-400">
                      People: {booking.people}
                    </div>
                  </td>
                  <td className="p-4 text-white">{formatDate(booking.date)}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className="bg-admin-dark border border-white/20 rounded px-3 py-1 text-white text-sm"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                      
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="bg-admin-danger text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingManager;
