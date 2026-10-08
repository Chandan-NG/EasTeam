import React from 'react';
import { Ruler } from 'lucide-react';

export default function SizeSelector({
  sizes = [],
  selectedSize,
  onSelectSize,
  onOpenSizeGuide,
}) {
  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* Header Row */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-wider-label uppercase text-[#111111]">
        <span className="font-bold flex items-center gap-1.5">
          <span>SELECT SIZE</span>
          {selectedSize && (
            <span className="text-neutral-500 font-normal">: {selectedSize.size}</span>
          )}
        </span>

        <button
          type="button"
          onClick={onOpenSizeGuide}
          className="text-[#111111] hover:text-neutral-600 transition-colors underline underline-offset-4 decoration-[#E5E0DA] hover:decoration-black flex items-center gap-1.5"
        >
          <Ruler size={13} className="text-[#111111]" />
          <span>Size Guide</span>
          <span className="text-[12px]">→</span>
        </button>
      </div>

      {/* Size Options */}
      <div className="grid grid-cols-4 gap-2">
        {sizes.map((item) => {
          const isSelected = selectedSize?.size === item.size;
          const isDisabled = item.disabled || (item.stock === 0 && !item.preOrderAvailable);

          return (
            <button
              key={item.size}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelectSize(item)}
              className={`relative h-14 border transition-all flex flex-col items-center justify-center select-none ${
                isDisabled
                  ? 'border-[#E5E0DA]/60 bg-[#FAF8F5] text-neutral-300 cursor-not-allowed opacity-60'
                  : isSelected
                  ? 'border-[#111111] bg-[#111111] text-white shadow-sm'
                  : 'border-[#E5E0DA] bg-white hover:border-[#111111] text-[#111111] hover:bg-neutral-50'
              }`}
            >
              <span className={`font-mono text-sm tracking-wider font-bold ${
                isDisabled ? 'line-through decoration-neutral-300' : ''
              }`}>
                {item.size}
              </span>

              <span className={`font-mono text-[8px] tracking-widest uppercase mt-0.5 ${
                isDisabled
                  ? 'text-neutral-300'
                  : isSelected
                  ? 'text-neutral-300'
                  : item.status === 'LOW STOCK'
                  ? 'text-[#B88232] font-semibold'
                  : 'text-neutral-500'
              }`}>
                {item.label}
              </span>

              {isDisabled && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="w-[150%] h-[1px] bg-neutral-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
