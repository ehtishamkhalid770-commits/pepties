import { motion } from "motion/react";
import React, { useState, useRef } from "react";
import { Star, ShieldCheck, Heart, Sparkles, Plus, ChevronRight, Info } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onOpenDetails: (p: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onOpenDetails }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // 3D Tilt Ref and state
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate within element
    const y = e.clientY - rect.top;  // y coordinate within element
    
    // Normalize coordinates (-0.5 to 0.5)
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    
    // Limit maximum rotation (e.g. 15 degrees)
    setTilt({
      x: normalizedX * 12,
      y: -normalizedY * 12,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case "patisserie":
        return { bg: "from-amber-950/40 to-slate-950", border: "border-amber-500/20", text: "text-amber-400" };
      case "skincare":
        return { bg: "from-blue-950/40 to-slate-950", border: "border-blue-500/20", text: "text-blue-400" };
      case "pets":
        return { bg: "from-indigo-950/40 to-slate-950", border: "border-indigo-500/20", text: "text-indigo-400" };
      default:
        return { bg: "from-amber-950/40 to-slate-950", border: "border-amber-500/20", text: "text-amber-400" };
    }
  };

  const theme = getCategoryTheme(product.category);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: isHovered ? "none" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`relative w-full rounded-3xl bg-gradient-to-br ${theme.bg} border ${theme.border} p-6 flex flex-col justify-between overflow-hidden shadow-2xl group transition-all duration-300 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)]`}
    >
      {/* Absolute Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.03] pointer-events-none" />

      {/* Glow highlight in corner */}
      <div className={`absolute -top-12 -left-12 w-40 h-40 rounded-full bg-${product.colorAccent}/10 blur-3xl pointer-events-none group-hover:bg-${product.colorAccent}/20 transition-all duration-500`} />

      {/* Header Info (Wishlist & Badge) */}
      <div className="flex items-center justify-between z-10" style={{ transform: "translateZ(30px)" }}>
        <span className={`px-3 py-1 rounded-full text-[9px] font-display uppercase tracking-[0.15em] font-semibold bg-slate-900 border border-${product.colorAccent}/30 ${theme.text} shadow-sm`}>
          {product.category === "patisserie" ? "Royal Pastry" : product.category === "skincare" ? "Premium Peptide" : "Imperial Pet"}
        </span>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`p-2 rounded-full border bg-slate-950/80 transition-all duration-300 cursor-pointer ${
            isFavorite 
              ? "border-amber-500/80 text-amber-500 shadow-[0_0_10px_rgba(212,175,55,0.3)]" 
              : "border-amber-500/10 text-slate-400 hover:text-amber-400 hover:border-amber-500/40"
          }`}
        >
          <Heart className="w-3.5 h-3.5" fill={isFavorite ? "#f59e0b" : "none"} />
        </button>
      </div>

      {/* Floating Interactive Product Image Container */}
      <div 
        className="my-6 relative flex items-center justify-center h-44 cursor-pointer"
        onClick={() => onOpenDetails(product)}
        style={{ transform: "translateZ(50px)" }}
      >
        {/* Background Concentric Golden Rings */}
        <div className="absolute w-28 h-28 rounded-full border border-amber-500/5 group-hover:border-amber-500/20 group-hover:scale-125 transition-all duration-700 pointer-events-none flex items-center justify-center">
          <div className="w-22 h-22 rounded-full border border-amber-500/10 group-hover:border-amber-500/30 group-hover:scale-110 transition-all duration-500" />
        </div>

        {/* Floating Halo Glow */}
        <div className={`absolute w-32 h-32 rounded-full bg-gradient-to-tr from-amber-500/5 to-${product.colorAccent}/10 blur-xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none`} />

        {/* Product Visual Asset (Emoji/Symbol with deep 3D shadow and scale tilt) */}
        <motion.div
          animate={isHovered ? { 
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0],
          } : { y: 0, rotate: 0 }}
          transition={{ 
            repeat: Infinity, 
            duration: 5, 
            ease: "easeInOut" 
          }}
          className="text-7xl select-none z-10 filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-500 flex items-center justify-center"
        >
          {product.image}
        </motion.div>
      </div>

      {/* Card Content Details */}
      <div className="z-10 mt-2" style={{ transform: "translateZ(30px)" }}>
        {/* Rating and Urdu Title */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
            <span className="text-xs font-display text-amber-300 font-bold">{product.rating.toFixed(1)}</span>
            <span className="text-[10px] text-slate-500 font-medium">({product.reviews})</span>
          </div>
          {/* Urdu elegant translation */}
          <span className="text-sm font-serif font-semibold text-amber-500/80 tracking-wide text-right">
            {product.urduName}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-serif font-bold text-slate-100 group-hover:text-amber-300 transition-colors duration-300 line-clamp-1">
          {product.name}
        </h3>

        {/* Tagline */}
        <p className="text-xs text-slate-400 font-sans mt-1 line-clamp-2 min-h-[2rem]">
          {product.tagline}
        </p>

        {/* Core Specification Capsule */}
        <div className="mt-3.5 flex items-center justify-between bg-slate-950/60 border border-amber-500/10 rounded-xl p-2.5 text-[11px] font-display">
          <span className="text-slate-500 uppercase tracking-wider">{product.specLabel}</span>
          <span className="text-amber-300 font-semibold">{product.specValue}</span>
        </div>
      </div>

      {/* Bottom Row (Price & Actions) */}
      <div className="mt-5 flex items-center justify-between gap-3 z-10" style={{ transform: "translateZ(40px)" }}>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-display">Emperor's Price</span>
          <span className="text-lg font-serif font-black text-amber-400 flex items-baseline gap-0.5">
            <span className="text-xs font-display text-amber-500">Rs.</span>
            {product.price.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Info Quick Trigger */}
          <button
            onClick={() => onOpenDetails(product)}
            className="p-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-amber-500/10 hover:border-amber-500/40 text-slate-400 hover:text-amber-400 transition-all duration-300 cursor-pointer"
            title="Read royal memoirs"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Add To Cart */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart(product)}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-display font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Add</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
