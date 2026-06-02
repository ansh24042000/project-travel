import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Plus,
  Shield,
  Zap,
  Clock,
  IndianRupee,
  ArrowLeft
} from 'lucide-react';
import { CommunityTrip } from '../types';
import { MOCK_COMMUNITY_TRIPS } from '../data/communityTrips';

interface CommunityExplorerProps {
  onBack: () => void;
  onTripSelect: (trip: CommunityTrip) => void;
  onCreateTrip: () => void;
}

const CommunityExplorer: React.FC<CommunityExplorerProps> = ({ onBack, onTripSelect, onCreateTrip }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const tripTypes = ['All', 'Adventure', 'Backpacking', 'Family', 'Religious', 'Bike Trip', 'Trekking', 'Luxury'];

  const filteredTrips = MOCK_COMMUNITY_TRIPS.filter(trip => 
    (selectedType === 'All' || trip.type === selectedType) &&
    (trip.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     trip.destination.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-40">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-3 text-slate-400 hover:text-orange-500 font-black text-xs uppercase tracking-[0.3em] transition group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Return to Deck
        </motion.button>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="px-4 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-6 inline-block">Global Network</span>
          <h1 className="text-6xl md:text-8xl font-display font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
            Community <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Marketplace.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium mb-12">
            Discover authenticated traveler cohorts, share expenses via integrated wallets, and optimize your exploration through collaborative intelligence.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCreateTrip}
            className="px-8 py-4 bg-slate-950 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 mx-auto shadow-2xl shadow-slate-200"
          >
            <Plus className="w-5 h-5 text-orange-500" />
            Launch New Expedition
          </motion.button>
        </motion.div>
      </div>

      {/* Filters & Search */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col md:flex-row gap-6">
          <div className="relative flex-grow group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by destination or trip name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-orange-500/50 focus:bg-white transition-all font-bold text-slate-700 placeholder:font-medium placeholder:text-slate-300"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {tripTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all ${
                  selectedType === type 
                    ? 'bg-slate-900 text-white shadow-lg' 
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredTrips.map((trip, idx) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => onTripSelect(trip)}
              className="group bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-[0_40px_80px_-16px_rgba(0,0,0,0.12)] transition-all duration-700 cursor-pointer flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden shrink-0">
                <img src={trip.coverImage} alt={trip.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-6 left-6 px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-slate-900 text-[10px] font-black uppercase tracking-widest">
                  {trip.type}
                </div>
                <div className="absolute top-6 right-6 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-lg text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
                  {trip.maxMembers - trip.members.length} Slots Left
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              
              <div className="p-10 flex-grow flex flex-col">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  {trip.destination}
                </div>
                <h3 className="text-2xl font-display font-black text-slate-950 mb-6 group-hover:text-orange-500 transition-colors leading-tight">{trip.name}</h3>
                
                <div className="flex items-center gap-8 mb-8 bg-slate-50 p-5 rounded-2xl">
                  <div className="flex items-center gap-3 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                    <Clock className="w-5 h-5 text-orange-500" />
                    {trip.duration}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                    <IndianRupee className="w-5 h-5 text-orange-500" />
                    ₹{trip.budget.toLocaleString()}
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-orange-500/20">
                      <img src={trip.organizer.image} alt={trip.organizer.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block">Host</span>
                      <span className="text-sm font-black text-slate-700">{trip.organizer.name}</span>
                    </div>
                  </div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center group-hover:bg-orange-500 transition-all shadow-xl shadow-slate-200"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityExplorer;
