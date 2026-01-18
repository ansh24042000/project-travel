
import React, { useState } from 'react';
import { UserSession, TravelerCount, TravelPreference } from '../../types';
import { ChevronLeft, ChevronRight, User, Users, MapPin, Wallet, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';

interface OnboardingFlowProps {
  session: UserSession;
  onUpdate: (updates: Partial<UserSession>) => void;
  onComplete: () => void;
}

const PREFERENCES: TravelPreference[] = ['Hill Station', 'Beach', 'Adventure', 'Religious', 'Wildlife', 'Honeymoon', 'Family'];
const BUDGET_OPTIONS = [
  { id: 'Economy', label: 'Economy', icon: '₹' },
  { id: 'Mid-range', label: 'Mid-range', icon: '₹₹' },
  { id: 'Premium', label: 'Premium', icon: '₹₹₹' }
];

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ session, onUpdate, onComplete }) => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  const totalSteps = 5;

  const handleNext = () => {
    if (step === 1 && !session.fullName.trim()) {
      setError('Please tell us your name to continue');
      return;
    }
    if (step === 2 && session.preferences.length === 0) {
      setError('Please select at least one travel preference');
      return;
    }
    
    setError('');
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError('');
    }
  };

  const togglePreference = (pref: TravelPreference) => {
    const newPrefs = session.preferences.includes(pref)
      ? session.preferences.filter(p => p !== pref)
      : [...session.preferences, pref];
    onUpdate({ preferences: newPrefs });
    if (newPrefs.length > 0) setError('');
  };

  const updateTravelers = (type: keyof TravelerCount, amount: number) => {
    const newVal = Math.max(type === 'adults' ? 1 : 0, session.travelers[type] + amount);
    onUpdate({ travelers: { ...session.travelers, [type]: newVal } });
  };

  const handleSkip = () => {
    setError('');
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100 transition-all duration-500">
        
        {/* Progress bar */}
        <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex gap-1.5">
            {[...Array(totalSteps)].map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${i + 1 <= step ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200'}`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step {step} of {totalSteps}</span>
        </div>

        <div className="p-8 md:p-12">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Hello! Let's get started. 👋</h2>
              <p className="text-slate-500 mb-10">We'll need some basic details to build your perfect trip.</p>
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input 
                      type="text"
                      value={session.fullName}
                      onChange={(e) => onUpdate({ fullName: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all shadow-sm"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Adults (13+)</label>
                    <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-100 rounded-2xl">
                      <button onClick={() => updateTravelers('adults', -1)} className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-slate-100 transition">-</button>
                      <span className="font-black text-xl text-slate-800">{session.travelers.adults}</span>
                      <button onClick={() => updateTravelers('adults', 1)} className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-slate-100 transition">+</button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Children (2-12)</label>
                    <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-100 rounded-2xl">
                      <button onClick={() => updateTravelers('children', -1)} className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-slate-100 transition">-</button>
                      <span className="font-black text-xl text-slate-800">{session.travelers.children}</span>
                      <button onClick={() => updateTravelers('children', 1)} className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-slate-100 transition">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">What's your travel vibe? ✨</h2>
              <p className="text-slate-500 mb-8">Select all that interest you for this trip.</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PREFERENCES.map(pref => {
                  const isActive = session.preferences.includes(pref);
                  return (
                    <button
                      key={pref}
                      onClick={() => togglePreference(pref)}
                      className={`relative p-4 h-32 flex flex-col items-start justify-end rounded-2xl border-2 transition-all group ${isActive ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100 scale-[1.02]' : 'bg-slate-50 border-transparent text-slate-700 hover:border-slate-200'}`}
                    >
                      {isActive && <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-indigo-200" />}
                      <span className={`font-bold text-sm ${isActive ? 'text-indigo-50' : 'text-slate-600'}`}>{pref}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">When are you traveling? 🗓️</h2>
              <p className="text-slate-500 mb-10">Select your preferred dates (Optional).</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Start Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="date"
                      value={session.startDate}
                      onChange={(e) => onUpdate({ startDate: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">End Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="date"
                      value={session.endDate}
                      onChange={(e) => onUpdate({ endDate: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition"
                    />
                  </div>
                </div>
              </div>
              <p className="mt-6 text-sm text-slate-400 italic text-center">Dates help us find seasonal deals and festivals.</p>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Set your budget 💰</h2>
              <p className="text-slate-500 mb-10">How would you like to travel? (Optional).</p>
              
              <div className="space-y-4">
                {BUDGET_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => onUpdate({ budget: opt.id })}
                    className={`w-full p-6 flex items-center justify-between rounded-[2rem] border-2 transition-all ${session.budget === opt.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-slate-50 border-transparent text-slate-700 hover:border-slate-200'}`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${session.budget === opt.id ? 'bg-white text-indigo-600' : 'bg-white shadow-sm text-slate-400'}`}>
                        {opt.icon}
                      </div>
                      <div className="text-left">
                        <span className="font-black text-xl block">{opt.label}</span>
                        <span className={`text-sm ${session.budget === opt.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                          {opt.id === 'Economy' ? 'Smart & affordable' : opt.id === 'Mid-range' ? 'Comfort & style' : 'Ultimate luxury'}
                        </span>
                      </div>
                    </div>
                    {session.budget === opt.id && <CheckCircle2 className="w-6 h-6 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Where do we start? 📍</h2>
              <p className="text-slate-500 mb-10">Enter your starting city to calculate travel (Optional).</p>
              
              <div className="space-y-4">
                <div className="relative group">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input 
                    type="text"
                    value={session.startingCity}
                    onChange={(e) => onUpdate({ startingCity: e.target.value })}
                    placeholder="e.g. New Delhi, India"
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-[2rem] outline-none text-lg font-medium transition-all shadow-sm"
                    autoFocus
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['Mumbai', 'Delhi', 'Bangalore', 'London', 'Dubai'].map(city => (
                    <button 
                      key={city}
                      onClick={() => onUpdate({ startingCity: city })}
                      className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-bold hover:bg-indigo-100 hover:text-indigo-600 transition"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm mt-6 text-center font-bold animate-pulse">{error}</p>}

          <div className="flex items-center justify-between mt-12 gap-4">
            <button 
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 font-bold transition px-6 py-4 rounded-2xl ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            
            <div className="flex-grow flex justify-end gap-3">
              {(step >= 3 && step <= 5) && (
                <button 
                  onClick={handleSkip}
                  className="px-6 py-4 text-slate-400 font-bold hover:text-slate-600 transition"
                >
                  Skip
                </button>
              )}
              
              <button 
                onClick={handleNext}
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 active:scale-95 group"
              >
                {step === totalSteps ? (
                  <>
                    Find My Journey
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
