
import React, { useState } from 'react';
import { 
  ArrowLeft, Mail, Lock, Globe, Apple, Eye, EyeOff, Compass, 
  Info, Zap, User, Map, Package, Building, ShieldCheck, ChevronRight 
} from 'lucide-react';
import { UserRole } from './types';

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

  // Role-specific demo credentials
  const DEMO_ACCOUNTS: Record<UserRole, { email: string; pass: string; name: string }> = {
    'Customer': { email: 'customer@wanderlust.com', pass: 'travel123', name: 'Guest Traveler' },
    'Guide': { email: 'guide@wanderlust.com', pass: 'guide123', name: 'Expert Guide' },
    'Super Admin': { email: 'admin@wanderlust.com', pass: 'admin123', name: 'Master Admin' },
    'Package Distributor': { email: 'distributor@wanderlust.com', pass: 'distro123', name: 'Premium Distro' },
    'Hotel Partner': { email: 'hotel@wanderlust.com', pass: 'hotel123', name: 'Grand Plaza Resort' },
  };

  const roles: { id: UserRole; title: string; desc: string; icon: any; color: string }[] = [
    { id: 'Customer', title: 'Customer', desc: 'Plan trips, book hotels & guides', icon: User, color: 'bg-orange-500' },
    { id: 'Guide', title: 'Guide', desc: 'Manage bookings and availability', icon: Map, color: 'bg-teal-500' },
    { id: 'Package Distributor', title: 'Distributor', desc: 'Create and manage travel packages', icon: Package, color: 'bg-blue-500' },
    { id: 'Hotel Partner', title: 'Hotel Partner', desc: 'Manage stays and guest details', icon: Building, color: 'bg-indigo-500' },
    { id: 'Super Admin', title: 'Super Admin', desc: 'Master platform control tower', icon: ShieldCheck, color: 'bg-slate-900' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    
    // Simple validation for demo purposes
    const demo = DEMO_ACCOUNTS[selectedRole];
    const loginName = isSignUp ? (name || 'New User') : (email === demo.email ? demo.name : `${selectedRole} User`);
    onLoginSuccess(loginName, selectedRole);
  };

  const handleQuickLogin = (role: UserRole) => {
    const demo = DEMO_ACCOUNTS[role];
    setEmail(demo.email);
    setPassword(demo.pass);
    setSelectedRole(role);
    // Slight delay for feedback
    setTimeout(() => {
      onLoginSuccess(demo.name, role);
    }, 400);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Left Side: Branding */}
      <div className="hidden lg:flex lg:w-1/3 relative overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
          alt="Luxury Office" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
        <div className="relative z-10 p-16 flex flex-col justify-between h-full w-full">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2.5 rounded-2xl shadow-lg shadow-orange-500/20">
              <Compass className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-black text-white tracking-tight">Wanderlust</span>
          </div>
          <div>
            <h2 className="text-4xl font-black text-white mb-4 leading-tight">Platform-wide <br /><span className="text-orange-500">Mastery.</span></h2>
            <p className="text-slate-300 font-medium">Full governance, detailed analytics, and marketplace moderation for the world's premier travel ecosystem.</p>
          </div>
        </div>
      </div>

      {/* Right Side: Portal */}
      <div className="w-full lg:w-2/3 flex flex-col items-center justify-center p-8 md:p-16 bg-white overflow-y-auto">
        <div className="w-full max-w-4xl">
          {!selectedRole ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Access Control</h1>
                <p className="text-slate-500 font-medium">Select your role to access your management dashboard</p>
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
                        Open Portal <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quick Login Footer */}
              <div className="mt-16 p-8 bg-slate-900 rounded-[2.5rem] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                <div className="text-left">
                  <h4 className="text-white font-black mb-1 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-500" />
                    Quick Demo Access
                  </h4>
                  <p className="text-slate-400 text-sm font-medium">One-click login for testing each partner role.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => handleQuickLogin('Customer')} className="px-5 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-xs shadow-sm hover:bg-orange-500 hover:text-white transition-all">Customer</button>
                  <button onClick={() => handleQuickLogin('Guide')} className="px-5 py-2.5 bg-teal-500 text-white rounded-xl font-bold text-xs shadow-sm hover:bg-teal-600 transition-all">Guide</button>
                  <button onClick={() => handleQuickLogin('Package Distributor')} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-sm hover:bg-blue-700 transition-all">Distro</button>
                  <button onClick={() => handleQuickLogin('Hotel Partner')} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-sm hover:bg-indigo-700 transition-all">Hotel</button>
                  <button onClick={() => handleQuickLogin('Super Admin')} className="px-5 py-2.5 bg-slate-700 text-white rounded-xl font-bold text-xs shadow-sm hover:bg-slate-800 transition-all">Admin</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto animate-in fade-in zoom-in-95 duration-300">
              <button 
                onClick={() => setSelectedRole(null)}
                className="flex items-center gap-2 text-slate-500 font-bold mb-10 hover:text-orange-600 transition group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Change Role
              </button>

              <div className="mb-10 flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${roles.find(r => r.id === selectedRole)?.color} flex items-center justify-center text-white shadow-xl`}>
                  {React.createElement(roles.find(r => r.id === selectedRole)?.icon || User, { className: "w-7 h-7" })}
                </div>
                <div>
                  <h1 className="text-3xl font-black text-slate-900">{selectedRole} Sign In</h1>
                  <p className="text-slate-500 text-sm font-medium">Enter your credentials to manage your {selectedRole.toLowerCase()} profile</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email / Username</label>
                  <div className="relative">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                      placeholder={DEMO_ACCOUNTS[selectedRole].email}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-14 pr-14 py-4 bg-slate-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full py-5 bg-orange-500 text-white rounded-2xl font-black text-lg hover:bg-orange-600 transition shadow-xl shadow-orange-500/20 active:scale-[0.98]"
                >
                  Sign In to Portal
                </button>
              </form>

              {/* Demo Hint */}
              <div className="mt-10 p-6 bg-orange-50 rounded-2xl border border-orange-100">
                <div className="flex items-center gap-2 mb-2 text-orange-900 font-bold text-sm">
                  <Info className="w-4 h-4" />
                  Testing Credentials:
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-orange-700/60 uppercase tracking-wider">Email</span>
                    <span className="text-orange-900 font-black">{DEMO_ACCOUNTS[selectedRole].email}</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-orange-700/60 uppercase tracking-wider">Pass</span>
                    <span className="text-orange-900 font-black">{DEMO_ACCOUNTS[selectedRole].pass}</span>
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
