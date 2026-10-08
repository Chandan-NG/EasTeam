import React from 'react';
import { motion } from 'framer-motion';
import { X, Trash2, ArrowRight, Minus, Plus, Truck, ShieldCheck } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 149;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const totalCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0D0D0D]/60 backdrop-blur-sm"
      />

      {/* Drawer Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col z-10 border-l border-[#E5E0DA]"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E5E0DA] flex items-center justify-between">
          <div>
            <div className="font-mono text-[10px] tracking-widest-spec text-neutral-500 uppercase">
              EASTEAM ATELIER BAG
            </div>
            <h2 className="font-serif text-2xl tracking-wide uppercase font-medium text-[#111111]">
              SHOPPING BAG [{totalCount}]
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 -mr-2 text-[#111111] hover:text-neutral-500 transition-colors focus:outline-none"
            aria-label="Close Bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-[#FAF8F5] px-6 py-3 border-b border-[#E5E0DA] space-y-1.5 font-mono text-[10px] tracking-wider uppercase">
          <div className="flex items-center justify-between text-neutral-700">
            <span className="flex items-center gap-1.5">
              <Truck size={13} className="text-[#111111]" />
              {subtotal >= freeShippingThreshold ? (
                <span className="text-[#1E6548] font-bold">
                  ✓ COMPLIMENTARY WORLDWIDE SHIPPING UNLOCKED
                </span>
              ) : (
                <span>
                  ADD ${remainingForFreeShipping.toFixed(2)} FOR FREE SHIPPING
                </span>
              )}
            </span>
            <span className="font-bold text-[#111111]">
              ${subtotal.toFixed(2)} / ${freeShippingThreshold}
            </span>
          </div>

          <div className="w-full h-1 bg-[#E5E0DA] overflow-hidden">
            <div
              className="h-full bg-[#111111] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
              <p className="font-mono text-xs uppercase tracking-wider text-neutral-500">
                YOUR BAG IS CURRENTLY EMPTY.
              </p>
              <button
                onClick={onClose}
                className="font-mono text-xs uppercase font-bold tracking-widest underline underline-offset-4 text-[#111111]"
              >
                RETURN TO PRODUCT
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={`${item.id || idx}-${item.size}-${item.fulfillmentMode || 'instock'}`}
                className="flex gap-4 pb-6 border-b border-[#E5E0DA]/70 last:border-none"
              >
                {/* Thumbnail */}
                <div className="w-20 aspect-[3/4] bg-[#F5F3F0] border border-[#E5E0DA] flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image || '/images/ginger-front-01.png'}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                        {item.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-neutral-400 hover:text-black transition-colors p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="font-mono text-[10px] text-neutral-500 tracking-wider uppercase space-y-0.5">
                      <p>SIZE: <strong className="text-black">{item.size}</strong></p>
                      <p>
                        TIER:{' '}
                        <span className={item.fulfillmentMode === 'preorder' ? 'text-[#93000A] font-semibold' : 'text-[#1E6548] font-semibold'}>
                          {item.fulfillmentMode === 'preorder' ? 'MADE TO ORDER (5% OFF)' : 'IN STOCK DISPATCH'}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="h-8 border border-[#111111] flex items-center justify-between px-2 w-24 bg-white">
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                        className="text-neutral-600 hover:text-black p-0.5"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="font-mono text-xs font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        className="text-neutral-600 hover:text-black p-0.5"
                      >
                        <Plus size={11} />
                      </button>
                    </div>

                    <div className="font-mono text-xs font-bold text-[#111111]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout CTA */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#E5E0DA] bg-[#FAF8F5] space-y-4">
            <div className="flex items-center justify-between font-mono text-xs tracking-wider uppercase">
              <span className="text-neutral-500">SUBTOTAL</span>
              <span className="font-bold text-base text-[#111111]">
                ${subtotal.toFixed(2)} USD
              </span>
            </div>

            <p className="font-sans text-[11px] text-neutral-500">
              Taxes &amp; shipping calculated at checkout. Duties paid on eligible destinations.
            </p>

            <button
              onClick={() => alert("Redirecting to EASTEAM secure Shopify checkout...")}
              className="w-full h-13 py-3.5 bg-[#111111] hover:bg-neutral-800 text-white font-mono text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={14} />
            </button>

            <div className="flex items-center justify-center gap-1.5 font-mono text-[9px] text-neutral-500 tracking-wider uppercase text-center pt-1">
              <ShieldCheck size={12} className="text-[#111111]" />
              <span>GUARANTEED 256-BIT ENCRYPTED CHECKOUT</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
