
import React, { useState } from 'react';
import { X, Smartphone, Mail, Globe } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [method, setMethod] = useState<'selection' | 'form'>('selection');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:bg-slate-50 rounded-full transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500">Log in to sync your trips across all devices.</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => onSuccess()}
              className="w-full flex items-center gap-4 px-6 py-4 bg-white border border-slate-200 rounded-2xl font-semibold hover:bg-slate-50 transition active:scale-95"
            >
              <Globe className="w-5 h-5 text-red-500" />
              <span>Continue with Google</span>
            </button>
            
            <button 
              onClick={() => setMethod('form')}
              className="w-full flex items-center gap-4 px-6 py-4 bg-white border border-slate-200 rounded-2xl font-semibold hover:bg-slate-50 transition active:scale-95"
            >
              <Smartphone className="w-5 h-5 text-slate-600" />
              <span>Continue with Mobile</span>
            </button>

            <button 
              onClick={() => setMethod('form')}
              className="w-full flex items-center gap-4 px-6 py-4 bg-white border border-slate-200 rounded-2xl font-semibold hover:bg-slate-50 transition active:scale-95"
            >
              <Mail className="w-5 h-5 text-slate-600" />
              <span>Continue with Email</span>
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account? 
              <button className="ml-1 text-indigo-600 font-bold hover:underline">Sign Up</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
