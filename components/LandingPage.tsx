
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Calendar, 
  Shield, 
  Users, 
  ArrowRight, 
  Mountain, 
  Waves, 
  Compass, 
  Church, 
  Trees, 
  Heart,
  ChevronDown,
  Star,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Phone,
  Mail,
  Zap,
  Globe,
  Award
} from 'lucide-react';
import { TravelPreference, UserSession, RecommendedDestination, UserRole, CommunityTrip } from '../types';
import { MOCK_COMMUNITY_TRIPS } from '../data/communityTrips';

interface LandingPageProps {
  onStartPlanning: (data?: Partial<UserSession>) => void;
  onExplore: () => void;
  onPackagesClick: () => void;
  onDestinationSelect: (dest: RecommendedDestination) => void;
  onAboutClick: () => void;
  onSwitchRole: (role: UserRole) => void;
  onCommunityExplore: () => void;
}

const PREFERENCES: { id: TravelPreference; label: string; icon: any }[] = [
  { id: 'Hill Station', label: 'Hill Station', icon: Mountain },
  { id: 'Beach', label: 'Beach', icon: Waves },
  { id: 'Adventure', label: 'Adventure', icon: Compass },
  { id: 'Religious', label: 'Religious', icon: Church },
  { id: 'Wildlife', label: 'Wildlife', icon: Trees },
  { id: 'Honeymoon', label: 'Honeymoon', icon: Heart },
  { id: 'Family', label: 'Family', icon: Users },
];

