import React, { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, CheckCircle2, ChevronLeft, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const CheckoutView: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    discountCode, 
    discountAmount, 
    shippingFee, 
    finalTotal, 
    placeOrder, 
    navigateTo 
  } = useStore();

  const [formData, setFormData] = useState({
    email: 'charlotte.v@example.com',
    firstName: 'Charlotte',
    lastName: 'Vane',
    address: '420 Madison Avenue, Suite 18B',
    city: 'New York',
    state: 'NY',
    postalCode: '10017',
    country: 'United States',
    phone: '+1 (555) 234-8901',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('892');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsProcessing(true);

    setTimeout(() => {
      placeOrder(formData, paymentMethod === 'card' ? 'Credit Card (Visa ending in 4242)' : paymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay');
      setIsProcessing(false);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="font-serif text-2xl text-[#202020]">Your bag is currently empty.</p>
        <button
          onClick={() => navigateTo('shop')}
          className="py-2.5 px-6 bg-[#3A2924] text-[#F8F5F0] text-xs uppercase tracking-widest font-semibold rounded-xs"
        >
          Return to Boutique
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      
      {/* Top Bar with Security Badge */}
      <div className="flex items-center justify-between border-b border-[#202020]/10 pb-6 mb-10">
        <button
          onClick={() => navigateTo('cart')}
          className="text-xs uppercase tracking-wider text-[#3A2924] hover:underline flex items-center gap-1 font-medium"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Return to Bag</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-[#202020]/60">
          <Lock className="w-3.5 h-3.5 text-[#3A2924]" />
          <span>256-Bit Encrypted Secure Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Form: Contact & Shipping & Payment */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
          
          {/* 1. Contact Information */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-[#202020] font-light">
              1. Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                  Email Address for Order Confirmation
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
                />
              </div>
            </div>
          </div>

          {/* 2. Shipping Address */}
          <div className="space-y-4 pt-4 border-t border-[#202020]/10">
            <h2 className="font-serif text-2xl text-[#202020] font-light">
              2. Shipping Destination
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="space-y-4 pt-4 border-t border-[#202020]/10">
            <h2 className="font-serif text-2xl text-[#202020] font-light">
              3. Payment Selection
            </h2>

            {/* Payment Options */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-3 px-3 text-center rounded-xs border font-medium transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#3A2924] bg-[#FAF7F2] text-[#3A2924] ring-1 ring-[#3A2924]'
                    : 'border-[#202020]/15 bg-[#F8F5F0] text-[#202020]/70'
                }`}
              >
                Credit Card
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple')}
                className={`py-3 px-3 text-center rounded-xs border font-medium transition-all ${
                  paymentMethod === 'apple'
                    ? 'border-[#3A2924] bg-[#FAF7F2] text-[#3A2924] ring-1 ring-[#3A2924]'
                    : 'border-[#202020]/15 bg-[#F8F5F0] text-[#202020]/70'
                }`}
              >
                Apple Pay
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('google')}
                className={`py-3 px-3 text-center rounded-xs border font-medium transition-all ${
                  paymentMethod === 'google'
                    ? 'border-[#3A2924] bg-[#FAF7F2] text-[#3A2924] ring-1 ring-[#3A2924]'
                    : 'border-[#202020]/15 bg-[#F8F5F0] text-[#202020]/70'
                }`}
              >
                Google Pay
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="p-4 bg-[#FAF7F2] rounded-xs border border-[#202020]/10 space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#202020]/15 rounded-xs pr-10 focus:outline-none focus:border-[#3A2924] font-mono"
                    />
                    <CreditCard className="w-4 h-4 text-[#202020]/40 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#202020]/15 rounded-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                      Security Code (CVC)
                    </label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#202020]/15 rounded-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Place Order CTA */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#3A2924] hover:bg-[#202020] text-[#F8F5F0] text-xs uppercase tracking-[0.25em] font-semibold rounded-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-60"
            >
              {isProcessing ? (
                <span>Securing Your Luxury Order...</span>
              ) : (
                <>
                  <span>Authorize & Complete Order</span>
                  <span>·</span>
                  <span className="tabular-nums font-mono">${finalTotal.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Right Column: Order Summary Review */}
        <div className="lg:col-span-5">
          <div className="p-6 bg-[#FAF7F2] border border-[#202020]/10 rounded-xs space-y-5 sticky top-28">
            <h3 className="font-serif text-xl text-[#202020]">
              In Your Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h3>

            {/* List */}
            <div className="divide-y divide-[#202020]/10 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex gap-3 text-xs">
                  <div className="w-12 h-14 rounded-xs overflow-hidden shrink-0 border border-[#202020]/10">
                    <ImageWithFallback
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fallbackLabel={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm text-[#202020] truncate font-medium">
                      {item.product.name}
                    </h4>
                    {item.selectedShade && (
                      <p className="text-[11px] text-[#202020]/60">
                        {item.selectedShade.name} · Qty {item.quantity}
                      </p>
                    )}
                  </div>
                  <span className="font-sans font-medium text-[#202020] tabular-nums">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="space-y-2 pt-3 border-t border-[#202020]/10 text-xs">
              <div className="flex justify-between text-[#202020]/75">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-[#202020]">${cartSubtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#B98282]">
                  <span>Courtesy Discount ({discountCode})</span>
                  <span className="tabular-nums font-medium">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#202020]/75">
                <span>Standard Delivery</span>
                <span className="tabular-nums">
                  {shippingFee === 0 ? <span className="text-[#3A2924] font-medium uppercase text-[11px]">Free</span> : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>

              <div className="pt-3 border-t border-[#202020]/10 flex justify-between text-base font-medium text-[#202020]">
                <span>Total Due</span>
                <span className="font-serif text-xl text-[#3A2924] tabular-nums">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#E8DED3]/40 rounded-xs text-[11px] text-[#202020]/70 space-y-1">
              <p>✓ Complimentary signature gift box with linen pouch</p>
              <p>✓ 2 luxury deluxe miniature samples included</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
