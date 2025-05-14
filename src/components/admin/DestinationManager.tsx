
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Pencil, Trash, Plus } from "lucide-react";

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
  itineraryHighlights: string[];
  packageIncludes: string[];
  accommodation: {
    hotel: string;
    location: string;
    roomType: string;
    amenities: string;
  };
}

const DestinationManager = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Destination>({
    id: 0,
    name: "",
    image: "",
    price: "",
    priceNumeric: 0,
    rating: 4.5,
    description: "",
    nights: 3,
    days: 4,
    location: "",
    itineraryHighlights: ["", "", "", ""], // Initialize with 5 empty strings
    packageIncludes: ["", "", "", ""],
    accommodation: {
      hotel: "",
      location: "",
      roomType: "",
      amenities: ""
    }
  });

  useEffect(() => {
    // For demo purposes, we'll use the destinations from home
    // In a real app, you'd fetch from an API or database
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

    // Load destinations from localStorage or use defaults
    const savedDestinations = localStorage.getItem('destinations');
    if (savedDestinations) {
      try {
        const parsed = JSON.parse(savedDestinations);
        // Check if saved destinations have the new fields, if not, add them
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updatedDestinations = parsed.map((dest: any) => {
          if (!dest.itineraryHighlights) {
            dest.itineraryHighlights = ["Arrival and welcome", "Guided tour", "Free time", "Optional activities", "Departure"];
          }
          if (!dest.packageIncludes) {
            dest.packageIncludes = ["Flights", "Accommodation", "Breakfast", "Transfers", "Insurance"];
          }
          if (!dest.accommodation) {
            dest.accommodation = {
              hotel: "Luxury Resort & Spa",
              location: "Prime location",
              roomType: "Deluxe room",
              amenities: "WiFi, Pool, Restaurant"
            };
          }
          return dest;
        });
        setDestinations(updatedDestinations);
        localStorage.setItem('destinations', JSON.stringify(updatedDestinations));
      } catch (error) {
        setDestinations(defaultDestinations);
        localStorage.setItem('destinations', JSON.stringify(defaultDestinations));
      }
    } else {
      setDestinations(defaultDestinations);
      localStorage.setItem('destinations', JSON.stringify(defaultDestinations));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle accommodation fields
    if (name.startsWith('accommodation.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        accommodation: {
          ...formData.accommodation,
          [field]: value
        }
      });
    }
    // Handle numeric values
    else if (name === 'priceNumeric' || name === 'rating' || name === 'nights' || name === 'days') {
      setFormData({
        ...formData,
        [name]: parseFloat(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleArrayInputChange = (index: number, field: 'itineraryHighlights' | 'packageIncludes', value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId !== null) {
      // Update existing destination
      const updatedDestinations = destinations.map(dest => 
        dest.id === editingId ? { ...formData, id: editingId } : dest
      );
      
      setDestinations(updatedDestinations);
      localStorage.setItem('destinations', JSON.stringify(updatedDestinations));
      toast.success("Destination updated successfully!");
    } else {
      // Create new destination
      const newId = Math.max(0, ...destinations.map(d => d.id)) + 1;
      const newDestination = {
        ...formData,
        id: newId
      };
      
      const updatedDestinations = [...destinations, newDestination];
      setDestinations(updatedDestinations);
      localStorage.setItem('destinations', JSON.stringify(updatedDestinations));
      toast.success("Destination added successfully!");
    }

    // Reset form and state
    setFormData({
      id: 0,
      name: "",
      image: "",
      price: "",
      priceNumeric: 0,
      rating: 4.5,
      description: "",
      nights: 3,
      days: 4,
      location: "",
      itineraryHighlights: ["", "", "", ""],
      packageIncludes: ["", "", "", ""],
      accommodation: {
        hotel: "",
        location: "",
        roomType: "",
        amenities: ""
      }
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (destination: Destination) => {
    setFormData(destination);
    setEditingId(destination.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    const updatedDestinations = destinations.filter(dest => dest.id !== id);
    setDestinations(updatedDestinations);
    localStorage.setItem('destinations', JSON.stringify(updatedDestinations));
    toast.success("Destination deleted successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent mb-6">
        Manage Destinations
      </h2>
      
      <div className="mb-6 flex justify-between items-center">
        <p className="text-white">
          {destinations.length} destinations available
        </p>
        
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              id: 0,
              name: "",
              image: "",
              price: "",
              priceNumeric: 0,
              rating: 4.5,
              description: "",
              nights: 3,
              days: 4,
              location: "",
              itineraryHighlights: ["", "", "", ""],
              packageIncludes: ["", "", "", ""],
              accommodation: {
                hotel: "",
                location: "",
                roomType: "",
                amenities: ""
              }
            });
          }}
          className="px-4 py-2 bg-admin-primary hover:bg-admin-accent text-black rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          Add New Destination
        </button>
      </div>

      {showForm && (
        <div className="bg-black/40 p-6 rounded-xl border border-admin-primary/30 backdrop-blur-sm mb-8">
          <h3 className="text-xl font-bold text-admin-primary mb-4">
            {editingId !== null ? 'Edit Destination' : 'Add New Destination'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-1">Destination Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/60 border border-admin-primary/30 rounded-lg px-4 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/60 border border-admin-primary/30 rounded-lg px-4 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1">Price Display</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="$999"
                  required
                  className="w-full bg-black/60 border border-admin-primary/30 rounded-lg px-4 py-2 text-white"
                />
              </div>
                     
              <div>
                <label className="block text-gray-300 mb-1">Nights</label>
                <input
                  type="number"
                  name="nights"
                  value={formData.nights}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/60 border border-admin-primary/30 rounded-lg px-4 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1">Days</label>
                <input
                  type="number"
                  name="days"
                  value={formData.days}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/60 border border-admin-primary/30 rounded-lg px-4 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1">Rating (0-5)</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  required
                  className="w-full bg-black/60 border border-admin-primary/30 rounded-lg px-4 py-2 text-white"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured || false}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="featured" className="text-gray-300">
                  Featured Destination
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full bg-black/60 border border-admin-primary/30 rounded-lg px-4 py-2 text-white"
              />
              {formData.image && (
                <div className="mt-2 p-2 border border-admin-primary/30 rounded-lg max-w-xs">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="h-40 w-full object-cover rounded"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src = "https://via.placeholder.com/300x200?text=Invalid+Image+URL";
                    }}
                  />
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                required
                className="w-full bg-black/60 border border-admin-primary/30 rounded-lg px-4 py-2 text-white"
              ></textarea>
            </div>

            {/* Itinerary Highlights Section */}
            <div>
              <label className="block text-gray-300 mb-2">Itinerary Highlights</label>
              <div className="space-y-2">
                {formData.itineraryHighlights.map((highlight, index) => (
                  <input
                    key={`highlight-${index}`}
                    type="text"
                    value={highlight}
                    onChange={(e) => handleArrayInputChange(index, 'itineraryHighlights', e.target.value)}
                    placeholder={`Highlight ${index + 1}`}
                    className="w-full bg-black/60 border border-admin-primary/30 rounded-lg px-4 py-2 text-white mb-2"
                  />
                ))}
              </div>
            </div>

            {/* Package Includes Section */}
            <div>
              <label className="block text-gray-300 mb-2">Package Includes</label>
              <div className="space-y-2">
                {formData.packageIncludes.map((item, index) => (
                  <input
                    key={`package-${index}`}
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayInputChange(index, 'packageIncludes', e.target.value)}
                    placeholder={`Package item ${index + 1}`}
                    className="w-full bg-black/60 border border-admin-primary/30 rounded-lg px-4 py-2 text-white mb-2"
                  />
                ))}
              </div>
            </div>

            {/* Accommodation Section */}
            <div>
              <label className="block text-gray-300 mb-2">Accommodation Details</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-1">Hotel</label>
                  <input
                    type="text"
                    name="accommodation.hotel"
                    value={formData.accommodation.hotel}
                    onChange={handleChange}
                    placeholder="Hotel name"
                    className="w-full bg-black/60 border border-admin-primary/30 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Location</label>
                  <input
                    type="text"
                    name="accommodation.location"
                    value={formData.accommodation.location}
                    onChange={handleChange}
                    placeholder="Hotel location"
                    className="w-full bg-black/60 border border-admin-primary/30 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Room Type</label>
                  <input
                    type="text"
                    name="accommodation.roomType"
                    value={formData.accommodation.roomType}
                    onChange={handleChange}
                    placeholder="Room type"
                    className="w-full bg-black/60 border border-admin-primary/30 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Amenities</label>
                  <input
                    type="text"
                    name="accommodation.amenities"
                    value={formData.accommodation.amenities}
                    onChange={handleChange}
                    placeholder="WiFi, Pool, etc."
                    className="w-full bg-black/60 border border-admin-primary/30 rounded-lg px-4 py-2 text-white"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-white/20 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-admin-primary hover:bg-admin-accent text-black rounded-lg"
              >
                {editingId !== null ? 'Save Changes' : 'Create Destination'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {destinations.map((destination) => (
          <div key={destination.id} className="bg-admin-dark p-4 rounded-lg border border-white/10 hover:border-admin-primary/30 transition-all">
            <div className="flex items-center gap-4">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-24 h-24 object-cover rounded-md border border-admin-primary/20"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = "https://via.placeholder.com/100?text=Error";
                }}
              />
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-admin-primary">{destination.name}</h3>
                  <span className="text-sm bg-black/40 text-admin-primary px-2 py-1 rounded">
                    {destination.price}
                  </span>
                </div>
                
                <p className="text-sm text-gray-400">{destination.location}</p>
                <p className="text-sm text-gray-300 mt-1">{destination.nights} nights / {destination.days} days</p>
                
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <span 
                          key={i} 
                          className={`text-sm ${i < Math.floor(destination.rating) ? "text-yellow-400" : "text-gray-500"}`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-1 text-xs text-gray-400">({destination.rating})</span>
                    </div>
                    
                    {destination.featured && (
                      <span className="ml-3 text-xs bg-admin-primary/20 text-admin-primary px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(destination)}
                      className="p-2 bg-amber-600 hover:bg-amber-500 text-white rounded"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(destination.id)}
                      className="p-2 bg-admin-danger hover:bg-red-600 text-white rounded"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {destinations.length === 0 && (
        <div className="text-center p-8 bg-black/40 rounded-xl border border-white/10">
          <p className="text-gray-400">No destinations available. Add some destinations to get started!</p>
        </div>
      )}
    </div>
  );
};

export default DestinationManager;
