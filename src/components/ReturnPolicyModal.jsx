import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';

export default function ReturnPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0D0D0D]/60 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#E5E0DA] shadow-2xl p-4 sm:p-7 z-10 my-4 sm:my-8 overflow-hidden font-sans"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E0DA]">
          <div>
            <div className="font-mono text-[10px] tracking-widest-spec uppercase text-neutral-500">
              EASTEAM CLIENT SERVICES
            </div>
            <h2 className="font-serif text-2xl tracking-wide uppercase font-medium text-[#111111]">
              RETURNS &amp; REFUND POLICY
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 -mr-2 text-[#111111] hover:text-neutral-500 transition-colors focus:outline-none"
            aria-label="Close Returns Modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="py-5 space-y-4 text-xs text-neutral-700 leading-relaxed">
          <div className="bg-[#EAF7F2] p-3.5 border border-[#C1E7D7] flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-[#1E6548] mt-0.5 flex-shrink-0" />
            <div className="font-mono text-[11px] text-[#1E6548] uppercase tracking-wider">
              <strong>7-DAY STORE CREDIT GUARANTEE:</strong> Returns initiated within 7 days of delivery are eligible for 100% store credit or size exchange.
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#111111]">
              1. RETURN ELIGIBILITY CONDITIONS
            </h4>
            <p>
              To be eligible for return, pieces must be unworn, unwashed, and undamaged with all original security tags, interior designer labels, and atelier dust bags attached.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#111111]">
              2. MADE TO ORDER &amp; PRE-ORDER POLICY
            </h4>
            <div className="bg-[#FFF7ED] p-3 border border-[#FED7AA] text-[#9A3412] text-[11px]">
              <strong className="font-mono uppercase block mb-1">PLEASE NOTE:</strong>
              Because made-to-order and bespoke pre-order pieces are tailored individually upon order confirmation, they are non-refundable once cutting has commenced.
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#111111]">
              3. HOW TO INITIATE A RETURN
            </h4>
            <p>
              Contact our concierge team at <a href="mailto:support@easteamny.com" className="underline font-bold text-black">support@easteamny.com</a> with your order number. A prepaid return label will be provided for eligible returns.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E5E0DA] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#111111] text-white font-mono text-xs uppercase tracking-widest font-bold hover:bg-neutral-800 transition-colors"
          >
            I UNDERSTAND
          </button>
        </div>
      </motion.div>
    </div>
  );
}
