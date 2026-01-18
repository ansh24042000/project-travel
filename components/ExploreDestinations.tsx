
import React from 'react';
import { ArrowLeft, Star, MapPin, Clock, Calendar, Instagram, Facebook, Twitter, Phone, Mail, Compass } from 'lucide-react';
import { RecommendedDestination } from '../types';

interface ExtendedDestination extends RecommendedDestination {
  image: string;
  rating: number;
  price: string;
  season: string;
}

const MOCK_DESTINATIONS: ExtendedDestination[] = [
  { 
    id: 'manali', 
    name: 'Manali', 
    country: 'India', 
    description: 'A stunning hill station nestled in the Himalayas, perfect for adventure seekers and nature lovers alike.', 
    category: 'Premium', 
    bestTimeToVisit: 'Mar-Jun, Sep-Nov', 
    duration: '4-5 Days', 
    imageSearchQuery: 'Manali Hills', 
    highlights: ['Solang Valley', 'Rohtang Pass', 'Hadimba Temple'],
    image: 'https://images.unsplash.com/photo-1596701062351-df5f8a42f431?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    price: '₹15,000',
    season: 'Mar-Jun, Sep-Nov'
  },
  { 
    id: 'goa', 
    name: 'Goa', 
    country: 'India', 
    description: "India's beach paradise with golden shores, vibrant nightlife, and Portuguese heritage.", 
    category: 'Best Match', 
    bestTimeToVisit: 'Nov-Feb', 
    duration: '3-5 Days', 
    imageSearchQuery: 'Goa Beaches', 
    highlights: ['Baga Beach', 'Fort Aguada', 'Anjuna Flea Market'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    price: '₹12,000',
    season: 'Nov-Feb'
  },
  { 
    id: 'rishikesh', 
    name: 'Rishikesh', 
    country: 'India', 
    description: 'The adventure capital of India, offering thrilling rapids, bungee jumping, and spiritual retreats.', 
    category: 'Budget Friendly', 
    bestTimeToVisit: 'Sep-Jun', 
    duration: '3-4 Days', 
    imageSearchQuery: 'Rishikesh Adventure', 
    highlights: ['River Rafting', 'Laxman Jhula', 'Beatles Ashram'],
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    price: '₹10,000',
    season: 'Sep-Jun'
  },
  { 
    id: 'jaipur', 
    name: 'Jaipur', 
    country: 'India', 
    description: 'Experience the royal heritage of the Pink City where history meets ancient traditions on the banks of Ganges.', 
    category: 'Best Match', 
    bestTimeToVisit: 'Oct-Mar', 
    duration: '2-3 Days', 
    imageSearchQuery: 'Jaipur Palace', 
    highlights: ['Amber Fort', 'Hawa Mahal', 'City Palace'],
    image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    price: '₹8,000',
    season: 'Oct-Mar'
  },
  { 
    id: 'kerala', 
    name: 'Kerala', 
    country: 'India', 
    description: "Navigate through the serene backwaters and discover unforgettable wildlife encounters in God's Own Country.", 
    category: 'Premium', 
    bestTimeToVisit: 'Oct-Jun', 
    duration: '2-3 Days', 
    imageSearchQuery: 'Kerala Backwaters', 
    highlights: ['Alleppey Backwaters', 'Munnar Tea Gardens', 'Thekkady'],
    image: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    price: '₹18,000',
    season: 'Oct-Jun'
  },
  { 
    id: 'ladakh', 
    name: 'Ladakh', 
    country: 'India', 
    description: 'Explore the mystical land of high passes, crystal clear lakes, pristine beaches, and romantic sunsets.', 
    category: 'Premium', 
    bestTimeToVisit: 'Oct-May', 
    duration: '5-7 Days', 
    imageSearchQuery: 'Ladakh Mountains', 
    highlights: ['Pangong Lake', 'Nubra Valley', 'Magnetic Hill'],
    image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    price: '₹35,000',
    season: 'Oct-May'
  }
];

interface ExploreDestinationsProps {
  onBack: () => void;
  onDestinationSelect: (dest: RecommendedDestination) => void;
}

const ExploreDestinations: React.FC<ExploreDestinationsProps> = ({ onBack, onDestinationSelect }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-white pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold mb-8 transition group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">
              Explore All <br />
              <span className="text-orange-500">Destinations</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl font-medium">
              Discover incredible travel destinations across India, from serene hill stations to vibrant beaches.
            </p>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_DESTINATIONS.map((dest) => (
            <div 
              key={dest.id} 
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-100 border border-slate-50 group flex flex-col"
            >
              <div className="relative h-64 overflow-hidden shrink-0">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                
                {/* Category Tag */}
                <div className="absolute top-4 left-4 px-4 py-1.5 bg-orange-500/90 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                  {dest.id === 'manali' ? 'Hill Station' : dest.id === 'goa' ? 'Beach' : dest.id === 'rishikesh' ? 'Adventure' : 'Destination'}
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-slate-900 text-xs font-bold flex items-center gap-1 shadow-sm">
                  <Star className="w-4 h-4 text-orange-500 fill-orange-400" />
                  {dest.rating}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-black">{dest.name}</h3>
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 line-clamp-2">
                  {dest.description}
                </p>

                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                    <Clock className="w-4 h-4 text-orange-500" />
                    {dest.duration}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    {dest.season}
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">From</span>
                    <span className="text-2xl font-black text-slate-900">{dest.price}</span>
                  </div>
                  <button 
                    onClick={() => onDestinationSelect(dest)}
                    className="px-8 py-3.5 bg-orange-500 text-white rounded-2xl font-black text-sm hover:bg-orange-600 transition shadow-lg shadow-orange-100 active:scale-95"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer id="footer" className="bg-slate-950 text-slate-300 pt-24 pb-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            {/* Column 1: Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-500 p-2 rounded-xl">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Avyukt</span>
              </div>
              <p className="text-slate-500 leading-relaxed mb-8 text-sm">
                Plan your perfect trip in minutes with AI-powered destination suggestions and seamless booking.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest">Quick Links</h4>
              <ul className="space-y-4 text-sm font-medium">
                {['Destinations', 'Packages', 'Hotels', 'Itineraries', 'Blog'].map(link => (
                  <li key={link}>
                    <button className="hover:text-orange-500 transition-colors">{link}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Popular */}
            <div>
              <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest">Popular Destinations</h4>
              <ul className="space-y-4 text-sm font-medium">
                {['Manali', 'Goa', 'Jaipur', 'Kerala', 'Ladakh', 'Andaman'].map(dest => (
                  <li key={dest}>
                    <button className="hover:text-orange-500 transition-colors">{dest}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest">Contact Us</h4>
              <ul className="space-y-6 text-sm font-medium">
                <li className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
                  <span>123 Travel Street, Mumbai, India 400001</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                  <span>hello@avyukt.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-600 text-sm font-medium">
              © 2024 Avyukt. All rights reserved.
            </p>
            <div className="flex gap-8">
              <button className="text-slate-600 hover:text-orange-500 transition text-sm font-bold">Privacy Policy</button>
              <button className="text-slate-600 hover:text-orange-500 transition text-sm font-bold">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExploreDestinations;