
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, ChevronRight, Star } from 'lucide-react';
import { toast } from "sonner";
import UserBookings from './UserBookings';

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
  itineraryHighlights?: string[];
  packageIncludes?: string[];
  accommodation?: {
    hotel: string;
    location: string;
    roomType: string;
    amenities: string;
  };
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
  const [showMyBookings, setShowMyBookings] = useState(false);

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
        location: "South Asia",
        itineraryHighlights: [
          "Arrival and welcome reception",
          "Guided tour of main attractions",
          "Free time for personal exploration",
          "Optional activities and excursions",
          "Departure assistance"
        ],
        packageIncludes: [
          "Round-trip flights",
          "Accommodation at selected hotels",
          "Daily breakfast",
          "Airport transfers",
          "Travel insurance"
        ],
        accommodation: {
          hotel: "Luxury Resort & Spa",
          location: "Prime location near attractions",
          roomType: "Deluxe with ocean view",
          amenities: "WiFi, Swimming Pool, Restaurant, Spa, Fitness Center"
        }
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
        location: "Europe",
        itineraryHighlights: [
          "Arrival and welcome reception",
          "Visit to Eiffel Tower",
          "Louvre Museum tour",
          "Seine River cruise",
          "Free day for shopping"
        ],
        packageIncludes: [
          "Round-trip flights",
          "4-star hotel accommodation",
          "Daily breakfast",
          "Airport transfers",
          "City tour"
        ],
        accommodation: {
          hotel: "Paris Grand Hotel",
          location: "Central Paris",
          roomType: "Executive room with city view",
          amenities: "WiFi, Restaurant, Concierge, Laundry Service"
        }
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
        location: "Southeast Asia",
        itineraryHighlights: [
          "Welcome ceremony",
          "Temple tours",
          "Rice terraces visit",
          "Beach day",
          "Cultural performance"
        ],
        packageIncludes: [
          "Round-trip flights",
          "Villa accommodation",
          "Daily breakfast",
          "Private transfers",
          "Island tour"
        ],
        accommodation: {
          hotel: "Bali Tranquil Resort",
          location: "Ubud",
          roomType: "Private villa with pool",
          amenities: "WiFi, Private Pool, Spa, Yoga Classes, Restaurant"
        }
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
        location: "South Asia",
        itineraryHighlights: [
          "Arrival in Srinagar",
          "Shikara ride on Dal Lake",
          "Gulmarg excursion",
          "Pahalgam visit",
          "Local handicrafts shopping"
        ],
        packageIncludes: [
          "Round-trip flights",
          "Houseboat and hotel stay",
          "All meals",
          "All transfers",
          "Sightseeing tours"
        ],
        accommodation: {
          hotel: "Luxury Houseboat & Hotel",
          location: "Dal Lake and Gulmarg",
          roomType: "Deluxe room/Houseboat cabin",
          amenities: "WiFi, Room service, Guided tours, Traditional Kashmiri cuisine"
        }
      },
    {
  id: 5,
  name: "London",
  image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
  price: "$1,199",
  priceNumeric: 1199,
  rating: 4.7,
  description: "Explore the historic capital of England featuring iconic landmarks, world-class museums, and vibrant culture.",
  nights: 5,
  days: 6,
  featured: true,
  location: "Europe",
  itineraryHighlights: [
    "Arrival in London and Thames River cruise",
    "Visit the Tower of London and Tower Bridge",
    "Guided tour of Buckingham Palace and Westminster Abbey",
    "Day trip to Windsor Castle",
    "Shopping at Oxford Street and explore Covent Garden"
  ],
  packageIncludes: [
    "Round-trip international flights",
    "4-star hotel accommodation",
    "Daily breakfast and select dinners",
    "Airport transfers and guided tours",
    "Entry tickets to major attractions"
  ],
  accommodation: {
    hotel: "The Grand London Hotel",
    location: "Central London near Trafalgar Square",
    roomType: "Executive Double Room",
    amenities: "WiFi, Breakfast buffet, Fitness center, Concierge service"
  }
},
    {
  id: 6,
  name: "Dubai",
  image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
  price: "$950",
  priceNumeric: 950,
  rating: 4.8,
  description: "Experience luxury and adventure in the ultramodern city with towering skyscrapers and desert excursions.",
  nights: 5,
  days: 6,
  featured: true,
  location: "Middle East",
  itineraryHighlights: [
    "Arrival in Dubai and Dhow Cruise Dinner",
    "City tour including Burj Khalifa and Dubai Mall",
    "Desert Safari with BBQ dinner",
    "Visit to Palm Jumeirah and Atlantis",
    "Free day for shopping and relaxation"
  ],
  packageIncludes: [
    "Round-trip flights",
    "4-star hotel stay",
    "Daily breakfast and two dinners",
    "Airport transfers",
    "Desert safari and city tours"
  ],
  accommodation: {
    hotel: "Dubai Grand Hotel by Fortune",
    location: "Near Deira City Centre",
    roomType: "Superior Double Room",
    amenities: "WiFi, Rooftop pool, Fitness center, Multi-cuisine restaurant"
  }
},
    {
  id: 7,
  name: "Singapore",
  image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd",
  price: "$850",
  priceNumeric: 850,
  rating: 4.7,
  description: "Discover the perfect blend of modernity and tradition in this clean, green island city-state.",
  nights: 4,
  days: 5,
  featured: true,
  location: "Southeast Asia",
  itineraryHighlights: [
    "Arrival and Night Safari adventure",
    "City tour including Merlion Park and Marina Bay Sands",
    "Visit to Sentosa Island and Universal Studios",
    "Gardens by the Bay and shopping on Orchard Road",
    "Departure with optional Singapore Flyer ride"
  ],
  packageIncludes: [
    "Round-trip airfare",
    "Hotel accommodation with breakfast",
    "Airport transfers",
    "City and attraction tours",
    "Theme park tickets"
  ],
  accommodation: {
    hotel: "Hotel Boss",
    location: "Victoria Street, near Lavender MRT",
    roomType: "Superior Double Room",
    amenities: "WiFi, Outdoor pool, Fitness center, On-site restaurants"
  }
},
{
  id: 8,
  name: "Bangkok",
  image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365",
  price: "$650",
  priceNumeric: 650,
  rating: 4.5,
  description: "Explore the vibrant capital of Thailand with its ornate shrines, floating markets and exciting nightlife.",
  nights: 4,
  days: 5,
  featured: true,
  location: "Southeast Asia",
  itineraryHighlights: [
    "Arrival and Chao Phraya River cruise",
    "City tour with Grand Palace and Wat Pho",
    "Floating market and local shopping experience",
    "Safari World and Marine Park visit",
    "Departure with optional street food tour"
  ],
  packageIncludes: [
    "Return airfare",
    "Hotel stay with breakfast",
    "Airport and local transfers",
    "City and cultural sightseeing tours",
    "Theme park entry tickets"
  ],
  accommodation: {
    hotel: "The Berkeley Hotel Pratunam",
    location: "Pratunam, Central Bangkok",
    roomType: "Premier Room",
    amenities: "WiFi, Pool, Spa, Restaurant, Shopping access"
  }
},

   {
  id: 9,
  name: "New York",
  image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
  price: "$1,350",
  priceNumeric: 1350,
  rating: 4.7,
  description: "Experience the Big Apple with its iconic skyline, Broadway shows, world-class shopping, and diverse neighborhoods.",
  nights: 6,
  days: 7,
  featured: true,
  location: "North America",
  itineraryHighlights: [
    "Arrival and Times Square tour",
    "Statue of Liberty and Ellis Island",
    "Central Park and 5th Avenue shopping",
    "Broadway musical experience",
    "Empire State Building and night city view",
    "Brooklyn Bridge walk and local food tour",
    "Departure with optional museum visit"
  ],
  packageIncludes: [
    "Round-trip international flights",
    "4-star hotel accommodation",
    "Daily breakfast",
    "Airport transfers and local transport pass",
    "Guided sightseeing tours and show tickets"
  ],
  accommodation: {
    hotel: "Hilton Garden Inn Times Square",
    location: "Midtown Manhattan",
    roomType: "Standard Queen Room",
    amenities: "WiFi, Gym, Concierge service, City view"
  }
},
{
  id: 10,
  name: "Tokyo",
  image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8",
  price: "$1,200",
  priceNumeric: 1200,
  rating: 4.8,
  description: "Discover the fascinating blend of ultramodern and traditional in Japan's buzzing capital city.",
  nights: 7,
  days: 8,
  featured: true,
  location: "East Asia",
  itineraryHighlights: [
    "Arrival and Shibuya Crossing experience",
    "Visit to Meiji Shrine and Harajuku",
    "Tokyo Tower and Asakusa district tour",
    "Akihabara electronics and anime shopping",
    "Day trip to Mount Fuji and hot springs",
    "Odaiba entertainment district and teamLab Borderless museum",
    "Departure with a visit to Tokyo Disneyland (optional)"
  ],
  packageIncludes: [
    "Round-trip international flights",
    "Hotel accommodation in Shinjuku",
    "Daily breakfast",
    "All airport and local transfers",
    "Guided sightseeing tours and theme park tickets"
  ],
  accommodation: {
    hotel: "Park Hotel Tokyo",
    location: "Shiodome, Minato",
    roomType: "Deluxe Tokyo Bay View Room",
    amenities: "WiFi, 24-hour concierge, Onsen (Hot Spring), Restaurant"
  }
},
{
  id: 11,
  name: "Rome",
  image: "https://images.unsplash.com/photo-1525874684015-58379d421a52",
  price: "$950",
  priceNumeric: 950,
  rating: 4.8,
  description: "Explore the eternal city with its ancient ruins, art treasures, and delicious cuisine.",
  nights: 5,
  days: 6,
  featured: true,
  location: "Europe",
  itineraryHighlights: [
    "Arrival in Rome and transfer to hotel",
    "Visit the Colosseum and Roman Forum",
    "Tour of the Vatican Museums and Sistine Chapel",
    "Explore the Pantheon and Piazza Navona",
    "Shopping at Via del Corso and Campo de' Fiori",
    "Evening walk through Trastevere and enjoy local cuisine",
    "Departure"
  ],
  packageIncludes: [
    "Round-trip international flights",
    "Accommodation in a 4-star hotel",
    "Daily breakfast",
    "Airport transfers and guided city tours",
    "Vatican Museums entrance tickets and audio guide"
  ],
  accommodation: {
    hotel: "Hotel Nazionale",
    location: "Piazza Montecitorio, central Rome",
    roomType: "Classic Double Room with City View",
    amenities: "WiFi, Fitness center, Rooftop terrace, Restaurant"
  }
},
{
  id: 12,
  name: "Sydney",
  image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9",
  price: "$1,450",
  priceNumeric: 1450,
  rating: 4.7,
  description: "Enjoy the stunning harbor, beautiful beaches, and vibrant culture of Australia's famous city.",
  nights: 7,
  days: 8,
  featured: true,
  location: "Oceania",
  itineraryHighlights: [
    "Arrival in Sydney and transfer to hotel",
    "Visit the iconic Sydney Opera House and Harbour Bridge",
    "Explore Bondi Beach and Coogee coastal walk",
    "Day trip to the Blue Mountains and Featherdale Wildlife Park",
    "Discover The Rocks historic district and Sydney Tower",
    "Visit the Royal Botanic Garden and Darling Harbour",
    "Departure"
  ],
  packageIncludes: [
    "Round-trip international flights",
    "Accommodation in a 5-star hotel",
    "Daily breakfast",
    "City tours and entrance tickets",
    "Sydney Harbour cruise"
  ],
  accommodation: {
    hotel: "The Langham, Sydney",
    location: "Circular Quay, Central Sydney",
    roomType: "Harbour View Suite",
    amenities: "WiFi, Spa, Indoor pool, Fine dining restaurant"
  }
}
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
    setShowMyBookings(false);
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
    setShowMyBookings(true);
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
        
        {/* Dashboard Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          <button 
            onClick={() => {
              setShowMyBookings(false);
              setSelectedDestination(null);
              setShowBookingForm(false);
            }}
            className={`px-6 py-2 rounded-lg transition-colors ${!showMyBookings && !selectedDestination ? 'bg-admin-primary text-black' : 'border border-white/20 text-white hover:bg-white/5'}`}
          >
            Browse Destinations
          </button>
          <button 
            onClick={() => {
              setShowMyBookings(true);
              setSelectedDestination(null);
              setShowBookingForm(false);
            }}
            className={`px-6 py-2 rounded-lg transition-colors ${showMyBookings ? 'bg-admin-primary text-black' : 'border border-white/20 text-white hover:bg-white/5'}`}
          >
            My Bookings
          </button>
        </div>
        
        {/* Search Section - Only show when browsing destinations */}
        {!showMyBookings && !selectedDestination && !showBookingForm && (
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
        )}
        
        {/* My Bookings Section */}
        {showMyBookings && <UserBookings />}
        
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
                {selectedDestination.itineraryHighlights ? (
                  selectedDestination.itineraryHighlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))
                ) : (
                  <>
                    <li>Arrival and welcome reception</li>
                    <li>Guided tour of main attractions</li>
                    <li>Free time for personal exploration</li>
                    <li>Optional activities and excursions</li>
                    <li>Departure assistance</li>
                  </>
                )}
              </ul>
              
              <h3 className="text-lg font-semibold text-white mb-2">Package Includes</h3>
              <ul className="list-disc pl-5 text-gray-300 mb-6">
                {selectedDestination.packageIncludes ? (
                  selectedDestination.packageIncludes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <>
                    <li>Round-trip flights</li>
                    <li>Accommodation at selected hotels</li>
                    <li>Daily breakfast</li>
                    <li>Airport transfers</li>
                    <li>Travel insurance</li>
                  </>
                )}
              </ul>
              
              <h3 className="text-lg font-semibold text-white mb-2">Accommodation</h3>
              <div className="bg-black/30 p-4 rounded-lg mb-6">
                {selectedDestination.accommodation ? (
                  <>
                    <p className="text-gray-300 mb-2"><strong className="text-admin-primary">Hotel:</strong> {selectedDestination.accommodation.hotel}</p>
                    <p className="text-gray-300 mb-2"><strong className="text-admin-primary">Location:</strong> {selectedDestination.accommodation.location}</p>
                    <p className="text-gray-300 mb-2"><strong className="text-admin-primary">Room Type:</strong> {selectedDestination.accommodation.roomType}</p>
                    <p className="text-gray-300"><strong className="text-admin-primary">Amenities:</strong> {selectedDestination.accommodation.amenities}</p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-300 mb-2"><strong className="text-admin-primary">Hotel:</strong> Luxury Resort & Spa</p>
                    <p className="text-gray-300 mb-2"><strong className="text-admin-primary">Location:</strong> Prime location near attractions</p>
                    <p className="text-gray-300 mb-2"><strong className="text-admin-primary">Room Type:</strong> Deluxe with city/ocean view</p>
                    <p className="text-gray-300"><strong className="text-admin-primary">Amenities:</strong> WiFi, Swimming Pool, Restaurant, Spa, Fitness Center</p>
                  </>
                )}
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
        {!selectedDestination && !showBookingForm && !showMyBookings && (
          <>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent">
              Available Destinations
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDestinations.length > 0 ? (
                filteredDestinations.map((destination) => (
                  <div 
                    key={destination.id} 
                    className="bg-admin-dark rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-admin-primary/30 transition-all group"
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
