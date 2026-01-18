
import React from 'react';
import { ArrowLeft, Star, MapPin, Clock, Check, Instagram, Facebook, Twitter, Phone, Mail, Compass } from 'lucide-react';

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
}

const PackageCard: React.FC<PackageCardProps> = ({ 
  type, title, location, image, duration, rating, highlights, includes, price, onBook 
}) => {
  const typeColors = {
    Budget: 'bg-indigo-500',
    Standard: 'bg-teal-500',
    Premium: 'bg-amber-500'
  };

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg shadow-slate-100 border border-slate-100 group flex flex-col">
      <div className="relative h-64 overflow-hidden shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-white text-xs font-bold ${typeColors[type]}`}>
          {type}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <div className="flex items-center gap-1.5 text-xs font-semibold mb-1 opacity-90">
            <MapPin className="w-3 h-3" />
            {location}
          </div>
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
      </div>
      
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex items-center gap-4 mb-6 text-sm font-bold text-slate-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-orange-500" />
            {duration}
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
            {rating}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {highlights.map((h, i) => (
            <span key={i} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {h}
            </span>
          ))}
        </div>

        <div className="space-y-4 pt-6 border-t border-slate-50 mb-8">
          <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">Package Includes:</h4>
          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
            {includes.map((inc, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <Check className="w-4 h-4 text-orange-500" />
                {inc}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6 border-t-2 border-slate-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Starts from</span>
            <span className="text-3xl font-black text-slate-900">{price}</span>
          </div>
          <button 
            onClick={onBook}
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 active:scale-95"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
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
      title: 'Budget Goa Explorer',
      location: 'Goa',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800',
      duration: '3 Days / 2 Nights',
      rating: 4.5,
      price: '$299',
      highlights: ['Baga Beach', 'Old Goa Churches', 'Spice Plantation'],
      includes: ['3-Star Hotel', 'Breakfast', 'Airport Transfer', 'City Tour']
    },
    {
      type: 'Standard' as const,
      title: 'Manali Mountain Escape',
      location: 'Manali',
      image: 'https://images.unsplash.com/photo-1596701062351-df5f8a42f431?auto=format&fit=crop&q=80&w=800',
      duration: '5 Days / 4 Nights',
      rating: 4.7,
      price: '$549',
      highlights: ['Rohtang Pass', 'Solang Valley', 'Hadimba Temple'],
      includes: ['4-Star Hotel', 'All Meals', 'Sightseeing', 'Adventure Activity']
    },
    {
      type: 'Premium' as const,
      title: 'Andaman Luxury Retreat',
      location: 'Andaman Islands',
      image: 'https://images.unsplash.com/photo-1589136777351-fdc9c9c05c15?auto=format&fit=crop&q=80&w=800',
      duration: '6 Days / 5 Nights',
      rating: 4.9,
      price: '$1,299',
      highlights: ['Havelock Island', 'Radhanagar Beach', 'Scuba Diving'],
      includes: ['5-Star Resort', 'All Meals', 'Scuba Diving', 'Island Hopping']
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-[#FFF4ED] pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold mb-12 transition">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          
          <div className="max-w-3xl">
            <span className="px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">
              All-Inclusive Packages
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight">
              Curated Travel Packages
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Choose from our handpicked packages that include everything from accommodation to activities. No hidden costs, just memorable experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <PackageCard key={i} {...pkg} onBook={onRequestCustom} />
          ))}
        </div>
      </section>

      {/* Custom Request CTA */}
      <section className="bg-slate-50 py-24 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-xl shadow-slate-200 border border-slate-100 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Want a Customized Package?</h2>
            <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto">
              Tell us your preferences and we'll create a personalized travel package just for you.
            </p>
            <button 
              onClick={onRequestCustom}
              className="px-10 py-5 bg-[#2A848D] text-white rounded-2xl font-bold text-xl hover:bg-[#226a71] transition-all shadow-xl shadow-[#2A848D]/20 active:scale-95"
            >
              Request Custom Package
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer id="footer" className="bg-slate-950 text-slate-300 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-500 p-2 rounded-xl">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Avyukt</span>
              </div>
              <p className="text-slate-500 leading-relaxed mb-8">
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

            <div>
              <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest">Quick Links</h4>
              <ul className="space-y-4">
                {['Destinations', 'Packages', 'Hotels', 'Itineraries', 'Blog'].map(link => (
                  <li key={link}>
                    <button className="hover:text-orange-500 transition-colors font-medium text-left">{link}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest">Popular Destinations</h4>
              <ul className="space-y-4">
                {['Manali', 'Goa', 'Jaipur', 'Kerala', 'Ladakh', 'Andaman'].map(dest => (
                  <li key={dest}>
                    <button className="hover:text-orange-500 transition-colors font-medium text-left">{dest}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest">Contact Us</h4>
              <ul className="space-y-6">
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

export default PackagesView;