import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Check, ChevronLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const CartView: React.FC = () => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    discountCode, 
    discountPercentage, 
    discountAmount, 
    shippingFee, 
    finalTotal, 
    applyDiscountCode, 
    freeShippingProgress, 
    navigateTo 
  } = useStore();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error: boolean } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyDiscountCode(inputCode);
    setPromoMessage({ text: res.message, error: !res.success });
    if (res.success) {
      setInputCode('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#E8DED3]/50 flex items-center justify-center mx-auto text-[#3A2924]">
          <ShoppingBag className="w-10 h-10 stroke-[1.2]" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#202020] font-light">
            Your Shopping Bag Is Empty
          </h1>
          <p className="text-sm text-[#202020]/60 max-w-md mx-auto">
            Discover our curated beauty essentials, formulated with intentional textures and pure botanicals.
          </p>
        </div>
        <button
          onClick={() => navigateTo('shop')}
          className="py-3 px-8 bg-[#3A2924] hover:bg-[#202020] text-[#F8F5F0] text-xs uppercase tracking-[0.2em] font-semibold rounded-xs shadow-xs transition-colors"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#202020]/10 pb-6 flex items-baseline justify-between">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#202020] font-light">
            Shopping Bag
          </h1>
          <p className="text-xs sm:text-sm text-[#202020]/60 font-light mt-1">
            Review your selected beauty items before entering the checkout atelier.
          </p>
        </div>
        <button
          onClick={() => navigateTo('shop')}
          className="text-xs uppercase tracking-wider text-[#3A2924] hover:underline flex items-center gap-1 font-medium"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {/* Free Shipping Notice */}
      <div className="p-4 bg-[#FAF7F2] border border-[#202020]/10 rounded-xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          {freeShippingProgress.qualified ? (
            <span className="font-medium text-[#3A2924] flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#B98282]" />
              You've unlocked Complimentary Standard Shipping
            </span>
          ) : (
            <span className="text-[#202020]/80">
              Add <strong className="font-medium text-[#3A2924] tabular-nums">${freeShippingProgress.remaining.toFixed(2)}</strong> more to receive Complimentary Shipping.
            </span>
          )}
          <span className="text-xs text-[#202020]/50 font-medium tabular-nums">
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

      {/* Main Grid: Bag Items on Left, Order Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Cart Items List */}
        <div className="lg:col-span-8 divide-y divide-[#202020]/10">
          {cart.map((item) => (
            <div key={item.id} className="py-6 flex gap-6">
              {/* Product Image */}
              <div 
                onClick={() => navigateTo('product', { productId: item.product.id })}
                className="w-24 sm:w-28 aspect-[3/4] bg-[#FAF7F2] rounded-xs overflow-hidden shrink-0 cursor-pointer border border-[#202020]/10"
              >
                <ImageWithFallback
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fallbackLabel={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info & Controls */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#3A2924]/70 font-medium">
                        {item.product.category}
                      </span>
                      <h3 
                        onClick={() => navigateTo('product', { productId: item.product.id })}
                        className="font-serif text-lg text-[#202020] hover:text-[#3A2924] cursor-pointer"
                      >
                        {item.product.name}
                      </h3>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                      className="p-1.5 text-[#202020]/40 hover:text-[#B98282] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {item.selectedShade && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span 
                        className="w-3 h-3 rounded-full border border-black/15 shrink-0" 
                        style={{ backgroundColor: item.selectedShade.hex }}
                      />
                      <span className="text-xs text-[#202020]/80">
                        Shade: {item.selectedShade.name}
                      </span>
                    </div>
                  )}

                  <div className="text-xs text-[#202020]/60 mt-0.5">
                    Unit Price: ${item.product.price.toFixed(2)}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  {/* Stepper */}
                  <div className="flex items-center border border-[#202020]/20 rounded-xs bg-[#FAF7F2]">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 hover:bg-[#E8DED3]/60 transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5 text-[#202020]/70" />
                    </button>
                    <span className="px-3 font-sans font-medium text-xs tabular-nums min-w-[24px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 hover:bg-[#E8DED3]/60 transition-colors"
                      aria-label="Increase"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#202020]/70" />
                    </button>
                  </div>

                  <span className="font-sans font-medium text-base text-[#202020] tabular-nums">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="p-6 bg-[#FAF7F2] border border-[#202020]/10 rounded-xs space-y-5 sticky top-28">
            <h2 className="font-serif text-xl text-[#202020]">Order Summary</h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 block">
                Promotional Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. VALOIR15"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-[#F8F5F0] border border-[#202020]/20 rounded-xs focus:outline-none focus:border-[#3A2924]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3A2924] hover:bg-[#202020] text-[#F8F5F0] text-xs font-medium uppercase tracking-wider rounded-xs transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className={`text-[11px] ${promoMessage.error ? 'text-red-600' : 'text-[#3A2924] font-medium'}`}>
                  {promoMessage.text}
                </p>
              )}
            </form>

            {/* Calculations */}
            <div className="space-y-2 pt-2 border-t border-[#202020]/10 text-xs">
              <div className="flex justify-between text-[#202020]/75">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-[#202020]">${cartSubtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#B98282]">
                  <span>Discount ({discountPercentage}% - {discountCode})</span>
                  <span className="tabular-nums font-medium">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#202020]/75">
                <span>Shipping</span>
                <span className="tabular-nums">
                  {shippingFee === 0 ? (
                    <span className="text-[#3A2924] font-medium uppercase text-[11px]">Free</span>
                  ) : (
                    `$${shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-[#202020]/10 flex justify-between text-base font-medium text-[#202020]">
                <span>Estimated Total</span>
                <span className="font-serif text-xl text-[#3A2924] tabular-nums">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-3.5 px-4 bg-[#3A2924] hover:bg-[#202020] text-[#F8F5F0] text-xs uppercase tracking-[0.2em] font-semibold rounded-xs shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-1 text-[11px] text-[#202020]/60 space-y-1">
              <div className="flex items-center justify-center gap-1 text-[#3A2924]">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF87]" />
                <span>Complimentary luxury samples included</span>
              </div>
              <p>Taxes and duties calculated during checkout.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
