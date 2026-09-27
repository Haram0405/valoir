import React from 'react';
import { Sparkles, HeartHandshake, Leaf, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ASSETS } from '../data/mockData';

export const AboutView: React.FC = () => {
  const { settings, navigateTo } = useStore();

  const timelineMilestones = [
    {
      year: '2022',
      title: 'The Atelier Inception',
      description: 'Founded with a single pursuit: cosmetics that fuse French botanical skincare efficacy with high-performance pigment artistry.',
    },
    {
      year: '2023',
      title: 'The Velvet Matte Formula',
      description: 'After 84 formulation iterations, our signature squalane-infused lip formula premiered to acclaim from professional makeup artists.',
    },
    {
      year: '2024',
      title: 'Cruelty-Free & Recycled Glass Standards',
      description: 'Committed to 100% post-consumer recycled luxury glass packaging and cruelty-free formulation guarantees.',
    },
    {
      year: '2025',
      title: 'Global Ritual Community',
      description: 'Expanded delivery to over 24 countries, opening direct atelier customer care concierge for personalized complexion matching.',
    },
    {
      year: '2026',
      title: 'Maison Valoir Today',
      description: 'Continuing our commitment to skin-first cosmetics and radiant essentials crafted for modern everyday confidence.',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#FAF7F2]">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={ASSETS.aboutHero}
            alt="Valoir Beauty atelier and craftsmanship"
            fallbackLabel="Maison Valoir Atelier"
            className="w-full h-full object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 bg-[#202020]/50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-[#F8F5F0] space-y-4">
          <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#D4AF87]">
            The Heritage & Ethos
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-balance">
            Beauty Is Personal.
          </h1>
          <p className="text-sm sm:text-base text-[#F8F5F0]/85 font-light max-w-xl mx-auto leading-relaxed">
            We believe true luxury is intentional. Formulas that enhance your unique features rather than disguising them.
          </p>
        </div>
      </section>

      {/* 2. Brand Philosophy */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B98282] font-semibold block">
              The Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#202020] font-light leading-snug">
              Formulated With Care. Designed For Real Skin.
            </h2>
            <p className="text-xs sm:text-sm text-[#202020]/75 font-light leading-relaxed">
              Every formula at {settings.brandName} begins with skin biology. We believe cosmetics should treat, nourish, and hydrate as deeply as high-end serums.
            </p>
            <p className="text-xs sm:text-sm text-[#202020]/75 font-light leading-relaxed">
              Instead of heavy silicones and chalky fillers, we select weightless botanical waxes, organic jojoba, French squalane, and fermented green tea to nourish the barrier while delivering velvety, all-day pigments.
            </p>
          </div>

          <div className="relative aspect-[4/5] rounded-xs overflow-hidden border border-[#202020]/10 shadow-lg">
            <ImageWithFallback
              src={ASSETS.aboutPhilosophy}
              alt="Artisanal cosmetic botanical ingredients"
              fallbackLabel="Botanical Integrity"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. The 4 Pillars */}
      <section className="bg-[#FAF7F2] py-20 border-y border-[#202020]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#3A2924]/70 font-medium">
              Atelier Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#202020] font-light">
              Our Commitment To Quality
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-[#F8F5F0] border border-[#202020]/8 rounded-xs space-y-3">
              <Leaf className="w-6 h-6 text-[#3A2924] stroke-[1.4]" />
              <h3 className="font-serif text-lg text-[#202020]">Traceable Botanicals</h3>
              <p className="text-xs text-[#202020]/70 font-light leading-relaxed">
                Active French squalane and certified wild rose wax sustainably sourced with documented origin.
              </p>
            </div>

            <div className="p-6 bg-[#F8F5F0] border border-[#202020]/8 rounded-xs space-y-3">
              <HeartHandshake className="w-6 h-6 text-[#3A2924] stroke-[1.4]" />
              <h3 className="font-serif text-lg text-[#202020]">100% Cruelty-Free</h3>
              <p className="text-xs text-[#202020]/70 font-light leading-relaxed">
                Zero animal testing across every phase of research, formulation, and development.
              </p>
            </div>

            <div className="p-6 bg-[#F8F5F0] border border-[#202020]/8 rounded-xs space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#3A2924] stroke-[1.4]" />
              <h3 className="font-serif text-lg text-[#202020]">Sensitive Barrier Safe</h3>
              <p className="text-xs text-[#202020]/70 font-light leading-relaxed">
                Formulated without parabens, synthetic fragrances, micro-plastics, or pore-clogging mineral oils.
              </p>
            </div>

            <div className="p-6 bg-[#F8F5F0] border border-[#202020]/8 rounded-xs space-y-3">
              <Sparkles className="w-6 h-6 text-[#3A2924] stroke-[1.4]" />
              <h3 className="font-serif text-lg text-[#202020]">Sustainable Packaging</h3>
              <p className="text-xs text-[#202020]/70 font-light leading-relaxed">
                Weighted recyclable glass, metallic casings built to last, and FSC-certified packaging cartons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Timeline */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#3A2924]/70 font-medium">
            Evolution
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#202020] font-light">
            Our Journey
          </h2>
        </div>

        <div className="relative border-l border-[#202020]/15 ml-4 sm:ml-32 space-y-10 pl-6 sm:pl-10">
          {timelineMilestones.map((item, index) => (
            <div key={item.year} className="relative group">
              {/* Year marker on left for larger screens */}
              <div className="sm:absolute sm:-left-36 sm:w-24 text-right font-serif text-xl sm:text-2xl text-[#3A2924] font-medium">
                {item.year}
              </div>

              {/* Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#FAF7F2] border-2 border-[#3A2924] group-hover:bg-[#3A2924] transition-colors" />

              <div className="space-y-1.5">
                <h3 className="font-serif text-lg text-[#202020] font-medium">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#202020]/75 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <button
            onClick={() => navigateTo('shop')}
            className="py-3.5 px-8 bg-[#3A2924] hover:bg-[#202020] text-[#F8F5F0] text-xs uppercase tracking-[0.2em] font-semibold rounded-xs shadow-xs transition-colors inline-flex items-center gap-2"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

    </div>
  );
};
