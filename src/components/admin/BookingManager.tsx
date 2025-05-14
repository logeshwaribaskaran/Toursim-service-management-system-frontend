
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Pencil, Save, X } from "lucide-react";

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Booking | null>(null);

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

  const handleEdit = (booking: Booking) => {
    setEditingId(booking.id);
    setEditForm({...booking});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editForm) return;
    
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: name === 'people' ? parseInt(value) : value
    });
  };

  const handleSaveEdit = () => {
    if (!editForm) return;
    
    const updated = bookings.map((booking) => 
      booking.id === editingId ? editForm : booking
    );
    
    setBookings(updated);
    localStorage.setItem('userBookings', JSON.stringify(updated));
    toast.success("Booking details updated successfully");
    setEditingId(null);
    setEditForm(null);
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
                    {editingId === booking.id ? (
                      <input
                        type="text"
                        name="user"
                        value={editForm?.user || ''}
                        onChange={handleEditChange}
                        className="w-full bg-black/40 border border-white/20 rounded px-3 py-1 text-white text-sm"
                      />
                    ) : (
                      booking.user
                    )}
                    <div className="text-xs text-gray-400">
                      {editingId === booking.id ? (
                        <div className="space-y-2 mt-2">
                          <input
                            type="email"
                            name="email"
                            value={editForm?.email || ''}
                            onChange={handleEditChange}
                            placeholder="Email"
                            className="w-full bg-black/40 border border-white/20 rounded px-3 py-1 text-white text-sm"
                          />
                          <input
                            type="tel"
                            name="phone"
                            value={editForm?.phone || ''}
                            onChange={handleEditChange}
                            placeholder="Phone"
                            className="w-full bg-black/40 border border-white/20 rounded px-3 py-1 text-white text-sm"
                          />
                        </div>
                      ) : (
                        <>
                          {booking.email}<br/>{booking.phone}
                        </>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-white">
                    {editingId === booking.id ? (
                      <input
                        type="text"
                        name="destination"
                        value={editForm?.destination || ''}
                        onChange={handleEditChange}
                        className="w-full bg-black/40 border border-white/20 rounded px-3 py-1 text-white text-sm mb-2"
                      />
                    ) : (
                      booking.destination
                    )}
                    <div className="text-xs text-gray-400">
                      {editingId === booking.id ? (
                        <div className="flex items-center">
                          <span className="mr-2">People:</span>
                          <input
                            type="number"
                            name="people"
                            value={editForm?.people || 1}
                            onChange={handleEditChange}
                            min="1"
                            max="20"
                            className="w-16 bg-black/40 border border-white/20 rounded px-2 py-1 text-white text-sm"
                          />
                        </div>
                      ) : (
                        <>People: {booking.people}</>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-white">
                    {editingId === booking.id ? (
                      <input
                        type="date"
                        name="date"
                        value={editForm?.date || ''}
                        onChange={handleEditChange}
                        className="w-full bg-black/40 border border-white/20 rounded px-3 py-1 text-white text-sm"
                      />
                    ) : (
                      formatDate(booking.date)
                    )}
                  </td>
                  <td className="p-4">
                    {editingId === booking.id ? (
                      <select
                        name="status"
                        value={editForm?.status || 'Confirmed'}
                        onChange={handleEditChange}
                        className="bg-black/40 border border-white/20 rounded px-3 py-1 text-white text-sm"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {editingId === booking.id ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={handleSaveEdit}
                          className="p-2 bg-green-600 hover:bg-green-500 text-white rounded"
                          title="Save changes"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded"
                          title="Cancel editing"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
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
                          onClick={() => handleEdit(booking)}
                          className="p-2 bg-amber-600 hover:bg-amber-500 text-white rounded"
                          title="Edit booking details"
                        >
                          <Pencil size={16} />
                        </button>
                        
                        <button
                          onClick={() => handleDelete(booking.id)}
                          className="bg-admin-danger text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    )}
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
