
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, ChevronRight, Star } from 'lucide-react';
import { toast } from "sonner";

interface Destination {
  id: number;
  name: string;
  image: string;
  price: string;
  priceNumeric: number;
  rating: number;
  description: string;
  nights: number;
  days: number;
  featured?: boolean;
  location: string;
}

interface BookingFormData {
  id: string;
  username: string;
  city: string;
  email: string;
  phone: string;
  whatsapp: string;
  travelDate: string;
  people: string;
  destination: string;
  status: string;
}

const UserDashboard = () => {
  // States for the user dashboard
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isPaymentMode, setIsPaymentMode] = useState(false);
  const [bookingFormData, setBookingFormData] = useState<BookingFormData>({
    id: '',
    username: '',
    city: '',
    email: '',
    phone: '',
    whatsapp: '',
    travelDate: '',
    people: '1',
    destination: '',
    status: 'Confirmed'
  });

  // Load destinations from localStorage
  useEffect(() => {
    const savedDestinations = localStorage.getItem('destinations');
    
    if (savedDestinations) {
      setDestinations(JSON.parse(savedDestinations));
      setFilteredDestinations(JSON.parse(savedDestinations));
    } else {
      // Fallback to default destinations if none in localStorage
      const defaultDestinations = [
        { 
          id: 1, 
          name: "Maldives", 
          image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8", 
          price: "$1,299",
          priceNumeric: 1299, 
          rating: 4.9,
          description: "Experience paradise with pristine beaches, crystal clear waters, and luxurious overwater bungalows.",
          nights: 4,
          days: 5,
          featured: true,
          location: "South Asia"
        },
        { 
          id: 2, 
          name: "Paris", 
          image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34", 
          price: "$899",
          priceNumeric: 899, 
          rating: 4.8,
          description: "The city of lights awaits with iconic landmarks, world-class cuisine, and romantic ambiance.",
          nights: 5,
          days: 6,
          featured: true,
          location: "Europe" 
        },
        { 
          id: 3, 
          name: "Bali", 
          image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b", 
          price: "$999",
          priceNumeric: 999, 
          rating: 4.7,
          description: "Discover spiritual tranquility, lush landscapes, vibrant culture, and beautiful beaches.",
          nights: 5,
          days: 6,
          featured: true,
          location: "Southeast Asia" 
        },
        { 
          id: 4, 
          name: "Kashmir", 
          image: "https://images.pexels.com/photos/1627898/pexels-photo-1627898.jpeg", 
          price: "$799",
          priceNumeric: 799, 
          rating: 4.6,
          description: "Known as 'Paradise on Earth' with breathtaking mountains, serene lakes, and picturesque valleys.",
          nights: 5,
          days: 6,
          featured: true,
          location: "South Asia"
        },
      ];
      
      setDestinations(defaultDestinations);
      setFilteredDestinations(defaultDestinations);
    }
  }, []);

  // Filter destinations based on search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredDestinations(destinations);
      return;
    }
    
    const filtered = destinations.filter(dest => 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredDestinations(filtered);
  }, [searchQuery, destinations]);

  const handleSearch = () => {
    // Search functionality is handled by the useEffect above
    // This function is here to handle the search button click
    // but the filtering logic happens in the useEffect
  };

  const handleExploreClick = (destination: Destination) => {
    setSelectedDestination(destination);
    setShowBookingForm(false);
    setIsPaymentMode(false);
  };

  const handleBookNow = () => {
    if (!selectedDestination) return;
    
    setBookingFormData({
      ...bookingFormData,
      destination: selectedDestination.name
    });
    
    setShowBookingForm(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPaymentMode) {
      setIsPaymentMode(true);
      return;
    }
    
    // Create booking object
    const newBooking = {
      id: Date.now().toString(),
      user: bookingFormData.username,
      destination: bookingFormData.destination,
      date: bookingFormData.travelDate,
      status: "Confirmed",
      email: bookingFormData.email,
      phone: bookingFormData.phone,
      people: parseInt(bookingFormData.people)
    };
    
    // Get existing bookings or initialize empty array
    const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    
    // Add new booking
    localStorage.setItem('userBookings', JSON.stringify([...existingBookings, newBooking]));
    
    toast.success("Booking confirmed! Your journey awaits.");
    
    // Reset form
    setBookingFormData({
      id: '',
      username: '',
      city: '',
      email: '',
      phone: '',
      whatsapp: '',
      travelDate: '',
      people: '1',
      destination: selectedDestination?.name || '',
      status: 'Confirmed'
    });
    
    setShowBookingForm(false);
    setIsPaymentMode(false);
    setSelectedDestination(null);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {Array(5).fill(0).map((_, i) => (
          <span key={i} className={`${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-400"}`}>
            <Star size={16} fill={i < Math.floor(rating) ? "currentColor" : "none"} />
          </span>
        ))}
        <span className="ml-1 text-white text-sm">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent">
          Welcome to Your Dashboard
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Explore destinations, book your next adventure, and manage your travel plans
        </p>
        
        {/* Search Section */}
        <div className="bg-admin-dark rounded-xl p-6 mb-10 shadow-lg border border-white/10">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search destinations..." 
                  className="w-full bg-black/40 border border-white/10 rounded-md py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-admin-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className="bg-admin-primary hover:bg-admin-accent text-black px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <Search size={18} /> Search
            </button>
          </div>
        </div>
        
        {/* Selected Destination Details */}
        {selectedDestination && (
          <div className="bg-admin-dark rounded-xl overflow-hidden border border-white/10 mb-10 shadow-lg">
            <div className="relative h-64 md:h-80">
              <img 
                src={selectedDestination.image} 
                alt={selectedDestination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
                <p className="text-sm">{selectedDestination.nights} Nights / {selectedDestination.days} Days</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-admin-primary">{selectedDestination.name}</h2>
                <div className="text-xl font-bold text-admin-accent">{selectedDestination.price}</div>
              </div>
              
              <div className="flex mb-4">
                {renderStars(selectedDestination.rating)}
              </div>
              
              <p className="text-gray-300 mb-6">{selectedDestination.description}</p>
              
              <h3 className="text-lg font-semibold text-white mb-2">Itinerary Highlights</h3>
              <ul className="list-disc pl-5 text-gray-300 mb-6">
                <li>Arrival and welcome reception</li>
                <li>Guided tour of main attractions</li>
                <li>Free time for personal exploration</li>
                <li>Optional activities and excursions</li>
                <li>Departure assistance</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-white mb-2">Package Includes</h3>
              <ul className="list-disc pl-5 text-gray-300 mb-6">
                <li>Round-trip flights</li>
                <li>Accommodation at selected hotels</li>
                <li>Daily breakfast</li>
                <li>Airport transfers</li>
                <li>Travel insurance</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-white mb-2">Accommodation</h3>
              <div className="bg-black/30 p-4 rounded-lg mb-6">
                <p className="text-gray-300 mb-2"><strong className="text-admin-primary">Hotel:</strong> Luxury Resort & Spa</p>
                <p className="text-gray-300 mb-2"><strong className="text-admin-primary">Location:</strong> Prime location near attractions</p>
                <p className="text-gray-300 mb-2"><strong className="text-admin-primary">Room Type:</strong> Deluxe with city/ocean view</p>
                <p className="text-gray-300"><strong className="text-admin-primary">Amenities:</strong> WiFi, Swimming Pool, Restaurant, Spa, Fitness Center</p>
              </div>
              
              <div className="flex justify-end gap-4 mt-8">
                <button 
                  className="px-6 py-2 border border-white/20 rounded-lg text-white hover:border-white transition-colors"
                  onClick={() => setSelectedDestination(null)}
                >
                  Back
                </button>
                <button 
                  className="px-6 py-2 bg-admin-primary hover:bg-admin-accent text-black rounded-lg transition-colors"
                  onClick={handleBookNow}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Booking Form */}
        {showBookingForm && (
          <div className="bg-admin-dark rounded-xl border border-white/10 p-6 mb-10">
            <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent">
              {isPaymentMode ? 'Complete Your Payment' : 'Book Your Journey'}
            </h2>
            
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              {!isPaymentMode ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="username" className="block text-gray-300 mb-1">Your Name</label>
                      <input
                        id="username"
                        type="text"
                        name="username"
                        value={bookingFormData.username}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-black/40 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="city" className="block text-gray-300 mb-1">City of Residence</label>
                      <input
                        id="city"
                        type="text"
                        name="city"
                        value={bookingFormData.city}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-black/40 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={bookingFormData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-black/40 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-gray-300 mb-1">Phone</label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={bookingFormData.phone}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-black/40 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="whatsapp" className="block text-gray-300 mb-1">WhatsApp Number</label>
                      <input
                        id="whatsapp"
                        type="tel"
                        name="whatsapp"
                        value={bookingFormData.whatsapp}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-black/40 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="travelDate" className="block text-gray-300 mb-1">Date of Travel</label>
                      <input
                        id="travelDate"
                        type="date"
                        name="travelDate"
                        value={bookingFormData.travelDate}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-black/40 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="people" className="block text-gray-300 mb-1">Number of People</label>
                      <input
                        id="people"
                        type="number"
                        name="people"
                        min="1"
                        max="20"
                        value={bookingFormData.people}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-black/40 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="destination" className="block text-gray-300 mb-1">Destination</label>
                      <input
                        id="destination"
                        type="text"
                        name="destination"
                        value={bookingFormData.destination}
                        readOnly
                        className="w-full bg-black/40 border border-white/20 rounded-md px-4 py-2 text-white cursor-not-allowed"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Booking Summary</h3>
                    <p className="text-gray-300"><span className="font-semibold text-admin-primary">Destination:</span> {bookingFormData.destination}</p>
                    <p className="text-gray-300"><span className="font-semibold text-admin-primary">Travel Date:</span> {bookingFormData.travelDate}</p>
                    <p className="text-gray-300"><span className="font-semibold text-admin-primary">Travelers:</span> {bookingFormData.people}</p>
                    <p className="text-gray-300"><span className="font-semibold text-admin-primary">Total Amount:</span> $999</p>
                  </div>
                  
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Payment Methods</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 border border-white/10 rounded-lg cursor-pointer hover:border-admin-primary/50 transition-colors">
                        <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center">
                          <img src="https://cdn-icons-png.flaticon.com/512/6124/6124998.png" alt="Credit Card" className="h-6" />
                        </div>
                        <span className="text-white">Credit/Debit Card</span>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 border border-white/10 rounded-lg cursor-pointer hover:border-admin-primary/50 transition-colors">
                        <div className="h-10 w-10 bg-[#26A65B] rounded-md flex items-center justify-center">
                          <img src="https://cdn-icons-png.flaticon.com/512/888/888871.png" alt="UPI" className="h-6" />
                        </div>
                        <span className="text-white">UPI Payment</span>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 border border-white/10 rounded-lg cursor-pointer hover:border-admin-primary/50 transition-colors">
                        <div className="h-10 w-10 bg-[#5B9BD5] rounded-md flex items-center justify-center">
                          <img src="https://cdn-icons-png.flaticon.com/512/6124/6124987.png" alt="Net Banking" className="h-6" />
                        </div>
                        <span className="text-white">Net Banking</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-4">
                <button 
                  type="button"
                  onClick={() => {
                    if (isPaymentMode) {
                      setIsPaymentMode(false);
                    } else {
                      setShowBookingForm(false);
                    }
                  }}
                  className="px-6 py-3 border border-white/20 rounded-md text-white hover:bg-white/10 transition-colors"
                >
                  {isPaymentMode ? 'Back' : 'Cancel'}
                </button>
                
                <button 
                  type="submit"
                  className="px-6 py-3 bg-admin-primary hover:bg-admin-accent text-black rounded-md transition-colors"
                >
                  {isPaymentMode ? 'Complete Payment' : 'Proceed to Payment'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Destination Grid */}
        {!selectedDestination && !showBookingForm && (
          <>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent">
              Available Destinations
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDestinations.length > 0 ? (
                filteredDestinations.map((destination) => (
                  <div 
                    key={destination.id} 
                    className="bg-admin-dark rounded-xl overflow-hidden shadow-lg border border-white/5 transition-all hover:border-admin-primary/30 group"
                  >
                    <div className="relative h-48">
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black/70 text-admin-primary px-2 py-1 rounded text-sm font-bold">
                        {destination.price}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-admin-primary">{destination.name}</h3>
                      
                      <div className="flex items-center mt-2 mb-2 text-sm text-gray-300">
                        <MapPin size={14} className="mr-1 text-admin-primary" />
                        {destination.location}
                        <span className="mx-2">•</span>
                        <Calendar size={14} className="mr-1 text-admin-primary" />
                        {destination.nights} nights
                      </div>
                      
                      <div className="flex justify-between items-center mb-3">
                        {renderStars(destination.rating)}
                      </div>
                      
                      <p className="text-gray-400 mb-4 text-sm line-clamp-2">
                        {destination.description}
                      </p>
                      
                      <button 
                        onClick={() => handleExploreClick(destination)}
                        className="w-full bg-admin-primary hover:bg-admin-accent text-black font-medium py-2 rounded-md transition-colors flex items-center justify-center gap-1"
                      >
                        Explore <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10 bg-admin-dark/50 rounded-xl border border-white/10">
                  <p className="text-gray-400 mb-4">No destinations found matching "{searchQuery}"</p>
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="px-4 py-2 bg-admin-primary hover:bg-admin-accent text-black rounded-md transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
