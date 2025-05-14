
import React, { useEffect, useState } from 'react';
import { 
  BarChart,
  Calendar,
  Users,
  CreditCard
} from "lucide-react";

const StatCard = ({ title, value, icon: Icon, color }: { 
  title: string, 
  value: string, 
  icon: React.ElementType, 
  color: string 
}) => (
  <div className="bg-gradient-to-br from-admin-dark to-black p-6 rounded-xl border border-white/10 shadow-lg flex items-center gap-4">
    <div className={`p-4 rounded-full ${color}`}>
      <Icon size={24} className="text-black" />
    </div>
    <div>
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [totalBookings, setTotalBookings] = useState("0");
  const [destinationsCount, setDestinationsCount] = useState("24");
  useEffect(() => {
    const updateStats = () => {
      // Get bookings from localStorage
      const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      setTotalBookings(bookings.length.toString());
      
      // Get destinations count
      const destinations = JSON.parse(localStorage.getItem('destinations') || '[]');
      const defaultCount = 12; // Default count of destinations in the system
      setDestinationsCount((destinations.length || defaultCount).toString());
    };
    
    // Initial update
    updateStats();
    
    // Listen for booking and destination changes
    window.addEventListener('bookingChange', updateStats);
    window.addEventListener('destinationChange', updateStats);
    
    return () => {
      window.removeEventListener('bookingChange', updateStats);
      window.removeEventListener('destinationChange', updateStats);
    };
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent mb-6">
        Dashboard Overview
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Bookings" 
          value={totalBookings} 
          icon={Calendar} 
          color="bg-admin-primary" 
        />
        <StatCard 
          title="Total Revenue" 
          value="$87,429" 
          icon={CreditCard} 
          color="bg-green-500" 
        />
        <StatCard 
          title="Active Users" 
          value="1,243" 
          icon={Users} 
          color="bg-purple-500" 
        />
        <StatCard 
          title="Destinations" 
          value={destinationsCount} 
          icon={BarChart} 
          color="bg-amber-500" 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-admin-dark p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-bold text-admin-primary mb-4">Welcome to Admin Panel</h3>
          <div className="rounded-lg overflow-hidden h-60">
            <img 
              src="https://images.unsplash.com/photo-1494783367193-149034c05e8f"
              alt="Travel destination" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="bg-admin-dark p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-bold text-admin-primary mb-4">Popular Destinations</h3>
          {[
            { name: "Maldives", bookings: 78, percentage: 80 },
            { name: "Paris", bookings: 64, percentage: 65 },
            { name: "Bali", bookings: 53, percentage: 55 },
            { name: "Kashmir", bookings: 42, percentage: 42 }
          ].map((dest, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-white">{dest.name}</span>
                <span className="text-admin-primary">{dest.bookings} bookings</span>
              </div>
              <div className="w-full bg-black/40 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-admin-primary to-admin-accent h-2.5 rounded-full" 
                  style={{ width: `${dest.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
