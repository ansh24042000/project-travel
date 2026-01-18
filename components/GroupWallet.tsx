
import React, { useState, useMemo } from 'react';
import { X, Plus, Wallet, IndianRupee, CreditCard, Banknote, User, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import { Contribution, WalletSummary } from '../types';

interface GroupWalletProps {
  isOpen: boolean;
  onClose: () => void;
  totalCost: number;
  initialMembers: string[];
}

const GroupWallet: React.FC<GroupWalletProps> = ({ isOpen, onClose, totalCost, initialMembers }) => {
  const [contributions, setContributions] = useState<Contribution[]>([
    { id: '1', memberName: initialMembers[0] || 'You', amount: 5000, mode: 'Online', date: new Date().toLocaleDateString(), remarks: 'Initial Booking' }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newContrib, setNewContrib] = useState({
    memberName: initialMembers[0] || '',
    amount: '',
    mode: 'Online' as 'Online' | 'Physical',
    remarks: ''
  });

  const summary = useMemo(() => {
    const totalPaid = contributions.reduce((sum, c) => sum + c.amount, 0);
    const perPersonShare = totalCost / Math.max(initialMembers.length, 1);
    
    // Settlement logic
    const memberBalances = initialMembers.map(name => {
      const paid = contributions.filter(c => c.memberName === name).reduce((sum, c) => sum + c.amount, 0);
      return {
        name,
        paid,
        status: paid >= perPersonShare ? (paid > perPersonShare ? 'Overpaid' : 'Settled') : 'Due',
        diff: paid - perPersonShare
      };
    });

    return {
      totalPaid,
      remaining: Math.max(0, totalCost - totalPaid),
      perPersonShare,
      memberBalances
    };
  }, [contributions, totalCost, initialMembers]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContrib.memberName || !newContrib.amount) return;

    const entry: Contribution = {
      id: Math.random().toString(36).substr(2, 9),
      memberName: newContrib.memberName,
      amount: parseFloat(newContrib.amount),
      mode: newContrib.mode,
      date: new Date().toLocaleDateString(),
      remarks: newContrib.remarks
    };

    setContributions(prev => [entry, ...prev]);
    setIsAdding(false);
    setNewContrib({ memberName: initialMembers[0], amount: '', mode: 'Online', remarks: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-white h-[90vh] md:h-auto md:max-h-[85vh] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black">Group Wallet</h3>
              <p className="text-xs text-orange-300 font-bold uppercase tracking-widest">Expense Tracker & Settlements</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
          {/* Top Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Total Cost</span>
              <div className="text-2xl font-black text-slate-900">₹{totalCost.toLocaleString()}</div>
            </div>
            <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
              <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1 block">Total Paid</span>
              <div className="text-2xl font-black text-orange-600">₹{summary.totalPaid.toLocaleString()}</div>
            </div>
            <div className="bg-teal-50 p-6 rounded-3xl border border-teal-100">
              <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-1 block">Remaining</span>
              <div className="text-2xl font-black text-teal-600">₹{summary.remaining.toLocaleString()}</div>
            </div>
            <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 block">Individual Share</span>
              <div className="text-2xl font-black text-indigo-600">₹{summary.perPersonShare.toLocaleString()}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Settlement List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-black text-slate-900">Member Status</h4>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{initialMembers.length} Members</div>
              </div>
              <div className="space-y-3">
                {summary.memberBalances.map((mb, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-3xl hover:border-orange-200 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                        mb.status === 'Settled' ? 'bg-teal-100 text-teal-600' : 
                        mb.status === 'Overpaid' ? 'bg-indigo-100 text-indigo-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {mb.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{mb.name}</div>
                        <div className="text-xs text-slate-500 font-medium tracking-tight">Paid: ₹{mb.paid.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-black uppercase tracking-widest flex items-center gap-1 justify-end mb-1 ${
                        mb.status === 'Settled' ? 'text-teal-500' : 
                        mb.status === 'Overpaid' ? 'text-indigo-500' : 'text-orange-500'
                      }`}>
                        {mb.status === 'Settled' && <CheckCircle2 className="w-3 h-3" />}
                        {mb.status === 'Due' && <AlertCircle className="w-3 h-3" />}
                        {mb.status === 'Overpaid' && <TrendingUp className="w-3 h-3" />}
                        {mb.status}
                      </div>
                      <div className="text-sm font-black text-slate-900">
                        {mb.diff === 0 ? '-' : `${mb.diff > 0 ? '+' : '-'} ₹${Math.abs(mb.diff).toLocaleString()}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Contributions History */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-black text-slate-900">Recent Activity</h4>
                <button 
                  onClick={() => setIsAdding(true)}
                  className="p-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-100"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {isAdding ? (
                <form onSubmit={handleAdd} className="p-6 bg-slate-50 rounded-[2rem] border border-orange-100 space-y-4 animate-in slide-in-from-top-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Member</label>
                      <select 
                        value={newContrib.memberName}
                        onChange={e => setNewContrib(prev => ({ ...prev, memberName: e.target.value }))}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold outline-none focus:border-orange-500"
                      >
                        {initialMembers.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount (₹)</label>
                      <input 
                        type="number"
                        value={newContrib.amount}
                        onChange={e => setNewContrib(prev => ({ ...prev, amount: e.target.value }))}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold outline-none focus:border-orange-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Mode</label>
                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => setNewContrib(prev => ({ ...prev, mode: 'Online' }))}
                        className={`flex-1 p-3 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition ${newContrib.mode === 'Online' ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-slate-100 text-slate-500'}`}
                      >
                        <CreditCard className="w-4 h-4" /> Online
                      </button>
                      <button 
                        type="button"
                        onClick={() => setNewContrib(prev => ({ ...prev, mode: 'Physical' }))}
                        className={`flex-1 p-3 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition ${newContrib.mode === 'Physical' ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-slate-100 text-slate-500'}`}
                      >
                        <Banknote className="w-4 h-4" /> Physical
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="submit" className="flex-grow py-3 bg-slate-900 text-white rounded-xl font-black text-sm hover:bg-black transition shadow-lg shadow-slate-200">Add Entry</button>
                    <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 bg-white text-slate-500 rounded-xl font-bold text-sm hover:bg-slate-100 transition">Cancel</button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  {contributions.map(c => (
                    <div key={c.id} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400">
                          {c.mode === 'Online' ? <CreditCard className="w-4 h-4" /> : <Banknote className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{c.memberName}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{c.mode} • {c.date}</div>
                        </div>
                      </div>
                      <div className="text-sm font-black text-slate-900">₹{c.amount.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center shrink-0">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            * This module is for tracking purposes only. No actual funds are stored on the platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupWallet;
