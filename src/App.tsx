import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  ShoppingBag, 
  MessageSquare, 
  Star, 
  ShieldCheck, 
  Crown, 
  ArrowRight, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  Globe, 
  Clock, 
  Compass, 
  Award 
} from "lucide-react";
import { Product, CartItem } from "./types";
import { PRODUCTS, REVIEWS } from "./data";
import RoyalNavbar from "./components/RoyalNavbar";
import ProductCard from "./components/ProductCard";
import ShoppingCart from "./components/ShoppingCart";
import RoyalAssistant from "./components/RoyalAssistant";
import ProductDetailsModal from "./components/ProductDetailsModal";

export default function App() {
  const [activeCategory, setActiveCategory] = useState<"all" | "patisserie" | "skincare" | "pets">("all");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ show: boolean; msg: string; urdu: string } | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  // Parallax Hero Mouse Tracking State
  const [heroOffset, setHeroOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const { width, height, left, top } = heroRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    
    // Smooth factor limit to prevent overly jerky shifting
    setHeroOffset({
      x: (x / width) * 25,
      y: (y / height) * 25,
    });
  };

  const handleHeroMouseLeave = () => {
    setHeroOffset({ x: 0, y: 0 });
  };

  // Add to Shopping carriage
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Custom Royal alert toast
    setToast({
      show: true,
      msg: `${product.name} added to your Royal Carriage.`,
      urdu: `شاہانہ سواری میں شامل کر لیا گیا ہے`,
    });

    // Custom royal harp sound if unmuted (Synthesized via AudioContext)
    playRoyalHarpSound();
  };

  const handleAddToCartById = (id: string) => {
    const product = PRODUCTS.find((p) => p.id === id);
    if (product) {
      handleAddToCart(product);
    }
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Synthesize a majestic golden harp alert using Web Audio API
  const playRoyalHarpSound = () => {
    if (isAudioMuted) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playTone = (freq: number, delay: number, dur: number) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start();
          osc.stop(ctx.currentTime + dur);
        }, delay);
      };

      // Play major golden triad harp chord
      playTone(261.63, 0, 1.2);   // C4
      playTone(329.63, 150, 1.0); // E4
      playTone(392.00, 300, 0.8); // G4
      playTone(523.25, 450, 0.6); // C5
    } catch (e) {
      console.warn("AudioContext block", e);
    }
  };

  // Auto clear toast
  useEffect(() => {
    if (toast?.show) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Filter products list
  const filteredProducts = activeCategory === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen royal-mesh-bg text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 pb-20 relative overflow-hidden">
      
      {/* Decorative Golden Star Constellation Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute top-40 right-10 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

      {/* Royal Navbar */}
      <RoyalNavbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenAssistant={() => setAssistantOpen(true)}
      />

      {/* IMMERSIVE PARALLAX HERO BANNER */}
      <section 
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative pt-36 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center text-center z-10 cursor-default"
      >
        {/* Parallax Floating Golden Ring Backdrops */}
        <div 
          style={{
            transform: `translate(${heroOffset.x * -0.6}px, ${heroOffset.y * -0.6}px)`,
            transition: "transform 0.1s ease-out"
          }}
          className="absolute w-[28rem] h-[28rem] border border-amber-500/[0.04] rounded-full flex items-center justify-center pointer-events-none"
        >
          <div className="w-[20rem] h-[20rem] border border-amber-500/[0.06] rounded-full flex items-center justify-center">
            <div className="w-[12rem] h-[12rem] border border-amber-500/[0.08] rounded-full" />
          </div>
        </div>

        {/* Floating Crown Ornament */}
        <motion.div
          animate={{
            y: [-8, 8, -8],
            rotate: [0, 3, -3, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut"
          }}
          style={{
            transform: `translate(${heroOffset.x * 0.4}px, ${heroOffset.y * 0.4}px)`,
          }}
          className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 text-2xl shadow-[0_0_20px_rgba(212,175,55,0.4)] mb-6 cursor-pointer"
          onClick={playRoyalHarpSound}
          title="Heed the Royal Harp"
        >
          <Crown className="w-6.5 h-6.5" />
          {/* Sparkles */}
          <Sparkles className="absolute -top-1 -right-1 w-3.5 h-3.5 text-amber-300 animate-pulse" />
        </motion.div>

        {/* Hero Headlines */}
        <div 
          style={{
            transform: `translate(${heroOffset.x * 0.2}px, ${heroOffset.y * 0.2}px)`,
            transition: "transform 0.1s ease-out"
          }}
          className="flex flex-col gap-2 max-w-3xl z-10"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight leading-none text-slate-100">
            EXPERIENCE THE ULTIMATE{" "}
            <span className="block mt-1 gold-text-shimmer drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]">
              PEPTIES™ ROYALTY
            </span>
          </h1>

          <p className="text-xs font-serif text-amber-400 font-semibold tracking-widest uppercase mt-2 italic flex items-center justify-center gap-2">
            <span>شاہی ذائقہ، لازوال خوبصورتی، اور پالتو جانوروں کی نفاست</span>
          </p>

          <p className="text-sm md:text-base text-slate-400 font-sans max-w-2xl mx-auto mt-4 leading-relaxed">
            Welcome to the imperial estate of <strong className="text-amber-300 font-serif">PEPTIES™</strong>. Indulge in our flaky 144-layer golden pastries, firm your youth with clinical bio-peptides, and grace your companions with pure velvet regalias.
          </p>
        </div>

        {/* Interactive Audio controller */}
        <div className="mt-8 z-10">
          <button
            onClick={() => {
              setIsAudioMuted(!isAudioMuted);
              // Trigger a small note on activation
              if (isAudioMuted) {
                setTimeout(() => playRoyalHarpSound(), 100);
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-display font-bold border transition-all cursor-pointer flex items-center gap-2 ${
              isAudioMuted 
                ? "bg-slate-900/80 border-amber-500/20 text-slate-400 hover:text-amber-400 hover:border-amber-500/40" 
                : "bg-amber-500/10 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(212,175,55,0.3)]"
            }`}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-bounce" />}
            <span>{isAudioMuted ? "Unmute Royal Harp Alert" : "Royal Harp Alert Active"}</span>
          </button>
        </div>

        {/* THREE ROYAL COLUMNS OVERVIEW BADGES (BENTO) */}
        <div 
          style={{
            transform: `translate(${heroOffset.x * 0.1}px, ${heroOffset.y * 0.1}px)`,
            transition: "transform 0.1s ease-out"
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-16 z-10"
        >
          {/* Column 1 */}
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-amber-500/10 hover:border-amber-500/30 transition-all text-left flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-amber-500/20 flex items-center justify-center text-3xl">🥐</div>
            <div>
              <h4 className="font-serif font-black text-amber-400 uppercase tracking-wider text-sm">Gourmet Patisserie</h4>
              <p className="text-xs text-slate-400 mt-1">144 gold-brushed butter sheets filled with black truffle chicken and cardamoms.</p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-blue-500/10 hover:border-blue-500/30 transition-all text-left flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-blue-500/20 flex items-center justify-center text-3xl">🧪</div>
            <div>
              <h4 className="font-serif font-black text-blue-400 uppercase tracking-wider text-sm">Bio-Active Peptides</h4>
              <p className="text-xs text-slate-400 mt-1">Colloidal gold & copper serums formulated to visually sculpt skin.</p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-indigo-500/10 hover:border-indigo-500/30 transition-all text-left flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-indigo-500/20 flex items-center justify-center text-3xl">🛋️</div>
            <div>
              <h4 className="font-serif font-black text-indigo-400 uppercase tracking-wider text-sm">Companion Regalias</h4>
              <p className="text-xs text-slate-400 mt-1">Italian velvet collars and joint-resting memory loungers for imperial pets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG / PRODUCT LIST AREA */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-amber-500/10">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-black tracking-wider text-slate-100 flex items-center gap-3">
              <Compass className="text-amber-500 w-6 h-6 animate-spin-slow" />
              <span>THE ROYAL MASTERPIECES</span>
            </h2>
            <p className="text-xs font-display uppercase tracking-widest text-slate-500 mt-1">
              Hand-selected elixirs, baked crowns, and companion fineries.
            </p>
          </div>

          {/* Inline Active Indicator Category info */}
          <div className="text-xs text-amber-500/80 font-serif font-light italic mt-3 md:mt-0 text-left md:text-right">
            {activeCategory === "all" && "Displaying all treasures available in our imperial vaults"}
            {activeCategory === "patisserie" && "Showing golden butter lamination flaky savories"}
            {activeCategory === "skincare" && "Showing multi-peptide biological skincare elixirs"}
            {activeCategory === "pets" && "Showing tailored brass and velvet fittings for companions"}
          </div>
        </div>

        {/* Dynamic Animated Grid Layout for Cards */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((prod) => (
              <motion.div
                key={prod.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <ProductCard
                  product={prod}
                  onAddToCart={handleAddToCart}
                  onOpenDetails={setSelectedProduct}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* SECURE ADVANTAGES MARGIN CARDS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-24">
        <div className="royal-glass rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/[0.02] rounded-full blur-3xl" />
          
          <div className="max-w-xl">
            <h3 className="text-2xl font-serif font-black text-slate-100">
              PALACE SECURITY & SECURE VAULT CHECKOUT
            </h3>
            <p className="text-xs font-display text-amber-500 tracking-widest uppercase mt-1">
              Guaranteed Luxury • Double Inspected • Hand Delivered
            </p>
            <p className="text-xs md:text-sm text-slate-400 mt-3 leading-relaxed">
              Every shipment is sealed in royal-blue velvet-lined boxes with solid copper seals. Our custom AI shopping advisor secures checkout logs using server-side shielding, keeping your private financial details cleared and private.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:max-w-xs shrink-0 text-xs font-display">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-amber-500/10 flex flex-col items-center text-center">
              <ShieldCheck className="w-8 h-8 text-amber-400 mb-2" />
              <span className="font-bold text-slate-300">Vault Shield</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Gold Grade Encrypted</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-amber-500/10 flex flex-col items-center text-center">
              <Award className="w-8 h-8 text-amber-400 mb-2" />
              <span className="font-bold text-slate-300">Crown Sourced</span>
              <span className="text-[10px] text-slate-500 mt-0.5">100% Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* ROYAL DECREES (CUSTOMER REVIEWS PANEL) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-serif font-black tracking-wider text-slate-100 uppercase">
            Decrees of Our Imperial Patrons
          </h2>
          <p className="text-xs font-serif text-amber-400 mt-1 italic">
            سرکاری سرپرستوں کے شاہی فرامین
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div 
              key={rev.id}
              className="p-6 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-amber-500/15 shadow-xl relative hover:border-amber-500/30 transition-all duration-300"
            >
              <div className="absolute top-5 right-5 text-xl opacity-20 font-serif font-black">
                👑
              </div>
              
              {/* Product Reference Badge */}
              <span className="text-[9px] font-display uppercase tracking-widest text-amber-500/70 border border-amber-500/10 px-2 py-0.5 rounded bg-slate-950">
                {rev.product}
              </span>

              {/* Star Rating */}
              <div className="flex gap-1 my-3">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                ))}
              </div>

              {/* Comments */}
              <p className="text-xs md:text-sm text-slate-300 italic font-sans leading-relaxed">
                "{rev.comment}"
              </p>

              {/* Patron Bio info */}
              <div className="flex items-center gap-3 mt-5 pt-3 border-t border-amber-500/5 text-xs">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-amber-500/25 flex items-center justify-center font-serif text-amber-400 font-bold">
                  {rev.name[0]}
                </div>
                <div>
                  <span className="font-bold text-slate-200 block">{rev.name}</span>
                  <span className="text-[10px] text-slate-500 font-display uppercase tracking-wider">{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM FOOTER NAVIGATION */}
      <footer className="mt-32 border-t border-amber-500/10 bg-slate-950/40 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 flex items-center justify-center text-slate-950">
              <Crown className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold tracking-widest text-amber-400 text-sm">PEPTIES™</span>
              <span className="text-[9px] font-display tracking-widest text-slate-500 uppercase -mt-0.5">Est. 2026</span>
            </div>
          </div>

          <div className="text-xs text-slate-500 font-display uppercase tracking-widest">
            © 2026 PEPTIES™ ROYAL CO. • CLOUD RUN PLATINUM DEPLOYED
          </div>

          {/* Quick Support Advisor open */}
          <div>
            <button
              onClick={() => setAssistantOpen(true)}
              className="text-xs font-display text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>Contact Palace Chamberlain</span>
            </button>
          </div>
        </div>
      </footer>

      {/* ROYAL FLOATING CHAT TRIGGER BUTTON */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setAssistantOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 rounded-full flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(212,175,55,0.5)] cursor-pointer hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] transition-all"
        aria-label="Ask Grand Vizier"
      >
        <MessageSquare className="w-6 h-6 stroke-[2.2]" />
        {/* Glowing aura ping */}
        <span className="absolute inset-0 rounded-full border border-yellow-300 animate-ping opacity-25" />
      </motion.button>

      {/* MODALS & DRAWERS SYSTEMS */}
      
      {/* Shopping Carriage Drawer */}
      <ShoppingCart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Royal AI Grand Vizier Assistant */}
      <RoyalAssistant
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        onAddToCartById={handleAddToCartById}
      />

      {/* Product Specification Memoirs Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* GENTLE GLOW HAPTIC ALERTS */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-6 z-50 p-4.5 rounded-2xl bg-slate-950 border border-amber-500 text-slate-100 flex flex-col gap-1 shadow-[0_10px_35px_rgba(212,175,55,0.35)]"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🛎️</span>
              <div>
                <p className="text-xs font-display font-bold text-amber-300 tracking-wide">{toast.msg}</p>
                <p className="text-[10px] font-serif text-amber-400/80 italic mt-0.5">{toast.urdu}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
