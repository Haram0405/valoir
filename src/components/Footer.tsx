import React, { useState } from 'react';
import { 
  Instagram, 
  ArrowRight, 
  Check, 
  Shield, 
  CreditCard,
  SlidersHorizontal 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { settings, navigateTo, setIsAdminOpen, setIsAccountOpen } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#202020] text-[#F8F5F0] pt-16 pb-12 border-t border-[#3A2924]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="pb-16 mb-16 border-b border-[#F8F5F0]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF87] font-medium block">
              Atelier Correspondence
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F8F5F0]">
              A Little Beauty In Your Inbox
            </h3>
            <p className="text-xs sm:text-sm text-[#F8F5F0]/70 font-light max-w-md">
              Sign up for exclusive launches, beauty tips, special offers, and early access.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 bg-[#3A2924]/60 border border-[#D4AF87]/40 rounded-xs flex items-center gap-3">
                <Check className="w-5 h-5 text-[#D4AF87]" />
                <span className="text-xs sm:text-sm font-light text-[#F8F5F0]">
                  Thank you for joining. Welcome invitation code <strong className="font-mono text-[#D4AF87]">WELCOME10</strong> is now active.
                </span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md lg:ml-auto">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#FAF7F2]/5 border border-[#F8F5F0]/20 rounded-xs text-xs sm:text-sm placeholder:text-[#F8F5F0]/40 text-[#F8F5F0] focus:outline-none focus:border-[#D4AF87] transition-colors"
                />
                <button
                  type="submit"
                  className="py-3 px-6 bg-[#E8DED3] hover:bg-[#F8F5F0] text-[#202020] text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors whitespace-nowrap"
                >
                  Join Us
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12">
          
          {/* Brand Col */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl tracking-[0.2em] uppercase font-light text-[#F8F5F0] block">
              {settings.brandName}
            </span>
            <p className="text-xs text-[#F8F5F0]/70 font-light leading-relaxed max-w-sm">
              Thoughtfully created to bring together beautiful textures, sophisticated shades, and formulas designed for everyday confidence.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a 
                href={`https://instagram.com/${settings.instagramHandle}`}
                target="_blank" 
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#F8F5F0]/20 flex items-center justify-center text-[#F8F5F0]/80 hover:text-[#D4AF87] hover:border-[#D4AF87] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <span className="text-xs text-[#F8F5F0]/60">@{settings.instagramHandle}</span>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#D4AF87] block">
              Shop
            </span>
            <ul className="space-y-2 text-xs font-light text-[#F8F5F0]/75">
              <li>
                <button onClick={() => navigateTo('shop', { category: 'all' })} className="hover:text-[#F8F5F0] transition-colors">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { category: 'makeup' })} className="hover:text-[#F8F5F0] transition-colors">
                  Makeup
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { category: 'skincare' })} className="hover:text-[#F8F5F0] transition-colors">
                  Skincare
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { category: 'new-arrivals' })} className="hover:text-[#F8F5F0] transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { category: 'best-sellers' })} className="hover:text-[#F8F5F0] transition-colors">
                  Best Sellers
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#D4AF87] block">
              Customer Care
            </span>
            <ul className="space-y-2 text-xs font-light text-[#F8F5F0]/75">
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#F8F5F0] transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-[#F8F5F0] transition-colors">
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-[#F8F5F0] transition-colors">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-[#F8F5F0] transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => setIsAccountOpen(true)} className="hover:text-[#F8F5F0] transition-colors">
                  Track Order
                </button>
              </li>
            </ul>
          </div>

          {/* About & Legal */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#D4AF87] block">
              About & Ethos
            </span>
            <ul className="space-y-2 text-xs font-light text-[#F8F5F0]/75">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#F8F5F0] transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#F8F5F0] transition-colors">
                  Thoughtful Ingredients
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#F8F5F0] transition-colors">
                  Sustainability
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#F8F5F0] transition-colors">
                  Careers & Press
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsAdminOpen(true)} 
                  className="text-[#D4AF87] hover:underline flex items-center gap-1 font-normal"
                >
                  <SlidersHorizontal className="w-3 h-3" />
                  Store CMS Panel
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Payment Icons & Copyright */}
        <div className="pt-8 border-t border-[#F8F5F0]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F5F0]/50 font-light">
          <div>
            © 2026 {settings.brandName}. All rights reserved. Formulated with intention.
          </div>

          {/* Payment Method Badges (Clean, discreet badges) */}
          <div className="flex items-center gap-2">
            {['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay'].map((pay) => (
              <span 
                key={pay}
                className="px-2 py-0.5 rounded-xs border border-[#F8F5F0]/20 text-[10px] text-[#F8F5F0]/70 font-mono tracking-tight"
              >
                {pay}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};
