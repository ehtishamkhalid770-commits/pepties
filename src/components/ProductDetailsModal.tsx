import { motion, AnimatePresence } from "motion/react";
import { X, Star, Check, Sparkles, Shield, Award } from "lucide-react";
import { Product } from "../types";

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

export default function ProductDetailsModal({ product, onClose, onAddToCart }: ProductDetailsModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-3xl bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 border border-amber-500/20 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.25)] z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
        >
          {/* Left / Top Side Product Image Area */}
          <div className="relative md:w-1/2 p-8 flex flex-col items-center justify-center bg-slate-950/80 border-b md:border-b-0 md:border-r border-amber-500/10 overflow-hidden min-h-[300px]">
            {/* Absolute Concentric Halo */}
            <div className="absolute w-56 h-56 rounded-full border border-amber-500/5 animate-spin-slow pointer-events-none" style={{ animationDuration: '20s' }} />
            <div className="absolute w-44 h-44 rounded-full border border-amber-500/10 animate-reverse-spin pointer-events-none" style={{ animationDuration: '15s' }} />
            <div className="absolute w-64 h-64 rounded-full bg-amber-500/[0.03] blur-2xl pointer-events-none" />

            {/* Giant Emoji/Image Floating */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 4, -4, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
              }}
              className="text-9xl filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.9)] select-none z-10"
            >
              {product.image}
            </motion.div>

            {/* Micro Badge */}
            <div className="absolute bottom-6 flex items-center gap-2 bg-slate-900/95 px-4 py-2 border border-amber-500/15 rounded-xl z-10 text-[10px] font-display text-amber-300">
              <Award className="w-3.5 h-3.5 animate-pulse" />
              <span className="uppercase tracking-widest font-bold">Royal Quality Sealed</span>
            </div>
          </div>

          {/* Right / Bottom Side Editorial Info */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[80vh] scrollbar">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-display uppercase tracking-widest text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded bg-slate-900 font-bold">
                  {product.category} Collection
                </span>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-slate-900 border border-amber-500/10 text-slate-400 hover:text-amber-400 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Urdu */}
              <div className="flex items-baseline justify-between gap-4 mt-2 border-b border-amber-500/10 pb-4">
                <h2 className="text-xl md:text-2xl font-serif font-black text-slate-100 leading-tight">
                  {product.name}
                </h2>
                <span className="text-lg font-serif font-black text-amber-500 shrink-0">
                  {product.urduName}
                </span>
              </div>

              {/* Sub-Header / Star Rating */}
              <div className="flex items-center gap-4 mt-3 text-xs font-display">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  <span className="text-amber-300 font-bold">{product.rating.toFixed(1)}</span>
                  <span className="text-slate-500">({product.reviews} reviews)</span>
                </div>
                <div className="h-3 w-px bg-slate-800" />
                <span className="text-slate-400">{product.specValue}</span>
              </div>

              {/* Memoirs description */}
              <div className="mt-5">
                <h4 className="text-[10px] font-display uppercase tracking-[0.2em] text-slate-500 font-bold">
                  The Royal Memoirs
                </h4>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans mt-1.5">
                  {product.longDescription}
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="mt-5">
                <h4 className="text-[10px] font-display uppercase tracking-[0.2em] text-slate-500 font-bold mb-2">
                  Elite Specifications
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-400 font-sans">
                      <div className="w-4 h-4 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-amber-400 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing / Footer Area */}
            <div className="mt-8 border-t border-amber-500/10 pt-5 flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-display">Sovereign Cost</span>
                <span className="text-2xl font-serif font-black text-amber-400 flex items-baseline gap-1">
                  <span className="text-sm font-display text-amber-500">Rs.</span>
                  {product.price.toLocaleString()}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="flex-1 max-w-[200px] py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-display font-extrabold text-xs tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)] cursor-pointer transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Add to Carriage</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
