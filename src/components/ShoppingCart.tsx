import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { X, Trash2, Plus, Minus, CreditCard, ShoppingBag, ShieldCheck, Award, Sparkles, CheckCircle } from "lucide-react";
import { CartItem, Product } from "../types";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, q: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function ShoppingCart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: ShoppingCartProps) {
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "success">("cart");
  
  // Checkout Form fields
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [deliverySpeed, setDeliverySpeed] = useState<"standard" | "royal">("royal");
  const [paymentMethod, setPaymentMethod] = useState<"gold" | "cash">("gold");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% Royal Duty tax
  const deliveryFee = deliverySpeed === "royal" ? 1500 : 500;
  const total = subtotal + tax + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address) return;
    
    setIsSubmitting(true);
    // Simulate majestic order placement
    setTimeout(() => {
      setIsSubmitting(false);
      setCheckoutStep("success");
    }, 2000);
  };

  const handleReset = () => {
    onClearCart();
    setCheckoutStep("cart");
    setName("");
    setAddress("");
    onClose();
  };

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
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Cart Sidebar panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md z-50 royal-glass-heavy shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-amber-500/10 flex items-center justify-between bg-slate-950/30">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <h2 className="text-xl font-serif font-black text-slate-100 uppercase tracking-wider">
                  {checkoutStep === "cart" && "Royal Carriage"}
                  {checkoutStep === "form" && "Elite Invoicing"}
                  {checkoutStep === "success" && "Palace Cleared"}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-900 border border-amber-500/10 text-slate-400 hover:text-amber-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar">
              {checkoutStep === "cart" && (
                <>
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="text-6xl mb-4"
                      >
                        🛒
                      </motion.div>
                      <h3 className="text-lg font-serif font-semibold text-slate-300">Carriage is Empty</h3>
                      <p className="text-xs text-slate-500 max-w-xs mt-1">
                        Your Highness, you have not selected any masterworks from our estate yet. Open our catalog and add items.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.product.id}
                          layout
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex items-center gap-4 p-3 rounded-2xl bg-slate-950/60 border border-amber-500/10 hover:border-amber-500/20 transition-all duration-300"
                        >
                          {/* Visual */}
                          <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-2xl border border-amber-500/20 shadow-inner">
                            {item.product.image}
                          </div>

                          {/* Detail */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-serif font-bold text-slate-200 truncate">
                              {item.product.name}
                            </h4>
                            <span className="text-[10px] text-amber-500/80 font-serif block -mt-0.5 italic">
                              {item.product.urduName}
                            </span>
                            <span className="text-xs font-serif font-bold text-amber-400 block mt-1">
                              Rs. {item.product.price.toLocaleString()}
                            </span>
                          </div>

                          {/* Control */}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center border border-amber-500/20 rounded-lg overflow-hidden bg-slate-950 text-xs">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 px-2 text-slate-400 hover:text-amber-400 cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-slate-200 font-display font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 px-2 text-slate-400 hover:text-amber-400 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-lg cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {checkoutStep === "form" && (
                <form onSubmit={handleSubmitOrder} className="flex flex-col gap-5">
                  <h3 className="text-sm font-display uppercase tracking-widest text-amber-400 border-b border-amber-500/10 pb-2">
                    Imperial Delivery Credentials
                  </h3>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-display font-bold">
                      Your Full Sovereign Title / Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Shahzadi Alizeh / Malik Sultan"
                      className="w-full bg-slate-950 border border-amber-500/20 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-amber-400 transition-all shadow-inner"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-display font-bold">
                      Palace / Delivery Manor Address
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House No., Elite Royal Apartments, Clifton / Gulberg, Pakistan"
                      className="w-full bg-slate-950 border border-amber-500/20 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-amber-400 transition-all resize-none shadow-inner"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-display font-bold">
                      Royal Escort Fleet
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setDeliverySpeed("standard")}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          deliverySpeed === "standard"
                            ? "bg-amber-500/10 border-amber-500 text-amber-300"
                            : "bg-slate-950 border-amber-500/10 text-slate-400 hover:border-amber-500/30"
                        }`}
                      >
                        <span className="font-display font-bold text-xs block">Palace Courier</span>
                        <span className="text-[10px] text-slate-500 block">Rs. 500 • 3 Days</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliverySpeed("royal")}
                        className={`p-3 rounded-xl border text-left cursor-pointer relative overflow-hidden transition-all ${
                          deliverySpeed === "royal"
                            ? "bg-amber-500/10 border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(212,175,55,0.2)]"
                            : "bg-slate-950 border-amber-500/10 text-slate-400 hover:border-amber-500/30"
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 absolute top-2 right-2 animate-bounce" />
                        <span className="font-display font-bold text-xs block">VIP Royal Falcon</span>
                        <span className="text-[10px] text-slate-500 block">Rs. 1,500 • Same Day</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-display font-bold">
                      Royal Vault Liquidation (Payment)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("gold")}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          paymentMethod === "gold"
                            ? "bg-amber-500/10 border-amber-500 text-amber-300"
                            : "bg-slate-950 border-amber-500/10 text-slate-400 hover:border-amber-500/30"
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-amber-500 mb-1" />
                        <span className="font-display font-bold text-xs block">Gold Card Vault</span>
                        <span className="text-[9px] text-slate-500 block">Imperial Banking</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cash")}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          paymentMethod === "cash"
                            ? "bg-amber-500/10 border-amber-500 text-amber-300"
                            : "bg-slate-950 border-amber-500/10 text-slate-400 hover:border-amber-500/30"
                        }`}
                      >
                        <Trash2 className="w-4 h-4 text-amber-500 mb-1 hidden" />
                        <span className="text-xs font-display font-bold text-amber-500 mb-1 block">👑</span>
                        <span className="font-display font-bold text-xs block">Cash on Escort</span>
                        <span className="text-[9px] text-slate-500 block">Handover at Gate</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {checkoutStep === "success" && (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="w-20 h-20 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.6)] mb-6"
                  >
                    <CheckCircle className="w-10 h-10 stroke-[2.5]" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-serif font-black text-amber-400 uppercase tracking-wider">
                    Order Cleared by Royal decree!
                  </h3>
                  <p className="text-xs text-amber-300/80 font-serif italic mt-1">
                    شاہانہ آرڈر منظور کر لیا گیا ہے
                  </p>

                  <p className="text-xs text-slate-400 max-w-sm mt-4">
                    Praise be, Your Highness! Your elite cargo has been processed. The palace stables are preparing our{" "}
                    {deliverySpeed === "royal" ? "VIP Royal Falcons" : "Palace Couriers"} for immediate deployment.
                  </p>

                  {/* Summary Invoice receipt card */}
                  <div className="w-full bg-slate-950 rounded-2xl p-4 border border-amber-500/20 text-left text-xs text-slate-400 font-display mt-6 flex flex-col gap-2">
                    <div className="flex justify-between border-b border-amber-500/10 pb-2 mb-1">
                      <span className="font-bold text-slate-300">RECEIPT NO.</span>
                      <span className="text-amber-400 font-mono">#PEPTIES-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Emperor Client:</span>
                      <span className="text-slate-200 font-bold">{name || "Royal Guest"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Grand Total:</span>
                      <span className="text-amber-400 font-black">Rs. {total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vault Clearance:</span>
                      <span className="text-slate-200 uppercase font-semibold">{paymentMethod === "gold" ? "Gold Vault Card" : "Cash Handover"}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && checkoutStep !== "success" && (
              <div className="p-6 border-t border-amber-500/10 bg-slate-950/50 flex flex-col gap-4">
                {/* Financial Summary */}
                <div className="flex flex-col gap-2 text-xs font-display">
                  <div className="flex justify-between text-slate-400">
                    <span>Royal Subtotal:</span>
                    <span className="text-slate-200 font-semibold">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Vat / Royal Duty (5%):</span>
                    <span className="text-slate-200 font-semibold">Rs. {tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>
                      {deliverySpeed === "royal" ? "Falcon Escort Duty:" : "Standard Carriage Duty:"}
                    </span>
                    <span className="text-slate-200 font-semibold">Rs. {deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base border-t border-amber-500/10 pt-3 text-slate-200 font-serif">
                    <span className="font-bold">Total Vault Liquidation:</span>
                    <span className="text-xl font-bold text-amber-400 font-serif">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Checkout Button actions */}
                {checkoutStep === "cart" && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCheckoutStep("form")}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-display font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all cursor-pointer"
                  >
                    <span>Proceed to Invoicing</span>
                    <CreditCard className="w-4 h-4" />
                  </motion.button>
                )}

                {checkoutStep === "form" && (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep("cart")}
                      className="w-full py-3.5 rounded-xl bg-slate-900 border border-amber-500/20 hover:border-amber-500/50 text-slate-300 font-display font-bold text-xs cursor-pointer transition-all"
                    >
                      Back to Carriage
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmitOrder}
                      disabled={!name || !address || isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 disabled:from-amber-700 disabled:to-yellow-800 disabled:text-slate-500 text-slate-950 font-display font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      {isSubmitting ? "Approving Order..." : "Clear Order"}
                    </motion.button>
                  </div>
                )}
              </div>
            )}

            {checkoutStep === "success" && (
              <div className="p-6">
                <button
                  onClick={handleReset}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-display font-extrabold text-sm cursor-pointer shadow-lg transition-all"
                >
                  Return to Estate Gate
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
