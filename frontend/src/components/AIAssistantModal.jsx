import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, ArrowRight, Camera, Tent, Laptop, ShieldCheck } from 'lucide-react';
import { sampleItems } from '../data/items';

export const AIAssistantModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hi! I'm BorrowBot 🤖, your AI Rental Concierge. Tell me what you're planning, and I'll find the perfect gear nearby for you!",
      suggestedQueries: [
        "I need a camera for wildlife photography.",
        "Recommend gear for a weekend camping trip.",
        "How does the refundable security deposit work?"
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

      const q = query.toLowerCase();
      if (q.includes('camera') || q.includes('wildlife') || q.includes('photo')) {
        aiReply = "For wildlife photography, I recommend this top-tier mirrorless setup:";
        recommendedItems = sampleItems.filter(i => i.category === 'Cameras');
      } else if (q.includes('camp') || q.includes('outdoor') || q.includes('tent')) {
        aiReply = "Here is the ultimate camping package available nearby:";
        recommendedItems = sampleItems.filter(i => i.category === 'Camping');
      } else if (q.includes('laptop') || q.includes('code') || q.includes('work')) {
        aiReply = "For high-performance work or travel, check out these laptops:";
        recommendedItems = sampleItems.filter(i => i.category === 'Laptops');
      } else if (q.includes('deposit') || q.includes('how')) {
        aiReply = "BorrowBridge places a temporary security deposit authorization when you confirm your booking. Once you return the item in its original condition, the deposit is 100% refunded to your original payment method immediately!";
      } else {
        aiReply = "Based on your request, here are top-rated items available for instant local pickup today:";
        recommendedItems = sampleItems.slice(0, 3);
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiReply,
        items: recommendedItems.slice(0, 3)
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
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
                  Hyperlocal Rental Concierge
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
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Render Item Recommendation Cards if attached */}
                  {msg.items && msg.items.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.items.map(item => (
                        <div
                          key={item.id}
                          onClick={() => {
                            onClose();
                            navigate(`/item/${item.id}`);
                          }}
                          className="flex items-center gap-3 p-2 bg-slate-100 dark:bg-slate-700/60 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer transition border border-slate-200 dark:border-slate-600"
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
                              ₹{item.dailyRent}/day • {item.distance} mi away
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
                  <div className="mt-3 flex flex-wrap gap-1.5 max-w-[90%]">
                    {msg.suggestedQueries.map((sq, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(sq)}
                        className="px-3 py-1.5 text-xs font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition text-left"
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
              placeholder="Ask BorrowBot anything..."
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
