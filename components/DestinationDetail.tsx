
import React, { useState } from 'react';
import { RecommendedDestination, UserSession, DetailedItinerary, GuideBooking, Attraction, Activity, ActivityBooking } from '../types';
import { getItinerary } from '../lib/ai';
import { ArrowLeft, Star, Clock, Calendar, MapPin, Thermometer, IndianRupee, ChevronRight, Check, Sparkles, Loader2, Wallet, Users, Compass, Eye, Map as MapIcon, ArrowUpRight } from 'lucide-react';
import TravelAssistant from './TravelAssistant';
import GroupWallet from './GroupWallet';
import GuideBookingFlow from './GuideBookingFlow';
import AttractionGalleryModal from './AttractionGalleryModal';
import ActivityDetailModal from './ActivityDetailModal';

interface DestinationDetailProps {
  destination: RecommendedDestination;
  session: UserSession;
  onBack: () => void;
}

const DestinationDetail: React.FC<DestinationDetailProps> = ({ destination, session, onBack }) => {
  const [itinerary, setItinerary] = useState<DetailedItinerary | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isGuideFlowOpen, setIsGuideFlowOpen] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Mock members for the wallet
  const members = [session.fullName || 'You', 'Rohan S.', 'Sneha P.', 'Amit K.'];

  // Mock guides for the preview section
  const guidesPreview = [
    { name: 'Arjun Das', rating: 4.9, img: 'https://i.pravatar.cc/150?u=arjun' },
    { name: 'Sarah Khan', rating: 4.8, img: 'https://i.pravatar.cc/150?u=sarah' },
  ];

  const attractions: Attraction[] = [
    { 
      id: '1', 
      name: 'Baga Beach', 
      shortDescription: 'Famous for its water sports and vibrant shacks.',
      description: 'Baga Beach is a world-famous shoreline in North Goa, known for its electrifying nightlife, thrilling water sports, and beach shacks that serve incredible seafood. It is part of a contiguous beach stretch that includes Calangute and Candolim.',
      images: [
        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1596701062351-df5f8a42f431?auto=format&fit=crop&q=80&w=800'
      ],
      bestTime: 'October to March',
      entryFee: 'No Charge',
      timeRequired: '2-4 Hours',
      location: 'North Goa, Goa'
    },
    { 
      id: '2', 
      name: 'Dudhsagar Falls', 
      shortDescription: 'A four-tiered waterfall on the Mandovi River.',
      description: 'Dudhsagar Falls is one of the tallest waterfalls in India with a height of 310 m (1017 feet) and an average width of 30 meters (100 feet). The name "Dudhsagar" literally translates to "Sea of Milk", referring to the white spray created as water crashes into the pool below.',
      images: [
        'https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1596701062351-df5f8a42f431?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800'
      ],
      bestTime: 'Monsoon (July to September)',
      entryFee: '₹400 (inc. Jeep Safari)',
      timeRequired: '5-6 Hours',
      location: 'Sanguem Taluka, Goa'
    }
  ];

  const thingsToDo: Activity[] = [
    {
      id: 'act-1',
      name: 'Scuba Diving at Grande Island',
      shortDescription: 'Explore the vibrant coral reefs and marine life of the Arabian Sea.',
      description: 'A thrilling underwater experience for both beginners and certified divers. Grande Island offers crystal clear waters, colorful reef fish, and the chance to spot shipwrecks. Guided by PADI professionals.',
      category: 'Adventure',
      images: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=800'
      ],
      duration: '6 Hours',
      bestSeason: 'October to May',
      suitableFor: ['Solo', 'Group'],
      priceIndicator: '₹3,500',
      address: 'Sinquerim Jetty, Candolim, Goa',
      coordinates: { lat: 15.4749, lng: 73.7667 }
    },
    {
      id: 'act-2',
      name: 'Hot Air Balloon Safari',
      shortDescription: 'Float over the lush green landscapes of Goa at sunrise.',
      description: 'Experience the magic of Goa from the skies. This early morning balloon ride offers a panoramic view of the coastline, rivers, and the Sahyadri mountains. Perfect for romantic getaways.',
      category: 'Relaxation',
      images: [
        'https://images.unsplash.com/photo-1507508452641-f197d6d4704e?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1520113289666-2499d88977c6?auto=format&fit=crop&q=80&w=800'
      ],
      duration: '1 Hour (Flight)',
      bestSeason: 'December to March',
      suitableFor: ['Family', 'Solo'],
      priceIndicator: '₹8,000',
      address: 'Chandor, South Goa',
      coordinates: { lat: 15.2641, lng: 74.0416 }
    },
    {
      id: 'act-3',
      name: 'Spice Plantation Tour',
      shortDescription: 'A sensory journey through the heart of Goan agriculture.',
      description: 'Learn about local spices like black pepper, cardamom, and cinnamon. Enjoy a traditional Goan lunch served on banana leaves and participate in elephant bathing (optional).',
      category: 'Nature',
      images: [
        'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1596701062351-df5f8a42f431?auto=format&fit=crop&q=80&w=800'
      ],
      duration: '4 Hours',
      bestSeason: 'Year Round',
      suitableFor: ['Family', 'Group'],
      priceIndicator: '₹1,200',
      address: 'Ponda, Goa',
      coordinates: { lat: 15.3991, lng: 73.9987 }
    }
  ];

  const handleCreateItinerary = async () => {
    setLoading(true);
    setHasStarted(true);
    try {
      const data = await getItinerary(destination.name, session);
      setItinerary(data);
    } catch (e) {
      console.error("Error loading itinerary:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSuccess = (booking: GuideBooking) => {
    console.log('New Guide Booking:', booking);
  };

  const handleActivityBooking = (booking: ActivityBooking) => {
    console.log('New Activity Booking:', booking);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="relative h-[60vh] md:h-[550px] w-full overflow-hidden">
        <img 
          src={destination.imageSearchQuery.includes('Goa') ? 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1600' : 'https://images.unsplash.com/photo-1596701062351-df5f8a42f431?auto=format&fit=crop&q=80&w=1600'} 
          className="w-full h-full object-cover"
          alt={destination.name}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
        
        <div className="absolute top-8 left-4 md:left-12">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition font-bold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>

        <div className="absolute bottom-12 left-4 md:left-12 text-white">
          <span className="px-3 py-1 bg-orange-500 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
            {destination.category === 'Best Match' ? 'Beach' : destination.category}
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-6">{destination.name}</h1>
          <div className="flex flex-wrap items-center gap-6 text-sm font-bold">
            <div className="flex items-center gap-1.5">
              <Star className="w-5 h-5 text-orange-400 fill-orange-400" />
              4.7
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-5 h-5 opacity-80" />
              {destination.duration}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-5 h-5 opacity-80" />
              Best: {destination.bestTimeToVisit}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-20">
          {/* About Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-slate-900">About {destination.name}</h2>
            <p className="text-lg text-slate-500 leading-relaxed max-w-4xl font-medium">
              {destination.description} Experience the perfect blend of natural beauty, adventure, and cultural richness that makes this destination truly special. Whether you're seeking thrilling activities or peaceful retreats, {destination.name} offers something for every traveler.
            </p>
          </section>

          {/* Local Guides Available */}
          <section className="bg-orange-50/50 p-10 rounded-[3rem] border border-orange-100/50">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-black text-slate-900">Meet Local Experts</h2>
                <p className="text-slate-500 font-medium">Professional guides to elevate your journey.</p>
              </div>
              <button 
                onClick={() => setIsGuideFlowOpen(true)}
                className="px-6 py-3 bg-white text-orange-600 border-2 border-orange-100 rounded-2xl font-black text-sm hover:bg-orange-50 transition shadow-sm"
              >
                Browse All Guides
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guidesPreview.map((guide, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm flex items-center gap-5 border border-slate-50 group hover:shadow-xl transition-all duration-500 cursor-pointer" onClick={() => setIsGuideFlowOpen(true)}>
                  <img src={guide.img} className="w-16 h-16 rounded-2xl border-2 border-slate-50" />
                  <div className="flex-grow">
                    <h4 className="font-black text-slate-900">{guide.name}</h4>
                    <div className="flex items-center gap-1 text-orange-400">
                      <Star className="w-3 h-3 fill-orange-400" />
                      <span className="text-xs font-black text-slate-900">{guide.rating}</span>
                      <span className="text-[10px] text-slate-400 font-bold ml-1 uppercase tracking-tighter">Verified Guide</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Top Attractions Grid */}
          <section>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-slate-900">Top Attractions</h2>
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Click to Explore Details</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {attractions.map((attr) => (
                <div 
                  key={attr.id} 
                  onClick={() => setSelectedAttraction(attr)}
                  className="group relative h-80 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100"
                >
                  <img src={attr.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={attr.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/70 transition-colors" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{attr.location}</span>
                    </div>
                    <h4 className="text-2xl font-black mb-2 leading-tight">{attr.name}</h4>
                    <p className="text-sm text-white/60 line-clamp-2 font-medium group-hover:text-white/90 transition-colors mb-4">{attr.shortDescription}</p>
                    
                    <div className="flex items-center gap-2 text-orange-400 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <Eye className="w-4 h-4" />
                      View Full Gallery
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Things to Do Section - UPDATED TO INTERACTIVE RICH CARDS */}
          <section>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Things to Do</h2>
                <p className="text-slate-500 font-medium text-sm mt-1">Activities curated for your travel style.</p>
              </div>
              <Compass className="w-8 h-8 text-orange-500/20" />
            </div>
            
            <div className="space-y-6">
              {thingsToDo.map((item) => (
                <div 
                  key={item.id} 
                  className="group bg-slate-50 rounded-[2.5rem] p-6 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500 cursor-pointer"
                  onClick={() => setSelectedActivity(item)}
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-56 h-40 rounded-[2rem] overflow-hidden relative shrink-0 shadow-lg shadow-slate-200">
                      <img src={item.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-black text-slate-900 uppercase tracking-widest">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-between py-2">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-2xl font-black text-slate-900 group-hover:text-orange-600 transition-colors">{item.name}</h4>
                          <span className="text-xl font-black text-indigo-600">{item.priceIndicator}</span>
                        </div>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2 mb-4">
                          {item.shortDescription}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <Clock className="w-4 h-4 text-orange-500" />
                            {item.duration}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <MapIcon className="w-4 h-4 text-indigo-500" />
                            Live Map Available
                          </div>
                        </div>
                        <button className="flex items-center gap-2 text-xs font-black text-orange-600 uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">
                          Book Now <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Suggested Itinerary */}
          <section>
            <h2 className="text-3xl font-bold mb-10 text-slate-900">Suggested Itinerary</h2>
            
            {!hasStarted ? (
              <div className="p-16 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center">
                <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center mb-6 text-orange-500">
                  <Calendar className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Ready to plan your days?</h3>
                <p className="text-slate-500 mb-10 max-w-md mx-auto">
                  Let our AI curate a perfect day-by-day plan for your trip to {destination.name} based on your unique preferences.
                </p>
                <button 
                  onClick={handleCreateItinerary}
                  className="px-10 py-5 bg-orange-500 text-white rounded-[2rem] font-black text-xl hover:bg-orange-600 transition shadow-2xl shadow-orange-500/20 active:scale-95 flex items-center gap-3 group"
                >
                  <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Create Itinerary
                </button>
              </div>
            ) : loading ? (
              <div className="p-20 text-center bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col items-center">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-6" />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">AI is crafting your perfect journey...</p>
              </div>
            ) : (
              <div className="space-y-8 relative animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-orange-100 hidden md:block" />
                {itinerary?.days?.map((dayPlan, i) => (
                  <div key={i} className="relative pl-0 md:pl-10">
                    <div className="absolute left-[-5px] top-6 w-3 h-3 bg-orange-500 rounded-full hidden md:block" />
                    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-50 hover:border-orange-100 transition-colors">
                      <h3 className="text-2xl font-black text-slate-800 mb-6">
                        Day {dayPlan.day}: {i === 0 ? 'Arrival & Exploration' : i === 1 ? 'Local Culture' : 'Adventure & Departure'}
                      </h3>
                      <ul className="space-y-4">
                        {dayPlan.activities?.map((act, j) => (
                          <li key={j} className="flex items-start gap-4 text-slate-500 text-lg leading-relaxed">
                            <Check className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
                            {act}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="sticky top-24">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-50">
              <div className="flex justify-between items-baseline mb-10">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Starting from</span>
                <span className="text-4xl font-black text-slate-900">₹12,000</span>
              </div>

              <div className="space-y-8 mb-12">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                    <Thermometer className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-0.5">Weather</h4>
                    <p className="text-sm text-slate-500">Tropical (25-35°C year-round)</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                    <IndianRupee className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-0.5">Daily Budget</h4>
                    <p className="text-sm text-slate-500">₹2,500 - ₹6,000</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full py-5 bg-orange-500 text-white rounded-2xl font-black text-lg hover:bg-orange-600 transition shadow-xl shadow-orange-100 flex items-center justify-center gap-2 group">
                  Book This Trip
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => setIsGuideFlowOpen(true)} className="w-full py-5 bg-white border-2 border-slate-100 text-slate-800 rounded-2xl font-black text-lg hover:bg-slate-50 transition flex items-center justify-center gap-2">
                  <Users className="w-5 h-5 text-orange-500" />
                  Hire a Guide
                </button>
              </div>
            </div>

            {/* Group Wallet Card */}
            <div className="mt-8 p-10 bg-[#E0F2F1] rounded-[2.5rem] border border-[#B2DFDB] overflow-hidden relative">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#2A848D] rounded-xl flex items-center justify-center text-white">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-black text-[#2A848D]">Group Wallet</h4>
                </div>
                <p className="text-[#2A848D]/70 text-sm mb-8 font-medium leading-relaxed">Track contributions and split costs with your fellow travelers seamlessly.</p>
                <button 
                  onClick={() => setIsWalletOpen(true)}
                  className="w-full py-4 bg-white text-[#2A848D] rounded-2xl font-black text-sm hover:bg-[#2A848D] hover:text-white transition shadow-sm flex items-center justify-center gap-2 group"
                >
                  Manage Wallet
                  <ChevronRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Wallet className="w-24 h-24 text-[#2A848D]" />
              </div>
            </div>
          </div>
        </aside>
      </div>

      <TravelAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} destination={destination} itinerary={itinerary} session={session} />
      <GroupWallet isOpen={isWalletOpen} onClose={() => setIsWalletOpen(false)} totalCost={12000 * members.length} initialMembers={members} />
      
      <GuideBookingFlow 
        isOpen={isGuideFlowOpen} 
        onClose={() => setIsGuideFlowOpen(false)} 
        destination={destination} 
        session={session}
        onBookingSuccess={handleBookingSuccess}
      />

      <AttractionGalleryModal 
        attraction={selectedAttraction}
        onClose={() => setSelectedAttraction(null)}
      />

      <ActivityDetailModal 
        activity={selectedActivity}
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        session={session}
        destinationName={destination.name}
        onBookingSubmit={handleActivityBooking}
      />
    </div>
  );
};

export default DestinationDetail;
