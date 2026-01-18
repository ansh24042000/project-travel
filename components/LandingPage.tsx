
import React, { useState } from 'react';
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
  Mail
} from 'lucide-react';
import { TravelPreference, UserSession, RecommendedDestination } from '../types';

interface LandingPageProps {
  onStartPlanning: (data?: Partial<UserSession>) => void;
  onExplore: () => void;
  onPackagesClick: () => void;
  onDestinationSelect: (dest: RecommendedDestination) => void;
  onAboutClick: () => void;
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

const LandingPage: React.FC<LandingPageProps> = ({ onStartPlanning, onExplore, onPackagesClick, onDestinationSelect, onAboutClick }) => {
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
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" 
            alt="Mountain Sunset" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-4">
            Travel Planning <br />
            <span className="text-orange-500">Perfected.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed font-bold">
            Avyukt uses next-gen AI to curate personalized itineraries and seamless bookings for the modern explorer.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={scrollToForm}
              className="w-full sm:w-auto px-10 py-5 bg-orange-500 text-white rounded-2xl font-black text-xl shadow-2xl shadow-orange-500/20 hover:bg-orange-600 hover:scale-[1.05] active:scale-[0.98] transition-all duration-300"
            >
              Start Planning
            </button>
            
            <button 
              onClick={onExplore}
              className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-2xl font-black text-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              Explore
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer" onClick={scrollToForm}>
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* 2. Why Travel With Us Section */}
      <section className="bg-[#FFF4ED] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">The Avyukt Edge</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              Seamless planning powered by core AI technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                <Sparkles className="w-7 h-7 text-orange-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">Core Intelligence</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                Personalized suggestions that understand your travel DNA.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                <Calendar className="w-7 h-7 text-blue-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">Precision Planning</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                Optimized timelines that maximize every moment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors">
                <Shield className="w-7 h-7 text-green-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">Secure Network</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                Direct booking with verified platinum hotel & guide partners.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors">
                <Users className="w-7 h-7 text-purple-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">Expert Curation</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                Human-validated experiences backed by AI research.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Start Your Adventure Section - THE FORM */}
      <section id="adventure-form" className="bg-slate-50 py-24 md:py-32 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Build Your Journey</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              Initialize the Avyukt engine with your travel profile.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100">
            <div className="space-y-8">
              {/* Name Field */}
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block ml-1">Full Name</label>
                <input 
                  type="text"
                  placeholder="Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-800 font-bold placeholder:text-slate-300"
                />
              </div>

              {/* Travelers Field */}
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block ml-1">Travelers</label>
                <div className="relative">
                  <select 
                    value={formData.travelers}
                    onChange={(e) => setFormData(prev => ({ ...prev, travelers: e.target.value }))}
                    className="w-full appearance-none px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-800 font-bold cursor-pointer"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5+ People</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Preferences Field */}
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block ml-1">Select Vibe</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PREFERENCES.map(pref => {
                    const isActive = formData.selectedPrefs.includes(pref.id);
                    const Icon = pref.icon;
                    return (
                      <button
                        key={pref.id}
                        type="button"
                        onClick={() => togglePreference(pref.id)}
                        className={`flex flex-col items-center justify-center p-4 h-28 rounded-2xl border-2 transition-all gap-2 ${
                          isActive 
                            ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-100 scale-[1.05]' 
                            : 'bg-white border-slate-100 text-slate-600 hover:border-orange-200 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className={`w-8 h-8 ${isActive ? 'text-white' : 'text-slate-300'}`} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight">{pref.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-6 rounded-2xl font-black text-xl transition-all duration-300 shadow-xl ${
                  isFormValid 
                    ? 'bg-slate-900 text-white hover:bg-black shadow-slate-200 active:scale-[0.98]' 
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                }`}
              >
                Plan My Journey
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 4. Popular Destinations Section */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Trending Spots</h2>
              <p className="text-lg text-slate-500 max-w-xl font-medium">
                High-interest locations currently trending in the Avyukt network.
              </p>
            </div>
            <button 
              onClick={onExplore}
              className="px-8 py-4 bg-white border-2 border-slate-200 rounded-2xl font-black text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {POPULAR_DESTINATIONS.map((dest) => (
              <div 
                key={dest.id}
                onClick={() => onDestinationSelect(dest)}
                className="group relative h-[450px] rounded-[3rem] overflow-hidden cursor-pointer shadow-lg shadow-slate-100 border border-slate-50"
              >
                <img 
                  src={dest.image} 
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                  <div className="flex items-center gap-2 text-white/80 text-xs font-black uppercase tracking-widest mb-2">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    {dest.country}
                  </div>
                  <h3 className="text-3xl font-black mb-4">{dest.name}</h3>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md w-fit px-3 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                    <span className="font-black text-sm">{dest.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Final CTA Section */}
      <section className="bg-slate-950 py-24 md:py-32 overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-6 text-center text-white relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">Ready for Your <br /><span className="text-orange-500">Next Peak?</span></h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            The world is vast, but with Avyukt, the perfect plan is just minutes away.
          </p>
          <button 
            onClick={scrollToForm}
            className="px-12 py-6 bg-orange-500 text-white rounded-2xl font-black text-xl hover:bg-orange-600 hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 shadow-2xl shadow-orange-500/20"
          >
            Start Core Planning
          </button>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] scale-150 pointer-events-none">
           <img src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/avyukt-logo.png" className="w-[500px]" alt="" />
        </div>
      </section>

      {/* 6. Main Footer Section */}
      <footer id="footer" className="bg-slate-950 text-slate-300 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            {/* Column 1: Brand */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 p-1.5 rounded-2xl w-14 h-14 overflow-hidden">
                  <img src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/avyukt-logo.png" className="w-full h-full object-cover" alt="Avyukt" />
                </div>
                <span className="text-3xl font-black text-white tracking-tighter">Avyukt</span>
              </div>
              <p className="text-slate-500 leading-relaxed mb-8 font-medium italic">
                Defining the future of travel tech through core intelligence and partner ecosystem synergy.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-white font-black text-xs mb-8 uppercase tracking-[0.2em]">Quick Links</h4>
              <ul className="space-y-4">
                {['Destinations', 'Packages', 'Partner Hub', 'Itineraries', 'Core Blog'].map(link => (
                  <li key={link}>
                    <button 
                      onClick={() => link === 'Destinations' ? onExplore() : link === 'Packages' ? onPackagesClick() : {}} 
                      className="hover:text-orange-500 transition-colors font-bold text-left text-sm"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Popular */}
            <div>
              <h4 className="text-white font-black text-xs mb-8 uppercase tracking-[0.2em]">Partner Portals</h4>
              <ul className="space-y-4">
                {['Guide Dashboard', 'Hotel Admin', 'Distro Control', 'System Ops'].map(dest => (
                  <li key={dest}>
                    <button 
                      className="hover:text-orange-500 transition-colors font-bold text-left text-sm"
                    >
                      {dest}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="text-white font-black text-xs mb-8 uppercase tracking-[0.2em]">Connect</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
                  <span className="text-sm font-medium">Avyukt Core Technologies HQ, Mumbai, India</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="text-sm font-medium">+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="text-sm font-medium">hello@avyukt.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
              © 2024 AVYUKT CORE TECHNOLOGIES PVT LTD.
            </p>
            <div className="flex gap-8">
              <button className="text-slate-600 hover:text-orange-500 transition text-[10px] font-black uppercase tracking-widest">Privacy Port</button>
              <button className="text-slate-600 hover:text-orange-500 transition text-[10px] font-black uppercase tracking-widest">Governance Policy</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
