
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, LogOut, ChevronDown, LayoutDashboard, Sparkles } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  onHomeClick: () => void;
  onDestinationsClick: () => void;
  onPackagesClick: () => void;
  onAboutClick: () => void;
  onCommunityExplore?: () => void;
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
  onCommunityExplore,
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
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[60] px-6 py-6 md:px-12 transition-all duration-500 ${
        isSolid ? 'py-4' : 'py-6'
      }`}
    >
      <div className={`max-w-7xl mx-auto flex items-center justify-between px-8 py-3 rounded-[2rem] transition-all duration-500 ${
        isSolid 
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/20' 
          : 'bg-white/5 backdrop-blur-md border border-white/10'
      }`}>
        {/* Logo Section */}
        <button 
          onClick={onHomeClick}
          className="flex items-center gap-4 group transition-all"
        >
          <div className={`w-12 h-12 rounded-2xl border transition-all duration-500 overflow-hidden flex items-center justify-center p-1.5 ${
            isSolid ? 'bg-slate-950 border-slate-800 shadow-xl' : 'bg-white/10 backdrop-blur-md border-white/20'
          }`}>
            <img 
              src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/avyukt-logo.png" 
              alt="Avyukt Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className={`text-2xl font-display font-black tracking-tighter transition-colors duration-500 ${
            isSolid ? 'text-slate-950' : 'text-white'
          }`}>Avyukt.</span>
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 bg-slate-900/5 px-2 py-1 rounded-2xl border border-slate-900/5 backdrop-blur-sm">
          {[
            { label: 'Home', action: onHomeClick },
            { label: 'Destinations', action: onDestinationsClick },
            { label: 'Community', action: () => onCommunityExplore?.() },
            { label: 'Packages', action: onPackagesClick },
            { label: 'About', action: onAboutClick }
          ].map((link) => (
            <button 
              key={link.label}
              onClick={link.action} 
              className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${
                isSolid 
                  ? 'text-slate-600 hover:text-orange-500 hover:bg-white' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 relative">
            {isLoggedIn ? (
              <div className="relative">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-2xl font-bold transition-all ${
                    isSolid ? 'bg-slate-950 text-white shadow-xl shadow-slate-200' : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/10'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-xs text-white border border-white/20 shadow-lg">
                    {userName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] block leading-none font-black text-orange-500 opacity-90 uppercase tracking-[0.2em] mb-0.5">{userRole}</span>
                    <span className="text-sm truncate max-w-[100px] font-black block leading-none">{userName || 'Explorer'}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-64 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 p-3 overflow-hidden z-[70]"
                    >
                      <div className="px-5 py-4 border-b border-slate-50 mb-2">
                        <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-1">{userRole}</p>
                        <p className="text-lg font-display font-black text-slate-950 truncate">{userName}</p>
                      </div>
                      <button 
                        onClick={() => {
                          setShowUserMenu(false);
                          onDashboardClick?.();
                        }}
                        className="w-full flex items-center gap-4 px-5 py-4 text-sm font-black text-slate-700 hover:bg-slate-50 rounded-2xl transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                          <LayoutDashboard className="w-4 h-4 text-orange-500 group-hover:text-white" />
                        </div>
                        Control Center
                      </button>
                      <button 
                        onClick={() => {
                          setShowUserMenu(false);
                          onLogoutClick?.();
                        }}
                        className="w-full flex items-center gap-4 px-5 py-4 text-sm font-black text-red-500 hover:bg-red-50 rounded-2xl transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                          <LogOut className="w-4 h-4" />
                        </div>
                        Secure Exit
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                  isSolid ? 'text-slate-600 hover:text-orange-500' : 'text-white hover:text-white/80'
                }`}
              >
                Access
              </button>
            )}

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartPlanningClick}
              className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 ${
                isSolid 
                  ? 'bg-orange-500 text-white shadow-2xl shadow-orange-500/20 hover:bg-orange-600' 
                  : 'bg-white text-slate-950 hover:bg-orange-500 hover:text-white'
              }`}
            >
              Start Plan
            </motion.button>
          </div>
          
          <button className={`md:hidden p-3 rounded-2xl transition-colors duration-500 ${isSolid ? 'bg-slate-900 text-white' : 'bg-white/10 text-white backdrop-blur-md border border-white/20'}`}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
