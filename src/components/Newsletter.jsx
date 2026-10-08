import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="w-full bg-[#0D0D0D] text-[#FAF8F5] py-20 md:py-28 px-4 border-t border-[#222222]">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
        {/* 10% Off Display */}
        <div className="flex flex-col items-center mb-6">
          <div className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[#F4D9D2] leading-none mb-2">
            10%
          </div>
          <div className="flex items-center gap-2 text-[#F4D9D2] mb-1">
            <Heart size={14} fill="#F4D9D2" />
          </div>
          <div className="font-mono text-[10px] md:text-[11px] tracking-widest-spec uppercase text-neutral-400">
            OFF YOUR FIRST ORDER
          </div>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-3 mb-8">
          <div className="font-mono text-[10px] tracking-widest uppercase text-neutral-500">
            — THE INNER CIRCLE —
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-medium tracking-wide uppercase text-white">
            BE THE FIRST TO KNOW.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
            First dibs on new drops, exclusive archive sales, and private curated content made just for members.
          </p>
        </div>

        {/* Form */}
        {subscribed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-4 border border-[#222222] bg-[#161616] text-[#F4D9D2] font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Check size={16} />
            <span>YOU'RE ON THE LIST. CHECK YOUR INBOX FOR YOUR 10% VOUCHER.</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR EMAIL ADDRESS"
              required
              className="w-full h-12 bg-transparent border border-[#333333] px-4 font-mono text-xs uppercase tracking-wider text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F4D9D2] transition-colors text-center"
            />
            <button
              type="submit"
              className="w-full h-12 bg-[#F4D9D2] hover:bg-[#ebd0c8] text-[#111111] font-mono text-xs tracking-widest uppercase font-bold transition-colors shadow-sm"
            >
              JOIN US
            </button>
          </form>
        )}

        <div className="mt-8 font-mono text-[9px] tracking-widest uppercase text-neutral-600">
          MADE TO LOVE YOU
        </div>
      </div>
    </section>
  );
}
