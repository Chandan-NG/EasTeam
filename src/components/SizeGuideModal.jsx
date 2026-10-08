import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, HelpCircle } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose, productData }) {
  const [unit, setUnit] = useState('cm');

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
        className="relative w-full max-w-xl bg-[#FAF8F5] border border-[#E5E0DA] shadow-2xl p-4 sm:p-7 z-10 my-4 sm:my-8 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[#E5E0DA]">
          <div>
            <div className="font-mono text-[10px] tracking-widest-spec uppercase text-neutral-500">
              ATELIER FIT SPECIFICATIONS
            </div>
            <h2 className="font-serif text-2xl tracking-wide uppercase font-medium text-[#111111]">
              SIZE GUIDE — DAYDREAM SKIRT
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 -mr-2 text-[#111111] hover:text-neutral-500 transition-colors focus:outline-none"
            aria-label="Close Size Guide"
          >
            <X size={20} />
          </button>
        </div>

        {/* Unit Toggle & Model Note */}
        <div className="py-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-600">
              CONVERT MEASUREMENTS:
            </span>

            <div className="inline-flex border border-[#111111] p-0.5 bg-white font-mono text-[11px] uppercase">
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 transition-colors ${
                  unit === 'cm'
                    ? 'bg-[#111111] text-white font-bold'
                    : 'text-[#111111] hover:bg-neutral-100'
                }`}
              >
                Centimeters
              </button>
              <button
                type="button"
                onClick={() => setUnit('in')}
                className={`px-3 py-1 transition-colors ${
                  unit === 'in'
                    ? 'bg-[#111111] text-white font-bold'
                    : 'text-[#111111] hover:bg-neutral-100'
                }`}
              >
                Inches
              </button>
            </div>
          </div>

          {/* Sizing Table */}
          <div className="overflow-x-auto border border-[#E5E0DA] bg-white">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#E5E0DA] text-[#111111]">
                  <th className="py-3 px-4 tracking-widest uppercase font-bold">SIZE</th>
                  <th className="py-3 px-4 tracking-widest uppercase font-bold">
                    WAIST ({unit})
                  </th>
                  <th className="py-3 px-4 tracking-widest uppercase font-bold">
                    HIPS ({unit})
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E0DA]">
                {productData.sizeGuideData.map((row) => (
                  <tr key={row.size} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-[#111111]">{row.size}</td>
                    <td className="py-3 px-4 text-neutral-600">
                      {unit === 'cm' ? `${row.waistCm} cm` : `${row.waistIn} in`}
                    </td>
                    <td className="py-3 px-4 text-neutral-600">
                      {unit === 'cm' ? `${row.hipsCm} cm` : `${row.hipsIn} in`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Model Fit Callout */}
          <div className="p-3.5 bg-white border border-[#E5E0DA] font-mono text-[11px] text-[#111111] space-y-1">
            <div className="flex items-center gap-1.5 font-bold uppercase">
              <HelpCircle size={14} className="text-[#111111]" />
              <span>MODEL SIZING ADVISORY</span>
            </div>
            <p className="text-neutral-600 uppercase">
              MODEL IS <strong>{productData.model.height}</strong> AND WEARS <strong>SIZE {productData.model.size}</strong>.
            </p>
            <p className="text-[#9A3412] font-semibold text-[10px] pt-1 uppercase">
              {productData.model.sizingNote}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E5E0DA] flex justify-end font-mono">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-widest font-bold hover:bg-neutral-800 transition-colors"
          >
            DONE
          </button>
        </div>
      </motion.div>
    </div>
  );
}
