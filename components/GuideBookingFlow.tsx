
import React, { useState } from 'react';
import { X, Star, Languages, MapPin, Calendar, Users, Clock, ArrowRight, CheckCircle2, ShieldCheck, ChevronRight, Filter } from 'lucide-react';
import { Guide, RecommendedDestination, UserSession, GuideBooking } from '../types';

interface GuideBookingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  destination: RecommendedDestination;
  session: UserSession;
  onBookingSuccess: (booking: GuideBooking) => void;
}

const MOCK_GUIDES: Guide[] = [
  {
    id: 'G-001',
    name: 'Arjun Das',
    experience: 8,
    languages: ['English', 'Hindi', 'Bengali'],
    specialization: 'Adventure',
    rating: 4.9,
    pricePerDay: 2500,
    location: 'Manali',
    image: 'https://i.pravatar.cc/150?u=arjun',
    bio: 'Specialist in high-altitude treks and local Himalayan folklore. I have led over 200 successful expeditions.'
  },
  {
    id: 'G-002',
    name: 'Sarah Khan',
    experience: 5,
    languages: ['English', 'Hindi', 'Urdu'],
    specialization: 'Religious',
    rating: 4.8,
    pricePerDay: 1800,
    location: 'Manali',
    image: 'https://i.pravatar.cc/150?u=sarah',
    bio: 'Deep knowledge of ancient temples and spiritual practices. I focus on providing a peaceful, insightful cultural experience.'
  },
  {
    id: 'G-003',
    name: 'Vikram Singh',
    experience: 12,
    languages: ['English', 'Hindi', 'Punjabi'],
    specialization: 'Wildlife',
    rating: 5.0,
    pricePerDay: 3200,
    location: 'Manali',
    image: 'https://i.pravatar.cc/150?u=vikram',
    bio: 'Ex-forest ranger with a passion for wildlife photography and tracking. Let me show you the hidden side of the valley.'
  }
];

