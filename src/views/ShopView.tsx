import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ChevronDown, X, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

export const ShopView: React.FC = () => {
  const { products, filterState, setFilterState, resetFilters, navigateTo } = useStore();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Compute category label & description
  const categoryMeta = useMemo(() => {
    switch (filterState.category) {
      case 'makeup':
        return {
          title: 'Luxury Makeup',
          desc: 'Elevated pigments, buttery velvet textures, and effortless color for lips, cheeks, and complexion.',
        };
      case 'skincare':
        return {
          title: 'Radiant Skincare',
          desc: 'Formulated with French squalane, active vitamins, and botanicals to restore and protect your barrier.',
        };
      case 'new-arrivals':
        return {
          title: 'New Arrivals',
          desc: 'The latest additions to our atelier, designed for refined modern beauty rituals.',
        };
      case 'best-sellers':
        return {
          title: 'Best Sellers',
          desc: 'Our most cherished formulations, celebrated for their exceptional textures and enduring elegance.',
        };
      default:
        return {
          title: 'Shop All Collection',
          desc: 'Explore the complete luxury collection of skin-first makeup and restorative skincare essentials.',
        };
    }
  }, [filterState.category]);

  // Product Types available in catalog
  const availableProductTypes = useMemo(() => {
    const types = new Set(products.map(p => p.productType));
    return ['all', ...Array.from(types)];
  }, [products]);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (filterState.category === 'makeup') {
      result = result.filter(p => p.category === 'makeup');
    } else if (filterState.category === 'skincare') {
      result = result.filter(p => p.category === 'skincare');
    } else if (filterState.category === 'new-arrivals') {
      result = result.filter(p => p.isNewArrival);
    } else if (filterState.category === 'best-sellers') {
      result = result.filter(p => p.isBestSeller);
    }

    // Product Type filter
    if (filterState.productType !== 'all') {
      result = result.filter(p => p.productType === filterState.productType);
    }

    // Skin type filter
    if (filterState.skinType !== 'all') {
      result = result.filter(p => p.skinType?.includes(filterState.skinType as any));
    }

    // Finish filter
    if (filterState.finish !== 'all') {
      result = result.filter(p => p.finish === filterState.finish);
    }

    // Max Price filter
    result = result.filter(p => p.price <= filterState.priceMax);

    // In Stock Only
    if (filterState.inStockOnly) {
      result = result.filter(p => p.inStock && p.stockCount > 0);
    }

    // Sorting
    if (filterState.sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (filterState.sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (filterState.sortBy === 'best-selling') {
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    } else if (filterState.sortBy === 'newest') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return result;
  }, [products, filterState]);

  // Active filter count (excluding default category and sort)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filterState.productType !== 'all') count++;
    if (filterState.skinType !== 'all') count++;
    if (filterState.finish !== 'all') count++;
    if (filterState.priceMax < 100) count++;
    if (filterState.inStockOnly) count++;
    return count;
  }, [filterState]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Breadcrumbs & Header */}
      <div className="space-y-3">
        <nav className="text-xs text-[#202020]/60 flex items-center gap-1.5 uppercase tracking-wider">
          <button onClick={() => navigateTo('home')} className="hover:text-[#3A2924]">Home</button>
          <span>/</span>
          <span className="text-[#3A2924] font-medium">{categoryMeta.title}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#202020]/10 pb-6">
          <div className="space-y-1 max-w-xl">
            <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#202020]">
              {categoryMeta.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#202020]/70 font-light">
              {categoryMeta.desc}
            </p>
          </div>

          <div className="text-xs text-[#202020]/60 font-light tabular-nums">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>

      {/* Controls Bar: Categories Tabs, Filter Trigger, Sort Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-[#202020]/10">
        
        {/* Category Pills/Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
          {[
            { label: 'All', id: 'all' },
            { label: 'Makeup', id: 'makeup' },
            { label: 'Skincare', id: 'skincare' },
            { label: 'New Arrivals', id: 'new-arrivals' },
            { label: 'Best Sellers', id: 'best-sellers' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterState(prev => ({ ...prev, category: cat.id as any }))}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium rounded-xs transition-colors whitespace-nowrap ${
                filterState.category === cat.id
                  ? 'bg-[#3A2924] text-[#F8F5F0]'
                  : 'text-[#202020]/70 hover:bg-[#E8DED3]/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right Controls: Filter button & Sort dropdown */}
        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={() => setFilterDrawerOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-wider font-medium text-[#202020] border border-[#202020]/20 hover:border-[#3A2924] rounded-xs transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#3A2924]" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#3A2924] text-[#F8F5F0] text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort Selector */}
          <div className="relative">
            <select
              value={filterState.sortBy}
              onChange={(e) => setFilterState(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="appearance-none bg-[#FAF7F2] border border-[#202020]/20 rounded-xs px-3 py-1.5 pr-8 text-xs uppercase tracking-wider font-medium text-[#202020] focus:outline-none focus:border-[#3A2924] cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="best-selling">Best Selling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#202020]/60 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Active Filter Tags */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
          <span className="text-[#202020]/60">Active:</span>
          {filterState.productType !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E8DED3]/60 rounded-xs text-[#3A2924]">
              Type: {filterState.productType}
              <button onClick={() => setFilterState(p => ({ ...p, productType: 'all' }))}>
                <X className="w-3 h-3 hover:text-black" />
              </button>
            </span>
          )}
          {filterState.skinType !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E8DED3]/60 rounded-xs text-[#3A2924]">
              Skin: {filterState.skinType}
              <button onClick={() => setFilterState(p => ({ ...p, skinType: 'all' }))}>
                <X className="w-3 h-3 hover:text-black" />
              </button>
            </span>
          )}
          {filterState.finish !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E8DED3]/60 rounded-xs text-[#3A2924]">
              Finish: {filterState.finish}
              <button onClick={() => setFilterState(p => ({ ...p, finish: 'all' }))}>
                <X className="w-3 h-3 hover:text-black" />
              </button>
            </span>
          )}
          {filterState.priceMax < 100 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E8DED3]/60 rounded-xs text-[#3A2924]">
              Under ${filterState.priceMax}
              <button onClick={() => setFilterState(p => ({ ...p, priceMax: 100 }))}>
                <X className="w-3 h-3 hover:text-black" />
              </button>
            </span>
          )}
          {filterState.inStockOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E8DED3]/60 rounded-xs text-[#3A2924]">
              In Stock Only
              <button onClick={() => setFilterState(p => ({ ...p, inStockOnly: false }))}>
                <X className="w-3 h-3 hover:text-black" />
              </button>
            </span>
          )}
          <button
            onClick={resetFilters}
            className="text-[#B98282] hover:underline text-[11px] ml-2 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear all</span>
          </button>
        </div>
      )}

      {/* Product Grid: 4 columns on Desktop, 2 on Mobile */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <p className="font-serif text-2xl text-[#202020]">No matching beauty essentials found</p>
          <p className="text-xs sm:text-sm text-[#202020]/60 max-w-md mx-auto">
            Try resetting your filters or selecting a different category to view available products.
          </p>
          <button
            onClick={resetFilters}
            className="py-2.5 px-6 bg-[#3A2924] text-[#F8F5F0] text-xs uppercase tracking-widest font-semibold rounded-xs"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Filter Sidebar Drawer (Modal) */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="fixed inset-0 bg-[#202020]/40 backdrop-blur-xs transition-opacity" 
            onClick={() => setFilterDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-[#F8F5F0] border-l border-[#202020]/10 shadow-2xl flex flex-col">
              
              <div className="px-6 py-5 border-b border-[#202020]/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#3A2924]" />
                  <h3 className="font-serif text-xl text-[#202020]">Refine Selection</h3>
                </div>
                <button 
                  onClick={() => setFilterDrawerOpen(false)}
                  className="p-1 text-[#202020]/60 hover:text-[#202020]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                
                {/* Product Type Filter */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#202020] block">
                    Product Type
                  </label>
                  <select
                    value={filterState.productType}
                    onChange={(e) => setFilterState(p => ({ ...p, productType: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#202020]/15 rounded-xs text-xs capitalize"
                  >
                    {availableProductTypes.map(t => (
                      <option key={t} value={t}>{t === 'all' ? 'All Types' : t}</option>
                    ))}
                  </select>
                </div>

                {/* Skin Type Filter */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#202020] block">
                    Skin Type
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['all', 'sensitive', 'dry', 'normal', 'combination'].map(st => (
                      <button
                        key={st}
                        onClick={() => setFilterState(p => ({ ...p, skinType: st }))}
                        className={`py-2 px-3 text-center capitalize rounded-xs border transition-colors ${
                          filterState.skinType === st
                            ? 'bg-[#3A2924] text-white border-[#3A2924]'
                            : 'bg-[#FAF7F2] text-[#202020] border-[#202020]/10 hover:border-[#3A2924]/40'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Finish Filter */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#202020] block">
                    Finish
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['all', 'matte', 'luminous', 'satin', 'dewy'].map(fin => (
                      <button
                        key={fin}
                        onClick={() => setFilterState(p => ({ ...p, finish: fin }))}
                        className={`py-2 px-3 text-center capitalize rounded-xs border transition-colors ${
                          filterState.finish === fin
                            ? 'bg-[#3A2924] text-white border-[#3A2924]'
                            : 'bg-[#FAF7F2] text-[#202020] border-[#202020]/10 hover:border-[#3A2924]/40'
                        }`}
                      >
                        {fin}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="uppercase tracking-wider font-semibold text-[#202020]">
                      Maximum Price
                    </label>
                    <span className="font-sans font-medium text-[#3A2924] tabular-nums">
                      ${filterState.priceMax}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="5"
                    value={filterState.priceMax}
                    onChange={(e) => setFilterState(p => ({ ...p, priceMax: Number(e.target.value) }))}
                    className="w-full accent-[#3A2924]"
                  />
                  <div className="flex justify-between text-[11px] text-[#202020]/50 tabular-nums">
                    <span>$20</span>
                    <span>$100</span>
                  </div>
                </div>

                {/* Availability Toggle */}
                <div className="pt-2 border-t border-[#202020]/10 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#202020]">
                    In Stock Only
                  </span>
                  <input
                    type="checkbox"
                    checked={filterState.inStockOnly}
                    onChange={(e) => setFilterState(p => ({ ...p, inStockOnly: e.target.checked }))}
                    className="w-4 h-4 accent-[#3A2924]"
                  />
                </div>

              </div>

              <div className="p-6 bg-[#FAF7F2] border-t border-[#202020]/10 flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-2.5 px-4 border border-[#202020]/20 text-xs uppercase tracking-wider font-medium text-[#202020] hover:bg-[#E8DED3]/40 rounded-xs"
                >
                  Reset
                </button>
                <button
                  onClick={() => setFilterDrawerOpen(false)}
                  className="flex-1 py-2.5 px-4 bg-[#3A2924] text-[#F8F5F0] text-xs uppercase tracking-wider font-medium rounded-xs hover:bg-[#202020]"
                >
                  View ({filteredProducts.length})
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
