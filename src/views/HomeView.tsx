import React, { useRef } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  Leaf, 
  Star, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ASSETS, INSTAGRAM_POSTS } from '../data/mockData';

export const HomeView: React.FC = () => {
  const { settings, products, reviews, navigateTo } = useStore();
  const carouselRef = useRef<HTMLDivElement>(null);

  const bestSellers = products.filter(p => p.isBestSeller);
  // Feature distinct items so there's zero repetition on the homepage
  const featuredEssentials = products.length >= 8 ? products.slice(4, 8) : products.slice(0, 4);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#FAF7F2]">
        {/* Background Image with subtle cinematic scrim */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={settings.heroImage || ASSETS.hero}
            alt="Valoir Luxury Beauty Campaign"
            fallbackLabel="Beauty, Refined"
            className="w-full h-full object-cover object-center sm:object-[center_35%] scale-100 hover:scale-102 transition-transform duration-1000 ease-out"
          />
          {/* Measured editorial gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#202020]/75 via-[#202020]/40 to-transparent sm:via-[#202020]/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-xl text-left space-y-6">
            <span className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.3em] font-medium text-[#D4AF87]">
              Maison de Beauté
            </span>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#F8F5F0] leading-[1.1] text-balance">
              {settings.heroHeadline}
            </h1>

            <p className="text-sm sm:text-base text-[#F8F5F0]/90 font-light leading-relaxed max-w-lg">
              {settings.heroSubheading}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => navigateTo('shop', { category: 'all' })}
                className="py-3.5 px-8 bg-[#F8F5F0] hover:bg-[#E8DED3] text-[#202020] text-xs uppercase tracking-[0.2em] font-semibold rounded-xs shadow-md transition-all active:scale-[0.99] text-center"
              >
                Shop Collection
              </button>
              <button
                onClick={() => navigateTo('shop', { category: 'best-sellers' })}
                className="py-3.5 px-8 bg-transparent hover:bg-[#F8F5F0]/10 text-[#F8F5F0] border border-[#F8F5F0]/60 text-xs uppercase tracking-[0.2em] font-medium rounded-xs transition-colors text-center backdrop-blur-xs"
              >
                Explore Beauty
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES (Three Large Editorial Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#3A2924]/70 font-medium">
            Curated Disciplines
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#202020] font-light">
            Designed for Everyday Intention
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Makeup */}
          <div 
            onClick={() => navigateTo('shop', { category: 'makeup' })}
            className="group relative aspect-[3/4] overflow-hidden bg-[#FAF7F2] rounded-xs cursor-pointer border border-[#202020]/8 flex flex-col justify-end p-8"
          >
            <ImageWithFallback
              src={ASSETS.categoryMakeup}
              alt="Luxury Makeup Collection"
              fallbackLabel="Makeup Collection"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#202020]/85 via-[#202020]/30 to-transparent" />
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF87] font-medium">
                01 · The Palette
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F8F5F0] font-normal">
                Makeup
              </h3>
              <p className="text-xs text-[#F8F5F0]/80 font-light line-clamp-2">
                Color, confidence, and effortless expression.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#F8F5F0] uppercase tracking-wider font-medium group-hover:underline underline-offset-4">
                  <span>Shop Makeup</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Skincare */}
          <div 
            onClick={() => navigateTo('shop', { category: 'skincare' })}
            className="group relative aspect-[3/4] overflow-hidden bg-[#FAF7F2] rounded-xs cursor-pointer border border-[#202020]/8 flex flex-col justify-end p-8"
          >
            <ImageWithFallback
              src={ASSETS.categorySkincare}
              alt="Radiant Skincare Collection"
              fallbackLabel="Skincare Rituals"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#202020]/85 via-[#202020]/30 to-transparent" />
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF87] font-medium">
                02 · The Canvas
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F8F5F0] font-normal">
                Skincare
              </h3>
              <p className="text-xs text-[#F8F5F0]/80 font-light line-clamp-2">
                Thoughtfully crafted essentials for radiant skin.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#F8F5F0] uppercase tracking-wider font-medium group-hover:underline underline-offset-4">
                  <span>Shop Skincare</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: New Arrivals */}
          <div 
            onClick={() => navigateTo('shop', { category: 'new-arrivals' })}
            className="group relative aspect-[3/4] overflow-hidden bg-[#FAF7F2] rounded-xs cursor-pointer border border-[#202020]/8 flex flex-col justify-end p-8"
          >
            <ImageWithFallback
              src={ASSETS.categoryNewArrivals}
              alt="New Arrivals in cosmetics"
              fallbackLabel="New Arrivals"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#202020]/85 via-[#202020]/30 to-transparent" />
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF87] font-medium">
                03 · Just Arrived
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F8F5F0] font-normal">
                New Arrivals
              </h3>
              <p className="text-xs text-[#F8F5F0]/80 font-light line-clamp-2">
                Meet the latest additions to your beauty ritual.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#F8F5F0] uppercase tracking-wider font-medium group-hover:underline underline-offset-4">
                  <span>Discover New</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BEST SELLERS (Horizontal Carousel / Responsive Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#3A2924]/70 font-medium block">
              Iconic Formulations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#202020] font-light">
              Best Sellers
            </h2>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel('left')}
              aria-label="Previous products"
              className="p-2 border border-[#202020]/20 rounded-full hover:bg-[#E8DED3]/60 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-[#202020]" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              aria-label="Next products"
              className="p-2 border border-[#202020]/20 rounded-full hover:bg-[#E8DED3]/60 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-[#202020]" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
        >
          {bestSellers.map((product) => (
            <div key={product.id} className="w-[calc(50%-12px)] md:w-[calc(25%-18px)] shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. BRAND STORY SECTION (Split Screen) */}
      <section className="bg-[#FAF7F2] py-20 sm:py-28 border-y border-[#202020]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Image Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-xs border border-[#202020]/10 shadow-lg">
                <ImageWithFallback
                  src={ASSETS.brandStory}
                  alt="Valoir cosmetics textures"
                  fallbackLabel="Artisanal Textures"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block p-6 bg-[#F8F5F0] border border-[#202020]/10 rounded-xs shadow-md max-w-xs">
                <span className="font-serif italic text-sm text-[#3A2924] block">
                  "Textures created to awaken your natural radiance without concealing who you are."
                </span>
              </div>
            </div>

            {/* Prose Column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#B98282] font-semibold block">
                The Philosophy
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl text-[#202020] font-light leading-tight">
                Beauty, Made With Intention.
              </h2>

              <p className="text-sm sm:text-base text-[#202020]/80 font-light leading-relaxed">
                At {settings.brandName}, we believe beauty should feel effortless, expressive, and uniquely yours. Every product is thoughtfully created to bring together beautiful textures, sophisticated shades, and formulas designed for everyday confidence.
              </p>

              <p className="text-sm sm:text-base text-[#202020]/80 font-light leading-relaxed">
                We formulate with clean, skin-nourishing active botanicals—French squalane, wild rose wax, and bio-identical ceramides—to ensure every application feels as restorative as skincare.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => navigateTo('about')}
                  className="py-3 px-8 bg-[#3A2924] hover:bg-[#202020] text-[#F8F5F0] text-xs uppercase tracking-[0.2em] font-semibold rounded-xs shadow-xs transition-colors inline-flex items-center gap-2"
                >
                  <span>Our Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FEATURED COLLECTION: The Everyday Essentials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#3A2924]/70 font-medium">
            Curated Capsule
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#202020] font-light">
            The Everyday Essentials
          </h2>
          <p className="text-xs sm:text-sm text-[#202020]/70 font-light">
            A cohesive collection crafted to seamlessly transition from morning light to evening elegance.
          </p>
        </div>

        {/* 4-column product grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {featuredEssentials.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. INGREDIENTS / QUALITY SECTION */}
      <section className="bg-[#FAF7F2] py-20 border-y border-[#202020]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#3A2924]/70 font-medium">
              Pure Formulation Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#202020] font-light">
              Thoughtfully Formulated. Beautifully Made.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-[#F8F5F0] border border-[#202020]/8 rounded-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#E8DED3]/60 flex items-center justify-center text-[#3A2924]">
                <Leaf className="w-5 h-5 stroke-[1.4]" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#202020]">
                Carefully Selected Ingredients
              </h3>
              <p className="text-xs text-[#202020]/70 font-light leading-relaxed">
                Every botanical oil and pigment is sourced with rigorous traceability and verified skin compatibility.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-[#F8F5F0] border border-[#202020]/8 rounded-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#E8DED3]/60 flex items-center justify-center text-[#3A2924]">
                <HeartHandshake className="w-5 h-5 stroke-[1.4]" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#202020]">
                Cruelty-Free
              </h3>
              <p className="text-xs text-[#202020]/70 font-light leading-relaxed">
                We never test on animals at any stage of development, honoring compassionate luxury beauty.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-[#F8F5F0] border border-[#202020]/8 rounded-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#E8DED3]/60 flex items-center justify-center text-[#3A2924]">
                <ShieldCheck className="w-5 h-5 stroke-[1.4]" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#202020]">
                Dermatologically Tested
              </h3>
              <p className="text-xs text-[#202020]/70 font-light leading-relaxed">
                Independently clinically tested to be safe, gentle, and non-comedogenic for sensitive complexions.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-[#F8F5F0] border border-[#202020]/8 rounded-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#E8DED3]/60 flex items-center justify-center text-[#3A2924]">
                <Sparkles className="w-5 h-5 stroke-[1.4]" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#202020]">
                Made With Care
              </h3>
              <p className="text-xs text-[#202020]/70 font-light leading-relaxed">
                Produced in small artisanal batches to ensure optimal ingredient potency, elegance, and tactile delight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SOCIAL PROOF / REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#3A2924]/70 font-medium">
            Verified Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#202020] font-light">
            Loved By Beauty Lovers
          </h2>

          <div className="inline-flex items-center gap-2 pt-1 text-xs text-[#202020]/80">
            <div className="flex text-[#D4AF87]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF87]" />
              ))}
            </div>
            <span className="font-semibold text-[#3A2924]">4.8 / 5</span>
            <span className="text-[#202020]/50">Based on 1,200+ verified customer reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="p-8 bg-[#FAF7F2] border border-[#202020]/8 rounded-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex text-[#D4AF87]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF87]" />
                  ))}
                </div>
                <h4 className="font-serif text-base text-[#202020] font-medium italic">
                  "{review.title}"
                </h4>
                <p className="text-xs sm:text-sm text-[#202020]/75 font-light leading-relaxed">
                  "{review.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#202020]/10 flex items-center justify-between text-xs">
                <span className="font-medium text-[#202020]">{review.author}</span>
                {review.shadeUsed && (
                  <span className="text-[#3A2924]/70 text-[11px] italic">
                    Shade: {review.shadeUsed}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. INSTAGRAM / SOCIAL MEDIA RITUAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#3A2924]/70 font-medium">
            The Community
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#202020] font-light">
            Follow Our Beauty Ritual
          </h2>
          <a
            href={`https://instagram.com/${settings.instagramHandle}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#3A2924] font-medium tracking-wider uppercase inline-block hover:underline"
          >
            @{settings.instagramHandle}
          </a>
        </div>

        {/* 6-image social grid with subtle zoom */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div 
              key={post.id}
              className="group relative aspect-square overflow-hidden bg-[#FAF7F2] rounded-xs cursor-pointer border border-[#202020]/8"
            >
              <ImageWithFallback
                src={post.image}
                alt={post.caption}
                fallbackLabel="Valoir Ritual"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#202020]/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-[#F8F5F0] text-center">
                <p className="text-[11px] line-clamp-2 font-light">
                  {post.caption}
                </p>
                <span className="text-[10px] text-[#D4AF87] mt-1 font-mono">
                  ♥ {post.likes}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
