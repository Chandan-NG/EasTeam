import React from 'react';
import { Truck, RotateCcw, ShieldCheck } from 'lucide-react';

export default function ShippingReturns({ onOpenReturnPolicy }) {
  return (
    <div className="w-full flex flex-col gap-2.5 pt-1">
      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-1 py-2 border-y border-[#E5E0DA] font-mono text-[8px] sm:text-[9px] md:text-[10px] tracking-wider uppercase text-neutral-600 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 px-1">
          <ShieldCheck size={13} className="text-[#111111] shrink-0" />
          <span className="truncate">ENCRYPTED CHECKOUT</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 px-1 border-x border-[#E5E0DA]">
          <RotateCcw size={13} className="text-[#111111] shrink-0" />
          <span className="truncate">7-DAY STORE CREDIT</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 px-1">
          <Truck size={13} className="text-[#111111] shrink-0" />
          <span className="truncate">TRACKED COURIER</span>
        </div>
      </div>

      {/* Shipping & Returns Summary */}
      <div className="bg-[#F5F3F0]/70 border border-[#E5E0DA] p-3 sm:p-3.5 space-y-2.5 font-sans text-xs">
        <div className="flex items-start gap-2.5">
          <Truck size={15} className="text-[#111111] mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <div className="font-mono text-[10px] tracking-wider uppercase font-bold text-[#111111]">
              FREE WORLDWIDE SHIPPING OVER $149
            </div>
            <p className="text-neutral-600 text-[11px] leading-relaxed">
              Standard Ground Shipping delivers in <strong className="text-[#111111] font-medium">3–10 business days</strong>. Orders below $149: $20 flat rate.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 pt-2 border-t border-[#E5E0DA]/70">
          <RotateCcw size={15} className="text-[#111111] mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <div className="font-mono text-[10px] tracking-wider uppercase font-bold text-[#111111]">
              EASY 7-DAY STORE CREDIT RETURNS
            </div>
            <p className="text-neutral-600 text-[11px] leading-relaxed">
              We want you to love your pieces. Return eligible items within 7 days of delivery for store credit.
              <button
                type="button"
                onClick={onOpenReturnPolicy}
                className="ml-1 text-[#111111] underline hover:text-neutral-500 font-mono text-[9px] uppercase"
              >
                View return policy →
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
