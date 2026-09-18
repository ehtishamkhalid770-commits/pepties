import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ShoppingBag, Sparkles, Menu, X, Compass, Award, ShieldCheck } from "lucide-react";
import { ProductCategory } from "../types";

interface RoyalNavbarProps {
  activeCategory: ProductCategory | "all";
  setActiveCategory: (cat: ProductCategory | "all") => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAssistant: () => void;
}

export default function RoyalNavbar({
  activeCategory,
  setActiveCategory,
  cartCount,
  onOpenCart,
  onOpenAssistant,
}: RoyalNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { id: "all", label: "All Masterpieces", urdu: "تمام عجائبات" },
    { id: "patisserie", label: "Patisserie (Patties)", urdu: "شاہی پیٹیز" },
    { id: "skincare", label: "Bio-Peptides", urdu: "پیپٹائڈ اکسیر" },
    { id: "pets", label: "Imperial Pets", urdu: "شاہی پالتو جانور" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4"
      >
        <div className="max-w-7xl mx-auto royal-glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            >
              <Sparkles className="text-slate-950 w-5 h-5 stroke-[2]" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-serif font-black tracking-widest gold-text-shimmer">
                PEPTIES™
              </span>
              <span className="text-[9px] font-display uppercase tracking-[0.2em] text-amber-400 font-medium -mt-1">
                Royal Elite Estate
              </span>
            </div>
          </div>

          {/* Desktop Categories Selector */}
          <div className="hidden lg:flex items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`relative px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-amber-300 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-900/40"
                  }`}
                >
                  <span className="font-display tracking-wider block">{cat.label}</span>
                  <span className="text-[10px] opacity-60 font-serif block text-center -mt-0.5 font-light">
                    {cat.urdu}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Actions Menu */}
          <div className="flex items-center gap-3">
            {/* Assistant Trigger Quick Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenAssistant}
              className="relative px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs font-display font-medium bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 flex items-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="hidden md:inline">Ask Advisor</span>
            </motion.button>

            {/* Shopping Carriage Trigger */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-amber-500/30 hover:border-amber-400 text-amber-400 flex items-center justify-center cursor-pointer shadow-lg"
              aria-label="Open carriage"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2]" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-display font-bold text-[10px] flex items-center justify-center shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-amber-400 hover:bg-slate-900/60 transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-4 right-4 z-40 lg:hidden p-6 rounded-2xl royal-glass-heavy shadow-2xl flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              <span className="text-xs font-display uppercase tracking-[0.2em] text-amber-400 border-b border-amber-500/20 pb-2">
                Explore Royal Collections
              </span>
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id as any);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                      isActive
                        ? "bg-amber-500/10 border border-amber-500/30 text-amber-300"
                        : "hover:bg-slate-900/40 text-slate-300"
                    }`}
                  >
                    <div className="text-left">
                      <span className="font-display text-sm font-semibold block">
                        {cat.label}
                      </span>
                      <span className="text-xs font-serif text-amber-400/70 font-light italic">
                        {cat.urdu}
                      </span>
                    </div>
                    <Compass className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-slate-600"}`} />
                  </button>
                );
              })}
            </div>

            {/* Micro Badges inside Mobile Menu */}
            <div className="grid grid-cols-2 gap-3 border-t border-amber-500/20 pt-4 text-[10px] text-slate-400 font-display">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>100% Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Royal Quality Certified</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
