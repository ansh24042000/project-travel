
import React, { useState } from 'react';
import { X, MapPin, Clock, Calendar, Users, ChevronLeft, ChevronRight, CheckCircle2, Navigation, Heart, ShieldCheck, Map as MapIcon, Send } from 'lucide-react';
import { Activity, UserSession, ActivityBooking } from '../types';

interface ActivityDetailModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
  session: UserSession;
  destinationName: string;
  onBookingSubmit: (booking: ActivityBooking) => void;
}

const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({ 
  activity, 
  isOpen, 
  onClose, 
  session, 
  destinationName,
  onBookingSubmit 
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [view, setView] = useState<'details' | 'booking' | 'success'>('details');
  const [bookingData, setBookingData] = useState({
    date: session.startDate || '',
    participants: session.travelers.adults + session.travelers.children,
    notes: ''
  });

  if (!isOpen || !activity) return null;

  const nextImage = () => setActiveImageIndex((prev) => (prev + 1) % activity.images.length);
  const prevImage = () => setActiveImageIndex((prev) => (prev - 1 + activity.images.length) % activity.images.length);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: ActivityBooking = {
      id: `ACT-BK-${Math.floor(Math.random() * 100000)}`,
      activityId: activity.id,
      activityName: activity.name,
      customerId: 'CUST-001',
      customerName: session.fullName,
      destination: destinationName,
      date: bookingData.date,
      participants: bookingData.participants,
      status: 'Pending',
      totalAmount: parseInt(activity.priceIndicator.replace(/\D/g, '')) * bookingData.participants || 1500 * bookingData.participants,
      notes: bookingData.notes
    };
    onBookingSubmit(newBooking);
    setView('success');
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left: Visual Content */}
        <div className="w-full md:w-1/2 bg-slate-900 relative flex flex-col">
          <div className="flex-grow relative overflow-hidden">
            <img 
              src={activity.images[activeImageIndex]} 
              className="w-full h-full object-cover transition-all duration-700 ease-in-out" 
              alt={activity.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            
            {/* Gallery Controls */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button onClick={prevImage} className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white pointer-events-auto transition">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={nextImage} className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white pointer-events-auto transition">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="absolute top-6 left-6">
              <span className="px-4 py-1.5 bg-orange-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                {activity.category}
              </span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="p-4 bg-slate-900 flex gap-3 overflow-x-auto no-scrollbar border-t border-white/5">
            {activity.images.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImageIndex(i)}
                className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 transition-all ${activeImageIndex === i ? 'ring-2 ring-orange-500 scale-105' : 'opacity-40 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="thumb" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info & Form */}
        <div className="w-full md:w-1/2 flex flex-col overflow-y-auto custom-scrollbar bg-white relative">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full transition z-10">
            <X className="w-6 h-6" />
          </button>

          <div className="p-10">
            {view === 'details' && (
              <div className="animate-in fade-in slide-in-from-right-4">
                <h2 className="text-4xl font-black text-slate-900 mb-2 leading-tight">{activity.name}</h2>
                <div className="flex items-center gap-2 text-indigo-600 font-bold mb-8">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{activity.address}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <Clock className="w-5 h-5 text-orange-500 mb-2" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</p>
                    <p className="text-sm font-bold text-slate-900">{activity.duration}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <Calendar className="w-5 h-5 text-indigo-500 mb-2" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Best Season</p>
                    <p className="text-sm font-bold text-slate-900">{activity.bestSeason}</p>
                  </div>
                  <div className="col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Suitable For</p>
                      <div className="flex gap-2">
                        {activity.suitableFor.map(s => (
                          <span key={s} className="px-2 py-0.5 bg-white text-indigo-600 rounded-md text-[10px] font-black border border-indigo-50">{s}</span>
                        ))}
                      </div>
                    </div>
                    <Users className="w-5 h-5 text-slate-300" />
                  </div>
                </div>

                <div className="space-y-8 mb-10">
                  <section>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">Description</h4>
                    <p className="text-slate-600 leading-relaxed font-medium">{activity.description}</p>
                  </section>

                  {/* Mock Map Integration */}
                  <section>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <MapIcon className="w-4 h-4 text-orange-500" /> Location Map
                    </h4>
                    <div className="w-full h-48 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 group relative">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        scrolling="no" 
                        marginHeight={0} 
                        marginWidth={0} 
                        src={`https://maps.google.com/maps?q=${activity.coordinates.lat},${activity.coordinates.lng}&z=14&output=embed`}
                      />
                      <button 
                        onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${activity.coordinates.lat},${activity.coordinates.lng}`, '_blank')}
                        className="absolute bottom-4 right-4 px-4 py-2 bg-white text-slate-900 rounded-xl font-bold text-xs shadow-xl flex items-center gap-2 hover:bg-slate-50 transition"
                      >
                        <Navigation className="w-3 h-3" /> Open in Maps
                      </button>
                    </div>
                  </section>
                </div>

                <button 
                  onClick={() => setView('booking')}
                  className="w-full py-5 bg-orange-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-100 hover:bg-orange-600 transition-all active:scale-[0.98]"
                >
                  Book This Activity
                </button>
              </div>
            )}

            {view === 'booking' && (
              <div className="animate-in fade-in slide-in-from-right-4">
                <button onClick={() => setView('details')} className="text-xs font-bold text-indigo-600 mb-8 flex items-center gap-1">
                  <ChevronLeft className="w-4 h-4" /> Back to Details
                </button>
                <h3 className="text-3xl font-black text-slate-900 mb-2">Book Your Slot</h3>
                <p className="text-slate-500 font-medium mb-10">{activity.name}</p>

                <form onSubmit={handleBook} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Preferred Date</label>
                      <input 
                        type="date" 
                        required
                        value={bookingData.date}
                        onChange={e => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold focus:border-indigo-500" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Participants</label>
                      <input 
                        type="number" 
                        min="1"
                        value={bookingData.participants}
                        onChange={e => setBookingData(prev => ({ ...prev, participants: parseInt(e.target.value) }))}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold focus:border-indigo-500" 
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Special Requests</label>
                      <textarea 
                        value={bookingData.notes}
                        onChange={e => setBookingData(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="e.g. Vegetarian meal, pick-up from hotel..."
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold focus:border-indigo-500 h-24"
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-slate-900 rounded-[2rem] text-white flex items-center justify-between mt-8">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Estimated</p>
                      <p className="text-2xl font-black">{activity.priceIndicator}</p>
                    </div>
                    <button type="submit" className="px-10 py-4 bg-orange-500 text-white rounded-xl font-black text-sm hover:bg-orange-600 transition shadow-lg">
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            )}

            {view === 'success' && (
              <div className="py-20 flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center text-emerald-500 mb-8 animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h4 className="text-3xl font-black text-slate-900 mb-4">Activity Requested!</h4>
                <p className="text-slate-500 max-w-sm font-medium leading-relaxed mb-12">
                  Your booking request for {activity.name} has been sent. We'll update your trip dashboard once confirmed.
                </p>
                <button 
                  onClick={onClose}
                  className="px-12 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-black transition shadow-xl"
                >
                  Return to Destination
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailModal;
