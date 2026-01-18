
import React, { useState } from 'react';
import { 
  LayoutDashboard, Building, Bed, Calendar, ClipboardList, 
  TrendingUp, Star, Clock, Users, Banknote,
  Plus, Search, Filter, Edit, Trash2, CheckCircle2, 
  XCircle, ChevronRight, Bell, LogOut, Image as ImageIcon,
  MapPin, Shield, Wifi, Coffee, Utensils, Car
} from 'lucide-react';

interface HotelRoom {
  id: string;
  type: string;
  occupancy: string;
  totalRooms: number;
  price: string;
  status: 'Active' | 'Sold Out' | 'Maintenance';
}

interface HotelBooking {
  id: string;
  customerName: string;
  roomType: string;
  dates: string;
  rooms: number;
  amount: string;
  status: 'Checked-in' | 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
}

interface HotelDashboardProps {
  userName: string;
  onLogout: () => void;
}

const HotelDashboard: React.FC<HotelDashboardProps> = ({ userName, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'rooms' | 'bookings' | 'earnings'>('overview');
  const [isAddingRoom, setIsAddingRoom] = useState(false);

  // Mock Data
  const stats = [
    { label: 'Occupancy', value: '82%', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Today Check-ins', value: '14', icon: ClipboardList, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Revenue (MTD)', value: '₹4.8L', icon: Banknote, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Rating', value: '4.9', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  const rooms: HotelRoom[] = [
    { id: 'RM-101', type: 'Deluxe Ocean View', occupancy: '2 Adults, 1 Child', totalRooms: 10, price: '₹7,500', status: 'Active' },
    { id: 'RM-102', type: 'Executive Suite', occupancy: '2 Adults', totalRooms: 4, price: '₹12,000', status: 'Active' },
    { id: 'RM-103', type: 'Family Garden Villa', occupancy: '4 Adults', totalRooms: 2, price: '₹18,500', status: 'Sold Out' },
  ];

  const bookings: HotelBooking[] = [
    { id: 'HB-901', customerName: 'Arjun Mehta', roomType: 'Deluxe Ocean View', dates: 'Oct 15 - Oct 18', rooms: 1, amount: '₹22,500', status: 'Checked-in' },
    { id: 'HB-902', customerName: 'Priya Sharma', roomType: 'Executive Suite', dates: 'Oct 20 - Oct 22', rooms: 1, amount: '₹24,000', status: 'Confirmed' },
    { id: 'HB-895', customerName: 'Suresh Raina', roomType: 'Deluxe Ocean View', dates: 'Oct 10 - Oct 12', rooms: 2, amount: '₹30,000', status: 'Completed' },
  ];

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Hotel Profile', icon: Building },
    { id: 'rooms', label: 'Room Management', icon: Bed },
    { id: 'bookings', label: 'Bookings', icon: ClipboardList, badge: '5' },
    { id: 'earnings', label: 'Earnings', icon: Banknote },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10">
        <div className="p-8 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <Building className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">Stay Manager</span>
          </div>
        </div>
        
        <nav className="flex-grow p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as any); setIsAddingRoom(false); }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all font-bold ${
                  isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-white text-indigo-600' : 'bg-indigo-100 text-indigo-600'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-100 space-y-4">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 font-bold hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
          <div className="bg-slate-900 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-5 h-5 text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Elite Stay</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">Top rated property in Goa. You're in the top 5% of earners!</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-72 p-12">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Grand Plaza Resort</h1>
            <p className="text-slate-500 font-medium">Hotel Partner Dashboard • {userName}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-3 bg-white rounded-2xl border border-slate-200 text-slate-400 hover:text-slate-900 transition">
              <Bell className="w-6 h-6" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-indigo-600 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <img src={`https://i.pravatar.cc/150?u=hotel`} className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm" alt="Avatar" />
            </div>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className={`w-12 h-12 ${s.bg} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                    <s.icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                  <p className="text-3xl font-black text-slate-900">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900">Today's Check-ins</h3>
                  <button onClick={() => setActiveTab('bookings')} className="text-indigo-600 font-bold text-sm hover:underline">Manage All</button>
                </div>
                <div className="space-y-4">
                  {bookings.filter(b => b.status === 'Checked-in').map((b) => (
                    <div key={b.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-colors">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center font-black text-indigo-600 text-xl">
                          {b.customerName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900">{b.customerName}</h4>
                          <p className="text-xs text-slate-500 font-medium">{b.roomType} • Room {100 + Math.floor(Math.random() * 50)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-slate-400">Arrived 11:45 AM</span>
                        <ChevronRight className="w-5 h-5 text-slate-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-black text-slate-900">Occupancy Trend</h3>
                <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <TrendingUp className="w-8 h-8 text-indigo-200 mb-4" />
                    <h4 className="text-2xl font-black mb-2">Weekend Surge</h4>
                    <p className="text-indigo-100 text-sm font-medium mb-8">Friday and Saturday are 95% booked. Consider adjusting spot prices.</p>
                    <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-sm hover:bg-indigo-50 transition shadow-xl">
                      Dynamic Pricing
                    </button>
                  </div>
                  <div className="absolute -right-8 -bottom-8 opacity-10">
                    <TrendingUp className="w-48 h-48" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="w-full md:w-1/3 aspect-video bg-slate-100 rounded-[2rem] relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800" alt="Hotel" className="w-full h-full object-cover" />
                  <button className="absolute bottom-4 right-4 p-3 bg-white/90 backdrop-blur rounded-xl text-indigo-600 shadow-sm"><ImageIcon className="w-5 h-5" /></button>
                </div>
                <div className="flex-grow space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-black text-slate-900">Grand Plaza Resort</h2>
                    <button className="px-6 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm">Edit Profile</button>
                  </div>
                  <p className="text-slate-500 font-medium">A luxurious beachfront resort offering world-class amenities and breathtaking ocean views in the heart of South Goa.</p>
                  <div className="flex items-center gap-4 text-slate-400 text-sm font-bold">
                    <MapPin className="w-4 h-4 text-indigo-500" /> Colva Beach Road, Salcete, Goa 403708
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Wifi className="w-4 h-4" /> Free Wi-Fi
                    </div>
                    <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Coffee className="w-4 h-4" /> Breakfast Inc.
                    </div>
                    <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Utensils className="w-4 h-4" /> 3 Restaurants
                    </div>
                    <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Car className="w-4 h-4" /> Free Parking
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-6">Policies</h3>
                <div className="space-y-4">
                  <div className="flex justify-between p-4 bg-slate-50 rounded-xl">
                    <span className="text-sm font-bold text-slate-500">Check-in</span>
                    <span className="text-sm font-black text-slate-900">12:00 PM</span>
                  </div>
                  <div className="flex justify-between p-4 bg-slate-50 rounded-xl">
                    <span className="text-sm font-bold text-slate-500">Check-out</span>
                    <span className="text-sm font-black text-slate-900">10:00 AM</span>
                  </div>
                  <div className="flex justify-between p-4 bg-slate-50 rounded-xl">
                    <span className="text-sm font-bold text-slate-500">Cancellation</span>
                    <span className="text-sm font-black text-slate-900">Free before 24h</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                <h3 className="text-xl font-black mb-6">Document Verification</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                    <Shield className="w-6 h-6 text-emerald-400" />
                    <div>
                      <p className="text-sm font-bold">Business License</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Verified</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                    <Shield className="w-6 h-6 text-emerald-400" />
                    <div>
                      <p className="text-sm font-bold">GST Certificate</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Verified</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rooms' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-slate-900">Manage Rooms</h2>
                <p className="text-slate-500">Control your inventory and pricing.</p>
              </div>
              <button 
                onClick={() => setIsAddingRoom(true)}
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Room Type
              </button>
            </div>

            {isAddingRoom ? (
              <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-xl animate-in zoom-in-95 duration-300">
                <h3 className="text-2xl font-black mb-8">Add New Room Category</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Room Name</label>
                      <input type="text" className="w-full p-4 bg-slate-50 border border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none font-bold" placeholder="e.g. Royal Ocean Suite" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Base Price (₹)</label>
                      <input type="number" className="w-full p-4 bg-slate-50 border border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none font-bold" placeholder="5000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Inventory</label>
                      <input type="number" className="w-full p-4 bg-slate-50 border border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none font-bold" placeholder="5" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Occupancy</label>
                      <select className="w-full p-4 bg-slate-50 border border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none font-bold appearance-none">
                        <option>2 Adults</option>
                        <option>2 Adults, 1 Child</option>
                        <option>4 Adults</option>
                        <option>Custom</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-6">
                    <button type="button" className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-indigo-100">Save Room</button>
                    <button type="button" onClick={() => setIsAddingRoom(false)} className="px-10 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-sm">Cancel</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <div key={room.id} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm group hover:shadow-xl transition-all">
                    <div className="p-8 space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                          <Bed className="w-6 h-6" />
                        </div>
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                          room.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {room.status}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-slate-900 mb-1">{room.type}</h4>
                        <p className="text-xs font-bold text-slate-400">{room.occupancy}</p>
                      </div>
                      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Per Night</span>
                          <span className="text-2xl font-black text-slate-900">{room.price}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Available</span>
                          <span className="text-lg font-black text-indigo-600">{room.totalRooms} Rooms</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-grow py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs hover:bg-indigo-50 hover:text-indigo-600 transition">Edit Details</button>
                        <button className="p-3 bg-slate-50 text-red-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900">Hotel Bookings</h2>
              <div className="flex gap-2">
                {['All', 'Today', 'Upcoming', 'Past'].map((filter) => (
                  <button key={filter} className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${filter === 'All' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}`}>
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Guest</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Room Type</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Dates</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-8 py-6 text-sm font-bold text-slate-400">{b.id}</td>
                      <td className="px-8 py-6 font-bold text-slate-900">{b.customerName}</td>
                      <td className="px-8 py-6 text-sm font-medium text-slate-700">{b.roomType}</td>
                      <td className="px-8 py-6 text-sm font-medium text-slate-500">{b.dates}</td>
                      <td className="px-8 py-6 font-black text-slate-900">{b.amount}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                          b.status === 'Checked-in' ? 'bg-blue-100 text-blue-600' : 
                          b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <button className="text-slate-400 hover:text-indigo-600 transition"><ChevronRight className="w-5 h-5" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-black text-slate-900">Revenue Breakdown</h2>
                  <p className="text-slate-500">Your property revenue is up 12% from last month.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">Total Payouts Done</span>
                  <div className="text-4xl font-black text-indigo-600">₹14.2L</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-100">
                <div className="p-6 bg-slate-50 rounded-3xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Bookings (MTD)</p>
                  <p className="text-2xl font-black text-slate-900">42</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg Room Rate</p>
                  <p className="text-2xl font-black text-slate-900">₹8,450</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Commission (5%)</p>
                  <p className="text-2xl font-black text-red-500">₹24,000</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <h3 className="text-xl font-black text-slate-900 mb-6">Recent Settlements</h3>
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-transparent hover:border-indigo-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">Payout Period Oct 1 - Oct 7</p>
                        <p className="text-xs text-slate-500 font-medium">Transferred to HDFC Bank ****5678</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-900">₹1,12,400</p>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Success</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HotelDashboard;
