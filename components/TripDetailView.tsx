import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  IndianRupee, 
  Shield, 
  Sparkles, 
  Zap, 
  MessageSquare,
  Wallet,
  Share2,
  Heart,
  CheckCircle,
  Clock,
  ArrowRight,
  Send,
  X
} from 'lucide-react';
import { CommunityTrip, UserSession, TripMember, ChatMessage } from '../types';
import GroupWallet from './GroupWallet';

interface TripDetailViewProps {
  trip: CommunityTrip;
  onBack: () => void;
  session: UserSession;
}

const TripDetailView: React.FC<TripDetailViewProps> = ({ trip, onBack, session }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'itinerary' | 'chat' | 'wallet'>('info');

  const isMember = trip.members.some(m => m.id === session.id);
  const isOrganizer = trip.organizer.id === session.id;

  const handleJoinRequest = () => {
    setIsRequesting(true);
    // Simulate API call
    setTimeout(() => {
      setIsRequesting(false);
      setShowJoinForm(false);
      alert('Join request transmitted to organizer. Awaiting synchronization.');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-8">
          <div>
            <button onClick={onBack} className="flex items-center gap-3 text-slate-400 hover:text-orange-500 font-black text-xs uppercase tracking-[0.3em] transition group mb-6">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Return to Marketplace
            </button>
            <div className="flex items-center gap-4 mb-4">
              <span className="px-4 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-[10px] font-black uppercase tracking-[0.4em]"> Expedition Live</span>
              <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em]">#{trip.id}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 tracking-tighter leading-none">{trip.name}</h1>
          </div>

          <div className="flex gap-4">
            <button className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-500/50 transition-all shadow-sm">
              <Share2 className="w-6 h-6" />
            </button>
            <button className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-500/50 transition-all shadow-sm">
              <Heart className="w-6 h-6" />
            </button>
            {!isMember && !isOrganizer && (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowJoinForm(true)}
                className="px-10 py-5 bg-orange-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-orange-500/30 flex items-center gap-3"
              >
                Request Authorization <Users className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-[500px] rounded-[4rem] overflow-hidden mb-16 shadow-3xl">
          <img src={trip.coverImage} alt={trip.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
          <div className="absolute bottom-12 left-12 right-12 flex flex-wrap gap-8 items-end justify-between">
            <div className="flex gap-12">
               <div className="space-y-1">
                 <span className="text-white/60 font-black text-[10px] uppercase tracking-widest">Target Dest</span>
                 <p className="text-3xl font-display font-black text-white">{trip.destination}</p>
               </div>
               <div className="space-y-1">
                 <span className="text-white/60 font-black text-[10px] uppercase tracking-widest">Time Window</span>
                 <p className="text-3xl font-display font-black text-white">{trip.duration}</p>
               </div>
               <div className="space-y-1">
                 <span className="text-white/60 font-black text-[10px] uppercase tracking-widest">Payload</span>
                 <p className="text-3xl font-display font-black text-white">₹{trip.budget.toLocaleString()}</p>
               </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 flex gap-10">
               <div className="text-center">
                 <p className="text-white/50 text-[10px] font-black uppercase tracking-widest mb-1">Slots</p>
                 <p className="text-xl font-black text-white">{trip.maxMembers}</p>
               </div>
               <div className="text-center">
                 <p className="text-white/50 text-[10px] font-black uppercase tracking-widest mb-1">Joined</p>
                 <p className="text-xl font-black text-white">{trip.members.length}</p>
               </div>
               <div className="text-center">
                 <p className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-1">Diff</p>
                 <p className="text-xl font-black text-white">{trip.maxMembers - trip.members.length}</p>
               </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        {isMember && (
          <div className="flex gap-4 mb-12 bg-white p-2 rounded-3xl border border-slate-100 w-fit">
            {[
              { id: 'info', label: 'Briefing', icon: Shield },
              { id: 'itinerary', label: 'Tactical Plan', icon: MapPin },
              { id: 'chat', label: 'Comms Hub', icon: MessageSquare },
              { id: 'wallet', label: 'Payload Wallet', icon: Wallet }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 transition-all ${
                  activeTab === tab.id ? 'bg-slate-950 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-orange-500' : ''}`} />
                {tab.label}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-16">
            <AnimatePresence mode="wait">
              {activeTab === 'info' && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-16"
                >
                  <section>
                    <h3 className="text-2xl font-display font-black text-slate-900 mb-8 border-l-4 border-orange-500 pl-6 uppercase tracking-tight">Mission Statement</h3>
                    <p className="text-xl text-slate-600 font-medium leading-relaxed italic">
                      "{trip.description}"
                    </p>
                  </section>

                  <section>
                    <h3 className="text-2xl font-display font-black text-slate-900 mb-8 border-l-4 border-orange-500 pl-6 uppercase tracking-tight">Engagement Protocols</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {[
                        { label: 'Smoking', val: trip.rules.smoking, icon: CheckCircle },
                        { label: 'Drinking', val: trip.rules.drinking, icon: CheckCircle },
                        { label: 'Mixed Group', val: trip.rules.mixedGroup, icon: CheckCircle },
                        { label: 'Age Restricted', val: trip.rules.ageRestricted, icon: CheckCircle }
                      ].map(rule => (
                        <div key={rule.label} className={`p-6 rounded-3xl border-2 transition-all ${rule.val ? 'bg-orange-50 border-orange-100' : 'bg-slate-50 border-slate-100 opacity-50'}`}>
                          <rule.icon className={`w-6 h-6 mb-4 ${rule.val ? 'text-orange-500' : 'text-slate-300'}`} />
                          <h4 className={`text-[10px] font-black uppercase tracking-widest ${rule.val ? 'text-orange-600' : 'text-slate-400'}`}>{rule.label}</h4>
                          <span className={`text-[8px] font-black uppercase tracking-widest ${rule.val ? 'text-orange-400' : 'text-slate-300'}`}>{rule.val ? 'Allowed' : 'Prohibited'}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-display font-black text-slate-900 mb-8 border-l-4 border-orange-500 pl-6 uppercase tracking-tight">Tactical Schedule</h3>
                    <div className="space-y-6">
                      {trip.itinerary.map((day, idx) => (
                        <div key={idx} className="group flex gap-8">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center font-black text-sm z-10 shadow-lg shrink-0">
                              {day.day}
                            </div>
                            <div className="flex-grow w-1 bg-slate-200 mt-2 mb-2 group-last:hidden"></div>
                          </div>
                          <div className="pb-10">
                            <h4 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Operation Window {day.day}</h4>
                            <p className="text-slate-500 font-medium leading-relaxed">{day.plan}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === 'itinerary' && (
                <motion.div
                   key="itinerary"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="space-y-8"
                >
                   {trip.itinerary.map((day, idx) => (
                    <div key={idx} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-lg">0{day.day}</span>
                        <h4 className="text-2xl font-display font-black text-slate-900 uppercase tracking-tight">Core Itinerary Phase</h4>
                      </div>
                      <p className="text-lg text-slate-600 font-medium leading-relaxed border-l-4 border-slate-100 pl-6">
                        {day.plan}
                      </p>
                    </div>
                   ))}
                </motion.div>
              )}

              {activeTab === 'chat' && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl h-[700px] flex flex-col overflow-hidden"
                >
                  <div className="p-10 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                         <MessageSquare className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-xl text-slate-900">Operation Comms</h4>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Secure Channel Encrypted</p>
                      </div>
                    </div>
                    <div className="flex -space-x-3">
                      {trip.members.map((m, idx) => (
                        <div key={idx} className="w-10 h-10 rounded-full border-4 border-white overflow-hidden shadow-sm" title={m.name}>
                          <img src={m.image} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-grow p-10 overflow-y-auto space-y-8 scrollbar-hide">
                    {/* Mock messages */}
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                        <img src={trip.organizer.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="max-w-[70%] space-y-2">
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{trip.organizer.name}</span>
                           <span className="text-[8px] text-slate-300 font-bold">14:22</span>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-[2rem] rounded-tl-none font-medium text-slate-700 shadow-sm">
                          Welcome to the mission team everyone! Looking forward to an incredible adventure together.
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 justify-end">
                      <div className="max-w-[70%] space-y-2 text-right">
                        <div className="flex items-center justify-end gap-3">
                           <span className="text-[8px] text-slate-300 font-bold">14:25</span>
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">You</span>
                        </div>
                        <div className="bg-orange-500 p-6 rounded-[2rem] rounded-tr-none font-medium text-white shadow-xl shadow-orange-500/20">
                          Excited to join! Any specific gear we should bring for the trekking phase?
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 border-t border-slate-100">
                    <div className="relative group">
                      <input 
                        type="text" 
                        placeholder="Transmit intel..."
                        className="w-full pl-8 pr-20 py-5 bg-slate-50 border-2 border-transparent rounded-3xl outline-none focus:border-orange-500 focus:bg-white transition-all font-bold text-slate-800"
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-orange-500 transition-all">
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'wallet' && (
                <motion.div
                  key="wallet"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <GroupWallet 
                    totalCost={trip.budget} 
                    initialMembers={trip.members.map(m => m.name)} 
                    inline={true} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            {/* Host Section */}
            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[40px] rounded-full"></div>
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10">Operation Host</h4>
               <div className="flex items-center gap-6 mb-10">
                 <div className="relative">
                   <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
                     <img src={trip.organizer.image} alt={trip.organizer.name} className="w-full h-full object-cover" />
                   </div>
                   {trip.organizer.isVerified && (
                     <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 border-4 border-white rounded-2xl flex items-center justify-center shadow-lg">
                       <CheckCircle className="w-5 h-5 text-white" />
                     </div>
                   )}
                 </div>
                 <div>
                   <h5 className="text-2xl font-display font-black text-slate-900 leading-none mb-2">{trip.organizer.name}</h5>
                   <div className="flex items-center gap-4">
                     <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 rounded-lg text-orange-600">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black">{trip.organizer.rating}</span>
                     </div>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{trip.organizer.tripsHosted} Expeditions</span>
                   </div>
                 </div>
               </div>

               <div className="space-y-4">
                 <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 transition-all flex items-center justify-center gap-3">
                   Host Intelligence <ArrowRight className="w-4 h-4" />
                 </button>
                 <button className="w-full py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">
                   Secure Private Comms
                 </button>
               </div>
            </section>

            {/* Members Section */}
            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
              <div className="flex items-center justify-between mb-10">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Active Cohort</h4>
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{trip.members.length}/{trip.maxMembers}</span>
              </div>
              <div className="space-y-6">
                {trip.members.map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-slate-50 group-hover:border-orange-500/50 transition-all">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">{member.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{member.city}</p>
                      </div>
                    </div>
                    {member.role === 'Organizer' && (
                      <span className="px-3 py-1 bg-slate-950 text-white text-[8px] font-black uppercase tracking-widest rounded-lg">Lead</span>
                    )}
                  </div>
                ))}
                {trip.maxMembers > trip.members.length && (
                  <div className="flex items-center gap-4 opacity-40">
                     <div className="w-12 h-12 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center">
                        <Users className="w-5 h-5 text-slate-300" />
                     </div>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Awaiting Synchronized Seat...</span>
                  </div>
                )}
              </div>
            </section>

            {/* Meta Info */}
            <section className="p-10 rounded-[3rem] bg-slate-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-[50px] rounded-full"></div>
               <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-8">System Analytics</h4>
               <div className="space-y-6">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                     <Shield className="w-5 h-5 text-orange-500" />
                   </div>
                   <div>
                     <p className="text-[10px] font-black text-white uppercase tracking-widest">ID Verified</p>
                     <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Organizer Identity Sync</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                     <Zap className="w-5 h-5 text-orange-500" />
                   </div>
                   <div>
                     <p className="text-[10px] font-black text-white uppercase tracking-widest">Rapid Wallet</p>
                     <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Expense Protocol Active</p>
                   </div>
                 </div>
                  <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                     <Clock className="w-5 h-5 text-orange-500" />
                   </div>
                   <div>
                     <p className="text-[10px] font-black text-white uppercase tracking-widest">Auto-Archive</p>
                     <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Ends in 24d 12h</p>
                   </div>
                 </div>
               </div>
            </section>
          </div>
        </div>
      </div>

      {/* Join Request Modal */}
      <AnimatePresence>
        {showJoinForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowJoinForm(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[4rem] shadow-4xl border border-slate-100 overflow-hidden"
            >
              <div className="p-10 md:p-14">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <span className="text-orange-500 font-black text-[10px] uppercase tracking-[0.4em] block mb-2">Request Link</span>
                    <h3 className="text-3xl font-display font-black text-slate-900 tracking-tighter">Cohort Access.</h3>
                  </div>
                  <button onClick={() => setShowJoinForm(false)} className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block ml-1">Synthesis Intro</label>
                    <textarea 
                      rows={5}
                      placeholder="Introduce yourself to the organizer. Why should you join this mission?"
                      value={requestMessage}
                      onChange={e => setRequestMessage(e.target.value)}
                      className="w-full px-8 py-6 bg-slate-50 border-2 border-transparent rounded-3xl outline-none focus:border-orange-500 focus:bg-white transition-all font-medium text-slate-700 leading-relaxed resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-1">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Identity Match</span>
                       <p className="text-sm font-black text-slate-900">{session.fullName}</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-1">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Reputation</span>
                       <div className="flex items-center gap-1.5 text-orange-500">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span className="text-sm font-black text-slate-900">5.0</span>
                       </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleJoinRequest}
                    disabled={isRequesting || !requestMessage.trim()}
                    className={`w-full py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-widest transition-all shadow-2xl ${
                      isRequesting || !requestMessage.trim()
                        ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                        : 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/30'
                    }`}
                  >
                    {isRequesting ? 'Transmitting...' : 'Initiate Handshake'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TripDetailView;
