import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistView: React.FC = () => {
  const { wishlist, products, addToCart, toggleWishlist, navigateTo } = useStore();

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#202020]/10 pb-6 flex items-baseline justify-between">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#202020] font-light">
            Your Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-[#202020]/60 font-light mt-1">
            Carefully curated items saved for your personal beauty vanity.
          </p>
        </div>
        <span className="text-xs text-[#202020]/60 tabular-nums">
          {savedProducts.length} saved item(s)
        </span>
      </div>

      {savedProducts.length === 0 ? (
        <div className="py-20 text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#E8DED3]/50 flex items-center justify-center mx-auto text-[#B98282]">
            <Heart className="w-8 h-8 stroke-[1.2]" />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-2xl text-[#202020]">Your wishlist is empty</h2>
            <p className="text-xs text-[#202020]/60 max-w-sm mx-auto">
              Save your favorite shades, serums, and formulations to revisit anytime.
            </p>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="py-3 px-8 bg-[#3A2924] hover:bg-[#202020] text-[#F8F5F0] text-xs uppercase tracking-[0.2em] font-semibold rounded-xs shadow-xs transition-colors"
          >
            Discover Essentials
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};
