
import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Star, MapPin, Clock, Check, ArrowRight } from 'lucide-react';

interface PackageCardProps {
  type: 'Budget' | 'Standard' | 'Premium';
  title: string;
  location: string;
  image: string;
  duration: string;
  rating: number;
  highlights: string[];
  includes: string[];
  price: string;
  onBook: () => void;
  index: number;
}

const PackageCard: React.FC<PackageCardProps> = ({ 
  type, title, location, image, duration, rating, highlights, includes, price, onBook, index 
}) => {
  const typeStyles = {
    Budget: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    Standard: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    Premium: 'bg-orange-500/10 text-orange-500 border-orange-500/20'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-[3.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-slate-100 group flex flex-col transition-all duration-700 hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.12)]"
    >
      <div className="relative h-72 overflow-hidden shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
        <div className={`absolute top-6 left-6 px-4 py-2 rounded-xl border backdrop-blur-md text-[10px] font-black uppercase tracking-widest ${typeStyles[type]}`}>
          {type} Module
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] mb-2 text-orange-400">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
          <h3 className="text-3xl font-display font-black tracking-tight">{title}</h3>
        </div>
      </div>
      
      <div className="p-10 flex-grow flex flex-col">
        <div className="flex items-center gap-6 mb-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" />
            {duration}
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
            {rating} Rating
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {highlights.map((h, i) => (
            <span key={i} className="px-3 py-1.5 bg-slate-50 text-slate-500 border border-slate-100 rounded-lg text-[9px] font-black uppercase tracking-widest group-hover:bg-orange-50 transition-colors">
              {h}
            </span>
          ))}
        </div>

        <div className="space-y-5 pt-8 border-t border-slate-50 mb-10">
          <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Module Inclusions:</h4>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            {includes.map((inc, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs font-bold text-slate-500 leading-tight">
                <Check className="w-4 h-4 text-orange-500 shrink-0" />
                {inc}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Payload</span>
            <span className="text-3xl font-display font-black text-slate-950 tracking-tight">{price}</span>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBook}
            className="px-8 py-4 bg-slate-950 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-slate-200"
          >
            Initiate
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

interface PackagesViewProps {
  onBack: () => void;
  onRequestCustom: () => void;
}

const PackagesView: React.FC<PackagesViewProps> = ({ onBack, onRequestCustom }) => {
  const packages = [
    {
      type: 'Budget' as const,
      title: 'Goa Explorer Core',
      location: 'Goa',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800',
      duration: '3 Days / 2 Nights',
      rating: 4.5,
      price: '$299',
      highlights: ['Baga Beach', 'Old Goa', 'Spice Farm'],
      includes: ['3-Star Entry', 'Full Breakfast', 'Arrival Link', 'Day Grid']
    },
    {
      type: 'Standard' as const,
      title: 'Manali Peak Module',
      location: 'Manali',
      image: 'https://images.unsplash.com/photo-1596701062351-df5f8a42f431?auto=format&fit=crop&q=80&w=800',
      duration: '5 Days / 4 Nights',
      rating: 4.7,
      price: '$549',
      highlights: ['Rohtang Link', 'Solang Orbit', 'Hadimba Site'],
      includes: ['4-Star Mid', 'Complete Deck', 'Secure Transit', 'Action Tier']
    },
    {
      type: 'Premium' as const,
      title: 'Andaman Zenith Retreat',
      location: 'Andaman Islands',
      image: 'https://images.unsplash.com/photo-1589136777351-fdc9c9c05c15?auto=format&fit=crop&q=80&w=800',
      duration: '6 Days / 5 Nights',
      rating: 4.9,
      price: '$1,299',
      highlights: ['Havelock Island', 'Radhanagar', 'Deep Dive'],
      includes: ['5-Star Elite', 'Gourmet Deck', 'Deep Scuba', 'Island Vector']
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.05),transparent)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack} 
            className="flex items-center gap-3 text-slate-400 hover:text-orange-500 font-black text-xs uppercase tracking-[0.3em] mb-12 transition group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Home Sequence
          </motion.button>
          
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-4 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 inline-block"
            >
              Unified Full-Stack Packages
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-display font-black text-slate-900 mb-10 leading-[0.9] tracking-tighter"
            >
              Curated <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Travel Modules.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-500 leading-relaxed font-medium max-w-2xl"
            >
              End-to-end travel integration. Our handpicked modules cover full logistics, verified hospitality, and high-engagement activities with zero technical friction.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {packages.map((pkg, i) => (
            <PackageCard key={i} {...pkg} onBook={onRequestCustom} index={i} />
          ))}
        </div>
      </section>

      {/* Custom Request CTA */}
      <section className="py-40">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-900 p-12 md:p-24 rounded-[4rem] shadow-3xl shadow-slate-200 border border-slate-800 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.15),transparent)] pointer-events-none"></div>
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 tracking-tight">Need Custom <span className="text-orange-500">Architecture?</span></h2>
            <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
              Define your unique travel requirements and our AI will synthesize a custom-built package aligned with your specific profile.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRequestCustom}
              className="px-12 py-6 bg-orange-500 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-orange-500/30 hover:bg-orange-600 transition-all"
            >
              Request Custom Synthesis
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PackagesView;
