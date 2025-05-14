import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { toast } from "sonner";

interface DestinationCard {
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

const Home = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<DestinationCard | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState<DestinationCard[]>([]);
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  const [destinations, setDestinations] = useState<DestinationCard[]>([]);
  
  // Initial destinations data
  const defaultDestinations: DestinationCard[] = [
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
      image: "https://etimg.etb2bimg.com/photo/106476310.cms", 
      price: "$799",
      priceNumeric: 799, 
      rating: 4.6,
      description: "Known as 'Paradise on Earth' with breathtaking mountains, serene lakes, and picturesque valleys.",
      nights: 5,
      days: 6,
      featured: true,
      location: "South Asia"
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
      location: "Europe"
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
      location: "Middle East"
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
      location: "Southeast Asia"
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
      location: "Southeast Asia"
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
      location: "North America"
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
      location: "East Asia"
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
      location: "Europe"
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
      location: "Oceania"
    }
  ];
  
  // Load destinations from localStorage or use defaults
  useEffect(() => {
    const loadDestinations = () => {
      const savedDestinations = localStorage.getItem('destinations');
      if (savedDestinations) {
        setDestinations(JSON.parse(savedDestinations));
      } else {
        setDestinations(defaultDestinations);
        localStorage.setItem('destinations', JSON.stringify(defaultDestinations));
      }
    };
    
    loadDestinations();
    
    // Listen for changes in destinations
    window.addEventListener('destinationChange', loadDestinations);
    
    return () => {
      window.removeEventListener('destinationChange', loadDestinations);
    };
  }, []);
  
  // Filter destinations based on search
  useEffect(() => {
    if (searchQuery) {
      const filtered = destinations.filter(dest => 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDestinations(filtered);
    } else {
      setFilteredDestinations(destinations);
    }
  }, [searchQuery, destinations]);

  const handleExploreClick = (destination: DestinationCard) => {
    setSelectedDestination(destination);
  };

  const handleBookNow = () => {
    const userType = localStorage.getItem('userType');
    if (!userType) {
      toast.error("Please log in to book this destination");
      setTimeout(() => navigate('/login'), 1500);
    } else {
      navigate('/user-dashboard');
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {Array(5).fill(0).map((_, i) => (
          <span key={i} className={`${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-400"}`}>
            ★
          </span>
        ))}
        <span className="ml-1 text-white text-sm">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Travel background"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Discover the World with GlobeTrek
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Experience unforgettable journeys to the world's most breathtaking destinations
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="bg-admin-primary hover:bg-admin-accent text-black font-bold px-8 py-3 rounded-full transition-colors"
              >
                Start Your Journey
              </button>
              <button 
                onClick={() => {
                  const destinationSection = document.getElementById('destinations');
                  destinationSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-transparent hover:bg-white/10 text-white border border-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                Explore Destinations
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-10 bg-admin-darker">
        <div className="container mx-auto px-4">
          <div className="bg-admin-dark rounded-xl p-6 shadow-lg border border-white/10 -mt-20 relative z-10">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search destinations, experiences, or activities..." 
                    className="w-full bg-black/40 border border-white/10 rounded-md py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-admin-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <button 
                onClick={() => {
                  // The search is already handled by the useEffect that monitors searchQuery
                }}
                className="bg-admin-primary hover:bg-admin-accent text-black px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Destinations */}
      <section id="destinations" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent">
            Our Featured Destinations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDestinations
              .filter(destination => destination.featured)
              .map((destination) => (
                <div key={destination.id} className="bg-admin-dark rounded-xl overflow-hidden shadow-lg border border-white/5 transition-transform hover:transform hover:scale-105 group">
                  <div className="relative h-48" onClick={() => setSelectedImage(destination.image)}>
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover cursor-pointer"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 text-admin-primary px-2 py-1 rounded text-sm font-bold">
                      {destination.price}
                    </div>
                    <div className="absolute top-2 left-2 bg-admin-primary/70 text-black px-2 py-1 rounded-full text-xs font-bold">
                      Featured
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold text-admin-primary">{destination.name}</h3>
                    </div>
                    
                    <div className="flex items-center mb-2 text-sm text-gray-300">
                      <MapPin size={14} className="mr-1 text-admin-primary" />
                      {destination.location}
                      <span className="mx-2">•</span>
                      <Calendar size={14} className="mr-1 text-admin-primary" />
                      {destination.nights} nights
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      {renderStars(destination.rating)}
                    </div>
                    
                    <p className="text-gray-400 mb-4 text-sm line-clamp-2">
                      {destination.description}
                    </p>
                    
                    <button 
                      onClick={() => handleExploreClick(destination)}
                      className="w-full bg-admin-primary/20 hover:bg-admin-primary text-admin-primary hover:text-black font-medium py-2 rounded-md transition-colors flex items-center justify-center gap-1"
                    >
                      Explore <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
          
          {filteredDestinations.filter(d => d.featured).length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-400 text-lg">No featured destinations found.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* All Destinations */}
      <section className="py-16 bg-admin-darker">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent">
              All Destinations
            </h2>
            <button 
              onClick={() => setShowAllDestinations(!showAllDestinations)}
              className="text-admin-primary hover:underline flex items-center gap-1"
            >
              {showAllDestinations ? 'Show Less' : 'View All'} <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showAllDestinations ? filteredDestinations : filteredDestinations.slice(0, 6)).map((destination) => (
              <div key={destination.id} className="bg-admin-dark rounded-xl overflow-hidden shadow-lg border border-white/5 transition-all hover:border-admin-primary/30 group flex flex-col">
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
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white group-hover:text-admin-primary transition-colors">{destination.name}</h3>
                    {renderStars(destination.rating)}
                  </div>
                  
                  <div className="flex items-center mt-2 mb-3 text-sm text-gray-400">
                    <MapPin size={14} className="text-admin-primary mr-1" /> {destination.location}
                  </div>
                  
                  <p className="text-gray-400 mb-4 text-sm flex-1">
                    {destination.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-300">
                      <Calendar size={14} className="inline mr-1 text-admin-primary" /> 
                      {destination.nights} nights / {destination.days} days
                    </div>
                    <button 
                      onClick={() => handleExploreClick(destination)}
                      className="bg-admin-primary hover:bg-admin-accent text-black px-3 py-1 rounded text-sm font-medium transition-colors"
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredDestinations.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-400 text-lg">No destinations found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                }}
                className="mt-4 bg-admin-primary hover:bg-admin-accent text-black px-4 py-2 rounded transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent">
                About GlobeTrek Holidays
              </h2>
              <p className="text-gray-300 mb-4">
                GlobeTrek Holidays was founded with the mission to provide extraordinary travel experiences.
                From exotic beaches to majestic mountains, we curate unforgettable journeys tailored to your preferences.
              </p>
              <p className="text-gray-300 mb-4">
                Our experienced team of travel experts ensures that every detail of your trip is carefully planned,
                allowing you to focus on creating memories that will last a lifetime.
              </p>
              <h3 className="text-xl font-semibold mb-2 text-admin-primary">Our Services</h3>
              <ul className="text-gray-300 list-disc pl-5 mb-6">
                <li>International and domestic tour packages</li>
                <li>Flight and hotel bookings</li>
                <li>Guided tours and excursions</li>
                <li>Visa assistance and travel insurance</li>
                <li>Customized itineraries for groups and individuals</li>
              </ul>
              <button 
                onClick={() => navigate('/about')}
                className="bg-admin-primary hover:bg-admin-accent text-black font-medium px-6 py-3 rounded-md transition-colors"
              >
                Learn More About Us
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg" 
                alt="Travel experience" 
                className="rounded-lg border-2 border-admin-primary w-full h-48 object-cover hover:scale-105 transition-transform"
              />
              <img 
                src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944" 
                alt="Travel experience" 
                className="rounded-lg border-2 border-admin-primary w-full h-48 object-cover hover:scale-105 transition-transform"
              />
              <img 
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1" 
                alt="Travel experience" 
                className="rounded-lg border-2 border-admin-primary w-full h-48 object-cover hover:scale-105 transition-transform"
              />
              <img 
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" 
                alt="Travel experience" 
                className="rounded-lg border-2 border-admin-primary w-full h-48 object-cover hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-admin-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who have experienced the world with GlobeTrek Holidays.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="bg-admin-primary hover:bg-admin-accent text-black font-bold px-8 py-3 rounded-md transition-colors"
            >
              Book Now
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="bg-transparent hover:bg-white/10 text-white border border-white px-8 py-3 rounded-md transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
      
      {/* Modal for image preview */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" 
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="max-w-full max-h-[80vh] border-4 border-admin-primary rounded-lg"
            />
            <button 
              className="absolute top-2 right-2 bg-admin-primary text-black w-8 h-8 rounded-full flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      {/* Destination Details Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-y-auto">
          <div 
            className="bg-admin-dark rounded-xl max-w-4xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-80">
              <img 
                src={selectedDestination.image} 
                alt={selectedDestination.name}
                className="w-full h-full object-cover"
              />
              <button 
                className="absolute top-4 right-4 bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center"
                onClick={() => setSelectedDestination(null)}
              >
                ×
              </button>
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md">
                <p className="text-sm">{selectedDestination.nights} Nights / {selectedDestination.days} Days</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-admin-primary">{selectedDestination.name}</h2>
                <div className="text-xl font-bold text-admin-accent">{selectedDestination.price}</div>
              </div>
              
              <div className="flex mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} className={i < Math.floor(selectedDestination.rating) ? "text-yellow-400" : "text-gray-500"}>
                    ★
                  </span>
                ))}
                <span className="ml-1 text-gray-400 text-sm">({selectedDestination.rating})</span>
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
                  Close
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
        </div>
      )}
    </div>
  );
};

export default Home;
