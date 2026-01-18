
import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, Users, ShieldCheck, Globe, Package, 
  ClipboardList, Banknote, Wallet, Megaphone, Star, 
  Bell, Settings, ShieldAlert, LogOut, Search, 
  Filter, Plus, ChevronLeft, ChevronRight, Edit, 
  Trash2, Eye, CheckCircle2, XCircle, AlertCircle,
  TrendingUp, BarChart3, Globe2, MapPin, Layers,
  Compass, Sparkles, ImageIcon, Terminal, Lock,
  UserCheck, UserPlus, Zap, FileText, IndianRupee,
  Activity, Server, Cpu, Database
} from 'lucide-react';

interface AdminDashboardProps {
  userName: string;
  onLogout: () => void;
}

// Define the primary navigation structure
type MainTab = 
  | 'dashboard' | 'users' | 'destinations' | 'packages' 
  | 'bookings' | 'finance' | 'group-wallet' | 'marketing' 
  | 'reviews' | 'notifications' | 'reports' | 'settings' | 'security';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ userName, onLogout }) => {
  const [activeTab, setActiveTab] = useState<MainTab>('dashboard');
  const [subTab, setSubTab] = useState('destinations'); // Sub-tab context
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sub-menu definitions for complex modules
  const userSubMenus = [
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'guides', label: 'Guides', icon: Compass },
    { id: 'distributors', label: 'Distributors', icon: Package },
    { id: 'hotels', label: 'Hotels', icon: ShieldCheck },
    { id: 'partner-req', label: 'Partner Requests', icon: UserPlus },
    { id: 'admin-users', label: 'Admin Users', icon: UserCheck },
    { id: 'roles', label: 'Roles & Permissions', icon: Lock },
  ];

  const destSubMenus = [
    { id: 'destinations', label: 'Destinations', icon: MapPin },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'attractions', label: 'Top Attractions', icon: Star },
    { id: 'activities', label: 'Activities', icon: Activity },
    { id: 'experiences', label: 'Experiences', icon: Sparkles },
    { id: 'images', label: 'Images', icon: ImageIcon },
    { id: 'seo', label: 'SEO Control', icon: Globe2 },
  ];

  // Helper: Horizontal Scroll for sub-menus
  const scrollSubMenu = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -250 : 250, behavior: 'smooth' });
    }
  };

  // --- UI COMPONENTS ---

  const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
      'Active': 'bg-emerald-100 text-emerald-600',
      'Published': 'bg-emerald-100 text-emerald-600',
      'Approved': 'bg-emerald-100 text-emerald-600',
      'Pending': 'bg-orange-100 text-orange-600',
      'Draft': 'bg-orange-100 text-orange-600',
      'Flagged': 'bg-red-100 text-red-600',
      'Blocked': 'bg-red-100 text-red-600',
    };
    return (
      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${styles[status] || 'bg-slate-100 text-slate-500'}`}>
        {status}
      </span>
    );
  };

  const RenderTable = ({ headers, data }: { headers: string[], data: any[] }) => (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
              ))}
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                {Object.entries(row).map(([key, val]: [string, any], j) => (
                  <td key={j} className="px-8 py-6">
                    {key === 'status' ? <StatusBadge status={val} /> : <div className="text-sm font-bold text-slate-700">{val}</div>}
                  </td>
                ))}
                <td className="px-8 py-6">
                  <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-indigo-50 text-slate-300 hover:text-indigo-600 rounded-lg transition"><Eye className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-orange-50 text-slate-300 hover:text-orange-600 rounded-lg transition"><Edit className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-lg transition"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // --- MODULE RENDERING ---

  const renderSubMenuHeader = (items: typeof userSubMenus, colorClass: string) => (
    <div className="relative group mb-10">
      <div 
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar bg-white p-2 rounded-[2rem] border border-slate-100 shadow-sm scroll-smooth scroller-mask"
      >
        {items.map((menu) => {
          const Icon = menu.icon;
          const isActive = subTab === menu.id;
          return (
            <button
              key={menu.id}
              onClick={() => setSubTab(menu.id)}
              className={`flex items-center gap-2 px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap ${
                isActive 
                  ? `${colorClass} text-white shadow-xl scale-105` 
                  : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              {menu.label}
            </button>
          );
        })}
      </div>
      <div className="absolute top-1/2 -left-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => scrollSubMenu('left')} className="w-10 h-10 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600"><ChevronLeft className="w-5 h-5" /></button>
      </div>
      <div className="absolute top-1/2 -right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => scrollSubMenu('right')} className="w-10 h-10 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600"><ChevronRight className="w-5 h-5" /></button>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Stats Cluster */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Platform GMV', value: '₹2.4Cr', icon: Banknote, color: 'text-emerald-500', trend: '+14.2%' },
          { label: 'Active Users', value: '18.4k', icon: Users, color: 'text-blue-500', trend: '+5.1%' },
          { label: 'Global Supply', value: '4.2k', icon: Package, color: 'text-orange-500', trend: '+2.4%' },
          { label: 'System Health', value: '99.9%', icon: Activity, color: 'text-indigo-500', trend: 'Stable' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-8">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <s.icon className={`w-7 h-7 ${s.color}`} />
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-md ${s.trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                {s.trend}
              </span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
            <p className="text-4xl font-black text-slate-900 tracking-tighter">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-slate-900">Governance Alerts</h3>
            <button className="text-indigo-600 font-bold text-sm uppercase tracking-widest text-[10px]">View Audit Log</button>
          </div>
          <div className="space-y-6">
            {[
              { title: 'New Partner Request', body: 'Grand Hyatt Mumbai applied for Distributor license.', time: '2m ago', icon: UserPlus, color: 'bg-indigo-50 text-indigo-500' },
              { title: 'High Volume Booking', body: 'Unusual traffic detected on Ladakh seasonal packages.', time: '14m ago', icon: Zap, color: 'bg-orange-50 text-orange-500' },
              { title: 'Payment Settlement', body: 'Batch payout of ₹4.5L completed for 12 local guides.', time: '1h ago', icon: IndianRupee, color: 'bg-emerald-50 text-emerald-500' },
            ].map((alert, i) => (
              <div key={i} className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl hover:bg-white border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${alert.color}`}>
                  <alert.icon className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-black text-slate-900">{alert.title}</h4>
                  <p className="text-sm text-slate-500 font-medium">{alert.body}</p>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white relative overflow-hidden group">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-10">
                <ShieldAlert className="w-7 h-7 text-orange-500" />
              </div>
              <h4 className="text-3xl font-black mb-4">Security Center</h4>
              <p className="text-slate-400 font-medium mb-12">Total of 124 admin actions logged in the last 24 hours. No unauthorized attempts detected.</p>
            </div>
            <button className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-orange-500 hover:text-white transition shadow-2xl">
              System Lockdown
            </button>
          </div>
          <div className="absolute -right-20 -bottom-20 opacity-5 group-hover:scale-110 transition-transform duration-1000">
            <Lock className="w-72 h-72" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderModule = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      
      case 'users':
        return (
          <div className="space-y-8">
            {renderSubMenuHeader(userSubMenus, 'bg-indigo-600')}
            <RenderTable 
              headers={['ID', 'Entity Name', 'Email', 'Joined', 'Status']}
              data={[
                { id: '#U401', name: 'Rohan Gupta', email: 'rohan@travel.com', joined: 'Oct 12', status: 'Active' },
                { id: '#G112', name: 'Arjun Mountain Guide', email: 'arjun@local.in', joined: 'Oct 11', status: 'Pending' },
                { id: '#H909', name: 'Taj Lake Palace', email: 'admin@taj.com', joined: 'Oct 08', status: 'Active' },
              ]}
            />
          </div>
        );

      case 'destinations':
        return (
          <div className="space-y-8">
            {renderSubMenuHeader(destSubMenus, 'bg-orange-600')}
            <RenderTable 
              headers={['Destination', 'Type', 'Country', 'Meta Score', 'Status']}
              data={[
                { dest: 'Manali', type: 'City', country: 'India', score: '94/100', status: 'Published' },
                { dest: 'Goa South', type: 'Region', country: 'India', score: '88/100', status: 'Published' },
                { dest: 'Leh', type: 'City', country: 'India', score: '72/100', status: 'Draft' },
              ]}
            />
          </div>
        );

      case 'security':
        return (
          <div className="bg-slate-950 rounded-[3rem] p-10 font-mono text-sm border border-slate-800 shadow-2xl overflow-hidden animate-in fade-in">
             <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6 text-slate-400">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> AVYUKT_AUDIT_STREAM
                </span>
                <span className="text-[10px] font-black uppercase">Level: SECURE</span>
             </div>
             <div className="space-y-3 text-[11px] leading-relaxed">
                <p><span className="text-slate-600">[14:02:11]</span> <span className="text-emerald-500 font-bold">SUCCESS:</span> Admin_User_01 logged in from IP 192.168.1.44</p>
                <p><span className="text-slate-600">[13:45:04]</span> <span className="text-indigo-500 font-bold">INFO:</span> New partner 'Himalayan Stays' approved by {userName}</p>
                <p><span className="text-slate-600">[13:12:22]</span> <span className="text-amber-500 font-bold">WARNING:</span> API rate limit spike on Google Maps Integration</p>
                <p><span className="text-slate-600">[12:55:00]</span> <span className="text-red-500 font-bold">SECURITY:</span> Blocked IP 45.12.11.1 attempting brute force on AuthPort</p>
             </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 min-h-[400px]">
            <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-6 text-slate-200">
               <ShieldCheck className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 capitalize">{activeTab.replace('-', ' ')} Module</h3>
            <p className="text-slate-400 font-medium max-w-sm text-center">This high-governance module is currently being optimized for platform scaling.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Control Tower */}
      <aside className="w-80 bg-slate-950 flex flex-col fixed h-full z-20 text-white shadow-2xl border-r border-slate-800 overflow-y-auto no-scrollbar">
        <div className="p-10 sticky top-0 bg-slate-950 z-30 border-b border-white/5 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-1 rounded-2xl shadow-lg border border-white/5 overflow-hidden w-12 h-12 flex items-center justify-center">
               <img src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/avyukt-logo.png" className="w-full h-full object-cover" alt="Avyukt" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter leading-none">Avyukt</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">Platform Governance</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-grow px-6 space-y-10 pb-32">
          {/* Main Navigation Groups */}
          <div className="space-y-4">
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Core Platform</p>
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'users', label: 'User Governance', icon: Users },
              { id: 'destinations', label: 'Dest. & Experience', icon: Globe },
              { id: 'packages', label: 'Package Catalog', icon: Package },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as MainTab); setSubTab(item.id === 'users' ? 'customers' : 'destinations'); }}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-bold text-sm ${
                  activeTab === item.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-900/40' : 'text-slate-500 hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-slate-600'}`} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Operations</p>
            {[
              { id: 'bookings', label: 'Booking Mgmt', icon: ClipboardList },
              { id: 'finance', label: 'Payment & Finance', icon: Banknote },
              { id: 'group-wallet', label: 'Group Trip Audit', icon: Wallet },
              { id: 'marketing', label: 'Content & Marketing', icon: Megaphone },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as MainTab)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-bold text-sm ${
                  activeTab === item.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-900/40' : 'text-slate-500 hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-slate-600'}`} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">System Admin</p>
            {[
              { id: 'reviews', label: 'Moderation', icon: Star },
              { id: 'notifications', label: 'Communication', icon: Bell },
              { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
              { id: 'settings', label: 'System Settings', icon: Settings },
              { id: 'security', label: 'Security & Audit', icon: ShieldAlert },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as MainTab)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-bold text-sm ${
                  activeTab === item.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-900/40' : 'text-slate-500 hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-slate-600'}`} />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* User Footer */}
        <div className="p-8 sticky bottom-0 bg-slate-950 border-t border-white/5 backdrop-blur-md">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-400 font-bold hover:bg-red-500/10 transition-all text-sm mb-6"
          >
            <LogOut className="w-5 h-5" />
            <span>Terminate Session</span>
          </button>
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/5">
             <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white font-black text-xl">
               {userName.charAt(0)}
             </div>
             <div className="overflow-hidden">
               <p className="text-sm font-black truncate">{userName}</p>
               <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Master Auth</span>
               </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-grow ml-80 p-16">
        <header className="flex items-center justify-between mb-16">
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-1">
               <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em]">Avyukt Control Tower</span>
               <div className="h-0.5 w-12 bg-indigo-100"></div>
            </div>
            <h1 className="text-4xl font-black text-slate-900 capitalize tracking-tight">
              {activeTab === 'dashboard' ? 'Platform Health' : activeTab.replace('-', ' ')}
            </h1>
          </div>
          <div className="flex items-center gap-8">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Global command search..." 
                className="pl-14 pr-8 py-4 bg-white border border-slate-200 rounded-[2rem] text-sm font-bold outline-none focus:border-indigo-500 w-[24rem] shadow-sm transition-all group-hover:shadow-md"
              />
            </div>
            <div className="flex gap-3">
              <button className="relative p-4 bg-white rounded-[1.5rem] border border-slate-200 text-slate-400 hover:text-slate-900 transition-all shadow-sm active:scale-95">
                <Bell className="w-6 h-6" />
                <span className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full border-4 border-white"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-[1400px] mx-auto pb-32">
          {renderModule()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
