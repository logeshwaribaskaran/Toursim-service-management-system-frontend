
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-admin-primary to-admin-accent bg-clip-text text-transparent">
          About GlobeTrek Holidays
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e" 
              alt="Scenic mountain landscape" 
              className="rounded-xl shadow-lg border-2 border-admin-primary/30 w-full h-auto"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-admin-primary">Our Journey</h2>
            <p className="text-gray-300 leading-relaxed">
              Founded in 2010, GlobeTrek Holidays began with a simple mission: to create travel experiences that go beyond the ordinary. 
              What started as a small team of passionate travelers has grown into a leading travel company with a global presence,
              serving thousands of happy travelers each year.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We believe travel has the power to transform lives, broaden perspectives, and create lasting connections. 
              Every itinerary we craft is designed to immerse you in authentic experiences that showcase the best each 
              destination has to offer.
            </p>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-admin-primary mb-10">Why Choose GlobeTrek?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-admin-dark p-6 rounded-xl border border-white/10 hover:border-admin-primary/50 transition-all">
              <div className="w-16 h-16 bg-admin-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-admin-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Expertly Crafted Itineraries</h3>
              <p className="text-gray-400 text-center">
                Our travel specialists personally visit every destination to ensure we offer the most authentic and enriching experiences.
              </p>
            </div>
            
            <div className="bg-admin-dark p-6 rounded-xl border border-white/10 hover:border-admin-primary/50 transition-all">
              <div className="w-16 h-16 bg-admin-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-admin-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">24/7 Support</h3>
              <p className="text-gray-400 text-center">
                Travel with peace of mind knowing our dedicated support team is available around the clock to assist with any needs.
              </p>
            </div>
            
            <div className="bg-admin-dark p-6 rounded-xl border border-white/10 hover:border-admin-primary/50 transition-all">
              <div className="w-16 h-16 bg-admin-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-admin-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Value for Money</h3>
              <p className="text-gray-400 text-center">
                We negotiate the best rates with our partners to offer you exceptional experiences without compromising on quality.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-admin-primary mb-10">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: "Sarah Johnson", 
                role: "Founder & CEO", 
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              },
              { 
                name: "Michael Chen", 
                role: "Head of Operations", 
                image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              },
              { 
                name: "Priya Sharma", 
                role: "Lead Travel Consultant", 
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              },
              { 
                name: "David Wilson", 
                role: "Customer Experience Director", 
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              }
            ].map((person, index) => (
              <div key={index} className="bg-admin-dark rounded-xl overflow-hidden border border-white/10 hover:border-admin-primary/30 transition-all">
                <img 
                  src={person.image} 
                  alt={person.name} 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-admin-primary">{person.name}</h3>
                  <p className="text-gray-400">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center pb-10">
          <h2 className="text-2xl font-bold text-admin-primary mb-4">Our Commitment</h2>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
            At GlobeTrek Holidays, we're committed to responsible tourism that respects local cultures and environments.
            We partner with local businesses and contribute to community initiatives to ensure tourism benefits the places we visit.
            When you travel with us, you're not just seeing the world—you're helping make it better.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
