import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X, Heart, Eye } from 'lucide-react';

export default function ProductGallery({ gallery = [], modelInfo, isFavorited, onToggleFavorite }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [showMeasurements, setShowMeasurements] = useState(true);

  // Touch gesture tracking for mobile carousel
  const touchStartRef = useRef({ x: 0, y: 0 });
  const isSwipingRef = useRef(false);
  const thumbnailScrollRef = useRef(null);

  const onTouchStart = (e) => {
    touchStartRef.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
    isSwipingRef.current = false;
  };

  const onTouchMove = (e) => {
    const deltaX = Math.abs(e.targetTouches[0].clientX - touchStartRef.current.x);
    if (deltaX > 8) {
      isSwipingRef.current = true;
    }
  };

  const onTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - touchStartRef.current.x;
    const deltaY = endY - touchStartRef.current.y;

    // Only swipe if horizontal movement is prominent
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    setTimeout(() => {
      isSwipingRef.current = false;
    }, 80);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const handleImageClick = (idx) => {
    if (!isSwipingRef.current) {
      openLightbox(idx);
    }
  };

  const openLightbox = (index) => {
    setZoomIndex(index);
    setZoomOpen(true);
  };

  // Scroll active thumbnail into view on mobile
  useEffect(() => {
    if (thumbnailScrollRef.current) {
      const activeThumb = thumbnailScrollRef.current.children[currentIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (zoomOpen) {
        if (e.key === 'ArrowRight') setZoomIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
        if (e.key === 'ArrowLeft') setZoomIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
        if (e.key === 'Escape') setZoomOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomOpen, gallery.length]);

  const currentImage = gallery[currentIndex] || gallery[0];

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Mobile & Tablet Carousel */}
      <div className="block lg:hidden w-full space-y-2.5">
        <div 
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={() => handleImageClick(currentIndex)}
          className="relative w-full aspect-[3/4] sm:aspect-[4/5] bg-[#F5F3F0] border border-[#E5E0DA] overflow-hidden select-none cursor-pointer"
        >
          <img 
            src={currentImage?.src} 
            alt={currentImage?.alt} 
            className="w-full h-full object-cover object-center"
          />

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.();
            }}
            className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md border border-[#E5E0DA] shadow-xs flex items-center justify-center text-[#111111] active:scale-90 transition-transform"
            aria-label="Add to favourites"
          >
            <Heart
              size={18}
              className={isFavorited ? 'fill-[#111111] text-[#111111]' : 'text-[#111111]'}
            />
          </button>

          {/* Model Info Pill */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
            <div className="bg-[#FAF8F5]/90 backdrop-blur-md px-2.5 py-1 border border-[#E5E0DA] font-mono text-[9px] tracking-wider text-[#111111] uppercase flex items-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DDA24C] animate-pulse" />
              <span>MODEL {modelInfo?.height || "5'7\""} • SIZE {modelInfo?.size || "S"}</span>
            </div>
          </div>

          {/* Slide Indicator Badge */}
          <div className="absolute bottom-3 right-3 z-20 bg-[#111111]/80 text-[#FAF8F5] font-mono text-[9px] tracking-widest uppercase px-2 py-0.5">
            {currentIndex + 1} / {gallery.length}
          </div>

          {/* Carousel Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-[#FAF8F5]/90 border border-[#E5E0DA] hidden sm:flex items-center justify-center text-[#111111]"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-[#FAF8F5]/90 border border-[#E5E0DA] hidden sm:flex items-center justify-center text-[#111111]"
            aria-label="Next image"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Thumbnail Navigation Strip */}
        <div 
          ref={thumbnailScrollRef}
          className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {gallery.map((item, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-14 aspect-[3/4] bg-[#F5F3F0] border shrink-0 transition-all snap-start ${
                  isActive ? 'border-[#111111] ring-1 ring-black' : 'border-[#E5E0DA] opacity-70'
                }`}
              >
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop 2-Column Gallery Grid */}
      <div className="hidden lg:grid grid-cols-2 gap-2.5">
        {gallery.map((item, index) => {
          const isFullWidth = index === 0 || index === gallery.length - 1;
          const isFirst = index === 0;

          return (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className={`relative aspect-[3/4] bg-[#F5F3F0] border border-[#E5E0DA] overflow-hidden group cursor-zoom-in ${
                isFullWidth ? 'col-span-2' : 'col-span-1'
              }`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out"
              />

              {/* Wishlist Button */}
              {isFirst && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite?.();
                  }}
                  className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md border border-[#E5E0DA] shadow-xs flex items-center justify-center text-[#111111] hover:scale-105 active:scale-95 transition-all"
                  aria-label="Add to favourites"
                >
                  <Heart
                    size={20}
                    className={isFavorited ? 'fill-[#111111] text-[#111111]' : 'text-[#111111]'}
                  />
                </button>
              )}

              {/* Model Info Pill */}
              {isFirst && (
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <div className="bg-[#FAF8F5]/90 backdrop-blur-md px-3 py-1.5 border border-[#E5E0DA] font-mono text-[9px] md:text-[10px] tracking-wider text-[#111111] uppercase flex items-center gap-2 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DDA24C] animate-pulse" />
                    <span>MODEL {modelInfo?.height || "5'7\""} • WEARS SIZE {modelInfo?.size || "S"}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMeasurements(!showMeasurements);
                    }}
                    className="bg-[#FAF8F5]/90 backdrop-blur-md p-1.5 border border-[#E5E0DA] text-[#111111] hover:bg-black hover:text-white transition-colors"
                    title={showMeasurements ? 'Hide Measurement Callouts' : 'Show Measurement Callouts'}
                  >
                    <Eye size={13} />
                  </button>
                </div>
              )}

              {/* Measurement Callouts */}
              {isFirst && showMeasurements && (
                <div className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300">
                  <div className="absolute top-[37%] left-[8%] md:left-[10%] flex items-center">
                    <span className="bg-[#111111]/85 backdrop-blur-sm text-white font-mono text-[8px] md:text-[9px] tracking-widest uppercase px-2 py-0.5 shadow-sm">
                      WAIST 56–65 CM
                    </span>
                    <div className="w-6 md:w-12 h-[1px] bg-[#111111]/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#111111] -ml-0.5" />
                  </div>

                  <div className="absolute top-[52%] right-[8%] md:right-[10%] flex items-center flex-row-reverse">
                    <span className="bg-[#111111]/85 backdrop-blur-sm text-white font-mono text-[8px] md:text-[9px] tracking-widest uppercase px-2 py-0.5 shadow-sm">
                      HIPS 89 CM
                    </span>
                    <div className="w-6 md:w-12 h-[1px] bg-[#111111]/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#111111] -mr-0.5" />
                  </div>
                </div>
              )}

              {/* Tag Caption */}
              <div className="absolute bottom-3 left-3 z-10 font-mono text-[8px] tracking-widest uppercase text-white bg-black/60 px-1.5 py-0.5">
                {item.tag}
              </div>

              {/* Zoom Hover Icon */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <div className="w-8 h-8 bg-[#FAF8F5]/90 backdrop-blur-md border border-[#E5E0DA] flex items-center justify-center text-[#111111]">
                  <Maximize2 size={14} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {zoomOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
            <button
              onClick={() => setZoomOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 text-white p-2 hover:opacity-75 transition-opacity"
              aria-label="Close fullscreen"
            >
              <X size={26} />
            </button>

            <button
              onClick={() => setZoomIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 text-white p-2 sm:p-3 hover:opacity-75 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={() => setZoomIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 text-white p-2 sm:p-3 hover:opacity-75 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>

            <div className="max-w-4xl max-h-[85vh] p-2 flex flex-col items-center">
              <img
                src={gallery[zoomIndex]?.src}
                alt={gallery[zoomIndex]?.alt}
                className="max-h-[75vh] w-auto object-contain select-none shadow-2xl"
              />
              <div className="font-mono text-neutral-400 text-xs tracking-wider uppercase mt-3">
                {zoomIndex + 1} OF {gallery.length} • {gallery[zoomIndex]?.tag || 'ATELIER VIEW'}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
