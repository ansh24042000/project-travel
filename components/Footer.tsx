
import React from 'react';
import { Compass, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { UserRole } from '../types';

interface FooterProps {
  onSwitchRole?: (role: UserRole) => void;
}

const Footer: React.FC<FooterProps> = ({ onSwitchRole }) => {
  return (
    <footer id="footer" className="bg-slate-950 text-slate-300 pt-32 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.1),transparent)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Column 1: Brand */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="bg-orange-500 w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/20">
                <Compass className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-display font-black text-white tracking-tighter">Avyukt.</span>
            </div>
            <p className="text-slate-500 leading-relaxed font-medium">
              Next-generation travel orchestration through distributed AI intelligence and verified hospitality networks.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <button key={i} className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300 group">
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Ecosystem */}
          <div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-10">Ecosystem</h4>
            <ul className="space-y-4 text-sm font-bold">
              {[
                { name: 'Customer Portal', role: 'Customer' as UserRole },
                { name: 'Guide Network', role: 'Guide' as UserRole },
                { name: 'Distribution Hub', role: 'Package Distributor' as UserRole },
                { name: 'Hotel Partner', role: 'Hotel Partner' as UserRole },
                { name: 'Super Admin', role: 'Super Admin' as UserRole }
              ].map(item => (
                <li key={item.name}>
                  <button 
                    onClick={() => onSwitchRole?.(item.role)}
                    className="hover:text-orange-500 transition-colors duration-300 flex items-center gap-2 group text-left"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-orange-500 transition-colors"></div>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Logistics */}
          <div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-10">Logistics</h4>
            <ul className="space-y-4 text-sm font-bold">
              {['Inventory Master', 'Package Synthesis', 'Route Optimization', 'Itinerary Engine', 'Global Support'].map(link => (
                <li key={link}>
                  <button className="hover:text-orange-500 transition-colors duration-300 flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-orange-500 transition-colors"></div>
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Terminal */}
          <div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-10">Terminal</h4>
            <ul className="space-y-8 text-sm font-bold">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-orange-500/50 transition-colors">
                  <MapPin className="w-5 h-5 text-orange-500" />
                </div>
                <span className="text-slate-400 leading-tight">Sector 7, Innovation Hub, <br />Mumbai, MH 400001</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-orange-500/50 transition-colors">
                  <Phone className="w-5 h-5 text-orange-500" />
                </div>
                <span className="text-slate-400">+91 9900 8877 66</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-orange-500/50 transition-colors">
                  <Mail className="w-5 h-5 text-orange-500" />
                </div>
                <span className="text-slate-400">ops@avyukt.ai</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
          <p>© 2024 Avyukt Intelligence Systems. Synchronized.</p>
          <div className="flex gap-10">
            <button className="hover:text-orange-500 transition-colors">Data Privacy</button>
            <button className="hover:text-orange-500 transition-colors">System Terms</button>
            <button className="hover:text-orange-500 transition-colors">Node Status</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
