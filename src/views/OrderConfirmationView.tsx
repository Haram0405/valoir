import React from 'react';
import { CheckCircle2, Clock, Truck, Package, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationView: React.FC = () => {
  const { lastCompletedOrder, navigateTo } = useStore();

  const order = lastCompletedOrder || {
    id: 'VL-849204',
    date: 'March 27, 2026',
    items: [],
    subtotal: 70.0,
    discount: 0,
    shipping: 0,
    total: 70.0,
    status: 'confirmed',
    trackingNumber: '1Z999999948291038',
    customer: {
      email: 'client@valoirbeauty.com',
      firstName: 'Valued',
      lastName: 'Client',
      address: '420 Madison Avenue',
      city: 'New York',
      state: 'NY',
      postalCode: '10017',
      country: 'United States',
      phone: '+1 (555) 234-8901',
    },
    paymentMethod: 'Credit Card (Visa)',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      
      {/* Success Banner */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-[#E8DED3]/60 flex items-center justify-center mx-auto text-[#3A2924]">
          <CheckCircle2 className="w-8 h-8 stroke-[1.4] text-[#B98282]" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#3A2924]/70 font-medium block">
          Order Confirmed
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#202020]">
          Thank You, {order.customer.firstName}.
        </h1>
        <p className="text-xs sm:text-sm text-[#202020]/70 font-light max-w-md mx-auto">
          Your order has been received at our atelier and is being prepared with artisanal care. A confirmation has been sent to <strong>{order.customer.email}</strong>.
        </p>
      </div>

      {/* Order Status & Tracking Timeline */}
      <div className="p-6 bg-[#FAF7F2] border border-[#202020]/10 rounded-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#202020]/10 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#202020]/50 block">Order Number</span>
            <span className="font-mono text-base font-bold text-[#3A2924]">{order.id}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#202020]/50 block">Carrier Tracking #</span>
            <span className="font-mono text-xs text-[#202020]">{order.trackingNumber}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#202020]/50 block">Status</span>
            <span className="inline-block px-2.5 py-0.5 bg-[#3A2924] text-white text-[11px] uppercase tracking-wider rounded-full font-medium">
              Confirmed
            </span>
          </div>
        </div>

        {/* Timeline Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-[#202020]/75">
            <span className="font-medium text-[#3A2924] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Order Placed
            </span>
            <span className="text-[#3A2924] font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              Atelier Preparation
            </span>
            <span className="text-[#202020]/50 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" />
              Dispatched
            </span>
            <span className="text-[#202020]/50 flex items-center gap-1">
              <Package className="w-3.5 h-3.5" />
              Delivered
            </span>
          </div>
          <div className="w-full bg-[#E8DED3] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#3A2924] h-full w-1/4 rounded-full" />
          </div>
        </div>
      </div>

      {/* Order Summary Details */}
      <div className="p-6 bg-[#FAF7F2] border border-[#202020]/10 rounded-xs space-y-4 text-xs">
        <h3 className="font-serif text-lg text-[#202020]">Shipping Destination</h3>
        <p className="text-[#202020]/80">
          {order.customer.firstName} {order.customer.lastName}<br />
          {order.customer.address}<br />
          {order.customer.city}, {order.customer.state} {order.customer.postalCode}<br />
          {order.customer.country}
        </p>

        <div className="pt-3 border-t border-[#202020]/10 flex justify-between items-center text-sm font-medium">
          <span>Total Paid</span>
          <span className="font-serif text-lg text-[#3A2924] tabular-nums">
            ${order.total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
        <button
          onClick={() => navigateTo('shop')}
          className="py-3 px-8 bg-[#3A2924] hover:bg-[#202020] text-[#F8F5F0] text-xs uppercase tracking-[0.2em] font-semibold rounded-xs shadow-xs transition-colors"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => navigateTo('home')}
          className="py-3 px-8 bg-transparent hover:bg-[#E8DED3]/40 text-[#202020] border border-[#202020]/20 text-xs uppercase tracking-[0.2em] font-medium rounded-xs transition-colors"
        >
          Return Home
        </button>
      </div>

    </div>
  );
};
