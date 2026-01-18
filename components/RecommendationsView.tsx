
import React, { useEffect, useState } from 'react';
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
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-6" />
        <h2 className="text-3xl font-bold mb-2">Crafting your perfect journey...</h2>
        <p className="text-slate-500">Our AI is analyzing thousands of destinations to find your best match.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
          Recommended for you, <span className="gradient-text">{session.fullName}</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          {/* Fix: changed session.preference to session.preferences.join(', ') to correctly access UserSession property */}
          Based on your preference for <span className="font-bold text-indigo-600">{session.preferences.join(', ')}</span> trips, 
          here are the top places to explore next.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {recommendations.map((dest, idx) => (
          <div 
            key={dest.id} 
            className={`group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer ${idx === 0 ? 'ring-2 ring-indigo-500 ring-offset-4' : ''}`}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsView;
