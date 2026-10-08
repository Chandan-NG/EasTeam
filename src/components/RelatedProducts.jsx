import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus } from 'lucide-react';

export default function RelatedProducts({ items = [], onQuickAdd }) {
  return (
    <section id="recommendations" className="w-full py-16 md:py-24 border-t border-[#E5E0DA] bg-[#FAF8F5]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 md:mb-16">
          <div className="font-mono text-[10px] md:text-[11px] tracking-widest-spec uppercase text-neutral-500 mb-2">
            COMPLETE THE SILHOUETTE
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-wide uppercase text-[#111111]">
            YOU MAY ALSO LIKE
          </h2>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {items.slice(0, 4).map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-[3/4.2] overflow-hidden bg-[#F5F3F0] border border-[#E5E0DA]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-[#FAF8F5]/90 border border-[#E5E0DA] shadow-xs flex items-center justify-center text-[#111111] transition-transform active:scale-90"
                  aria-label="Add to wishlist"
                >
                  <Heart size={14} />
                </button>

                {/* Corner Badge */}
                {item.badge && (
                  <div className="absolute top-2.5 left-2.5 bg-[#111111] text-white font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 shadow-sm">
                    {item.badge}
                  </div>
                )}

                {/* Quick Add Button on Hover */}
                <div className="absolute inset-x-2.5 bottom-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd?.(item);
                    }}
                    className="w-full py-2 bg-[#FAF8F5]/95 hover:bg-[#111111] hover:text-white text-[#111111] font-mono text-[9px] tracking-widest uppercase font-bold border border-[#E5E0DA] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Plus size={12} />
                    <span>QUICK VIEW &amp; PAIR</span>
                  </button>
                </div>
              </div>

              <div className="pt-3 text-center space-y-0.5">
                <h3 className="font-mono text-xs tracking-wider uppercase font-semibold text-[#111111] group-hover:text-neutral-600 transition-colors truncate">
                  {item.title}
                </h3>
                <div className="font-mono text-xs text-neutral-600">
                  ${item.price.toFixed(2)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
