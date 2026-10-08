import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';

export default function MobileStickyBar({
  product,
  selectedSize,
  fulfillmentMode,
  onAddToCart,
  isFavorited,
  onToggleFavorite,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 520) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const price = fulfillmentMode === 'preorder' ? product.preOrderPrice : product.price;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ paddingBottom: 'max(10px, env(safe-area-inset-bottom))' }}
          className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF8F5]/98 backdrop-blur-md border-t border-[#E5E0DA] px-4 pt-2.5 shadow-2xl"
        >
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            {/* Product Thumbnail & Details */}
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={product.gallery[0]?.src}
                alt={product.title}
                className="w-10 h-12 object-cover bg-[#F5F3F0] border border-[#E5E0DA] shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[10px] tracking-wider uppercase text-neutral-600 truncate">
                  {product.title}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-sm font-bold text-[#111111]">
                    ${price.toFixed(2)}
                  </span>
                  <span className="font-mono text-[9px] text-neutral-500 uppercase">
                    SIZE: <strong className="text-black">{selectedSize?.size || 'S'}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onToggleFavorite}
                className={`w-10 h-10 border transition-colors flex items-center justify-center ${
                  isFavorited
                    ? 'border-[#111111] bg-[#111111] text-white'
                    : 'border-[#E5E0DA] bg-white text-[#111111]'
                }`}
                aria-label="Add to favourites"
              >
                <Heart
                  size={16}
                  className={isFavorited ? 'fill-white text-white' : ''}
                />
              </button>

              <button
                onClick={onAddToCart}
                className="h-10 px-4 bg-[#111111] active:bg-neutral-800 text-white font-mono text-[11px] tracking-widest uppercase font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <ShoppingBag size={14} />
                <span>ADD</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