const POPULAR_DESTINATIONS = [
  {
    id: 'goa',
    name: 'Goa',
    country: 'India',
    description: 'Beautiful beaches and vibrant nightlife.',
    category: 'Best Match' as const,
    bestTimeToVisit: 'Nov-Feb',
    duration: '4-5 Days',
    imageSearchQuery: 'Goa Beaches',
    highlights: ['Baga Beach', 'Fort Aguada', 'Anjuna Flea Market'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
  },
  {
    id: 'manali',
    name: 'Manali',
    country: 'India',
    description: 'Majestic mountains and snow-capped peaks.',
    category: 'Premium' as const,
    bestTimeToVisit: 'Mar-Jun',
    duration: '5-6 Days',
    imageSearchQuery: 'Manali Hills',
    highlights: ['Solang Valley', 'Rohtang Pass', 'Hadimba Temple'],
    image: 'https://images.unsplash.com/photo-1596701062351-df5f8a42f431?auto=format&fit=crop&q=80&w=800',
    rating: 4.9
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    country: 'India',
    description: 'Adventure capital and spiritual hub.',
    category: 'Budget Friendly' as const,
    bestTimeToVisit: 'Sep-Nov',
    duration: '3-4 Days',
    imageSearchQuery: 'Rishikesh Adventure',
    highlights: ['River Rafting', 'Laxman Jhula', 'Beatles Ashram'],
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800',
    rating: 4.7
  }
];

const LandingPage: React.FC<LandingPageProps> = ({ 
  onStartPlanning, 
  onExplore, 
  onPackagesClick, 
  onDestinationSelect, 
  onAboutClick, 
  onSwitchRole,
  onCommunityExplore 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    travelers: '1',
    selectedPrefs: [] as TravelPreference[]
  });

  const togglePreference = (pref: TravelPreference) => {
    setFormData(prev => ({
      ...prev,
      selectedPrefs: prev.selectedPrefs.includes(pref)
        ? prev.selectedPrefs.filter(p => p !== pref)
        : [...prev.selectedPrefs, pref]
    }));
  };

  const isFormValid = formData.name.trim() !== '' && formData.selectedPrefs.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    onStartPlanning({
      fullName: formData.name,
      travelers: { adults: parseInt(formData.travelers), children: 0 },
      preferences: formData.selectedPrefs
    });
  };

  const scrollToForm = () => {
    document.getElementById('adventure-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col bg-white">
      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" 
            alt="Mountain Sunset" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950"></div>
        </motion.div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-500 font-black text-xs uppercase tracking-[0.3em] mb-8">
              AI-Powered Travel Intelligence
            </span>
            <h1 className="text-6xl md:text-9xl font-display font-black text-white tracking-tighter leading-[0.9] mb-8">
              Next-Gen <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">Travel Planning</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              Experience the pinnacle of hyper-personalized itinerary curation. Avyukt transforms your travel DNA into a seamless, high-performance journey.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToForm}
                className="group relative w-full sm:w-auto px-10 py-5 bg-orange-500 text-white rounded-2xl font-black text-xl shadow-2xl shadow-orange-500/40 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                <span className="relative flex items-center gap-3">
                  Start Planning <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.98 }}
                onClick={onExplore}
                className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-xl transition-all duration-300"
              >
                Explore Map
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={scrollToForm}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1.5">
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-2 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. The Avyukt Edge Section */}
      <section className="bg-white py-24 md:py-40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-orange-500 font-black text-xs uppercase tracking-widest block mb-4">Core Philosophy</span>
              <h2 className="text-5xl md:text-7xl font-display font-black text-slate-900 mb-8 tracking-tight leading-none">
                Travel with <br />
                <span className="text-slate-400">Total Authority.</span>
              </h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10 max-w-xl">
                We've combined deep research with cutting-edge infrastructure to deliver an ecosystem that eliminates the friction from your exploration.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 mb-1">Ultra Fast</h4>
                    <p className="text-sm text-slate-500 font-medium">Itineraries in under 60 seconds.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 mb-1">Global Scale</h4>
                    <p className="text-sm text-slate-500 font-medium">150+ countries covered.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 relative">
              <div className="absolute inset-0 bg-orange-500/5 blur-[100px] -z-10 rounded-full"></div>
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-sm mt-12"
              >
                <Award className="w-10 h-10 text-orange-500 mb-6" />
                <h3 className="text-xl font-black text-slate-900 mb-2">Platinum Access</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">Direct lines to elite hotel partners and private guides.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-[60px]"></div>
                <Sparkles className="w-10 h-10 text-orange-400 mb-6" />
                <h3 className="text-xl font-black text-white mb-2">AI Precision</h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">Neural-mapped preferences that evolve with your choices.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -10 }}
                className="col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Partner Synergy</h3>
                    <p className="text-slate-500 font-medium leading-relaxed italic">"The most transparent travel ecosystem we've ever integrated with." — Hotel Partner 2024</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Start Your Adventure Section - THE FORM */}
      <section id="adventure-form" className="bg-slate-50 py-24 md:py-32 border-t border-slate-100 relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 mb-6 tracking-tight">Initialize Your <span className="text-orange-500">Voyage.</span></h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Feeding your travel profile into the Avyukt Engine for hyper-personalized outcome generation.
            </p>
          </div>

          <motion.form 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit} 
            className="bg-white p-8 md:p-16 rounded-[4rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col gap-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Name Field */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block ml-1">Identity</label>
                <div className="relative group">
                  <input 
                    type="text"
                    placeholder="Enter full legal name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[2rem] outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-800 font-bold placeholder:text-slate-300 placeholder:font-medium"
                  />
                  <div className="absolute inset-0 rounded-[2rem] border-2 border-orange-500/0 group-focus-within:border-orange-500/50 transition-all pointer-events-none -m-1"></div>
                </div>
              </div>

              {/* Travelers Field */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block ml-1">Cohort Count</label>
                <div className="relative">
                  <select 
                    value={formData.travelers}
                    onChange={(e) => setFormData(prev => ({ ...prev, travelers: e.target.value }))}
                    className="w-full appearance-none px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[2rem] outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-800 font-bold cursor-pointer"
                  >
                    <option value="1">1 Nomad</option>
                    <option value="2">2 Travelers</option>
                    <option value="3">3 Travelers</option>
                    <option value="4">4 Travelers</option>
                    <option value="5">Elite Group (5+)</option>
                  </select>
                  <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Preferences Field */}
            <div className="space-y-6">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block ml-1 text-center md:text-left">Curation Vibe</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
                {PREFERENCES.map(pref => {
                  const isActive = formData.selectedPrefs.includes(pref.id);
                  const Icon = pref.icon;
                  return (
                    <motion.button
                      key={pref.id}
                      type="button"
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => togglePreference(pref.id)}
                      className={`flex flex-col items-center justify-center p-4 aspect-square rounded-[2rem] border-2 transition-all gap-3 overflow-hidden ${
                        isActive 
                          ? 'bg-slate-900 border-slate-900 text-white shadow-2xl shadow-slate-200' 
                          : 'bg-white border-slate-100 text-slate-400 hover:border-orange-200 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className={`w-8 h-8 transition-colors ${isActive ? 'text-orange-500' : 'text-slate-300'}`} />
                      <span className="text-[9px] font-black uppercase tracking-widest text-center leading-tight whitespace-nowrap">{pref.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <motion.button 
                whileHover={isFormValid ? { scale: 1.02 } : {}}
                whileTap={isFormValid ? { scale: 0.98 } : {}}
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-8 rounded-[2.5rem] font-display font-black text-2xl transition-all duration-500 shadow-2xl ${
                  isFormValid 
                    ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/30' 
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed uppercase tracking-widest text-sm'
                }`}
              >
                {isFormValid ? 'Generate My Core Itinerary' : 'Complete Profile'}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* 4. Trending Spots Section */}
      <section className="bg-white py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-10">
            <div className="max-w-2xl">
              <span className="text-orange-500 font-black text-xs uppercase tracking-[0.3em] block mb-4">Market Intel</span>
              <h2 className="text-5xl md:text-7xl font-display font-black text-slate-900 mb-8 tracking-tighter">High-Interest <br />Locations.</h2>
              <p className="text-xl text-slate-500 font-medium">
                Analysis of real-time search volume and partner availability indicates these spots are currently trending at 98%+ satisfaction.
              </p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExplore}
              className="px-10 py-5 bg-white border-2 border-slate-900 rounded-2xl font-black text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 flex items-center gap-3"
            >
              View Global Grid <Globe className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 h-full">
            {POPULAR_DESTINATIONS.map((dest, i) => (
              <motion.div 
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onDestinationSelect(dest)}
                className="group relative h-[600px] rounded-[3.5rem] overflow-hidden cursor-pointer shadow-3xl shadow-slate-200/50"
              >
                <img 
                  src={dest.image} 
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                <div className="absolute top-8 left-8">
                   <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                     {dest.category}
                   </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                  <div className="flex items-center gap-2 text-orange-400 text-xs font-black uppercase tracking-widest mb-4">
                    <MapPin className="w-4 h-4" />
                    {dest.country}
                  </div>
                  <h3 className="text-4xl font-display font-black mb-6 tracking-tight">{dest.name}</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                      <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                      <span className="font-black text-sm">{dest.rating} Performance</span>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900"
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New: Community Trips Section */}
      <section className="bg-slate-50 py-24 md:py-40 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-10">
            <div className="max-w-2xl">
              <span className="text-orange-500 font-black text-xs uppercase tracking-[0.3em] block mb-4">Open Trip Marketplace</span>
              <h2 className="text-5xl md:text-7xl font-display font-black text-slate-900 mb-8 tracking-tighter">Community <br />Exploration.</h2>
              <p className="text-xl text-slate-500 font-medium">
                Join verified traveler cohorts or host your own journey. A transparent ecosystem for collaborative high-performance travel.
              </p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCommunityExplore}
              className="px-10 py-5 bg-orange-500 text-white rounded-2xl font-black shadow-2xl shadow-orange-500/20 hover:bg-orange-600 transition-all flex items-center gap-3"
            >
              Browse Public Trips <Users className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {MOCK_COMMUNITY_TRIPS.slice(0, 2).map((trip, i) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-[3.5rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col md:flex-row h-full min-h-[350px]"
              >
                <div className="relative w-full md:w-2/5 h-64 md:h-full overflow-hidden">
                  <img 
                    src={trip.coverImage} 
                    alt={trip.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute top-6 left-6 px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-slate-900 text-[10px] font-black uppercase tracking-widest">
                    {trip.type}
                  </div>
                </div>

                <div className="p-10 flex-grow flex flex-col">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    {trip.destination}
                  </div>
                  <h3 className="text-3xl font-display font-black text-slate-950 mb-6 tracking-tight leading-tight">{trip.name}</h3>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8 bg-slate-50 p-6 rounded-3xl">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Payload</span>
                      <span className="text-xl font-black text-slate-900">₹{trip.budget.toLocaleString()}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Cycle</span>
                      <span className="text-xl font-black text-slate-900">{trip.duration}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-orange-500/20">
                        <img src={trip.organizer.image} alt={trip.organizer.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block">Host</span>
                        <span className="text-sm font-black text-slate-700">{trip.organizer.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                       <div className="flex -space-x-3">
                         {trip.members.map((member, idx) => (
                           <div key={idx} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-100">
                             <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                           </div>
                         ))}
                       </div>
                       <span className="text-xs font-black text-slate-400">+{trip.maxMembers - trip.members.length} slots</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em] mb-10">High-Fidelity Interaction</p>
            <div className="flex flex-wrap items-center justify-center gap-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
               <div className="flex items-center gap-3">
                 <Shield className="w-6 h-6" />
                 <span className="text-sm font-black uppercase tracking-widest">Verified Identity</span>
               </div>
               <div className="flex items-center gap-3">
                 <Zap className="w-6 h-6" />
                 <span className="text-sm font-black uppercase tracking-widest">Shared Wallet</span>
               </div>
               <div className="flex items-center gap-3">
                 <Sparkles className="w-6 h-6" />
                 <span className="text-sm font-black uppercase tracking-widest">AI Matching</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Final CTA Section */}
      <section className="bg-slate-950 py-24 md:py-48 overflow-hidden relative">
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=2000" 
             alt="Crest" 
             className="w-full h-full object-cover opacity-20"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-slate-950"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center text-white relative z-10">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-8xl font-display font-black mb-8 tracking-tighter leading-tight">Ready for Your <br /><span className="text-orange-500">Next Peak?</span></h2>
            <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
              The world is vast, and the complexity is growing. Avyukt is your decisive edge in navigating the next era of global exploration.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToForm}
              className="px-12 py-6 bg-orange-500 text-white rounded-[2rem] font-black text-2xl hover:bg-orange-600 transition-all duration-300 shadow-[0_20px_50px_rgba(249,115,22,0.3)]"
            >
              Start Core Planning
            </motion.button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
