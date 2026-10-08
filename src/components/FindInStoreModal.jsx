import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Search, Clock, Phone } from 'lucide-react';

export default function FindInStoreModal({ isOpen, onClose, selectedSize, stores = [] }) {
  const [searchZip, setSearchZip] = useState('');

  if (!isOpen) return null;

  const filteredStores = stores.filter((store) => {
    if (!searchZip) return true;
    const term = searchZip.toLowerCase();
    return (
      store.name.toLowerCase().includes(term) ||
      store.address.toLowerCase().includes(term) ||
      store.address.includes(term)
    );
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0D0D0D]/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#E5E0DA] shadow-2xl z-10 flex flex-col max-h-[85vh] sm:max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#E5E0DA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin size={17} className="text-[#111111]" />
              <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-[#111111]">
                ATELIER &amp; IN-STORE AVAILABILITY
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-neutral-500 hover:text-black transition-colors"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Box */}
          <div className="p-3.5 sm:p-5 pb-3 border-b border-[#E5E0DA] bg-[#F5F3F0]">
            <p className="font-mono text-[10px] tracking-wider uppercase text-neutral-600 mb-2">
              INVENTORY INQUIRY FOR <strong className="text-black">DAYDREAM SKIRT (SIZE {selectedSize?.size || 'S'})</strong>
            </p>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="ENTER CITY, STATE OR ZIP CODE..."
                value={searchZip}
                onChange={(e) => setSearchZip(e.target.value)}
                className="w-full pl-9 pr-4 py-2 font-mono text-xs uppercase tracking-wider bg-white border border-[#E5E0DA] focus:border-[#111111] focus:outline-none transition-colors text-[#111111] placeholder:text-neutral-400"
              />
            </div>
          </div>

          {/* Stores List */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-3">
            {filteredStores.length === 0 ? (
              <div className="text-center py-8 font-mono text-xs uppercase text-neutral-500">
                NO ATELIER LOCATIONS FOUND MATCHING SEARCH.
              </div>
            ) : (
              filteredStores.map((store) => {
                const isSizeAvailable = store.sizesAvailable.includes(selectedSize?.size || 'S');

                return (
                  <div
                    key={store.id}
                    className="p-3.5 sm:p-4 border border-[#E5E0DA] bg-white transition-all space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                          {store.name}
                        </h3>
                        <p className="font-sans text-xs text-neutral-600 mt-0.5">
                          {store.address}
                        </p>
                      </div>

                      <span
                        className={`font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 border shrink-0 ${
                          isSizeAvailable
                            ? 'bg-[#EAF7F2] text-[#1E6548] border-[#C1E7D7]'
                            : 'bg-[#FFF7ED] text-[#9A3412] border-[#FED7AA]'
                        }`}
                      >
                        {isSizeAvailable ? store.status : 'SIZE ' + (selectedSize?.size || 'S') + ' RESERVED'}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-neutral-500 uppercase">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} />
                        <span>{store.hours}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone size={12} />
                        <span>{store.phone}</span>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono uppercase text-neutral-600">
                      STOCKED SIZES: <strong className="text-black">{store.sizesAvailable.join(' • ')}</strong>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-4 sm:px-5 py-3 border-t border-[#E5E0DA] bg-[#F5F3F0] flex items-center justify-between font-mono text-[10px] tracking-wider uppercase text-neutral-500">
            <span>REAL-TIME ATELIER SYNC</span>
            <button
              onClick={onClose}
              className="text-[#111111] font-bold hover:underline"
            >
              CLOSE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
