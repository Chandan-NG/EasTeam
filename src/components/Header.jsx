import React, { useState } from 'react';
import { Menu, Search, Heart, User, ShoppingBag, X } from 'lucide-react';

export default function Header({ onOpenCart, onOpenWishlist, wishlistCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5E0DA] transition-all">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 h-16 md:h-20 flex items-center justify-between">
          
          {/* Mobile Menu Button & Desktop Navigation */}
          <div className="flex items-center gap-6 lg:gap-8 flex-1">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 -ml-2 flex items-center justify-center text-[#111111] hover:opacity-70 transition-opacity lg:hidden focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <nav className="hidden lg:flex items-center gap-8 font-mono text-[11px] tracking-wider-label uppercase text-[#111111]">
              <a href="#collections" className="hover:text-neutral-500 transition-colors">
                COLLECTIONS
              </a>
              <a href="#new-arrivals" className="hover:text-neutral-500 transition-colors">
                NEW ARRIVALS
              </a>
              <a href="#previously-on" className="hover:text-neutral-500 transition-colors">
                PREVIOUSLY ON
              </a>
            </nav>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center justify-center">
            <a href="/" className="flex flex-col items-center group">
              <span className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-[0.22em] font-medium text-[#111111] group-hover:opacity-90 transition-opacity uppercase">
                EASTEAM
              </span>
            </a>
          </div>

          {/* Actions (Search, Wishlist, Account, Cart) */}
          <div className="flex items-center justify-end gap-1 sm:gap-2 flex-1">
            {/* Search Toggle */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 flex items-center justify-center text-[#111111] hover:opacity-70 transition-opacity focus:outline-none" 
              aria-label="Search"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>

            {/* Wishlist Button with Counter */}
            <button 
              onClick={onOpenWishlist}
              className="relative w-9 h-9 flex items-center justify-center text-[#111111] hover:opacity-70 transition-opacity focus:outline-none" 
              aria-label="Wishlist"
            >
              <Heart size={19} strokeWidth={1.5} className={wishlistCount > 0 ? 'fill-[#111111]' : ''} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#111111] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono font-bold leading-none">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account */}
            <a 
              href="#account" 
              className="hidden sm:flex w-9 h-9 items-center justify-center text-[#111111] hover:opacity-70 transition-opacity focus:outline-none" 
              aria-label="Account"
            >
              <User size={19} strokeWidth={1.5} />
            </a>

            {/* Shopping Bag Button */}
            <button 
              onClick={onOpenCart}
              className="w-9 h-9 flex items-center justify-center text-[#111111] hover:opacity-70 transition-opacity focus:outline-none"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {searchOpen && (
          <div className="border-t border-[#E5E0DA] bg-[#FAF8F5] px-4 md:px-12 py-3">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <Search size={16} className="text-neutral-400" />
              <input 
                type="text" 
                placeholder="SEARCH ARCHIVE, PRODUCTS, EDITS..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent font-mono text-xs uppercase tracking-wider focus:outline-none placeholder:text-neutral-400 text-[#111111]"
                autoFocus
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="font-mono text-[10px] uppercase text-neutral-500 hover:text-black tracking-wider"
              >
                CLOSE [ESC]
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#FAF8F5] h-full shadow-2xl flex flex-col p-6 z-10 border-r border-[#E5E0DA]">
            <div className="flex items-center justify-between pb-6 border-b border-[#E5E0DA]">
              <span className="font-serif text-2xl tracking-[0.2em] uppercase">EASTEAM</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 -mr-2 text-[#111111]"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-6 py-8 font-mono text-xs tracking-widest-spec uppercase">
              <a 
                href="#collections" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-neutral-500 transition-colors pb-2 border-b border-[#E5E0DA]/50"
              >
                COLLECTIONS
              </a>
              <a 
                href="#new-arrivals" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-neutral-500 transition-colors pb-2 border-b border-[#E5E0DA]/50"
              >
                NEW ARRIVALS
              </a>
              <a 
                href="#previously-on" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-neutral-500 transition-colors pb-2 border-b border-[#E5E0DA]/50"
              >
                PREVIOUSLY ON
              </a>
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-neutral-500 transition-colors pb-2 border-b border-[#E5E0DA]/50"
              >
                ATELIER &amp; STORY
              </a>
            </nav>

            <div className="mt-auto pt-6 border-t border-[#E5E0DA] font-mono text-[10px] text-neutral-500 tracking-wider space-y-2 uppercase">
              <p>NEW YORK • ATELIER HOURS</p>
              <p>MON–FRI 10:00 – 18:00 EST</p>
              <p className="pt-2 text-[#111111]">SUPPORT@EASTEAMNY.COM</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
