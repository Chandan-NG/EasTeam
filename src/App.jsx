import React, { useState } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import SizeGuideModal from './components/SizeGuideModal';
import ReturnPolicyModal from './components/ReturnPolicyModal';
import PreviouslyOn from './components/PreviouslyOn';
import RelatedProducts from './components/RelatedProducts';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import MobileStickyBar from './components/MobileStickyBar';
import { productData } from './data/productData';

export default function App() {
  // Sizing & fulfillment state
  const [selectedSize, setSelectedSize] = useState(productData.sizes[0]);
  const [fulfillmentMode, setFulfillmentMode] = useState('instock');
  const quantity = 1;

  // Cart & Drawers state
  const [cartOpen, setCartOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [returnsModalOpen, setReturnsModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  // Wishlist toggle
  const handleToggleFavorite = () => {
    setIsFavorited((prev) => {
      const next = !prev;
      setWishlistCount((c) => (next ? c + 1 : Math.max(0, c - 1)));
      return next;
    });
  };

  // When user clicks Add to Cart
  const handleAddToCart = (itemDetails) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.size === itemDetails.size && i.fulfillmentMode === itemDetails.fulfillmentMode
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += itemDetails.quantity;
        return next;
      }
      return [
        ...prev,
        {
          id: productData.id,
          title: productData.title,
          price: itemDetails.price,
          size: itemDetails.size,
          fulfillmentMode: itemDetails.fulfillmentMode,
          quantity: itemDetails.quantity,
          image: productData.gallery[0].src,
        },
      ];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (idx, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(idx);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[idx].quantity = newQty;
      return next;
    });
  };

  const handleRemoveItem = (idx) => {
    setCartItems((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#111111] flex flex-col selection:bg-[#F4D9D2] selection:text-[#111111]">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Global Header */}
      <Header
        wishlistCount={wishlistCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={handleToggleFavorite}
      />

      {/* Main PDP Container */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 md:px-8 lg:px-12 pt-3 md:pt-4 pb-16 sm:pb-12">
        <section aria-label="Product Details" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-start">
          {/* Product Gallery */}
          <div className="lg:col-span-7 w-full">
            <ProductGallery
              gallery={productData.gallery}
              modelInfo={productData.model}
              isFavorited={isFavorited}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>

          {/* Sticky Product Details Panel */}
          <div className="lg:col-span-5 w-full lg:sticky lg:top-20 lg:self-start">
            <ProductInfo
              product={productData}
              selectedSize={selectedSize}
              setSelectedSize={(size) => {
                setSelectedSize(size);
                if (!size.inStockAvailable && size.preOrderAvailable) {
                  setFulfillmentMode('preorder');
                } else if (size.inStockAvailable && fulfillmentMode === 'preorder' && !selectedSize?.inStockAvailable) {
                  setFulfillmentMode('instock');
                }
              }}
              fulfillmentMode={fulfillmentMode}
              setFulfillmentMode={setFulfillmentMode}
              quantity={quantity}
              onAddToCart={handleAddToCart}
              onOpenSizeGuide={() => setSizeGuideOpen(true)}
              onOpenReturnPolicy={() => setReturnsModalOpen(true)}
              isFavorited={isFavorited}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        </section>
      </main>

      {/* Community Styling & Social Proof */}
      <PreviouslyOn items={productData.previouslyOn} />

      {/* Recommended Products */}
      <RelatedProducts
        items={productData.recommendations}
        onQuickAdd={(recItem) => {
          setCartItems((prev) => [
            ...prev,
            {
              id: recItem.id,
              title: recItem.title,
              price: recItem.price,
              size: 'S',
              fulfillmentMode: 'instock',
              quantity: 1,
              image: recItem.image,
            },
          ]);
          setCartOpen(true);
        }}
      />

      {/* Newsletter Signup */}
      <Newsletter />

      {/* Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        productData={productData}
      />

      <ReturnPolicyModal
        isOpen={returnsModalOpen}
        onClose={() => setReturnsModalOpen(false)}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar
        product={productData}
        selectedSize={selectedSize}
        fulfillmentMode={fulfillmentMode}
        onAddToCart={() =>
          handleAddToCart({
            product: productData,
            size: selectedSize?.size || 'S',
            fulfillmentMode,
            quantity,
            price: fulfillmentMode === 'preorder' ? productData.preOrderPrice : productData.price,
            total: (fulfillmentMode === 'preorder' ? productData.preOrderPrice : productData.price) * quantity,
          })
        }
        isFavorited={isFavorited}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}
