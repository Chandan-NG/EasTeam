import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, MapPin, Check, Star } from 'lucide-react';
import SizeSelector from './SizeSelector';
import AvailabilityStatus from './AvailabilityStatus';
import ShippingReturns from './ShippingReturns';
import ProductAccordion from './ProductAccordion';
import FindInStoreModal from './FindInStoreModal';

export default function ProductInfo({
  product,
  selectedSize,
  setSelectedSize,
  fulfillmentMode,
  setFulfillmentMode,
  quantity,
  onAddToCart,
  onOpenSizeGuide,
  onOpenReturnPolicy,
  isFavorited,
  onToggleFavorite,
}) {
  const [selectedColor, setSelectedColor] = useState(product.color.name);
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Price calculations based on fulfillment tier
  const unitPrice = fulfillmentMode === 'preorder' ? product.preOrderPrice : product.price;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    setAddedAnimation(true);
    onAddToCart({
      product,
      size: selectedSize?.size || 'S',
      fulfillmentMode,
      quantity,
      price: unitPrice,
      total: totalPrice,
    });
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  return (
    <div className="w-full flex flex-col gap-5 lg:gap-6 lg:py-1">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="font-mono text-[9px] md:text-[10px] tracking-widest-spec text-neutral-500 uppercase flex flex-wrap items-center gap-1.5 pb-0.5">
        <a href="#" className="hover:text-black transition-colors">HOME</a>
        <span>/</span>
        <a href="#" className="hover:text-black transition-colors">BOTTOMS</a>
        <span>/</span>
        <a href="#" className="hover:text-black transition-colors">SKIRTS</a>
        <span>/</span>
        <span className="text-[#111111] font-semibold">{product.title}</span>
      </nav>

      {/* Header & Title */}
      <div className="space-y-1.5">
        <div className="font-mono text-[9px] md:text-[10px] tracking-widest-spec text-neutral-500 uppercase">
          {product.eyebrow}
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] leading-[1.12] font-medium tracking-tight text-[#111111] uppercase">
          {product.title}
        </h1>

        {/* Price & Rating */}
        <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-3 pt-1">
          <div className="flex items-center gap-2.5">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#111111]">
                ${unitPrice.toFixed(2)}
              </span>
              {fulfillmentMode === 'preorder' && (
                <span className="font-mono text-xs text-neutral-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <span className="bg-[#EAF7F2] text-[#1E6548] border border-[#C1E7D7] font-mono text-[9px] tracking-widest uppercase px-2 py-0.5">
              {product.badge}
            </span>
          </div>

          {/* Rating Summary */}
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-600">
            <div className="flex items-center text-[#111111]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} className={i < 4 || (i === 4 && true) ? 'fill-[#111111] text-[#111111]' : 'text-neutral-300'} />
              ))}
            </div>
            <span className="font-bold text-[#111111]">4.8</span>
            <a
              href="#reviews"
              onClick={(e) => {
                e.preventDefault();
                const revElem = document.getElementById('reviews-section');
                if (revElem) revElem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="underline hover:text-black"
            >
              (24 REVIEWS)
            </a>
          </div>
        </div>

        {/* Installments Breakdown */}
        <p className="font-sans text-xs text-neutral-500 pt-0.5">
          or 4 interest-free payments of ${(unitPrice / 4).toFixed(2)} with <strong className="text-[#111111] font-medium">Klarna</strong> or <strong className="text-[#111111] font-medium">ShopPay</strong>
        </p>
      </div>

      <div className="h-[1px] bg-[#E5E0DA] w-full" />

      {/* Color Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between font-mono text-[11px] tracking-wider-label uppercase text-[#111111]">
          <span>
            COLOUR: <span className="font-bold">{selectedColor}</span>
          </span>
          <span className="text-neutral-400">
            {product.color.totalShades} SHADES
          </span>
        </div>

        <div className="flex items-center gap-3">
          {product.otherColors.map((col) => {
            const isSelected = selectedColor.toLowerCase().includes(col.value.split('-')[0]) || (col.current && selectedColor === product.color.name);
            return (
              <button
                key={col.value}
                type="button"
                onClick={() => setSelectedColor(col.name.toUpperCase())}
                className="relative p-0.5 group focus:outline-none"
                title={`${col.name} ${col.price ? `($${col.price})` : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border border-[#111111] ring-1 ring-[#111111]/30 p-0.5'
                      : 'border border-transparent hover:border-neutral-300'
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded-full border border-black/10 shadow-inner"
                    style={{ backgroundColor: col.hex }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Selection */}
      <SizeSelector
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSelectSize={(size) => {
          setSelectedSize(size);
          if (!size.inStockAvailable && size.preOrderAvailable) {
            setFulfillmentMode('preorder');
          } else if (size.inStockAvailable && fulfillmentMode === 'preorder' && !selectedSize?.inStockAvailable) {
            setFulfillmentMode('instock');
          }
        }}
        onOpenSizeGuide={onOpenSizeGuide}
      />

      {/* Availability & Fulfillment */}
      <AvailabilityStatus
        selectedSize={selectedSize}
        fulfillmentMode={fulfillmentMode}
        setFulfillmentMode={setFulfillmentMode}
        inStockPrice={product.price}
        preOrderPrice={product.preOrderPrice}
      />

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-stretch gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.985 }}
            onClick={handleAdd}
            className={`flex-1 h-12 bg-[#111111] text-white font-mono text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2.5 hover:bg-neutral-800 transition-all shadow-xs ${
              addedAnimation ? 'bg-[#1E6548] text-white' : ''
            }`}
          >
            {addedAnimation ? (
              <>
                <Check size={16} />
                <span>ADDED TO BAG</span>
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                <span>ADD TO CART — ${(totalPrice).toFixed(2)}</span>
              </>
            )}
          </motion.button>

          <button
            type="button"
            onClick={onToggleFavorite}
            className={`w-12 h-12 border transition-colors flex items-center justify-center shrink-0 ${
              isFavorited
                ? 'border-[#111111] bg-[#111111] text-white'
                : 'border-[#111111] bg-white text-[#111111] hover:bg-neutral-50'
            }`}
            aria-label="Save to Atelier Wishlist"
          >
            <Heart
              size={18}
              className={isFavorited ? 'fill-white text-white' : 'text-[#111111]'}
            />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setStoreModalOpen(true)}
          className="w-full h-11 border border-[#111111] bg-white text-[#111111] font-mono text-xs tracking-wider uppercase font-semibold flex items-center justify-center gap-2 hover:bg-[#F5F3F0] transition-colors"
        >
          <MapPin size={15} />
          <span>CHECK ATELIER &amp; IN-STORE AVAILABILITY</span>
        </button>

        <button
          type="button"
          onClick={handleAdd}
          className="w-full h-11 bg-[#5A31F4] text-white font-sans text-xs tracking-wide font-medium flex items-center justify-center gap-1.5 hover:bg-[#4E27D8] transition-colors shadow-xs"
        >
          <span>Buy with</span>
          <span className="font-bold tracking-tight">Shop Pay</span>
        </button>
      </div>

      {/* Shipping & Returns Details */}
      <ShippingReturns onOpenReturnPolicy={onOpenReturnPolicy} />

      {/* Product Details Accordion */}
      <div id="reviews-section">
        <ProductAccordion
          description={product.description}
          materials={product.materials}
          shipping={product.shipping}
          returns={product.returns}
          model={product.model}
          reviewsList={product.reviewsList}
          faqs={product.faqs}
          onOpenSizeGuide={onOpenSizeGuide}
        />
      </div>

      {/* In-Store Availability Modal */}
      <FindInStoreModal
        isOpen={storeModalOpen}
        onClose={() => setStoreModalOpen(false)}
        selectedSize={selectedSize}
        stores={product.stores}
      />
    </div>
  );
}
