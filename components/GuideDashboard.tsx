
import React, { useState } from 'react';
import { 
  LayoutDashboard, User, Calendar, ClipboardList, 
  MapPin, CheckCircle2, XCircle, TrendingUp, 
  MessageSquare, Star, Clock, Users, Banknote,
  ShieldCheck, Languages, Award, ChevronRight, Bell,
  Compass, LogOut, Check, X, MoreVertical
} from 'lucide-react';
import { GuideBooking } from '../types';

interface GuideDashboardProps {
  userName: string;
  onLogout: () => void;
}

const GuideDashboard: React.FC<GuideDashboardProps> = ({ userName, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'availability' | 'bookings' | 'earnings'>('overview');
  
  const [bookings, setBookings] = useState<GuideBooking[]>([
    { id: 'BK-101', customerName: 'Rahul Sharma', customerId: 'C-01', destination: 'Manali', date: 'Oct 15, 2024', travelers: 4, amount: 12000, status: 'Pending', guideId: 'G-01', guideName: userName, serviceType: 'Multi-day' },
    { id: 'BK-102', customerName: 'Sneha Gupta', customerId: 'C-02', destination: 'Old Goa', date: 'Oct 20, 2024', travelers: 2, amount: 3500, status: 'Pending', guideId: 'G-01', guideName: userName, serviceType: 'Half-day' },
    { id: 'BK-098', customerName: 'Amit Verma', customerId: 'C-03', destination: 'Rishikesh', date: 'Oct 05, 2024', travelers: 1, amount: 6000, status: 'Accepted', guideId: 'G-01', guideName: userName, serviceType: 'Full-day' },
  ]);

  const handleAction = (id: string, newStatus: 'Accepted' | 'Rejected') => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const stats = [
    { label: 'Total Earnings', value: '₹42,500', icon: Banknote, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Confirmed Trips', value: bookings.filter(b => b.status === 'Accepted').length.toString(), icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'New Requests', value: bookings.filter(b => b.status === 'Pending').length.toString(), icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Avg Rating', value: '4.9', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'Requests', icon: ClipboardList, badge: bookings.filter(b => b.status === 'Pending').length.toString() },
    { id: 'availability', label: 'Availability', icon: Calendar },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'earnings', label: 'Payments', icon: Banknote },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10">
        <div className="p-8 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 w-12 h-12 rounded-xl shadow-lg overflow-hidden flex items-center justify-center border border-white/5 p-0.5">
               <img src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/avyukt-logo.png" className="w-full h-full object-cover" alt="Avyukt" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tighter leading-none">Avyukt<br /><span className="text-orange-500">Guide</span></span>
          </div>
        </div>
        
        <nav className="flex-grow p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] ${
                  isActive ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20' : 'text-slate-400 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-300'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && parseInt(item.badge) > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${isActive ? 'bg-white text-orange-500' : 'bg-orange-100 text-orange-600'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-red-500 font-bold hover:bg-red-50 transition-all text-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Terminate</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-72 p-12">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 leading-tight">Expert Control</h1>
            <p className="text-slate-500 font-medium">Verify bookings and update availability in real-time.</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-4 bg-white rounded-2xl border border-slate-200 text-slate-400 hover:text-slate-900 transition shadow-sm">
              <Bell className="w-6 h-6" />
              <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-black text-slate-900">{userName}</p>
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded-md">Verified Expert</span>
              </div>
              <img src={`https://i.pravatar.cc/150?u=${userName}`} className="w-12 h-12 rounded-2xl border-2 border-white shadow-md" alt="Avatar" />
            </div>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className={`w-12 h-12 ${s.bg} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                    <s.icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                  <p className="text-3xl font-black text-slate-900">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-900">Incoming Requests</h3>
                  <button onClick={() => setActiveTab('bookings')} className="text-orange-600 font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-1">
                    Manage All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {bookings.filter(b => b.status === 'Pending').length > 0 ? (
                    bookings.filter(b => b.status === 'Pending').map((booking) => (
                      <div key={booking.id} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-orange-100 transition-colors">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center font-black text-indigo-600 text-xl">
                            {booking.customerName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-black text-xl text-slate-900">{booking.customerName}</h4>
                            <p className="text-sm text-slate-500 font-medium">
                              <span className="text-indigo-600 font-bold">{booking.destination}</span> • {booking.serviceType}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleAction(booking.id, 'Accepted')}
                            className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-600 transition shadow-lg shadow-emerald-100 active:scale-95"
                          >
                            <Check className="w-6 h-6" />
                          </button>
                          <button 
                            onClick={() => handleAction(booking.id, 'Rejected')}
                            className="w-12 h-12 bg-white border-2 border-slate-100 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition active:scale-95"
                          >
                            <X className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-16 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 text-center text-slate-300 font-bold uppercase tracking-widest text-xs">
                      All caught up.
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-950 rounded-[3.5rem] p-10 text-white relative overflow-hidden group">
                 <div className="relative z-10">
                   <TrendingUp className="w-10 h-10 text-orange-500 mb-6" />
                   <h4 className="text-2xl font-black mb-4">Avyukt Core Insight</h4>
                   <p className="text-slate-400 text-sm font-medium mb-12">System detecting increased demand for spiritual tours in your region. Consider opening more slots.</p>
                   <button className="w-full py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition">
                     Update Analytics
                   </button>
                 </div>
                 <div className="absolute -right-16 -bottom-16 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                    <img src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/avyukt-logo.png" className="w-72" alt="" />
                 </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GuideDashboard;
