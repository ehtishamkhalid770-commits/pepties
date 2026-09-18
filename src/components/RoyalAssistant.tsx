import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, X, Star, Bot, Award, Calendar, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";

interface RoyalAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCartById: (id: string) => void;
}

export default function RoyalAssistant({ isOpen, onClose, onAddToCartById }: RoyalAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "assistant",
      content: "Adaab, Aali Jah! I am the Grand Vizier of Pepties, the humble guardian and advisor of this Royal Estate. By decree of the crown, I am here to guide your magnificent taste. Tell me, do you seek our flaky laminated Gold Patisseries (Patties), our youth-restoring bio-active Peptides, or the ultimate velvet luxuries for your VIP companions?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Map ChatMessage structure to server expectation
      const chatHistory = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Royal communications disrupted.");
      }

      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: "Aali Jah, my sincere apologies. Our courier birds have encountered tempestuous winds (API key configuration or network error). However, you may inspect our treasures directly or consult my guides! If you have your Gemini API Key added in Settings, our link shall be instantly restored.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    { text: "Recommend a savory Gold Patty! 🥐", label: "Savory Puff Recommendation" },
    { text: "Which Peptide restores skin glow? 🧪", label: "Skin Glow Secrets" },
    { text: "Suggest a luxury bed or collar! 🐕", label: "VIP Companions" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Assistant Sidebar panel */}
          <motion.div
            initial={{ x: "-100%", opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed top-0 left-0 h-full w-full sm:max-w-md z-50 royal-glass-heavy shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-amber-500/10 flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-amber-500/30 bg-slate-900 flex items-center justify-center text-xl shadow-[0_0_12px_rgba(212,175,55,0.3)]">
                  👑
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-serif font-black text-amber-400 uppercase tracking-widest">
                    Grand Vizier
                  </h3>
                  <span className="text-[10px] font-display text-slate-400 uppercase tracking-wider">
                    PEPTIES™ Royal Advisor
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-900 border border-amber-500/10 text-slate-400 hover:text-amber-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 scrollbar flex flex-col gap-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${
                    msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  <div
                    className={`p-4 rounded-2xl text-xs md:text-sm font-sans leading-relaxed shadow-lg ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-amber-500 to-yellow-600 text-slate-950 font-medium rounded-tr-none"
                        : "bg-slate-950/80 border border-amber-500/15 text-slate-200 rounded-tl-none"
                    }`}
                  >
                    {/* Render helper to parse product tags */}
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    
                    {/* Embedded interactive checkout linking */}
                    {msg.role === "assistant" && msg.content.includes("Truffle Chicken") && (
                      <button
                        onClick={() => {
                          onAddToCartById("pat-emperor");
                        }}
                        className="mt-3.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-display font-bold flex items-center gap-1 hover:bg-amber-400 transition-colors cursor-pointer"
                      >
                        <span>Instantly Order Truffle Chicken (🥐)</span>
                      </button>
                    )}
                    {msg.role === "assistant" && msg.content.includes("24K Gold") && (
                      <button
                        onClick={() => {
                          onAddToCartById("pep-gold");
                        }}
                        className="mt-3.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-display font-bold flex items-center gap-1 hover:bg-amber-400 transition-colors cursor-pointer"
                      >
                        <span>Add 24K Gold Peptide (🧪)</span>
                      </button>
                    )}
                    {msg.role === "assistant" && msg.content.includes("Velvet Collar") && (
                      <button
                        onClick={() => {
                          onAddToCartById("pet-collar");
                        }}
                        className="mt-3.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-display font-bold flex items-center gap-1 hover:bg-amber-400 transition-colors cursor-pointer"
                      >
                        <span>Add Velvet Collar (🎗️)</span>
                      </button>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 font-display uppercase tracking-wider px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="mr-auto items-start max-w-[85%]">
                  <div className="bg-slate-950/80 border border-amber-500/15 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <span className="text-xs font-serif text-amber-400/80 animate-pulse">Consulting the royal scriptures</span>
                    <div className="flex gap-1">
                      <motion.div animate={{ scale: [0.7, 1.2, 0.7] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <motion.div animate={{ scale: [0.7, 1.2, 0.7] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }} className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <motion.div animate={{ scale: [0.7, 1.2, 0.7] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.6 }} className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompts Container */}
            {messages.length === 1 && !isLoading && (
              <div className="px-6 py-2 flex flex-col gap-2">
                <span className="text-[9px] font-display uppercase tracking-widest text-slate-500 font-bold">
                  Sovereign Consultations:
                </span>
                <div className="flex flex-col gap-1.5">
                  {quickPrompts.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q.text)}
                      className="w-full text-left p-2.5 rounded-xl border border-amber-500/10 hover:border-amber-500/30 hover:bg-slate-950 text-xs text-slate-300 hover:text-amber-300 transition-all cursor-pointer font-sans"
                    >
                      {q.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input Footer */}
            <div className="p-6 border-t border-amber-500/10 bg-slate-950/50">
              <div className="flex items-center gap-2 bg-slate-950 border border-amber-500/20 focus-within:border-amber-400 rounded-xl p-1.5 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
                  placeholder="Address the Grand Vizier..."
                  className="flex-1 bg-transparent text-slate-200 text-xs md:text-sm px-3 focus:outline-none placeholder-slate-600"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage(input)}
                  className="p-3.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 rounded-lg cursor-pointer flex items-center justify-center shadow-lg"
                >
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                </motion.button>
              </div>
              <p className="text-[9px] text-slate-500 font-display text-center mt-2 tracking-wider">
                PEPTIES™ ROYAL CHAT IS SECURED VIA SERVER-SIDE SHIELDING
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
