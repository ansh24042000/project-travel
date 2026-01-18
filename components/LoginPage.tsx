
import React, { useState } from 'react';
import { 
  ArrowLeft, Mail, Lock, Globe, Apple, Eye, EyeOff, 
  Info, Zap, User, Map, Package, Building, ShieldCheck, ChevronRight 
} from 'lucide-react';
import { UserRole } from '../types';

interface LoginPageProps {
  onBack: () => void;
  onLoginSuccess: (name: string, role: UserRole) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onBack, onLoginSuccess }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const DEMO_ACCOUNTS: Record<UserRole, { email: string; pass: string; name: string }> = {
    'Customer': { email: 'customer@avyukt.com', pass: 'travel123', name: 'Guest Traveler' },
    'Guide': { email: 'guide@avyukt.com', pass: 'guide123', name: 'Expert Guide' },
    'Super Admin': { email: 'admin@avyukt.com', pass: 'admin123', name: 'Main Admin' },
    'Package Distributor': { email: 'distributor@avyukt.com', pass: 'distro123', name: 'Premium Distro' },
    'Hotel Partner': { email: 'hotel@avyukt.com', pass: 'hotel123', name: 'Grand Plaza' },
  };

  const roles: { id: UserRole; title: string; desc: string; icon: any; color: string }[] = [
    { id: 'Customer', title: 'Customer', desc: 'Plan trips, book hotels & guides', icon: User, color: 'bg-orange-500' },
    { id: 'Guide', title: 'Guide', desc: 'Manage bookings and availability', icon: Map, color: 'bg-teal-500' },
    { id: 'Package Distributor', title: 'Distributor', desc: 'Create and manage travel packages', icon: Package, color: 'bg-blue-500' },
    { id: 'Hotel Partner', title: 'Hotel Partner', desc: 'Manage stays and guest details', icon: Building, color: 'bg-indigo-500' },
    { id: 'Super Admin', title: 'Super Admin', desc: 'Platform control and oversight', icon: ShieldCheck, color: 'bg-slate-900' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    const demo = DEMO_ACCOUNTS[selectedRole];
    const loginName = isSignUp ? (name || 'New User') : (email === demo.email ? demo.name : `${selectedRole} User`);
    onLoginSuccess(loginName, selectedRole);
  };

  const handleQuickLogin = (role: UserRole) => {
    const demo = DEMO_ACCOUNTS[role];
    setEmail(demo.email);
    setPassword(demo.pass);
    setSelectedRole(role);
    setTimeout(() => {
      onLoginSuccess(demo.name, role);
    }, 400);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Left Side: Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/3 relative overflow-hidden bg-slate-950">
        <img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8df6?auto=format&fit=crop&q=80&w=1200" 
          alt="Travel Adventure" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        <div className="relative z-10 p-16 flex flex-col justify-between h-full w-full">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-slate-900 p-0.5 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
               <img src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/avyukt-logo.png" className="w-full h-full object-cover" alt="Avyukt" />
            </div>
            <span className="text-3xl font-black text-white tracking-tighter">Avyukt</span>
          </div>
          <div>
            <h2 className="text-4xl font-black text-white mb-4 leading-tight">Your Travel Tech, <br /><span className="text-orange-500">Reimagined.</span></h2>
            <p className="text-slate-300 font-medium leading-relaxed">The unified core for modern travel planning and partner governance.</p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-2/3 flex flex-col items-center justify-center p-8 md:p-16 bg-white overflow-y-auto">
        <div className="w-full max-w-4xl">
          {!selectedRole ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">System Access</h1>
                <p className="text-slate-500 font-medium italic">Select your workspace within the Avyukt ecosystem</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button 
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className="group p-8 bg-slate-50 hover:bg-white border-2 border-transparent hover:border-orange-500 rounded-[2.5rem] text-left transition-all duration-300 shadow-sm hover:shadow-xl active:scale-[0.98]"
                    >
                      <div className={`w-14 h-14 ${role.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-2">{role.title}</h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{role.desc}</p>
                      <div className="flex items-center gap-2 text-orange-600 font-black text-xs uppercase tracking-widest">
                        Enter Workspace <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-16 p-8 bg-slate-950 rounded-[2.5rem] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                <div className="text-left">
                  <h4 className="text-white font-black mb-1 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-500" />
                    Rapid Deployment Access
                  </h4>
                  <p className="text-slate-400 text-sm font-medium">Use one-click credentials for instant verification.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => handleQuickLogin('Customer')} className="px-5 py-2.5 bg-white text-slate-900 rounded-xl font-black text-xs shadow-sm hover:bg-orange-500 hover:text-white transition-all">Customer</button>
                  <button onClick={() => handleQuickLogin('Super Admin')} className="px-5 py-2.5 bg-orange-600 text-white rounded-xl font-black text-xs shadow-sm hover:bg-orange-700 transition-all">Super Admin</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto animate-in fade-in zoom-in-95 duration-300">
              <button 
                onClick={() => setSelectedRole(null)}
                className="flex items-center gap-2 text-slate-400 font-black mb-10 hover:text-orange-600 transition group uppercase text-[10px] tracking-widest"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Change Portal
              </button>

              <div className="mb-10 flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${roles.find(r => r.id === selectedRole)?.color} flex items-center justify-center text-white shadow-xl`}>
                  {React.createElement(roles.find(r => r.id === selectedRole)?.icon || User, { className: "w-7 h-7" })}
                </div>
                <div>
                  <h1 className="text-3xl font-black text-slate-900">{selectedRole} Login</h1>
                  <p className="text-slate-500 text-sm font-medium">Secure access to Avyukt Core</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email / Account ID</label>
                  <div className="relative">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-2xl outline-none transition-all font-bold"
                      placeholder={DEMO_ACCOUNTS[selectedRole].email}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Credential</label>
                  <div className="relative">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-14 pr-14 py-4 bg-slate-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-2xl outline-none transition-all font-bold"
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full py-5 bg-slate-950 text-white rounded-2xl font-black text-lg hover:bg-black transition shadow-xl active:scale-[0.98]"
                >
                  Verify & Enter
                </button>
              </form>

              <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-xs uppercase tracking-widest">
                  <Info className="w-4 h-4 text-orange-500" />
                  Testing Access:
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-400 uppercase">Login</span>
                    <span className="text-slate-900 font-black">{DEMO_ACCOUNTS[selectedRole].email}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-400 uppercase">Pass</span>
                    <span className="text-slate-900 font-black">{DEMO_ACCOUNTS[selectedRole].pass}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
