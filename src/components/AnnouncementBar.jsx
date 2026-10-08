import React from 'react';

export default function AnnouncementBar() {
  return (
    <aside aria-label="Announcement" className="bg-[#111111] text-[#FAF8F5] text-[10px] md:text-[11px] font-mono tracking-widest-spec uppercase py-2.5 px-4 overflow-hidden border-b border-[#222222]">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-center">
        <span className="hidden sm:inline">FREE MYSTERY GIFT WITH $500+ PURCHASE</span>
        <span className="hidden sm:inline text-neutral-500">•</span>
        <span className="font-semibold text-[#F4D9D2]">COMPLIMENTARY WORLDWIDE SHIPPING ON ORDERS OVER $149</span>
        <span className="hidden md:inline text-neutral-500">•</span>
        <span className="hidden md:inline">HANDCRAFTED LUXURY &amp; SIGNATURE RUNS</span>
      </div>
    </aside>
  );
}
