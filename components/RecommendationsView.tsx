
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { RecommendedDestination, UserSession } from '../types';
import { getRecommendations } from '../lib/ai';
import { Clock, MapPin, Sparkles, Loader2, ArrowRight } from 'lucide-react';

interface RecommendationsViewProps {
  session: UserSession;
  onSelect: (dest: RecommendedDestination) => void;
}

const RecommendationsView: React.FC<RecommendationsViewProps> = ({ session, onSelect }) => {
  const [recommendations, setRecommendations] = useState<RecommendedDestination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getRecommendations(session);
        setRecommendations(data);
      } catch (e) {
        console.error("Failed to fetch recommendations", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center">
        <Loader2 className="w-16 h-16 text-orange-500 animate-spin mb-8" />
        <h2 className="text-4xl font-display font-black mb-4 tracking-tight">Syncing with Intelligence...</h2>
        <p className="text-slate-500 font-medium max-w-md mx-auto italic">Our AI is analyzing thousands of data points to synthesize your perfect travel trajectory.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="px-4 py-1.5 bg-orange-500/10 rounded-full text-orange-500 font-black text-xs uppercase tracking-[0.3em] mb-6 inline-block">Synthesized Results</span>
          <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 mb-8 tracking-tighter">
            Recommended for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">{session.fullName}</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
            Based on your distinct preference for <span className="font-black text-slate-900 underline decoration-orange-500/30 decoration-4 underline-offset-4">{session.preferences.join(' & ')}</span> environments, 
            we've curated these high-performance destinations.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {recommendations.map((dest, idx) => (
          <motion.div 
            key={dest.id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`group bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-[0_40px_80px_-16px_rgba(0,0,0,0.12)] transition-all duration-700 cursor-pointer ${idx === 0 ? 'ring-2 ring-orange-500/20' : ''}`}
            onClick={() => onSelect(dest)}
          >
            <div className="relative h-72 overflow-hidden">
              <img 
                src={`https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80&sig=${idx}`} 
                alt={dest.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur rounded-full text-xs font-black uppercase tracking-widest text-indigo-600 shadow-sm">
                {dest.category}
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold mb-3">
                <MapPin className="w-4 h-4" />
                {dest.country}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{dest.name}</h3>
              <p className="text-slate-500 leading-relaxed mb-6 line-clamp-3">{dest.description}</p>
              
              <div className="flex items-center gap-6 mb-8 text-sm font-medium text-slate-600 bg-slate-50 p-4 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  {dest.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  {dest.bestTimeToVisit}
                </div>
              </div>

              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 group-hover:bg-indigo-600 transition-colors">
                View Itinerary
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsView;
