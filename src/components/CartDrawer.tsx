import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ImageWithFallback } from './ImageWithFallback';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    discountCode, 
    discountPercentage, 
    discountAmount, 
    finalTotal, 
    shippingFee, 
    applyDiscountCode, 
    freeShippingProgress,
    navigateTo 
  } = useStore();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyDiscountCode(inputCode);
    setPromoMessage({ text: res.message, error: !res.success });
    if (res.success) {
      setInputCode('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  const handleViewBagClick = () => {
    setIsCartOpen(false);
    navigateTo('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#202020]/45 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F5F0] border-l border-[#202020]/10 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-[#202020]/10 flex items-center justify-between bg-[#F8F5F0]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4.5 h-4.5 text-[#3A2924]" />
              <h2 className="font-serif text-xl tracking-wider text-[#202020]">
                Shopping Bag
              </h2>
              <span className="text-xs text-[#202020]/60 tabular-nums">
                ({cart.reduce((s, i) => s + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close bag drawer"
              className="p-1.5 text-[#202020]/60 hover:text-[#202020] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3 bg-[#E8DED3]/40 border-b border-[#202020]/5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {freeShippingProgress.qualified ? (
                <span className="font-medium text-[#3A2924] flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#B98282]" />
                  Complimentary Shipping Unlocked
                </span>
              ) : (
                <span className="text-[#202020]/80">
                  Add <strong className="font-medium text-[#3A2924] tabular-nums">${freeShippingProgress.remaining.toFixed(2)}</strong> for Free Shipping
                </span>
              )}
              <span className="text-[11px] text-[#202020]/50 font-medium tabular-nums">
                ${freeShippingProgress.threshold} threshold
              </span>
            </div>
            <div className="w-full bg-[#E8DED3] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#3A2924] h-full transition-all duration-500 ease-out"
                style={{ width: `${freeShippingProgress.percent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#202020]/8">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E8DED3]/50 flex items-center justify-center text-[#3A2924]/60">
                  <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-lg text-[#202020]">Your bag is empty</p>
                  <p className="text-xs text-[#202020]/60 max-w-xs">
                    Explore our curated collection of refined beauty essentials.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="mt-2 py-2.5 px-6 bg-[#3A2924] text-[#F8F5F0] text-xs uppercase tracking-widest font-medium rounded-xs hover:bg-[#202020] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div 
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('product', { productId: item.product.id });
                    }}
                    className="w-20 h-24 bg-[#FAF7F2] rounded-xs overflow-hidden shrink-0 cursor-pointer border border-[#202020]/5"
                  >
                    <ImageWithFallback
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fallbackLabel={item.product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 
                          onClick={() => {
                            setIsCartOpen(false);
                            navigateTo('product', { productId: item.product.id });
                          }}
                          className="font-serif text-sm font-medium text-[#202020] hover:text-[#3A2924] cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                          className="text-[#202020]/40 hover:text-[#B98282] p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedShade && (
                        <div className="flex items-center gap-1.5 mt-1">
                          <span 
                            className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0" 
                            style={{ backgroundColor: item.selectedShade.hex }}
                          />
                          <span className="text-xs text-[#202020]/70 truncate">
                            {item.selectedShade.name}
                          </span>
                        </div>
                      )}

                      <div className="text-xs text-[#202020]/60 mt-0.5">
                        {item.product.size}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-[#202020]/15 rounded-xs bg-[#FAF7F2]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="p-1 hover:bg-[#E8DED3]/60 transition-colors"
                        >
                          <Minus className="w-3 h-3 text-[#202020]/70" />
                        </button>
                        <span className="px-2 text-xs font-medium tabular-nums min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                          className="p-1 hover:bg-[#E8DED3]/60 transition-colors"
                        >
                          <Plus className="w-3 h-3 text-[#202020]/70" />
                        </button>
                      </div>

                      {/* Total */}
                      <span className="font-sans font-medium text-xs sm:text-sm text-[#202020] tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Summary & Checkout */}
          {cart.length > 0 && (
            <div className="px-6 py-5 bg-[#FAF7F2] border-t border-[#202020]/10 space-y-3">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. VALOIR15)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-[#F8F5F0] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#E8DED3] hover:bg-[#3A2924] hover:text-[#F8F5F0] text-xs font-medium tracking-wider uppercase transition-colors rounded-xs"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p className={`text-[11px] ${promoMessage.error ? 'text-red-600' : 'text-[#3A2924] font-medium'}`}>
                  {promoMessage.text}
                </p>
              )}

              {/* Order Calculations */}
              <div className="space-y-1.5 pt-2 text-xs">
                <div className="flex justify-between text-[#202020]/70">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-[#202020]">${cartSubtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#B98282]">
                    <span>Discount ({discountPercentage}% - {discountCode})</span>
                    <span className="tabular-nums font-medium">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#202020]/70">
                  <span>Estimated Shipping</span>
                  <span className="tabular-nums">
                    {shippingFee === 0 ? (
                      <span className="text-[#3A2924] font-medium uppercase text-[11px]">Free</span>
                    ) : (
                      `$${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#202020]/10 flex justify-between text-sm sm:text-base font-medium text-[#202020]">
                  <span>Total</span>
                  <span className="tabular-nums font-serif text-lg text-[#3A2924]">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3 px-4 bg-[#3A2924] hover:bg-[#202020] text-[#F8F5F0] text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleViewBagClick}
                  className="w-full py-2.5 px-4 bg-transparent hover:bg-[#E8DED3]/40 text-[#202020] text-xs uppercase tracking-widest font-medium rounded-xs transition-colors border border-[#202020]/20"
                >
                  View Full Bag
                </button>
              </div>

              <div className="text-center pt-1">
                <span className="text-[10px] text-[#202020]/50 tracking-wider flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#D4AF87]" />
                  2 Complimentary Luxury Samples with every order
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
