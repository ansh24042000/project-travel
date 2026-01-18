
import React, { useState, useEffect } from 'react';
import { Menu, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  onHomeClick: () => void;
  onDestinationsClick: () => void;
  onPackagesClick: () => void;
  onAboutClick: () => void;
  onStartPlanningClick: () => void;
  onLoginClick: () => void;
  onLogoutClick?: () => void;
  onDashboardClick?: () => void;
  isLoggedIn: boolean;
  userName?: string;
  userRole?: UserRole;
  forceLight?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onHomeClick, 
  onDestinationsClick, 
  onPackagesClick, 
  onAboutClick, 
  onStartPlanningClick,
  onLoginClick,
  onLogoutClick,
  onDashboardClick,
  isLoggedIn,
  userName,
  userRole,
  forceLight = false
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSolid = forceLight || isScrolled;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] px-6 py-4 md:px-12 transition-all duration-500 ${
      isSolid ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <button 
          onClick={onHomeClick}
          className="flex items-center gap-3 group transition-all"
        >
          <div className={`w-12 h-12 rounded-xl border transition-all duration-500 overflow-hidden flex items-center justify-center ${
            isSolid ? 'bg-slate-900 border-slate-800' : 'bg-white/10 backdrop-blur-md border-white/20'
          }`}>
            <img 
              src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/avyukt-logo.png" 
              alt="Avyukt Logo" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image fails to load
                (e.target as HTMLImageElement).src = "https://placehold.co/100x100/1e293b/orange?text=A";
              }}
            />
          </div>
          <span className={`text-2xl font-black tracking-tighter transition-colors duration-500 ${
            isSolid ? 'text-slate-900' : 'text-white'
          }`}>Avyukt</span>
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <button onClick={onHomeClick} className={`font-bold hover:text-orange-500 transition-colors duration-500 ${isSolid ? 'text-slate-600' : 'text-white'}`}>Home</button>
          <button onClick={onDestinationsClick} className={`font-bold hover:text-orange-500 transition-colors duration-500 ${isSolid ? 'text-slate-600' : 'text-white/90'}`}>Destinations</button>
          <button onClick={onPackagesClick} className={`font-bold hover:text-orange-500 transition-colors duration-500 ${isSolid ? 'text-slate-600' : 'text-white/90'}`}>Packages</button>
          <button onClick={onAboutClick} className={`font-bold hover:text-orange-500 transition-colors duration-500 ${isSolid ? 'text-slate-600' : 'text-white/90'}`}>About</button>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 relative">
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                    isSolid ? 'bg-slate-50 text-slate-900 hover:bg-slate-100' : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-[10px] text-white">
                    {userName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="text-left">
                    <span className="text-xs block leading-none font-black text-orange-500 opacity-80 uppercase tracking-widest">{userRole}</span>
                    <span className="text-sm truncate max-w-[100px] block">{userName || 'My Profile'}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-slate-50">
                      <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-0.5">{userRole}</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{userName}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        onDashboardClick?.();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-orange-500" />
                      Dashboard
                    </button>
                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        onLogoutClick?.();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className={`px-5 py-2.5 rounded-xl font-bold transition-all ${
                  isSolid ? 'text-slate-600 hover:text-orange-500' : 'text-white hover:text-white/80'
                }`}
              >
                Login
              </button>
            )}

            <button 
              onClick={onStartPlanningClick}
              className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all duration-500 active:scale-95 ${
                isSolid 
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-100 hover:bg-orange-600' 
                  : 'bg-orange-500 text-white hover:bg-orange-600 shadow-xl shadow-orange-500/20'
              }`}
            >
              Start Planning
            </button>
          </div>
          
          <button className={`md:hidden p-2 transition-colors duration-500 ${isSolid ? 'text-slate-900' : 'text-white'}`}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
