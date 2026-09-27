import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ZoomIn, 
  CheckCircle2, 
  Share2 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductShade } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const ProductDetailView: React.FC = () => {
  const { 
    selectedProductId, 
    products, 
    reviews, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    navigateTo, 
    addReview 
  } = useStore();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedShade, setSelectedShade] = useState<ProductShade | undefined>(
    product.shades && product.shades.length > 0 ? product.shades[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Accordion state
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    description: true,
    ingredients: false,
    howToUse: false,
    shipping: false,
    reviews: true,
  });

  // New review form state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const isFavorite = isInWishlist(product.id);
  const productReviews = reviews.filter(r => r.productId === product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedShade, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedShade, quantity);
    navigateTo('checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewContent.trim()) return;
    addReview({
      productId: product.id,
      author: reviewAuthor,
      rating: reviewRating,
      title: reviewTitle || 'Exceptional experience',
      content: reviewContent,
      verified: true,
      shadeUsed: selectedShade?.name,
    });
    setReviewSubmitted(true);
    setReviewAuthor('');
    setReviewTitle('');
    setReviewContent('');
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.isFeatured))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-[#202020]/60 flex items-center gap-1.5 uppercase tracking-wider">
        <button onClick={() => navigateTo('home')} className="hover:text-[#3A2924]">Home</button>
        <span>/</span>
        <button 
          onClick={() => navigateTo('shop', { category: product.category })} 
          className="hover:text-[#3A2924] capitalize"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-[#3A2924] font-medium">{product.name}</span>
      </nav>

      {/* Main PDP Grid: Left Gallery, Right Contiguous Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        
        {/* LEFT COLUMN: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Frame with Zoom preview */}
          <div 
            className="relative aspect-[4/5] sm:aspect-[1/1] overflow-hidden bg-[#FAF7F2] rounded-xs border border-[#202020]/10 cursor-zoom-in"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <ImageWithFallback
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              fallbackLabel={product.name}
              className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
                isZoomed ? 'scale-150 object-center cursor-zoom-out' : 'scale-100 hover:scale-105'
              }`}
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
              {product.isBestSeller && (
                <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 bg-[#3A2924] text-[#F8F5F0] rounded-xs shadow-xs">
                  Best Seller
                </span>
              )}
              {product.isNewArrival && (
                <span className="text-[10px] uppercase tracking-widest font-medium px-2.5 py-1 bg-[#B98282] text-white rounded-xs">
                  New Arrival
                </span>
              )}
            </div>

            {/* Zoom helper icon */}
            <div className="absolute bottom-4 right-4 z-10 p-2 bg-[#F8F5F0]/80 backdrop-blur-xs rounded-full text-[#202020]/70 hover:text-[#202020]">
              <ZoomIn className="w-4 h-4" />
            </div>
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 shrink-0 rounded-xs overflow-hidden border transition-all ${
                    activeImageIndex === idx 
                      ? 'border-[#3A2924] ring-1 ring-[#3A2924]' 
                      : 'border-[#202020]/15 opacity-70 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback 
                    src={img} 
                    alt={`Thumbnail ${idx}`} 
                    fallbackLabel={`Angle ${idx + 1}`}
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#3A2924]/70 block">
              {product.category} · {product.productType}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#202020] font-light leading-snug">
              {product.name}
            </h1>

            {/* Star Rating & Review Anchor */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex text-[#D4AF87]">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-[#D4AF87]' : ''}`} 
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#202020] tabular-nums">
                {product.rating.toFixed(1)}
              </span>
              <button 
                onClick={() => {
                  setOpenSections(p => ({ ...p, reviews: true }));
                  document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs text-[#202020]/60 underline hover:text-[#3A2924]"
              >
                ({product.reviewCount} customer reviews)
              </button>
            </div>

            {/* Price */}
            <div className="pt-2 flex items-baseline gap-3">
              <span className="font-sans font-medium text-2xl text-[#202020] tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#202020]/40 line-through tabular-nums">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xs text-[#202020]/60 ml-2">
                Size: {product.size}
              </span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#202020]/80 font-light leading-relaxed border-t border-[#202020]/10 pt-4">
            {product.description}
          </p>

          {/* Shade Selector (if applicable) */}
          {product.shades && product.shades.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="uppercase tracking-wider font-semibold text-[#202020]">
                  Shade: <span className="font-normal text-[#3A2924] italic">{selectedShade?.name}</span>
                </span>
                <span className="text-[#202020]/50 text-[11px]">
                  {selectedShade?.description}
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.shades.map((shade) => {
                  const isSelected = selectedShade?.id === shade.id;
                  return (
                    <button
                      key={shade.id}
                      onClick={() => setSelectedShade(shade)}
                      title={`${shade.name} - ${shade.description}`}
                      className={`relative w-8 h-8 rounded-full transition-transform flex items-center justify-center ${
                        isSelected 
                          ? 'ring-2 ring-offset-2 ring-[#3A2924] scale-110' 
                          : 'hover:scale-105 border border-black/15'
                      }`}
                      style={{ backgroundColor: shade.hex }}
                    >
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Buy CTAs */}
          <div className="space-y-3 pt-3 border-t border-[#202020]/10">
            <div className="flex items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center border border-[#202020]/20 rounded-xs bg-[#FAF7F2] h-12 px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-[#E8DED3]/60 transition-colors"
                  aria-label="Decrease"
                >
                  <Minus className="w-3.5 h-3.5 text-[#202020]/70" />
                </button>
                <span className="px-3 font-sans font-medium text-sm tabular-nums min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-[#E8DED3]/60 transition-colors"
                  aria-label="Increase"
                >
                  <Plus className="w-3.5 h-3.5 text-[#202020]/70" />
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-[#3A2924] hover:bg-[#202020] text-[#F8F5F0] text-xs uppercase tracking-[0.2em] font-semibold rounded-xs shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Add to Bag</span>
                <span>·</span>
                <span className="tabular-nums">${(product.price * quantity).toFixed(2)}</span>
              </button>

              {/* Wishlist Heart */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`h-12 w-12 border rounded-xs flex items-center justify-center transition-colors ${
                  isFavorite 
                    ? 'border-[#B98282] bg-[#FAF7F2] text-[#B98282]' 
                    : 'border-[#202020]/20 text-[#202020]/70 hover:border-[#3A2924] hover:text-[#3A2924]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 stroke-[1.5] ${isFavorite ? 'fill-[#B98282]' : ''}`} />
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="w-full py-3 bg-[#E8DED3] hover:bg-[#F8F5F0] text-[#202020] border border-[#202020]/15 text-xs uppercase tracking-[0.2em] font-semibold rounded-xs transition-colors"
            >
              Instant Checkout
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#202020]/10 text-xs text-[#202020]/75">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#3A2924]" />
              <span>Complimentary shipping over $75</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3A2924]" />
              <span>30-Day Ritual Satisfaction Guarantee</span>
            </div>
          </div>

          {/* Expandable Accordion Tabs */}
          <div className="divide-y divide-[#202020]/10 border-b border-[#202020]/10">
            {/* Description & Benefits */}
            <div>
              <button
                onClick={() => toggleSection('description')}
                className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#202020] hover:text-[#3A2924]"
              >
                <span>Description & Formula</span>
                {openSections.description ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openSections.description && (
                <div className="pb-4 text-xs text-[#202020]/80 font-light leading-relaxed space-y-2">
                  <p>{product.description}</p>
                  <ul className="list-disc list-inside space-y-1 pt-1 text-[#202020]/70">
                    {product.benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Ingredients */}
            <div>
              <button
                onClick={() => toggleSection('ingredients')}
                className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#202020] hover:text-[#3A2924]"
              >
                <span>Key Ingredients</span>
                {openSections.ingredients ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openSections.ingredients && (
                <div className="pb-4 text-xs text-[#202020]/80 font-light leading-relaxed">
                  <p className="font-mono text-[11px] text-[#202020]/70 leading-normal">
                    {product.ingredients}
                  </p>
                </div>
              )}
            </div>

            {/* How To Use */}
            <div>
              <button
                onClick={() => toggleSection('howToUse')}
                className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#202020] hover:text-[#3A2924]"
              >
                <span>How To Use & Ritual</span>
                {openSections.howToUse ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openSections.howToUse && (
                <div className="pb-4 text-xs text-[#202020]/80 font-light leading-relaxed">
                  <p>{product.howToUse}</p>
                </div>
              )}
            </div>

            {/* Shipping & Returns */}
            <div>
              <button
                onClick={() => toggleSection('shipping')}
                className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#202020] hover:text-[#3A2924]"
              >
                <span>Shipping & Returns</span>
                {openSections.shipping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openSections.shipping && (
                <div className="pb-4 text-xs text-[#202020]/80 font-light leading-relaxed space-y-1">
                  <p>{product.shippingInfo}</p>
                  <p>Orders ship within 24 hours. Returns are complimentary within 30 days of receipt.</p>
                </div>
              )}
            </div>
          </div>

          {/* Social Share */}
          <div className="pt-2 flex items-center justify-between text-xs text-[#202020]/60">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 hover:text-[#3A2924] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link copied to clipboard!' : 'Share Product'}</span>
            </button>
            <span className="text-[11px] font-mono">SKU: {product.slug.toUpperCase()}</span>
          </div>

        </div>

      </div>

      {/* REVIEWS SECTION */}
      <section id="reviews-section" className="pt-12 border-t border-[#202020]/10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#3A2924]/70 block">
              Customer Impressions
            </span>
            <h2 className="font-serif text-3xl text-[#202020] font-light">
              Verified Reviews ({productReviews.length})
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-[#D4AF87]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D4AF87]" />
              ))}
            </div>
            <span className="font-serif text-lg font-medium text-[#3A2924]">{product.rating.toFixed(1)} / 5</span>
          </div>
        </div>

        {/* Existing Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productReviews.length === 0 ? (
            <p className="text-xs text-[#202020]/60 italic col-span-2">
              Be the first to share your impression of {product.name}.
            </p>
          ) : (
            productReviews.map((rev) => (
              <div key={rev.id} className="p-6 bg-[#FAF7F2] rounded-xs border border-[#202020]/8 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex text-[#D4AF87]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF87]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#202020]/50">{rev.date}</span>
                </div>
                <h4 className="font-serif text-sm font-medium text-[#202020]">
                  "{rev.title}"
                </h4>
                <p className="text-xs text-[#202020]/75 font-light leading-relaxed">
                  {rev.content}
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-[#202020]/60 border-t border-[#202020]/5">
                  <span className="font-medium text-[#202020]">{rev.author}</span>
                  {rev.shadeUsed && <span className="italic">Shade: {rev.shadeUsed}</span>}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Write a Review Form */}
        <div className="p-6 sm:p-8 bg-[#FAF7F2] border border-[#202020]/10 rounded-xs max-w-2xl space-y-4">
          <h3 className="font-serif text-xl text-[#202020]">Share Your Experience</h3>
          
          {reviewSubmitted ? (
            <div className="p-4 bg-emerald-50 text-emerald-800 text-xs rounded-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Thank you! Your verified review has been published.</span>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    placeholder="e.g. Charlotte B."
                    className="w-full px-3 py-2 bg-[#F8F5F0] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                    Rating
                  </label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F8F5F0] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
                  >
                    <option value={5}>5 Stars - Pure Perfection</option>
                    <option value={4}>4 Stars - Excellent</option>
                    <option value={3}>3 Stars - Good</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. Gorgeous formulation and feel"
                  className="w-full px-3 py-2 bg-[#F8F5F0] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                  Review Details
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  placeholder="Share details on texture, longevity, shade, and skin feel..."
                  className="w-full px-3 py-2 bg-[#F8F5F0] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-6 bg-[#3A2924] hover:bg-[#202020] text-[#F8F5F0] uppercase tracking-widest text-[11px] font-semibold rounded-xs transition-colors"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>
      </section>

      {/* RELATED PRODUCTS: "You May Also Like" */}
      <section className="pt-12 border-t border-[#202020]/10 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#3A2924]/70">
            Harmonious Pairings
          </span>
          <h2 className="font-serif text-3xl text-[#202020] font-light">
            You May Also Like
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </section>

    </div>
  );
};
