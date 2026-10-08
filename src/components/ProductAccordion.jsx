import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Star } from 'lucide-react';

export default function ProductAccordion({
  description,
  materials,
  shipping,
  returns,
  model,
  reviewsList = [],
  faqs = [],
  onOpenSizeGuide
}) {
  const [openSections, setOpenSections] = useState({
    description: true,
    materials: false,
    sizing: false,
    shipping: false,
    reviews: false,
    faq: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const sections = [
    {
      id: 'description',
      title: 'DESCRIPTION',
      content: (
        <div className="space-y-3 font-sans text-xs md:text-[13px] text-neutral-700 leading-relaxed">
          <p className="font-normal text-[#111111]">
            {description.lead}
          </p>
          <p>
            {description.body}
          </p>
          <div className="pt-2 font-mono text-[10px] tracking-wider uppercase text-neutral-500 border-t border-[#E5E0DA]/50">
            {description.styling}
          </div>
        </div>
      ),
    },
    {
      id: 'materials',
      title: 'MATERIAL & FABRIC CARE',
      content: (
        <div className="space-y-3 font-sans text-xs md:text-[13px] text-neutral-700 leading-relaxed">
          <div>
            <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-[#111111] block mb-1">
              COMPOSITION
            </span>
            <p>{materials.composition}</p>
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-[#111111] block mb-1">
              CONSTRUCTION
            </span>
            <p>{materials.waistband}</p>
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-[#111111] block mb-1">
              CARE GUIDELINES
            </span>
            <ul className="list-disc pl-4 space-y-1 text-neutral-600 text-xs">
              {materials.care.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'sizing',
      title: 'SIZE & FIT GUIDANCE',
      content: (
        <div className="space-y-3 font-sans text-xs md:text-[13px] text-neutral-700 leading-relaxed">
          <div className="bg-[#FAF8F5] p-3 border border-[#E5E0DA] font-mono text-[11px] space-y-1.5 uppercase">
            <div className="font-bold text-[#111111]">
              MODEL MEASUREMENTS
            </div>
            <p className="text-neutral-600">
              HEIGHT: {model.height} • SIZE WORN: {model.size}
            </p>
            <p className="text-neutral-600">
              WAIST: {model.waist} • HIPS: {model.hips}
            </p>
            <div className="pt-1 text-[#9A3412] font-semibold text-[10px]">
              {model.sizingNote}
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenSizeGuide}
            className="font-mono text-[11px] uppercase tracking-wider text-[#111111] underline hover:text-neutral-500 pt-1 block"
          >
            VIEW COMPREHENSIVE SIZE CHART &amp; ATELIER CONVERSIONS →
          </button>
        </div>
      ),
    },
    {
      id: 'shipping',
      title: 'DELIVERY AND PAYMENT',
      content: (
        <div className="space-y-3 font-sans text-xs md:text-[13px] text-neutral-700 leading-relaxed">
          <div className="space-y-1">
            <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-[#111111] block">
              WORLDWIDE FULFILLMENT
            </span>
            <p>
              Complimentary standard shipping on all international orders over $149 USD. Standard orders below $149 are billed at $20 flat rate.
            </p>
            <p className="text-neutral-500 text-xs">
              {shipping.cutoff}
            </p>
          </div>
          <div className="space-y-1 pt-2 border-t border-[#E5E0DA]/50">
            <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-[#111111] block">
              STORE CREDIT RETURNS
            </span>
            <p>{returns.fullPolicy}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'reviews',
      title: 'REVIEWS (24)',
      content: (
        <div className="space-y-4 font-sans text-xs md:text-[13px] text-neutral-700 leading-relaxed">
          {/* Summary Score */}
          <div className="flex items-center gap-3 pb-3 border-b border-[#E5E0DA]/50">
            <div className="flex items-center text-[#111111]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < 4 || (i === 4 && true) ? 'fill-[#111111] text-[#111111]' : 'text-neutral-300'} />
              ))}
            </div>
            <span className="font-mono font-bold text-sm text-[#111111]">4.8 / 5.0</span>
            <span className="font-mono text-[10px] text-neutral-500 uppercase">(24 VERIFIED ATELIER CLIENTS)</span>
          </div>

          {/* Fit & Length Gauge */}
          <div className="space-y-3 bg-[#FAF8F5] p-3.5 border border-[#E5E0DA] font-mono text-[10px] uppercase">
            <div>
              <div className="flex justify-between text-[#111111] font-bold mb-1">
                <span>FIT: TRUE TO SIZE</span>
                <span className="text-neutral-500 font-normal">84% CONCURRENCE</span>
              </div>
              <div className="relative w-full h-1.5 bg-[#E5E0DA] overflow-hidden">
                <div className="absolute top-0 bottom-0 bg-[#111111]" style={{ left: '46%', width: '12%' }} />
              </div>
              <div className="flex justify-between text-neutral-500 text-[8px] mt-1 tracking-wider">
                <span>RUNS SMALL</span>
                <span className="text-[#111111] font-bold">TRUE TO SIZE</span>
                <span>RUNS LARGE</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E5E0DA]/70">
              <div className="flex justify-between text-[#111111] font-bold mb-1">
                <span>LENGTH: TRUE TO LENGTH</span>
                <span className="text-neutral-500 font-normal">88% CONCURRENCE</span>
              </div>
              <div className="relative w-full h-1.5 bg-[#E5E0DA] overflow-hidden">
                <div className="absolute top-0 bottom-0 bg-[#111111]" style={{ left: '47%', width: '12%' }} />
              </div>
              <div className="flex justify-between text-neutral-500 text-[8px] mt-1 tracking-wider">
                <span>SHORT</span>
                <span className="text-[#111111] font-bold">TRUE TO LENGTH</span>
                <span>LONG</span>
              </div>
            </div>
          </div>

          {/* Review Cards */}
          <div className="space-y-3 pt-1">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="pb-3 border-b border-[#E5E0DA]/50 last:border-none space-y-1">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <div className="flex items-center gap-1 text-[#111111]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={11} className="fill-[#111111] text-[#111111]" />
                    ))}
                  </div>
                  <span className="text-neutral-400 uppercase">{rev.date}</span>
                </div>
                <h5 className="font-mono text-xs font-bold uppercase text-[#111111]">{rev.title}</h5>
                <p className="text-xs text-neutral-600 leading-relaxed font-sans">{rev.body}</p>
                <div className="font-mono text-[9px] uppercase text-neutral-500 flex items-center gap-2 pt-0.5">
                  <span className="text-[#111111] font-semibold">{rev.author}</span>
                  <span>•</span>
                  <span>{rev.location}</span>
                  {rev.verified && (
                    <>
                      <span>•</span>
                      <span className="text-[#1E6548] font-bold">✓ VERIFIED PURCHASE</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'faq',
      title: 'FREQUENTLY ASKED QUESTIONS',
      content: (
        <div className="space-y-3 font-sans text-xs md:text-[13px] text-neutral-700 leading-relaxed">
          {faqs.map((faq, idx) => (
            <div key={idx} className="pb-2 border-b border-[#E5E0DA]/50 last:border-none last:pb-0">
              <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-[#111111] block mb-0.5">
                {faq.q}
              </span>
              <p className="text-neutral-600 text-xs">{faq.a}</p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col border-t border-[#E5E0DA] mt-4">
      {sections.map((section) => {
        const isOpen = openSections[section.id];
        return (
          <div 
            key={section.id} 
            className="border-b border-[#E5E0DA] transition-colors"
          >
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              className="w-full py-4 flex items-center justify-between text-left group focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="font-mono text-[11px] md:text-[12px] font-bold tracking-widest uppercase text-[#111111] group-hover:text-neutral-500 transition-colors">
                {section.title}
              </span>

              <span className="text-[#111111] group-hover:text-neutral-500 transition-colors pl-2">
                {isOpen ? <Minus size={15} /> : <Plus size={15} />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 pt-1">
                    {section.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
