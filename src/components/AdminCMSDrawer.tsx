import React, { useState } from 'react';
import { X, SlidersHorizontal, Save, RotateCcw, Check, DollarSign, Package } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

export const AdminCMSDrawer: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    settings, 
    updateSettings, 
    products, 
    updateProduct, 
    resetToDefaults 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'brand' | 'products' | 'promotions'>('brand');
  const [localSettings, setLocalSettings] = useState(settings);
  const [savedNotice, setSavedNotice] = useState(false);
  const [selectedProductToEdit, setSelectedProductToEdit] = useState<Product | null>(null);

  if (!isAdminOpen) return null;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(localSettings);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleUpdateProductField = (field: keyof Product, value: any) => {
    if (!selectedProductToEdit) return;
    const updated = { ...selectedProductToEdit, [field]: value };
    setSelectedProductToEdit(updated);
    updateProduct(updated);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="fixed inset-0 bg-[#202020]/50 backdrop-blur-xs transition-opacity" 
        onClick={() => setIsAdminOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-xl bg-[#F8F5F0] border-l border-[#202020]/15 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#202020]/10 flex items-center justify-between bg-[#FAF7F2]">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-[#3A2924]" />
              <div>
                <h2 className="font-serif text-lg font-medium text-[#202020]">
                  Store CMS & Brand Manager
                </h2>
                <p className="text-[11px] text-[#202020]/60">
                  Live in-browser content and inventory management
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 text-[#202020]/60 hover:text-[#202020]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#202020]/10 bg-[#FAF7F2] text-xs uppercase tracking-wider font-medium">
            <button
              onClick={() => setActiveTab('brand')}
              className={`flex-1 py-3 text-center transition-colors ${
                activeTab === 'brand' 
                  ? 'border-b-2 border-[#3A2924] text-[#3A2924] font-semibold bg-[#F8F5F0]' 
                  : 'text-[#202020]/60 hover:text-[#202020]'
              }`}
            >
              Brand & Hero
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 py-3 text-center transition-colors ${
                activeTab === 'products' 
                  ? 'border-b-2 border-[#3A2924] text-[#3A2924] font-semibold bg-[#F8F5F0]' 
                  : 'text-[#202020]/60 hover:text-[#202020]'
              }`}
            >
              Product Catalog ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('promotions')}
              className={`flex-1 py-3 text-center transition-colors ${
                activeTab === 'promotions' 
                  ? 'border-b-2 border-[#3A2924] text-[#3A2924] font-semibold bg-[#F8F5F0]' 
                  : 'text-[#202020]/60 hover:text-[#202020]'
              }`}
            >
              Promotions
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {savedNotice && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Modifications saved and rendered across storefront!</span>
              </div>
            )}

            {activeTab === 'brand' && (
              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#202020]/80 block mb-1">
                    Brand Name / Wordmark
                  </label>
                  <input
                    type="text"
                    value={localSettings.brandName}
                    onChange={(e) => setLocalSettings({ ...localSettings, brandName: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#202020]/20 rounded-xs focus:outline-none focus:border-[#3A2924]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#202020]/80 block mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={localSettings.brandTagline}
                    onChange={(e) => setLocalSettings({ ...localSettings, brandTagline: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#202020]/20 rounded-xs focus:outline-none focus:border-[#3A2924]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#202020]/80 block mb-1">
                    Top Announcement Bar
                  </label>
                  <input
                    type="text"
                    value={localSettings.announcementText}
                    onChange={(e) => setLocalSettings({ ...localSettings, announcementText: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#202020]/20 rounded-xs focus:outline-none focus:border-[#3A2924]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#202020]/80 block mb-1">
                    Free Shipping Threshold ($)
                  </label>
                  <input
                    type="number"
                    value={localSettings.freeShippingThreshold}
                    onChange={(e) => setLocalSettings({ ...localSettings, freeShippingThreshold: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#202020]/20 rounded-xs focus:outline-none focus:border-[#3A2924]"
                  />
                </div>

                <div className="pt-2 border-t border-[#202020]/10">
                  <h3 className="font-serif text-base text-[#202020] mb-3">Homepage Campaign Hero</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#202020]/80 block mb-1">
                        Hero Headline
                      </label>
                      <input
                        type="text"
                        value={localSettings.heroHeadline}
                        onChange={(e) => setLocalSettings({ ...localSettings, heroHeadline: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-[#202020]/20 rounded-xs focus:outline-none focus:border-[#3A2924]"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#202020]/80 block mb-1">
                        Hero Subheading
                      </label>
                      <textarea
                        rows={2}
                        value={localSettings.heroSubheading}
                        onChange={(e) => setLocalSettings({ ...localSettings, heroSubheading: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-[#202020]/20 rounded-xs focus:outline-none focus:border-[#3A2924]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#202020]/10">
                  <h3 className="font-serif text-base text-[#202020] mb-3">Brand Contacts</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#202020]/80 block mb-1">
                        Contact Email
                      </label>
                      <input
                        type="text"
                        value={localSettings.contactEmail}
                        onChange={(e) => setLocalSettings({ ...localSettings, contactEmail: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#202020]/20 rounded-xs focus:outline-none focus:border-[#3A2924]"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#202020]/80 block mb-1">
                        Instagram Handle
                      </label>
                      <input
                        type="text"
                        value={localSettings.instagramHandle}
                        onChange={(e) => setLocalSettings({ ...localSettings, instagramHandle: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#202020]/20 rounded-xs focus:outline-none focus:border-[#3A2924]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="submit"
                    className="py-2.5 px-6 bg-[#3A2924] hover:bg-[#202020] text-[#F8F5F0] text-xs uppercase tracking-widest font-medium rounded-xs flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Apply Brand Settings</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Reset all store content to factory default?')) {
                        resetToDefaults();
                        setLocalSettings(settings);
                      }
                    }}
                    className="text-xs text-[#202020]/60 hover:text-red-700 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'products' && (
              <div className="space-y-4">
                {selectedProductToEdit ? (
                  <div className="p-4 bg-white border border-[#202020]/15 rounded-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-[#202020]/10 pb-2">
                      <h4 className="font-serif text-base font-semibold text-[#202020]">
                        Editing: {selectedProductToEdit.name}
                      </h4>
                      <button
                        onClick={() => setSelectedProductToEdit(null)}
                        className="text-xs text-[#3A2924] underline"
                      >
                        Back to List
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-[#202020]/70 block mb-1">
                          Product Name
                        </label>
                        <input
                          type="text"
                          value={selectedProductToEdit.name}
                          onChange={(e) => handleUpdateProductField('name', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs border border-[#202020]/20 rounded-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-[#202020]/70 block mb-1">
                          Price ($ USD)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          value={selectedProductToEdit.price}
                          onChange={(e) => handleUpdateProductField('price', Number(e.target.value))}
                          className="w-full px-2.5 py-1.5 text-xs border border-[#202020]/20 rounded-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#202020]/70 block mb-1">
                        Short Tagline
                      </label>
                      <input
                        type="text"
                        value={selectedProductToEdit.tagline}
                        onChange={(e) => handleUpdateProductField('tagline', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs border border-[#202020]/20 rounded-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-[#202020]/70 block mb-1">
                          Inventory Stock
                        </label>
                        <input
                          type="number"
                          value={selectedProductToEdit.stockCount}
                          onChange={(e) => handleUpdateProductField('stockCount', Number(e.target.value))}
                          className="w-full px-2.5 py-1.5 text-xs border border-[#202020]/20 rounded-xs"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-5">
                        <input
                          type="checkbox"
                          id="instock-check"
                          checked={selectedProductToEdit.inStock}
                          onChange={(e) => handleUpdateProductField('inStock', e.target.checked)}
                          className="w-4 h-4 text-[#3A2924]"
                        />
                        <label htmlFor="instock-check" className="text-xs text-[#202020]">
                          In Stock for purchase
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#202020]/70 block mb-1">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={selectedProductToEdit.description}
                        onChange={(e) => handleUpdateProductField('description', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs border border-[#202020]/20 rounded-xs"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="divide-y divide-[#202020]/10 bg-white rounded-xs border border-[#202020]/15 overflow-hidden">
                    {products.map((prod) => (
                      <div key={prod.id} className="p-3 flex items-center justify-between hover:bg-[#FAF7F2] transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-12 rounded-xs overflow-hidden shrink-0 border border-[#202020]/10">
                            <ImageWithFallback
                              src={prod.images[0]}
                              alt={prod.name}
                              fallbackLabel={prod.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-serif text-sm font-medium text-[#202020]">{prod.name}</h4>
                            <div className="flex items-center gap-2 text-xs text-[#202020]/60">
                              <span className="font-medium text-[#3A2924] tabular-nums">${prod.price.toFixed(2)}</span>
                              <span>·</span>
                              <span>Stock: {prod.stockCount}</span>
                              {prod.shades && (
                                <>
                                  <span>·</span>
                                  <span>{prod.shades.length} shades</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedProductToEdit(prod)}
                          className="px-2.5 py-1 text-xs bg-[#E8DED3]/60 hover:bg-[#E8DED3] text-[#3A2924] font-medium rounded-xs transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'promotions' && (
              <div className="space-y-4">
                <div className="p-4 bg-white border border-[#202020]/15 rounded-xs space-y-3">
                  <h4 className="font-serif text-sm font-semibold text-[#202020]">
                    Active Store Discount Codes
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-[#FAF7F2] rounded-xs flex justify-between items-center border border-[#202020]/5">
                      <div>
                        <strong className="font-mono text-[#3A2924]">VALOIR15</strong>
                        <p className="text-[#202020]/60 text-[11px]">15% off any purchase</p>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-medium rounded-full">
                        Active
                      </span>
                    </div>

                    <div className="p-3 bg-[#FAF7F2] rounded-xs flex justify-between items-center border border-[#202020]/5">
                      <div>
                        <strong className="font-mono text-[#3A2924]">WELCOME10</strong>
                        <p className="text-[#202020]/60 text-[11px]">10% off first customer order</p>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-medium rounded-full">
                        Active
                      </span>
                    </div>

                    <div className="p-3 bg-[#FAF7F2] rounded-xs flex justify-between items-center border border-[#202020]/5">
                      <div>
                        <strong className="font-mono text-[#3A2924]">VIP20</strong>
                        <p className="text-[#202020]/60 text-[11px]">20% exclusive VIP collector courtesy</p>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-medium rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
