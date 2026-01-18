
import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, Calendar, ClipboardList, 
  TrendingUp, Star, Clock, Users, Banknote,
  Plus, Search, Filter, Edit, Trash2, CheckCircle2, 
  XCircle, ChevronRight, Bell, LogOut, Image as ImageIcon,
  MapPin, Globe, Shield
} from 'lucide-react';

interface TravelPackage {
  id: string;
  name: string;
  destination: string;
  duration: string;
  price: string;
  type: 'Budget' | 'Standard' | 'Premium';
  status: 'Published' | 'Draft' | 'Archived';
  bookings: number;
}

interface PackageBooking {
  id: string;
  customerName: string;
  packageName: string;
  travelDates: string;
  travelers: string;
  amount: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
}

interface DistributorDashboardProps {
  userName: string;
  onLogout: () => void;
}

const DistributorDashboard: React.FC<DistributorDashboardProps> = ({ userName, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'bookings' | 'availability' | 'earnings'>('overview');
  const [isCreating, setIsCreating] = useState(false);

  // Mock Data
  const stats = [
    { label: 'Total Packages', value: '12', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Bookings', value: '156', icon: ClipboardList, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Revenue (MTD)', value: '₹2.4L', icon: Banknote, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Avg Rating', value: '4.7', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  const packages: TravelPackage[] = [
    { id: 'PKG-001', name: 'Goa Beach Bliss', destination: 'Goa', duration: '4D/3N', price: '₹14,999', type: 'Standard', status: 'Published', bookings: 45 },
    { id: 'PKG-002', name: 'Manali Snow Escape', destination: 'Manali', duration: '5D/4N', price: '₹18,500', type: 'Premium', status: 'Published', bookings: 32 },
    { id: 'PKG-003', name: 'Rishikesh Yoga Retreat', destination: 'Rishikesh', duration: '3D/2N', price: '₹8,999', type: 'Budget', status: 'Draft', bookings: 0 },
  ];

  const bookings: PackageBooking[] = [
    { id: 'BK-789', customerName: 'Vikram Singh', packageName: 'Goa Beach Bliss', travelDates: 'Nov 12 - Nov 16', travelers: '2 Adults', amount: '₹29,998', status: 'Pending' },
    { id: 'BK-790', customerName: 'Anjali Rao', packageName: 'Manali Snow Escape', travelDates: 'Dec 05 - Dec 10', travelers: '4 Adults', amount: '₹74,000', status: 'Confirmed' },
    { id: 'BK-785', customerName: 'Rajesh Kumar', packageName: 'Goa Beach Bliss', travelDates: 'Oct 20 - Oct 24', travelers: '1 Adult', amount: '₹14,999', status: 'Completed' },
  ];

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'packages', label: 'My Packages', icon: Package },
    { id: 'bookings', label: 'Bookings', icon: ClipboardList, badge: '3' },
    { id: 'availability', label: 'Inventory', icon: Calendar },
    { id: 'earnings', label: 'Earnings', icon: Banknote },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10">
        <div className="p-8 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">Distro Hub</span>
          </div>
        </div>
        
        <nav className="flex-grow p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as any); setIsCreating(false); }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all font-bold ${
                  isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-600'}`}>
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
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Verified Partner</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">Platinum status active. You have 0% platform fee this month!</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-72 p-12">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Welcome, {userName}</h1>
            <p className="text-slate-500 font-medium">Your travel business at a glance.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-3 bg-white rounded-2xl border border-slate-200 text-slate-400 hover:text-slate-900 transition">
              <Bell className="w-6 h-6" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-black text-slate-900 leading-none">{userName}</p>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Active Partner</span>
              </div>
              <img src={`https://i.pravatar.cc/150?u=distro`} className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm" alt="Avatar" />
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
                  <h3 className="text-xl font-black text-slate-900">Recent Sales</h3>
                  <button onClick={() => setActiveTab('bookings')} className="text-blue-600 font-bold text-sm hover:underline">View Bookings</button>
                </div>
                <div className="space-y-4">
                  {bookings.slice(0, 3).map((b) => (
                    <div key={b.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-colors">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-slate-400 text-xl">
                          {b.customerName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900">{b.customerName}</h4>
                          <p className="text-xs text-slate-500 font-medium">{b.packageName} • <span className="text-blue-600 font-bold">{b.amount}</span></p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                        b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-black text-slate-900">Market Trends</h3>
                <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <TrendingUp className="w-8 h-8 text-blue-200 mb-4" />
                    <h4 className="text-2xl font-black mb-2">Winter Peak</h4>
                    <p className="text-blue-100 text-sm font-medium mb-8">Packages for Himachal and Kashmir are up by 45%. Consider updating your pricing!</p>
                    <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-sm hover:bg-blue-50 transition shadow-xl">
                      Optimize Packages
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

        {activeTab === 'packages' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-slate-900">Manage Packages</h2>
                <p className="text-slate-500">Create, edit, and publish your travel products.</p>
              </div>
              <button 
                onClick={() => setIsCreating(true)}
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-100 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                New Package
              </button>
            </div>

            {isCreating ? (
              <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-xl animate-in zoom-in-95 duration-300">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Package className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black">Create New Travel Package</h3>
                </div>
                
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Package Name</label>
                      <input type="text" className="w-full p-4 bg-slate-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none font-bold" placeholder="e.g. Royal Rajasthan Tour" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Destination</label>
                      <input type="text" className="w-full p-4 bg-slate-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none font-bold" placeholder="e.g. Udaipur, Jaipur" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Price Per Person (₹)</label>
                      <input type="number" className="w-full p-4 bg-slate-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none font-bold" placeholder="15000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Duration</label>
                      <select className="w-full p-4 bg-slate-50 border border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none font-bold appearance-none">
                        <option>3 Days / 2 Nights</option>
                        <option>4 Days / 3 Nights</option>
                        <option>5 Days / 4 Nights</option>
                        <option>Custom</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Inclusions</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Hotel', 'Meals', 'Transport', 'Guide', 'Sightseeing', 'Flights'].map(inc => (
                        <label key={inc} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-transparent hover:border-blue-200 cursor-pointer transition">
                          <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                          <span className="text-xs font-bold text-slate-600">{inc}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-slate-50">
                    <button type="submit" className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-100">Publish Package</button>
                    <button type="button" onClick={() => setIsCreating(false)} className="px-10 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-sm hover:bg-slate-200 transition">Save Draft</button>
                    <button type="button" onClick={() => setIsCreating(false)} className="ml-auto px-6 py-4 text-slate-400 font-bold text-sm hover:text-red-500 transition">Discard</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm group hover:shadow-xl transition-all">
                    <div className="h-48 bg-slate-200 relative overflow-hidden">
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button className="p-2.5 bg-white/90 backdrop-blur rounded-xl text-slate-600 hover:text-blue-600 shadow-sm transition"><Edit className="w-4 h-4" /></button>
                        <button className="p-2.5 bg-white/90 backdrop-blur rounded-xl text-slate-600 hover:text-red-500 shadow-sm transition"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10">
                        <ImageIcon className="w-12 h-12 text-white/50" />
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                          pkg.status === 'Published' ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'
                        }`}>
                          {pkg.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-black text-slate-900 mb-1">{pkg.name}</h4>
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                            <MapPin className="w-3 h-3" /> {pkg.destination} • {pkg.duration}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-slate-900">{pkg.price}</p>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">per person</span>
                        </div>
                      </div>
                      <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-black text-slate-900">{pkg.bookings} Bookings</span>
                        </div>
                        <button className="text-blue-600 font-bold text-xs flex items-center gap-1 hover:underline">
                          View Details <ChevronRight className="w-4 h-4" />
                        </button>
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
              <h2 className="text-2xl font-black text-slate-900">Recent Bookings</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none" placeholder="Search customer..." />
                </div>
                <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition"><Filter className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Package</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Dates</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pax</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-8 py-6">
                        <div className="font-bold text-slate-900">{b.customerName}</div>
                        <div className="text-[10px] font-bold text-slate-400">{b.id}</div>
                      </td>
                      <td className="px-8 py-6 text-sm font-medium text-slate-700">{b.packageName}</td>
                      <td className="px-8 py-6 text-sm font-medium text-slate-500">{b.travelDates}</td>
                      <td className="px-8 py-6 text-sm font-medium text-slate-500">{b.travelers}</td>
                      <td className="px-8 py-6 font-black text-slate-900">{b.amount}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                          b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-600' : 
                          b.status === 'Pending' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition"><CheckCircle2 className="w-4 h-4" /></button>
                          <button className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition"><XCircle className="w-4 h-4" /></button>
                        </div>
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
                  <h2 className="text-3xl font-black text-slate-900">Earnings Summary</h2>
                  <p className="text-slate-500">You've earned ₹45,200 more than last month!</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">Available for Payout</span>
                  <div className="text-4xl font-black text-emerald-600">₹85,400</div>
                  <button className="mt-4 px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-sm hover:bg-black transition shadow-lg">Request Payout</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-100">
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Gross Revenue</p>
                  <p className="text-2xl font-black text-slate-900">₹12.4L</p>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Total Payouts</p>
                  <p className="text-2xl font-black text-slate-900">₹11.2L</p>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Pending Settlements</p>
                  <p className="text-2xl font-black text-slate-900">₹14,500</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 bg-slate-50/50">
                <h3 className="text-xl font-black text-slate-900">Payout History</h3>
              </div>
              <div className="p-8 space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">Payout #{1000 + i}</p>
                        <p className="text-xs text-slate-500 font-medium">Oct {20 - i}, 2024 • Bank Transfer</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-900">₹24,000</p>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Completed</span>
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

export default DistributorDashboard;
