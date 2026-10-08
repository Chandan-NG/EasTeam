import React from 'react';
import { Globe, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A0807] text-[#FAF8F5] pt-16 md:pt-24 pb-12 border-t border-[#1F1B17]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Large Watermark EASTEAM Serif Logo */}
        <div className="flex flex-col items-center justify-center pb-12 border-b border-[#1F1B17] text-center">
          <span className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.25em] text-[#222222]/80 uppercase select-none font-light">
            EASTEAM
          </span>
          <div className="font-mono text-[10px] md:text-[11px] tracking-widest-spec text-neutral-500 uppercase mt-2">
            NEW YORK • MADE TO LOVE YOU
          </div>
        </div>

        {/* 4 Column Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 py-12 border-b border-[#1F1B17] font-mono text-xs">
          {/* Column 1: Customer Care */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-white font-bold tracking-wider uppercase text-[11px]">
              <span>CUSTOMER CARE</span>
              <ArrowUpRight size={13} className="text-neutral-500" />
            </div>
            <ul className="space-y-2.5 text-neutral-400 text-[11px] uppercase tracking-wider">
              <li><a href="#shipping" className="hover:text-white transition-colors">Shipping &amp; Delivery</a></li>
              <li><a href="#returns" className="hover:text-white transition-colors">Returns &amp; Refunds</a></li>
              <li><a href="#order-tracking" className="hover:text-white transition-colors">Order Tracking</a></li>
              <li><a href="#size-guide" className="hover:text-white transition-colors">Size Guide &amp; Care</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Concierge</a></li>
            </ul>
          </div>

          {/* Column 2: About EASTEAM */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-white font-bold tracking-wider uppercase text-[11px]">
              <span>ABOUT EASTEAM</span>
              <ArrowUpRight size={13} className="text-neutral-500" />
            </div>
            <ul className="space-y-2.5 text-neutral-400 text-[11px] uppercase tracking-wider">
              <li><a href="#story" className="hover:text-white transition-colors">Our Story &amp; Atelier</a></li>
              <li><a href="#journal" className="hover:text-white transition-colors">Editorial Journal</a></li>
              <li><a href="#sustainability" className="hover:text-white transition-colors">Sustainability &amp; Craft</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#wholesale" className="hover:text-white transition-colors">Wholesale Inquiries</a></li>
            </ul>
          </div>

          {/* Column 3: Legal & Terms */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-white font-bold tracking-wider uppercase text-[11px]">
              <span>LEGAL &amp; TERMS</span>
              <ArrowUpRight size={13} className="text-neutral-500" />
            </div>
            <ul className="space-y-2.5 text-neutral-400 text-[11px] uppercase tracking-wider">
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#cookies" className="hover:text-white transition-colors">Cookie Preferences</a></li>
              <li><a href="#accessibility" className="hover:text-white transition-colors">Accessibility Statement</a></li>
            </ul>
          </div>

          {/* Column 4: Follow Us & Currency */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-white font-bold tracking-wider uppercase text-[11px]">
              <span>FOLLOW US</span>
              <ArrowUpRight size={13} className="text-neutral-500" />
            </div>
            <ul className="space-y-2.5 text-neutral-400 text-[11px] uppercase tracking-wider">
              <li><a href="https://www.instagram.com/easteam_official/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram @easteamny</a></li>
              <li><a href="https://www.tiktok.com/@easteam_official" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">TikTok</a></li>
              <li><a href="https://www.pinterest.com/easteam_official/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Pinterest</a></li>
            </ul>

            <div className="pt-3">
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 border border-[#333333] hover:border-neutral-400 text-neutral-300 font-mono text-[10px] uppercase tracking-wider bg-[#141414] transition-colors"
              >
                <Globe size={13} />
                <span>USD ($)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-neutral-500 tracking-wider uppercase gap-4 text-center sm:text-left">
          <div>
            © 2026 EASTEAM NY, Limited. All rights reserved.
          </div>
          <div>
            Designed for modern muses worldwide.
          </div>
        </div>
      </div>
    </footer>
  );
}
