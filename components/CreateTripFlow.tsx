import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Users, 
  IndianRupee, 
  Info, 
  Camera, 
  Plus, 
  Trash2,
  Check,
  Shield,
  Zap,
  Globe,
  Settings,
  MessageSquare
} from 'lucide-react';
import { CommunityTrip, UserSession } from '../types';

interface CreateTripFlowProps {
  onBack: () => void;
  onComplete: (trip: Partial<CommunityTrip>) => void;
  session: UserSession;
}

const CreateTripFlow: React.FC<CreateTripFlowProps> = ({ onBack, onComplete, session }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    duration: '',
    type: 'Backpacking' as any,
    budget: 0,
    maxMembers: 4,
    description: '',
    visibility: 'Public' as const,
    rules: {
      smoking: false,
      drinking: false,
      mixedGroup: true,
      ageRestricted: true
    },
    approvalMode: 'Manual' as const,
    coverImage: 'https://images.unsplash.com/photo-1596701062351-df5f8a42f431?auto=format&fit=crop&q=80&w=1200',
    itinerary: [{ day: 1, plan: '' }]
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const addDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, plan: '' }]
    }));
  };

  const updateItinerary = (dayIdx: number, plan: string) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[dayIdx].plan = plan;
    setFormData(prev => ({ ...prev, itinerary: newItinerary }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onComplete({
        ...formData,
        id: `trip-${Math.random().toString(36).substr(2, 9)}`,
        organizer: {
          id: session.id || 'current-user',
          name: session.fullName,
          image: 'https://i.pravatar.cc/150?u=current',
          rating: 5.0,
          tripsHosted: 0,
          isVerified: true
        },
        members: [{
          id: session.id || 'current-user',
          name: session.fullName,
          image: 'https://i.pravatar.cc/150?u=current',
          city: session.startingCity,
          role: 'Organizer'
        }],
        requests: [],
        wallet: {
          totalCost: formData.budget,
          contributions: [],
          members: [session.fullName]
        }
      } as any);
      setLoading(false);
    }, 1500);
  };

  const tripTypes = ['Adventure', 'Backpacking', 'Family', 'Religious', 'Bike Trip', 'Trekking', 'Luxury'];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-40">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <button onClick={onBack} className="flex items-center gap-3 text-slate-400 hover:text-orange-500 font-black text-xs uppercase tracking-[0.3em] transition group mb-8">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Abort Synthesis
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-orange-500 font-black text-[10px] uppercase tracking-[0.3em] block mb-2">Expedition Architect</span>
              <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 tracking-tighter">New Trip <span className="text-slate-300">Module.</span></h1>
            </div>
            <div className="text-right">
              <span className="text-2xl font-display font-black text-slate-900">{step}/5</span>
              <div className="w-32 h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / 5) * 100}%` }}
                  className="h-full bg-orange-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-10 md:p-16 space-y-10"
              >
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block ml-1">Trip Name</label>
                  <input 
                    type="text"
                    placeholder="e.g. Manali Adventure Expedition"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-3xl outline-none focus:border-orange-500 focus:bg-white transition-all font-bold text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block ml-1">Destination</label>
                    <div className="relative">
                      <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                      <input 
                        type="text"
                        placeholder="City, Country"
                        value={formData.destination}
                        onChange={e => setFormData(p => ({ ...p, destination: e.target.value }))}
                        className="w-full pl-16 pr-8 py-5 bg-slate-50 border-2 border-transparent rounded-3xl outline-none focus:border-orange-500 focus:bg-white transition-all font-bold text-slate-800"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block ml-1">Trip Cycle</label>
                    <div className="relative">
                      <Settings className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                      <input 
                        type="text"
                        placeholder="e.g. 10 Days"
                        value={formData.duration}
                        onChange={e => setFormData(p => ({ ...p, duration: e.target.value }))}
                        className="w-full pl-16 pr-8 py-5 bg-slate-50 border-2 border-transparent rounded-3xl outline-none focus:border-orange-500 focus:bg-white transition-all font-bold text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block ml-1">Modality</label>
                  <div className="flex flex-wrap gap-3">
                    {tripTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => setFormData(p => ({ ...p, type }))}
                        className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                          formData.type === type 
                            ? 'bg-slate-900 text-white shadow-xl' 
                            : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-10 md:p-16 space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block ml-1">Payload Budget (per seat)</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-orange-500" />
                      <input 
                        type="number"
                        placeholder="0"
                        value={formData.budget}
                        onChange={e => setFormData(p => ({ ...p, budget: parseInt(e.target.value) || 0 }))}
                        className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-transparent rounded-3xl outline-none focus:border-orange-500 focus:bg-white transition-all text-3xl font-display font-black text-slate-900"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block ml-1">Max Group Capacity</label>
                    <div className="relative">
                      <Users className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-orange-500" />
                      <input 
                        type="number"
                        placeholder="4"
                        value={formData.maxMembers}
                        onChange={e => setFormData(p => ({ ...p, maxMembers: parseInt(e.target.value) || 1 }))}
                        className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-transparent rounded-3xl outline-none focus:border-orange-500 focus:bg-white transition-all text-3xl font-display font-black text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block ml-1">Module Description</label>
                  <textarea 
                    rows={6}
                    placeholder="Describe the trip mission and expected traveler profile..."
                    value={formData.description}
                    onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                    className="w-full px-8 py-6 bg-slate-50 border-2 border-transparent rounded-3xl outline-none focus:border-orange-500 focus:bg-white transition-all font-medium text-slate-700 leading-relaxed resize-none"
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-10 md:p-16 space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group cursor-pointer" onClick={() => setFormData(p => ({ ...p, rules: { ...p.rules, smoking: !p.rules.smoking } }))}>
                    <div className="space-y-1">
                      <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Smoking Protocols</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Toggle allowance</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full transition-colors relative ${formData.rules.smoking ? 'bg-orange-500' : 'bg-slate-300'}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.rules.smoking ? 'left-7' : 'left-1'}`} />
                    </div>
                  </div>
                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group cursor-pointer" onClick={() => setFormData(p => ({ ...p, rules: { ...p.rules, drinking: !p.rules.drinking } }))}>
                    <div className="space-y-1">
                      <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Drinking Protocols</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Toggle allowance</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full transition-colors relative ${formData.rules.drinking ? 'bg-orange-500' : 'bg-slate-300'}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.rules.drinking ? 'left-7' : 'left-1'}`} />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block ml-1">Access Logic</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setFormData(p => ({ ...p, visibility: 'Public' }))}
                      className={`p-6 rounded-2xl border-2 transition-all text-left space-y-2 ${formData.visibility === 'Public' ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-100 text-slate-400'}`}
                    >
                      <Globe className={`w-6 h-6 ${formData.visibility === 'Public' ? 'text-orange-500' : ''}`} />
                      <h5 className="font-black text-xs uppercase tracking-widest">Public Index</h5>
                      <p className="text-[10px] opacity-60 uppercase font-black tracking-widest">Open discovery</p>
                    </button>
                    <button 
                      onClick={() => setFormData(p => ({ ...p, visibility: 'Invite Only' }))}
                      className={`p-6 rounded-2xl border-2 transition-all text-left space-y-2 ${formData.visibility === 'Invite Only' ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-100 text-slate-400'}`}
                    >
                      <Shield className={`w-6 h-6 ${formData.visibility === 'Invite Only' ? 'text-orange-500' : ''}`} />
                      <h5 className="font-black text-xs uppercase tracking-widest">Invite Encrypted</h5>
                      <p className="text-[10px] opacity-60 uppercase font-black tracking-widest">Restricted flow</p>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-10 md:p-16 space-y-10"
              >
                <div className="space-y-6">
                  {formData.itinerary.map((day, idx) => (
                    <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-4 py-1.5 bg-slate-950 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">Day {day.day}</span>
                        {formData.itinerary.length > 1 && (
                          <button 
                            onClick={() => setFormData(p => ({ ...p, itinerary: p.itinerary.filter((_, i) => i !== idx) }))}
                            className="text-red-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      <textarea 
                        rows={3}
                        placeholder="Plan for the day..."
                        value={day.plan}
                        onChange={e => updateItinerary(idx, e.target.value)}
                        className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:border-orange-500 transition-all font-bold text-slate-700"
                      />
                    </div>
                  ))}
                  
                  <button 
                    onClick={addDay}
                    className="w-full py-6 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-50 hover:border-orange-500/50 hover:text-orange-500 transition-all flex items-center justify-center gap-3"
                  >
                    <Plus className="w-5 h-5" />
                    Append Day Plan
                  </button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-10 md:p-16 space-y-10"
              >
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block ml-1">Launch Media</label>
                  <div className="relative aspect-video rounded-[3rem] overflow-hidden border-2 border-dashed border-slate-200 group hover:border-orange-500 transition-all cursor-pointer">
                    <img src={formData.coverImage} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-12 h-12 mb-4" />
                      <span className="font-black text-xs uppercase tracking-[0.3em]">Synch Asset</span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100 flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-orange-500 uppercase text-xs tracking-widest mb-1">Final Authorization</h4>
                    <p className="text-xs text-orange-400 font-bold uppercase tracking-widest leading-relaxed">
                      By launching this module, you agree to host a transparent and high-fidelity journey. Your reputation score will adjust based on fulfillment.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="px-10 md:px-16 py-10 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <button 
              onClick={prevStep}
              className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-slate-900'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              Reverse
            </button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={step === 5 ? handleSubmit : nextStep}
              disabled={loading}
              className="px-12 py-5 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center gap-3 shadow-xl shadow-slate-200"
            >
              {loading ? (
                <>Synchronizing...</>
              ) : step === 5 ? (
                <>Final Launch</>
              ) : (
                <>Advance Interaction <ArrowRight className="w-5 h-5" /></>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTripFlow;