const GuideBookingFlow: React.FC<GuideBookingFlowProps> = ({ isOpen, onClose, destination, session, onBookingSuccess }) => {
  const [view, setView] = useState<'list' | 'profile' | 'form' | 'success'>('list');
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [formData, setFormData] = useState({
    date: session.startDate || '',
    travelers: session.travelers.adults + session.travelers.children,
    serviceType: 'Full-day' as 'Half-day' | 'Full-day' | 'Multi-day',
    notes: ''
  });

  if (!isOpen) return null;

  const handleBook = () => {
    if (!selectedGuide) return;
    
    const newBooking: GuideBooking = {
      id: `GBK-${Math.floor(Math.random() * 10000)}`,
      customerId: 'CUST-001',
      customerName: session.fullName,
      guideId: selectedGuide.id,
      guideName: selectedGuide.name,
      destination: destination.name,
      date: formData.date,
      travelers: formData.travelers,
      serviceType: formData.serviceType,
      status: 'Pending',
      amount: selectedGuide.pricePerDay * (formData.serviceType === 'Half-day' ? 0.6 : 1),
      notes: formData.notes
    };

    onBookingSuccess(newBooking);
    setView('success');
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div>
            <h3 className="text-2xl font-black text-slate-900">
              {view === 'list' && `Local Guides in ${destination.name}`}
              {view === 'profile' && 'Guide Profile'}
              {view === 'form' && 'Booking Details'}
              {view === 'success' && 'Booking Sent!'}
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Verified Experts Only</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar bg-slate-50/30">
          {view === 'list' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-2">
                    <Filter className="w-3 h-3" /> Filter
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400">{MOCK_GUIDES.length} guides found</span>
              </div>
              
              {MOCK_GUIDES.map(guide => (
                <div key={guide.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex gap-6">
                    <img src={guide.image} className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-50" />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-xl font-black text-slate-900">{guide.name}</h4>
                          <div className="flex items-center gap-1 text-orange-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < Math.floor(guide.rating) ? 'fill-orange-500' : 'text-slate-200'}`} />
                            ))}
                            <span className="text-xs font-black ml-1 text-slate-900">{guide.rating}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black text-indigo-600">₹{guide.pricePerDay}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">per day</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          {guide.experience}y Experience
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                          <Languages className="w-4 h-4 text-blue-500" />
                          {guide.languages.slice(0, 2).join(', ')}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-50 flex gap-3">
                    <button 
                      onClick={() => { setSelectedGuide(guide); setView('profile'); }}
                      className="flex-1 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100 transition"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={() => { setSelectedGuide(guide); setView('form'); }}
                      className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-black text-sm hover:bg-orange-600 transition shadow-lg shadow-orange-100"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {view === 'profile' && selectedGuide && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <button onClick={() => setView('list')} className="text-xs font-bold text-indigo-600 mb-6 flex items-center gap-1 hover:underline">
                <ChevronRight className="w-4 h-4 rotate-180" /> Back to List
              </button>
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex items-center gap-6 mb-8">
                  <img src={selectedGuide.image} className="w-24 h-24 rounded-[2rem] border-4 border-slate-50" />
                  <div>
                    <h4 className="text-2xl font-black text-slate-900">{selectedGuide.name}</h4>
                    <p className="text-indigo-600 font-bold text-sm tracking-tight">{selectedGuide.specialization} Expert</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">About the Guide</h5>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{selectedGuide.bio}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Languages</p>
                      <p className="text-sm font-bold text-slate-900">{selectedGuide.languages.join(', ')}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Base Price</p>
                      <p className="text-sm font-bold text-slate-900">₹{selectedGuide.pricePerDay}/day</p>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setView('form')}
                className="w-full mt-8 py-5 bg-orange-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-100 hover:bg-orange-600 transition"
              >
                Continue to Booking
              </button>
            </div>
          )}

          {view === 'form' && selectedGuide && (
            <div className="animate-in fade-in slide-in-from-right-4 space-y-8">
              <div className="bg-indigo-600 p-6 rounded-[2rem] text-white flex items-center gap-4">
                <img src={selectedGuide.image} className="w-12 h-12 rounded-xl border-2 border-white/20" />
                <div>
                  <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Booking for</p>
                  <p className="text-lg font-black">{selectedGuide.name}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Travel Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full pl-10 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none font-bold focus:border-indigo-500" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">No. of Travelers</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="number" 
                      value={formData.travelers}
                      onChange={e => setFormData(prev => ({ ...prev, travelers: parseInt(e.target.value) }))}
                      className="w-full pl-10 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none font-bold focus:border-indigo-500" 
                    />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Service Level</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Half-day', 'Full-day', 'Multi-day'].map(type => (
                      <button 
                        key={type}
                        onClick={() => setFormData(prev => ({ ...prev, serviceType: type as any }))}
                        className={`py-3 rounded-xl text-xs font-bold border-2 transition ${formData.serviceType === type ? 'bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-100' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Special Notes</label>
                  <textarea 
                    value={formData.notes}
                    onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none font-bold focus:border-indigo-500 h-24" 
                    placeholder="e.g. Meeting at the mall, food allergies, etc."
                  />
                </div>
              </div>

              <div className="p-6 bg-slate-900 rounded-[2rem] text-white flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Estimate</p>
                  <p className="text-2xl font-black">₹{selectedGuide.pricePerDay * (formData.serviceType === 'Half-day' ? 0.6 : 1)}</p>
                </div>
                <button 
                  onClick={handleBook}
                  className="px-8 py-4 bg-orange-500 text-white rounded-xl font-black text-sm hover:bg-orange-600 transition shadow-lg shadow-orange-500/20"
                >
                  Confirm Request
                </button>
              </div>
            </div>
          )}

          {view === 'success' && (
            <div className="py-20 flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center text-emerald-500 mb-8 animate-bounce">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h4 className="text-3xl font-black text-slate-900 mb-4">Request Sent Successfully!</h4>
              <p className="text-slate-500 max-w-sm font-medium leading-relaxed mb-12">
                We've notified {selectedGuide?.name}. They will review your request and get back to you within 24 hours.
              </p>
              <button 
                onClick={onClose}
                className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-black transition shadow-xl"
              >
                Back to Trip
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideBookingFlow;
