import React, { useState } from 'react';
import { X, Package, User, MapPin, CheckCircle2, Clock, Truck, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AccountModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen, orders, navigateTo } = useStore();
  const [tab, setTab] = useState<'profile' | 'orders' | 'tracker'>('profile');
  const [trackQuery, setTrackQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any | null>(null);

  if (!isAccountOpen) return null;

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(o => o.id.toLowerCase() === trackQuery.trim().toLowerCase());
    if (found) {
      setSearchedOrder(found);
    } else {
      // Mock tracking record for demo if user enters any order ID
      setSearchedOrder({
        id: trackQuery.trim().toUpperCase() || 'VL-SAMPLE',
        date: 'Recent',
        status: 'shipped',
        trackingNumber: '1Z99999990482918',
        subtotal: 70.00,
        shipping: 0,
        total: 70.00,
        items: [],
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-[#202020]/60 backdrop-blur-xs transition-opacity" 
        onClick={() => setIsAccountOpen(false)}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-[#F8F5F0] rounded-xs shadow-2xl overflow-hidden border border-[#202020]/10">
          
          {/* Header */}
          <div className="p-6 border-b border-[#202020]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#3A2924]" />
              <h2 className="font-serif text-xl tracking-wider text-[#202020]">
                Client Portal
              </h2>
            </div>
            <button
              onClick={() => setIsAccountOpen(false)}
              className="p-1 text-[#202020]/60 hover:text-[#202020]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#202020]/10 bg-[#FAF7F2] text-xs uppercase tracking-wider font-medium">
            <button
              onClick={() => setTab('profile')}
              className={`flex-1 py-3 text-center transition-colors ${
                tab === 'profile' 
                  ? 'border-b-2 border-[#3A2924] text-[#3A2924] font-semibold bg-[#F8F5F0]' 
                  : 'text-[#202020]/60 hover:text-[#202020]'
              }`}
            >
              Beauty Profile
            </button>
            <button
              onClick={() => setTab('orders')}
              className={`flex-1 py-3 text-center transition-colors ${
                tab === 'orders' 
                  ? 'border-b-2 border-[#3A2924] text-[#3A2924] font-semibold bg-[#F8F5F0]' 
                  : 'text-[#202020]/60 hover:text-[#202020]'
              }`}
            >
              Order History ({orders.length})
            </button>
            <button
              onClick={() => setTab('tracker')}
              className={`flex-1 py-3 text-center transition-colors ${
                tab === 'tracker' 
                  ? 'border-b-2 border-[#3A2924] text-[#3A2924] font-semibold bg-[#F8F5F0]' 
                  : 'text-[#202020]/60 hover:text-[#202020]'
              }`}
            >
              Track Order
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {tab === 'profile' && (
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#E8DED3] flex items-center justify-center font-serif text-xl text-[#3A2924]">
                    VB
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#202020]">Valued Guest</h3>
                    <p className="text-xs text-[#202020]/60">Member since 2026 · Tier: Atelier Privé</p>
                  </div>
                </div>

                <div className="p-4 bg-[#FAF7F2] rounded-xs border border-[#202020]/5 space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#3A2924]">
                    Your Beauty Blueprint
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[#202020]/50 block text-[10px] uppercase">Skin Profile</span>
                      <span className="font-medium text-[#202020]">Balanced to Dry / Sensitive</span>
                    </div>
                    <div>
                      <span className="text-[#202020]/50 block text-[10px] uppercase">Complexion Tone</span>
                      <span className="font-medium text-[#202020]">02 Light Warm</span>
                    </div>
                    <div>
                      <span className="text-[#202020]/50 block text-[10px] uppercase">Signature Finish</span>
                      <span className="font-medium text-[#202020]">Satin Luminous</span>
                    </div>
                    <div>
                      <span className="text-[#202020]/50 block text-[10px] uppercase">Preferred Category</span>
                      <span className="font-medium text-[#202020]">Clean Botanicals & Velvet Lips</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs text-[#202020]/60 border-t border-[#202020]/10">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#B98282]" />
                    <span>256-bit Encrypted Private Data</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsAccountOpen(false);
                      navigateTo('faq');
                    }}
                    className="text-[#3A2924] hover:underline"
                  >
                    Need Help?
                  </button>
                </div>
              </div>
            )}

            {tab === 'orders' && (
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="text-center py-8 space-y-3">
                    <Package className="w-10 h-10 text-[#3A2924]/40 mx-auto stroke-[1.2]" />
                    <p className="font-serif text-base text-[#202020]">No order history yet</p>
                    <p className="text-xs text-[#202020]/60 max-w-xs mx-auto">
                      Any orders you place will appear here along with live shipping statuses.
                    </p>
                    <button
                      onClick={() => {
                        setIsAccountOpen(false);
                        navigateTo('shop');
                      }}
                      className="py-2 px-5 bg-[#3A2924] text-[#F8F5F0] text-xs uppercase tracking-widest font-medium rounded-xs"
                    >
                      Shop Now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-72 overflow-y-auto">
                    {orders.map((order) => (
                      <div key={order.id} className="p-4 bg-[#FAF7F2] border border-[#202020]/10 rounded-xs space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-xs font-semibold text-[#3A2924]">{order.id}</span>
                          <span className="text-[11px] px-2 py-0.5 bg-[#E8DED3] text-[#3A2924] rounded-full uppercase tracking-wider font-medium">
                            {order.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-[#202020]/70">
                          <span>{order.date} · {order.items.length} item(s)</span>
                          <span className="font-medium text-[#202020] tabular-nums">${order.total.toFixed(2)}</span>
                        </div>
                        <div className="text-[11px] text-[#202020]/50 font-mono">
                          Tracking: {order.trackingNumber}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'tracker' && (
              <div className="space-y-5">
                <form onSubmit={handleTrackSubmit} className="space-y-3">
                  <label className="text-xs uppercase tracking-wider font-medium text-[#202020]/80 block">
                    Enter Order Number
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. VL-104928"
                      value={trackQuery}
                      onChange={(e) => setTrackQuery(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-[#FAF7F2] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#3A2924] text-[#F8F5F0] text-xs uppercase tracking-widest font-medium rounded-xs hover:bg-[#202020]"
                    >
                      Track
                    </button>
                  </div>
                </form>

                {searchedOrder && (
                  <div className="p-4 bg-[#FAF7F2] border border-[#202020]/10 rounded-xs space-y-4">
                    <div className="flex justify-between items-center border-b border-[#202020]/10 pb-2">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#3A2924]">{searchedOrder.id}</span>
                        <span className="text-[11px] text-[#202020]/60 block">{searchedOrder.date}</span>
                      </div>
                      <span className="text-xs px-2.5 py-1 bg-[#3A2924] text-white rounded-xs uppercase tracking-wider font-medium">
                        {searchedOrder.status}
                      </span>
                    </div>

                    {/* Step Timeline */}
                    <div className="py-2">
                      <div className="flex items-center justify-between text-xs text-[#202020]/70 mb-2">
                        <span className="flex items-center gap-1 text-[#3A2924] font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Confirmed
                        </span>
                        <span className="flex items-center gap-1 text-[#3A2924] font-medium">
                          <Clock className="w-3.5 h-3.5 text-amber-600" /> Prepared
                        </span>
                        <span className="flex items-center gap-1 text-[#3A2924] font-medium">
                          <Truck className="w-3.5 h-3.5 text-[#3A2924]" /> In Transit
                        </span>
                      </div>
                      <div className="w-full bg-[#E8DED3] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#3A2924] h-full w-3/4 rounded-full" />
                      </div>
                    </div>

                    <div className="text-xs text-[#202020]/75 space-y-1">
                      <p><strong>Carrier:</strong> FedEx Priority Luxury Courier</p>
                      <p className="font-mono text-[11px]"><strong>Tracking #:</strong> {searchedOrder.trackingNumber}</p>
                      <p><strong>Estimated Delivery:</strong> 2 business days</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
