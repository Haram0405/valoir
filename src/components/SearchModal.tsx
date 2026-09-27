import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ImageWithFallback } from './ImageWithFallback';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, navigateTo } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = ['Velvet Matte', 'Radiance Serum', 'Skin Tint', 'Blush', 'Cleansing Balm'];

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase()) ||
          p.productType.toLowerCase().includes(query.toLowerCase()) ||
          p.shades?.some((s) => s.name.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const handleProductSelect = (productId: string) => {
    setIsSearchOpen(false);
    navigateTo('product', { productId });
  };

  const handleCategorySelect = (category: string) => {
    setIsSearchOpen(false);
    navigateTo('shop', { category });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#202020]/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative min-h-screen flex items-start justify-center pt-16 sm:pt-24 px-4 pb-12">
        <div className="relative w-full max-w-2xl bg-[#F8F5F0] rounded-xs shadow-2xl overflow-hidden border border-[#202020]/10">
          
          {/* Search Input Bar */}
          <div className="p-4 sm:p-6 border-b border-[#202020]/10 flex items-center gap-3">
            <Search className="w-5 h-5 text-[#3A2924] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cosmetics, skincare, shades, or ingredients..."
              className="w-full text-base sm:text-lg bg-transparent border-none focus:outline-none placeholder:text-[#202020]/40 font-light"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="text-[#202020]/40 hover:text-[#202020] p-1 text-xs"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 text-[#202020]/60 hover:text-[#202020] ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results or Suggestions */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {query.trim() === '' ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-[#3A2924]/80 mb-3">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 text-xs bg-[#E8DED3]/60 hover:bg-[#E8DED3] text-[#202020] rounded-xs transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs uppercase tracking-wider font-medium text-[#3A2924]/80 block mb-3">
                    Explore By Category
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { name: 'Makeup', cat: 'makeup' },
                      { name: 'Skincare', cat: 'skincare' },
                      { name: 'Best Sellers', cat: 'best-sellers' },
                      { name: 'New Arrivals', cat: 'new-arrivals' },
                    ].map((c) => (
                      <button
                        key={c.name}
                        onClick={() => handleCategorySelect(c.cat)}
                        className="py-2.5 px-3 bg-[#FAF7F2] border border-[#202020]/5 hover:border-[#3A2924]/30 rounded-xs text-xs font-serif text-center transition-colors hover:text-[#3A2924]"
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <p className="font-serif text-lg text-[#202020]">No results for "{query}"</p>
                <p className="text-xs text-[#202020]/60 max-w-sm mx-auto">
                  Try checking the spelling or browse our best sellers for inspiration.
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigateTo('shop');
                    }}
                    className="text-xs tracking-wider uppercase underline underline-offset-4 text-[#3A2924] font-medium"
                  >
                    View All Products
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-wider text-[#202020]/60 font-medium flex justify-between items-center">
                  <span>Matching Products ({filteredProducts.length})</span>
                  <button 
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigateTo('shop');
                    }}
                    className="text-[#3A2924] hover:underline flex items-center gap-1"
                  >
                    <span>View all in shop</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="divide-y divide-[#202020]/8">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product.id)}
                      className="py-3 flex items-center gap-4 hover:bg-[#E8DED3]/30 px-2 rounded-xs cursor-pointer transition-colors group"
                    >
                      <div className="w-12 h-14 bg-[#FAF7F2] rounded-xs overflow-hidden shrink-0 border border-[#202020]/5">
                        <ImageWithFallback
                          src={product.images[0]}
                          alt={product.name}
                          fallbackLabel={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-[#3A2924]/70 block font-medium">
                          {product.category}
                        </span>
                        <h4 className="font-serif text-sm text-[#202020] group-hover:text-[#3A2924] transition-colors truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-[#202020]/60 truncate font-light">
                          {product.tagline}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-sans font-medium text-sm text-[#202020] tabular-nums">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.shades && (
                          <span className="block text-[10px] text-[#202020]/50">
                            {product.shades.length} shades
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
