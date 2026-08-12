import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, ArrowRight, Camera, Tent, Laptop, ShieldCheck, MapPin } from 'lucide-react';
import { sampleItems } from '../data/items';

export const AIAssistantModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am BorrowBot AI 🤖, your smart rental assistant for Bhimavaram. What gear or equipment are you looking for today?",
      suggestedQueries: [
        "Recommend camera gear in Bhimavaram",
        "Laptops for programming or video editing",
        "Power tools or camping kits under ₹350/day",
        "How does the ₹9 platform fee & deposit escrow work?"
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = '';
      let recommendedItems = [];
      const q = query.toLowerCase().trim();

      // PRIORITIZE PLATFORM QUESTIONS FIRST (Fee, Escrow, Deposit, How it works)
      if (q.includes('fee') || q.includes('deposit') || q.includes('escrow') || q.includes('how does') || q.includes('how it') || q.includes('platform') || q.includes('pay') || q.includes('trust')) {
        aiReply = "BorrowBridge Platform Policies & Safety Guarantees:\n\n1. Flat Platform Fee: Only ₹9.00 (non-refundable) per completed reservation.\n2. Security Deposit: A temporary refundable deposit is authorized at booking and held safely in platform escrow.\n3. Automatic Refund: Once the item is inspected and returned in original condition, your deposit is 100% refunded back to your bank account immediately!";
        recommendedItems = [];
      } else if (q.includes('laptop') || q.includes('macbook') || q.includes('program') || q.includes('code') || q.includes('edit') || q.includes('work') || q.includes('asus') || q.includes('apple')) {
        aiReply = "Here are high-performance laptops available for rent nearby:";
        recommendedItems = sampleItems.filter(i => i.category === 'Laptops');
      } else if (q.includes('camera') || q.includes('photo') || q.includes('dslr') || q.includes('lens') || q.includes('gopro') || q.includes('wildlife')) {
        aiReply = "Here are top-rated cameras and photography gear available for direct pickup in Bhimavaram:";
        recommendedItems = sampleItems.filter(i => i.category === 'Cameras');
      } else if (q.includes('projector') || q.includes('movie') || q.includes('screen') || q.includes('tv')) {
        aiReply = "Here are smart 4K home theater projectors with portable screens:";
        recommendedItems = sampleItems.filter(i => i.category === 'Projectors');
      } else if (q.includes('tool') || q.includes('dewalt') || q.includes('drill') || q.includes('work') || q.includes('karcher')) {
        aiReply = "Here are heavy-duty power tools and equipment kits available locally:";
        recommendedItems = sampleItems.filter(i => i.category === 'Tools');
      } else if (q.includes('camp') || q.includes('tent') || q.includes('outdoor') || q.includes('hike')) {
        aiReply = "Here are all-weather camping tents and outdoor gear packages:";
        recommendedItems = sampleItems.filter(i => i.category === 'Camping');
      } else if (q.includes('drone') || q.includes('mavic') || q.includes('dji') || q.includes('aerial')) {
        aiReply = "Here are flagship 4K/8K cine drones available for instant booking:";
        recommendedItems = sampleItems.filter(i => i.category === 'Drones');
      } else if (q.includes('cheap') || q.includes('under') || q.includes('300') || q.includes('budget') || q.includes('350')) {
        aiReply = "Here are budget-friendly items under ₹350/day:";
        recommendedItems = sampleItems.filter(i => i.dailyRent <= 350);
      } else if (q.includes('bhimavaram') || q.includes('near') || q.includes('location') || q.includes('srkr') || q.includes('undi')) {
        aiReply = "All listings on BorrowBridge are located within a 5.0 km hyperlocal radius in Bhimavaram (SRKR Road, J P Road, Undi Road, P P Road):";
        recommendedItems = sampleItems.slice(0, 4);
      } else {
        // Generic Keyword Match across Title & Description
        const matches = sampleItems.filter(i => 
          i.title.toLowerCase().includes(q) || 
          i.description.toLowerCase().includes(q) || 
          i.category.toLowerCase().includes(q)
        );

        if (matches.length > 0) {
          aiReply = `I found ${matches.length} matching item(s) for "${query}":`;
          recommendedItems = matches;
        } else {
          aiReply = `I found top verified equipment near Bhimavaram for "${query}". Check out these popular choices:`;
          recommendedItems = sampleItems.slice(0, 3);
        }
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiReply,
        items: recommendedItems.slice(0, 4)
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] glass-panel rounded-3xl shadow-2xl border border-blue-500/30 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Bot className="w-6 h-6 text-amber-300 animate-bounce" />
              </div>
              <div>
                <h3 className="font-bold text-base flex items-center gap-1.5">
                  BorrowBot AI
                  <Sparkles className="w-4 h-4 text-amber-300 fill-current" />
                </h3>
                <p className="text-xs text-blue-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Hyperlocal Bhimavaram Concierge
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 transition text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none font-medium'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Render Item Recommendation Cards */}
                  {msg.items && msg.items.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.items.map(item => (
                        <div
                          key={item.id}
                          onClick={() => {
                            onClose();
                            navigate(`/item/${item.id}`);
                          }}
                          className="flex items-center gap-3 p-2.5 bg-slate-100 dark:bg-slate-700/60 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer transition border border-slate-200 dark:border-slate-600"
                        >
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {item.title}
                            </p>
                            <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                              ₹{item.dailyRent}/day • {item.distanceKm || item.distance || 0.8} km away
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Suggested Query Buttons */}
                {msg.suggestedQueries && (
                  <div className="mt-3 flex flex-wrap gap-1.5 max-w-[95%]">
                    {msg.suggestedQueries.map((sq, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(sq)}
                        className="px-3 py-1.5 text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition text-left shadow-sm"
                      >
                        💡 {sq}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-2xl w-24 border border-slate-200 dark:border-slate-700">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask BorrowBot for any gear or platform questions..."
              className="flex-1 px-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-2.5 rounded-full bg-blue-600 disabled:opacity-50 text-white hover:bg-blue-700 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
