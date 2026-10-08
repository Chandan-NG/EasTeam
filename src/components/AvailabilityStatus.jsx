import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const formatShort = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

const getDeliveryDates = () => {
  const today = new Date();
  
  const inStockStart = new Date(today);
  inStockStart.setDate(today.getDate() + 3);
  const inStockEnd = new Date(today);
  inStockEnd.setDate(today.getDate() + 8);

  const preOrderStart = new Date(today);
  preOrderStart.setDate(today.getDate() + 38);
  const preOrderEnd = new Date(today);
  preOrderEnd.setDate(today.getDate() + 48);

  return {
    inStock: `${formatShort(inStockStart)} – ${formatShort(inStockEnd)}`,
    preOrder: `${formatShort(preOrderStart)} – ${formatShort(preOrderEnd)}`,
  };
};

const DELIVERY_DATES = getDeliveryDates();

export default function AvailabilityStatus({
  selectedSize,
  fulfillmentMode,
  setFulfillmentMode,
  inStockPrice = 202,
  preOrderPrice = 191.90,
}) {
  const isInStock = selectedSize?.inStockAvailable;
  const isPreOrderOnly = !isInStock && selectedSize?.preOrderAvailable;

  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* Dynamic Status Banner */}
      <motion.div
        key={`${selectedSize?.size}-${fulfillmentMode}`}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`px-3 py-2 border font-mono text-[10px] tracking-wider uppercase flex items-center justify-between transition-colors ${
          isPreOrderOnly || fulfillmentMode === 'preorder'
            ? 'bg-[#FFF7ED] border-[#FED7AA] text-[#9A3412]'
            : 'bg-[#EAF7F2] border-[#C1E7D7] text-[#1E6548]'
        }`}
      >
        <div className="flex items-center gap-2">
          {fulfillmentMode === 'instock' && isInStock ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E6548] animate-pulse" />
              <span className="font-bold">
                ✓ SIZE {selectedSize?.size || 'S'} IS IN STOCK
              </span>
            </>
          ) : (
            <>
              <Clock size={12} className="text-[#9A3412]" />
              <span className="font-bold">
                HANDCRAFTED TO ORDER ({selectedSize?.size || 'S'})
              </span>
            </>
          )}
        </div>

        <span className="text-[9px] text-neutral-600 hidden xs:inline">
          {fulfillmentMode === 'instock' && isInStock
            ? 'SHIPS WITHIN 48 HOURS'
            : 'BESPOKE TAILORING'}
        </span>
      </motion.div>

      {/* Fulfillment Options */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between font-mono text-[9px] md:text-[10px] tracking-widest-spec text-neutral-500 uppercase">
          <span>FULFILLMENT DISPATCH MODE</span>
          <span>ESTIMATED DELIVERY</span>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            disabled={!isInStock}
            onClick={() => setFulfillmentMode('instock')}
            className={`text-left p-3 border transition-all relative flex items-center justify-between gap-3 ${
              !isInStock
                ? 'opacity-40 bg-[#FAF8F5] border-[#E5E0DA] cursor-not-allowed'
                : fulfillmentMode === 'instock'
                ? 'border-[#111111] bg-white ring-1 ring-black shadow-xs'
                : 'border-[#E5E0DA] bg-white hover:border-neutral-400'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                fulfillmentMode === 'instock' && isInStock
                  ? 'border-[#111111] bg-[#111111]'
                  : 'border-neutral-400 bg-transparent'
              }`}>
                {fulfillmentMode === 'instock' && isInStock && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[11px] font-bold tracking-wider text-[#111111] uppercase block truncate">
                  IN STOCK DISPATCH
                </span>
                <p className="font-sans text-[11px] text-neutral-600 leading-tight">
                  Ready in studio. Dispatches in 2–3 business days.
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="font-mono text-xs font-bold text-[#111111]">
                ${inStockPrice.toFixed(2)}
              </div>
              <div className="font-mono text-[9px] text-neutral-500 uppercase">
                {DELIVERY_DATES.inStock}
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setFulfillmentMode('preorder')}
            className={`text-left p-3 border transition-all relative flex items-center justify-between gap-3 ${
              fulfillmentMode === 'preorder'
                ? 'border-[#111111] bg-white ring-1 ring-black shadow-xs'
                : 'border-[#E5E0DA] bg-white hover:border-neutral-400'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                fulfillmentMode === 'preorder'
                  ? 'border-[#111111] bg-[#111111]'
                  : 'border-neutral-400 bg-transparent'
              }`}>
                {fulfillmentMode === 'preorder' && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[11px] font-bold tracking-wider text-[#111111] uppercase">
                    MADE TO ORDER
                  </span>
                  <span className="bg-[#FCE9E9] text-[#93000A] text-[8px] px-1 py-0.2 font-mono font-bold tracking-wider">
                    5% OFF
                  </span>
                </div>
                <p className="font-sans text-[11px] text-neutral-600 leading-tight">
                  Bespoke handcrafted piece. Approx. 4–6 weeks.
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="font-mono text-xs font-bold text-[#111111]">
                ${preOrderPrice.toFixed(2)}
              </div>
              <div className="font-mono text-[9px] text-neutral-500 uppercase">
                {DELIVERY_DATES.preOrder}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
