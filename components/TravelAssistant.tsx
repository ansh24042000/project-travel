
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User, Sparkles, Loader2 } from 'lucide-react';
import { createTravelChat } from '../lib/ai';
import { RecommendedDestination, DetailedItinerary, UserSession } from '../types';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface TravelAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  destination: RecommendedDestination;
  itinerary: DetailedItinerary | null;
  session: UserSession;
}

const TravelAssistant: React.FC<TravelAssistantProps> = ({ isOpen, onClose, destination, itinerary, session }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Hi ${session.fullName}! I'm your Avyukt assistant. I can help you with your trip to ${destination.name}. What's on your mind?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      chatRef.current = createTravelChat(destination, itinerary, session);
    }
  }, [isOpen, destination, itinerary, session]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        chatRef.current = createTravelChat(destination, itinerary, session);
      }
      
      const response = await chatRef.current.sendMessage({ message: userMessage });
      const aiText = response.text || "I'm sorry, I couldn't process that. Could you try rephrasing?";
      
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Oops, I hit a snag. Please check your connection or try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Sidebar Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold">Travel Assistant</h3>
              <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-black">AI-Powered</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Messages */}
        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-6 space-y-6 scroll-smooth"
        >
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-100' : 'bg-slate-100'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-indigo-600" /> : <Sparkles className="w-4 h-4 text-slate-600" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-50 text-slate-700 rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl rounded-tl-none text-slate-400 text-xs font-medium italic">
                  Assistant is typing...
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-slate-100">
          <form onSubmit={handleSend} className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your trip..."
              className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 disabled:bg-slate-300"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-center text-slate-400 mt-4">
            AI can make mistakes. Consider checking important info.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravelAssistant;