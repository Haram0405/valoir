import React, { useState } from 'react';
import { Heart, Star, Plus } from 'lucide-react';
import { Product, ProductShade } from '../types';
import { useStore } from '../context/StoreContext';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, addToCart, isInWishlist, toggleWishlist } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedShade, setSelectedShade] = useState<ProductShade | undefined>(
    product.shades && product.shades.length > 0 ? product.shades[0] : undefined
  );

  const isFavorite = isInWishlist(product.id);

  const displayImage = isHovered && product.secondaryImage 
    ? product.secondaryImage 
    : product.images[0];

  const handleCardClick = (e: React.MouseEvent) => {
    // If clicked on shade button or heart button, prevent full navigation
    if ((e.target as HTMLElement).closest('.shade-button') || (e.target as HTMLElement).closest('.action-button')) {
      return;
    }
    navigateTo('product', { productId: product.id });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedShade, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      className="group relative flex flex-col cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Visual Image Container */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-[#FAF7F2] border border-[#202020]/5 rounded-xs">
        {/* Badges: Minimal & elegant, unboxed or hairline */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
          {product.isBestSeller && (
            <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 bg-[#3A2924] text-[#F8F5F0] rounded-xs shadow-xs">
              Best Seller
            </span>
          )}
          {product.isNewArrival && !product.isBestSeller && (
            <span className="text-[10px] uppercase tracking-widest font-medium px-2 py-0.5 bg-[#B98282] text-white rounded-xs">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`action-button absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 ${
            isFavorite 
              ? 'bg-[#F8F5F0] text-[#B98282] opacity-100 shadow-xs' 
              : 'bg-[#F8F5F0]/80 text-[#202020]/60 opacity-0 group-hover:opacity-100 hover:text-[#3A2924] hover:bg-[#F8F5F0]'
          }`}
        >
          <Heart className={`w-4 h-4 stroke-[1.5] ${isFavorite ? 'fill-[#B98282]' : ''}`} />
        </button>

        {/* Product Image */}
        <ImageWithFallback
          src={displayImage}
          alt={product.name}
          fallbackLabel={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Quick Add To Bag Overlay Button (Slides in on hover) */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:block opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-4 bg-[#3A2924]/90 hover:bg-[#3A2924] backdrop-blur-xs text-[#F8F5F0] text-xs uppercase tracking-widest font-medium rounded-xs shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="mt-3 flex flex-col flex-1 space-y-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-[#202020]/60">
          <span className="uppercase tracking-widest text-[10px] font-medium text-[#3A2924]/70">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-[#202020]/80">
            <Star className="w-3 h-3 fill-[#D4AF87] text-[#D4AF87]" />
            <span className="text-[11px] font-medium tabular-nums">{product.rating.toFixed(1)}</span>
            <span className="text-[10px] text-[#202020]/50 tabular-nums">({product.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif text-base sm:text-lg text-[#202020] font-normal leading-snug group-hover:text-[#3A2924] transition-colors">
          {product.name}
        </h3>

        {/* Tagline / Short Description */}
        <p className="text-xs text-[#202020]/65 line-clamp-1 font-light">
          {product.tagline}
        </p>

        {/* Shades Selector Dots (if product has shades) */}
        {product.shades && product.shades.length > 0 && (
          <div className="pt-1.5 flex items-center gap-1.5 flex-wrap">
            {product.shades.slice(0, 5).map((shade) => {
              const isSelected = selectedShade?.id === shade.id;
              return (
                <button
                  key={shade.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedShade(shade);
                  }}
                  title={shade.name}
                  aria-label={`Select shade ${shade.name}`}
                  className={`shade-button relative w-3.5 h-3.5 rounded-full transition-transform ${
                    isSelected ? 'ring-1 ring-offset-1 ring-[#3A2924] scale-110' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: shade.hex }}
                />
              );
            })}
            {product.shades.length > 5 && (
              <span className="text-[10px] text-[#202020]/50 tracking-wider">
                +{product.shades.length - 5}
              </span>
            )}
            {selectedShade && (
              <span className="text-[10px] text-[#202020]/60 ml-1 font-light italic truncate max-w-[100px]">
                {selectedShade.name}
              </span>
            )}
          </div>
        )}

        {/* Price & Mobile Add Button */}
        <div className="pt-2 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <span className="font-sans font-medium text-sm sm:text-base text-[#202020] tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="font-sans text-xs text-[#202020]/40 line-through tabular-nums">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Mobile Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            aria-label="Add to bag"
            className="sm:hidden p-1.5 text-[#3A2924] hover:bg-[#E8DED3]/50 rounded-full transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
