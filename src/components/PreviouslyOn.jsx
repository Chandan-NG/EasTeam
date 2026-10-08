import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';

export default function PreviouslyOn({ items = [] }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="previously-on" className="w-full py-16 md:py-24 border-t border-[#E5E0DA] bg-[#FAF8F5]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <div className="font-mono text-[10px] md:text-[11px] tracking-widest-spec uppercase text-neutral-500 mb-2">
              REAL LIFE INSPIRATION
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight uppercase text-[#111111]">
              PREVIOUSLY ON / AS SEEN ON
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/easteam_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-wider uppercase text-[#111111] hover:text-neutral-500 transition-colors underline underline-offset-4 decoration-[#E5E0DA] flex items-center gap-1.5"
            >
              <Camera size={14} />
              <span>STYLED BY OUR MUSE COMMUNITY @EASTEAMNY</span>
            </a>

            {/* Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-1.5 pl-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 border border-[#E5E0DA] bg-white hover:border-[#111111] text-[#111111] transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 border border-[#E5E0DA] bg-white hover:border-[#111111] text-[#111111] transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Editorial Muse Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id || index}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="w-[260px] sm:w-[300px] md:w-[320px] lg:w-[calc(25%-18px)] flex-shrink-0 snap-start flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-[3/4.5] overflow-hidden bg-[#F5F3F0] border border-[#E5E0DA]">
                <img
                  src={item.image}
                  alt={`Muse styling ${item.look}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="font-mono text-[10px] text-white tracking-widest uppercase font-semibold">
                    {item.handle}
                  </div>
                  <div className="font-sans text-[11px] text-neutral-200 line-clamp-1 italic">
                    "{item.quote}"
                  </div>
                </div>
              </div>

              <div className="pt-3 font-mono text-[10px] uppercase text-neutral-600 flex items-center justify-between">
                <span className="font-semibold text-[#111111]">{item.handle}</span>
                <span>DAYDREAM SKIRT</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
