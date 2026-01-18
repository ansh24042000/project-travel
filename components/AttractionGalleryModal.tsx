
import React, { useState } from 'react';
import { X, MapPin, Clock, IndianRupee, Sparkles, ChevronLeft, ChevronRight, Maximize2, Info } from 'lucide-react';
import { Attraction } from '../types';

interface AttractionGalleryModalProps {
  attraction: Attraction | null;
  onClose: () => void;
}

const AttractionGalleryModal: React.FC<AttractionGalleryModalProps> = ({ attraction, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!attraction) return null;

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % attraction.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + attraction.images.length) % attraction.images.length);
  };

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 md:p-8">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-6xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col md:flex-row max-h-[90vh]">
        {/* Gallery Section */}
        <div className="w-full md:w-3/5 bg-slate-900 relative group overflow-hidden flex flex-col">
          <div className="flex-grow relative">
            <img 
              src={attraction.images[activeImageIndex]} 
              className="w-full h-full object-cover transition-all duration-700 ease-in-out" 
              alt={`${attraction.name} view ${activeImageIndex + 1}`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
            
            {/* Navigation Arrows */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white pointer-events-auto transition active:scale-90"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white pointer-events-auto transition active:scale-90"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            <div className="absolute top-8 left-8">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl">
                <Sparkles className="w-4 h-4 text-orange-400" />
                Featured Attraction
              </div>
            </div>
          </div>

          {/* Thumbnail Carousel */}
          <div className="p-6 bg-slate-900 border-t border-white/5 shrink-0">
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {attraction.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden shrink-0 transition-all duration-300 border-4 ${
                    activeImageIndex === idx ? 'border-orange-500 scale-105' : 'border-transparent opacity-40 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/5 flex flex-col overflow-y-auto custom-scrollbar bg-white">
          <div className="p-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-4xl font-black text-slate-900 mb-2 leading-tight">{attraction.name}</h3>
                <div className="flex items-center gap-2 text-indigo-600 font-bold">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{attraction.location}</span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl transition text-slate-500 active:scale-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                <Clock className="w-5 h-5 text-orange-500 mb-3" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time Required</p>
                <p className="text-sm font-bold text-slate-900">{attraction.timeRequired}</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                <IndianRupee className="w-5 h-5 text-indigo-500 mb-3" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Entry Fee</p>
                <p className="text-sm font-bold text-slate-900">{attraction.entryFee || 'Free Entry'}</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 col-span-2 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Best Time to Visit</p>
                  <p className="text-sm font-bold text-slate-900">{attraction.bestTime}</p>
                </div>
                <Info className="w-5 h-5 text-slate-300" />
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h4 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                  <Maximize2 className="w-5 h-5 text-orange-500" />
                  Experience Details
                </h4>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {attraction.description}
                </p>
              </section>

              <section className="p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100">
                <h4 className="text-indigo-900 font-black mb-4">Insider Tip</h4>
                <p className="text-indigo-700 text-sm leading-relaxed font-medium">
                  To avoid the massive crowds, try to visit during the early morning hours (before 9 AM). The light is also perfect for photography then!
                </p>
              </section>
            </div>
            
            <button 
              className="w-full mt-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95"
              onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(attraction.name + ' ' + attraction.location)}`, '_blank')}
            >
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionGalleryModal;
