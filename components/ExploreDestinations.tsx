
import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Star, MapPin, Clock, Calendar, ArrowRight, Compass } from 'lucide-react';
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
    category: 'Hill Station', 
    bestTimeToVisit: 'Mar-Jun, Sep-Nov', 
    duration: '4-5 Days', 
    imageSearchQuery: 'Manali Hills', 
    highlights: ['Solang Valley', 'Rohtang Pass', 'Hadimba Temple'],
    image: 'https://images.unsplash.com/photo-1596701062351-df5f8a42f431?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    price: '₹15,000',
    season: 'Mar-Jun'
  },
  { 
    id: 'goa', 
    name: 'Goa', 
    country: 'India', 
    description: "India's beach paradise with golden shores, vibrant nightlife, and Portuguese heritage.", 
    category: 'Beach', 
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
    category: 'Adventure', 
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
    category: 'Heritage', 
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
    category: 'Nature', 
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
    category: 'Mountain', 
    bestTimeToVisit: 'Jun-Sep', 
    duration: '5-7 Days', 
    imageSearchQuery: 'Ladakh Mountains', 
    highlights: ['Pangong Lake', 'Nubra Valley', 'Magnetic Hill'],
    image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    price: '₹35,000',
    season: 'Jun-Sep'
  }
];

interface ExploreDestinationsProps {
  onBack: () => void;
  onDestinationSelect: (dest: RecommendedDestination) => void;
}

const ExploreDestinations: React.FC<ExploreDestinationsProps> = ({ onBack, onDestinationSelect }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.05),transparent)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-3 text-slate-400 hover:text-orange-500 font-black text-xs uppercase tracking-[0.3em] mb-12 transition group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Return to Core
          </motion.button>
          
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-orange-500 font-black text-xs uppercase tracking-[0.4em] block mb-6 px-1"
            >
              Global Discovery
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-display font-black text-slate-900 mb-10 tracking-tighter leading-[0.9]"
            >
              Master <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Inventory.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-500 leading-relaxed max-w-2xl font-medium"
            >
              Access our complete verified destination network. High-performance travel modules curated through AI analysis and partner intelligence.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MOCK_DESTINATIONS.map((dest, i) => (
            <motion.div 
              key={dest.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[3.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 group flex flex-col transition-all duration-700"
            >
              <div className="relative h-72 overflow-hidden shrink-0">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
                />
                
                {/* Category Tag */}
                <div className="absolute top-6 left-6 px-4 py-2 bg-slate-950/90 backdrop-blur-md rounded-xl text-white text-[10px] font-black uppercase tracking-widest">
                  {dest.category}
                </div>

                {/* Rating */}
                <div className="absolute top-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-slate-900 text-xs font-black flex items-center gap-2 shadow-xl">
                  <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                  {dest.rating}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-4xl font-display font-black tracking-tight">{dest.name}</h3>
                </div>
              </div>
              
              <div className="p-10 flex-grow flex flex-col">
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                  {dest.description}
                </p>

                <div className="flex items-center gap-8 mb-10 bg-slate-50 p-5 rounded-[2rem]">
                  <div className="flex items-center gap-3 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                    <Clock className="w-5 h-5 text-orange-500" />
                    {dest.duration}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    {dest.season}
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Index Price</span>
                    <span className="text-3xl font-black text-slate-950 font-display tracking-tight">{dest.price}</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDestinationSelect(dest)}
                    className="w-14 h-14 bg-slate-950 text-white rounded-2xl flex items-center justify-center hover:bg-orange-500 transition-all shadow-xl shadow-slate-200"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExploreDestinations;
