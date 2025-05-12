
import React, { useEffect, useState } from "react";

interface BookingData {
  id: string;
  user: string;
  destination: string;
  date: string;
  status: string;
  email?: string;
  phone?: string;
  people?: number;
}

interface FeedbackData {
  id: string;
  name: string;
  email: string;
  destination: string;
  rating: number;
  comments: string;
  date: string;
}

interface RatingData {
  destination: string;
  rating: number;
  count: number;
}

interface BookingCount {
  destination: string;
  count: number;
}

const Reports = () => {
  const [topDestinations, setTopDestinations] = useState<BookingCount[]>([]);
  const [ratings, setRatings] = useState<RatingData[]>([]);
  const [totalBookings, setTotalBookings] = useState(0);
  
  useEffect(() => {
    // Load bookings from localStorage
    const bookings: BookingData[] = JSON.parse(localStorage.getItem('userBookings') || '[]');
    const feedback: FeedbackData[] = JSON.parse(localStorage.getItem('userFeedback') || '[]');
    
    // Calculate total bookings
    setTotalBookings(bookings.length);
    
    // Process bookings by destination
    const bookingsByDestination: Record<string, number> = {};
    bookings.forEach(booking => {
      bookingsByDestination[booking.destination] = (bookingsByDestination[booking.destination] || 0) + 1;
    });
    
    // Sort destinations by booking count
    const sortedDestinations = Object.entries(bookingsByDestination)
      .map(([destination, count]) => ({ destination, count }))
      .sort((a, b) => b.count - a.count);
    
    setTopDestinations(sortedDestinations.slice(0, 5));
    
    // Process ratings from feedback
    const ratingsByDestination: Record<string, {total: number; count: number}> = {};
    feedback.forEach(item => {
      if (!ratingsByDestination[item.destination]) {
        ratingsByDestination[item.destination] = { total: 0, count: 0 };
      }
      ratingsByDestination[item.destination].total += item.rating;
      ratingsByDestination[item.destination].count += 1;
    });
    
    // Calculate average ratings
    const destinationRatings = Object.entries(ratingsByDestination).map(([destination, data]) => ({
      destination,
      rating: parseFloat((data.total / data.count).toFixed(1)),
      count: data.count
    }));
    
    setRatings(destinationRatings.sort((a, b) => b.rating - a.rating));
    
    // If there's no data, use sample data
    if (sortedDestinations.length === 0) {
      setTopDestinations([
        { destination: "Maldives", count: 3 },
        { destination: "Paris", count: 2 },
        { destination: "Bali", count: 1 },
        { destination: "London", count: 1 },
        { destination: "Kashmir", count: 1 }
      ]);
    }
    
    if (destinationRatings.length === 0) {
      setRatings([
        { destination: "Maldives", rating: 4.9, count: 3 },
        { destination: "Paris", rating: 4.8, count: 2 },
        { destination: "Bali", rating: 4.7, count: 1 },
        { destination: "London", rating: 4.6, count: 1 },
        { destination: "Agra", rating: 4.2, count: 1 }
      ]);
    }
    
  }, []);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex">
        {Array(fullStars).fill(0).map((_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-400">½</span>}
        {Array(5 - fullStars - (hasHalfStar ? 1 : 0)).fill(0).map((_, i) => (
          <span key={i} className="text-gray-400">★</span>
        ))}
        <span className="ml-2 text-admin-primary">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent mb-6">
        Reports & Analytics
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-admin-dark p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-bold text-admin-primary mb-4">Top Destinations</h3>
          <div className="space-y-4">
            {topDestinations.map((destination, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-white">{destination.destination}</span>
                <div className="w-2/3 bg-black/40 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-admin-primary to-admin-accent h-2.5 rounded-full" 
                    style={{ width: `${(destination.count / Math.max(...topDestinations.map(d => d.count))) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-admin-dark p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-bold text-admin-primary mb-4">Customer Ratings</h3>
          <div className="space-y-3">
            {ratings.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-white">{item.destination}</span>
                {renderStars(item.rating)}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-admin-dark p-6 rounded-xl border border-white/10 col-span-full lg:col-span-2">
          <h3 className="text-xl font-bold text-admin-primary mb-4">Top Destinations Analytics</h3>
          <div className="bg-black/20 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-admin-primary text-lg mb-3">Most Popular Destinations</h4>
                <ul className="space-y-2">
                  {topDestinations.slice(0, 3).map((dest, index) => (
                    <li key={index} className="flex justify-between bg-black/30 p-3 rounded-lg">
                      <span className="text-white">{dest.destination}</span>
                      <span className="text-admin-primary font-medium">{dest.count} bookings</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-admin-primary text-lg mb-3">Highest Rated Destinations</h4>
                <ul className="space-y-2">
                  {ratings.slice(0, 3).map((item, index) => (
                    <li key={index} className="flex justify-between bg-black/30 p-3 rounded-lg">
                      <span className="text-white">{item.destination}</span>
                      <span className="text-admin-primary font-medium">{item.rating} ★</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-admin-dark p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-bold text-admin-primary mb-4">Booking Summary</h3>
          <div className="space-y-4">
            <div className="bg-black/30 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Total Bookings</p>
              <p className="text-2xl text-white font-bold">{totalBookings}</p>
            </div>
            <div className="bg-black/30 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Most Popular</p>
              <p className="text-2xl text-white font-bold">{topDestinations.length > 0 ? topDestinations[0].destination : "N/A"}</p>
            </div>
            <div className="bg-black/30 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Highest Rated</p>
              <p className="text-2xl text-white font-bold">{ratings.length > 0 ? ratings[0].destination : "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
