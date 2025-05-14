
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Pencil, Trash, Calendar, Users, MapPin } from 'lucide-react';

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

const UserBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  
  useEffect(() => {
    // Load user bookings from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    setBookings(savedBookings);
  }, []);

  const handleDelete = (id: string) => {
    const updated = bookings.filter((booking) => booking.id !== id);
    setBookings(updated);
    localStorage.setItem('userBookings', JSON.stringify(updated));
    toast.success("Booking successfully canceled");
  };

  const handleEditClick = (booking: Booking) => {
    setEditingBooking(booking);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editingBooking) return;
    
    const { name, value } = e.target;
    setEditingBooking({
      ...editingBooking,
      [name]: name === 'people' ? parseInt(value) : value
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;
    
    const updatedBookings = bookings.map(booking => 
      booking.id === editingBooking.id ? editingBooking : booking
    );
    
    setBookings(updatedBookings);
    localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
    toast.success("Booking updated successfully");
    setEditingBooking(null);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-green-500/20 text-green-500";
      case "Completed": return "bg-blue-500/20 text-blue-500";
      case "Canceled": return "bg-red-500/20 text-red-500";
      default: return "bg-gray-500/20 text-gray-500";
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent">
        My Bookings
      </h2>
      
      {bookings.length === 0 ? (
        <div className="bg-admin-dark rounded-xl border border-white/10 p-8 text-center">
          <p className="text-gray-400 mb-4">You haven't made any bookings yet.</p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-4 py-2 bg-admin-primary hover:bg-admin-accent text-black rounded-lg transition-colors"
          >
            Browse Destinations
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {editingBooking && (
            <div className="bg-black/40 p-6 rounded-xl border border-admin-primary/30 backdrop-blur-sm mb-8">
              <h3 className="text-xl font-bold text-admin-primary mb-4">
                Edit Booking
              </h3>
              
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-1">Destination</label>
                    <input
                      type="text"
                      name="destination"
                      value={editingBooking.destination}
                      onChange={handleEditChange}
                      required
                      readOnly
                      className="w-full bg-black/60 border border-admin-primary/30 rounded-lg px-4 py-2 text-white opacity-70"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-1">Travel Date</label>
                    <input
                      type="date"
                      name="date"
                      value={editingBooking.date}
                      onChange={handleEditChange}
                      required
                      className="w-full bg-black/60 border border-admin-primary/30 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={editingBooking.phone}
                      onChange={handleEditChange}
                      required
                      className="w-full bg-black/60 border border-admin-primary/30 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-1">People</label>
                    <input
                      type="number"
                      name="people"
                      value={editingBooking.people}
                      onChange={handleEditChange}
                      min="1"
                      max="20"
                      required
                      className="w-full bg-black/60 border border-admin-primary/30 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-1">Status</label>
                    <select
                      name="status"
                      value={editingBooking.status}
                      onChange={handleEditChange}
                      className="w-full bg-black/60 border border-admin-primary/30 rounded-lg px-4 py-2 text-white"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Canceled">Cancel Booking</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setEditingBooking(null)}
                    className="px-4 py-2 border border-white/20 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-admin-primary hover:bg-admin-accent text-black rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {bookings.map((booking) => (
            <div 
              key={booking.id} 
              className="bg-admin-dark rounded-lg border border-white/10 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
                <div className="md:col-span-2">
                  <h3 className="text-lg font-bold text-admin-primary">{booking.destination}</h3>
                  <div className="flex items-center text-gray-300 mt-1">
                    <Calendar size={14} className="mr-1 text-admin-primary" />
                    {formatDate(booking.date)}
                  </div>
                  <div className="flex items-center text-gray-300 mt-1">
                    <Users size={14} className="mr-1 text-admin-primary" />
                    {booking.people} {booking.people > 1 ? 'people' : 'person'}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-400 mb-1">Contact Details:</p>
                  <p className="text-sm text-white">{booking.email}</p>
                  <p className="text-sm text-white">{booking.phone}</p>
                  <div className="mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex md:flex-col justify-end gap-2">
                  <button
                    onClick={() => handleEditClick(booking)}
                    className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded flex items-center gap-1"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  
                  {booking.status !== "Canceled" && (
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to cancel this booking?")) {
                          const canceledBooking = {...booking, status: "Canceled"};
                          const updatedBookings = bookings.map(b => 
                            b.id === booking.id ? canceledBooking : b
                          );
                          setBookings(updatedBookings);
                          localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
                          toast.success("Booking successfully canceled");
                        }
                      }}
                      className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded flex items-center gap-1"
                    >
                      <Trash size={14} /> Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings;
