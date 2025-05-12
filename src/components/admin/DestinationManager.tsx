
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
    location: ""
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

    // Load destinations from localStorage or use defaults
    const savedDestinations = localStorage.getItem('destinations');
    if (savedDestinations) {
      setDestinations(JSON.parse(savedDestinations));
    } else {
      setDestinations(defaultDestinations);
      localStorage.setItem('destinations', JSON.stringify(defaultDestinations));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric values
    if (name === 'priceNumeric' || name === 'rating' || name === 'nights' || name === 'days') {
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
      location: ""
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
              location: ""
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
                <label className="block text-gray-300 mb-1">Price Numeric</label>
                <input
                  type="number"
                  name="priceNumeric"
                  value={formData.priceNumeric}
                  onChange={handleChange}
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
