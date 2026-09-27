import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const { 
    settings, 
    cartCount, 
    wishlist, 
    setIsCartOpen, 
    setIsSearchOpen, 
    setIsAccountOpen, 
    setIsAdminOpen,
    navigateTo, 
    activePage 
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop All', page: 'shop', category: 'all' },
    { label: 'Makeup', page: 'shop', category: 'makeup' },
    { label: 'Skincare', page: 'shop', category: 'skincare' },
    { label: 'New Arrivals', page: 'shop', category: 'new-arrivals' },
    { label: 'Best Sellers', page: 'shop', category: 'best-sellers' },
    { label: 'About', page: 'about' },
  ];

  const handleNavClick = (page: string, category?: string) => {
    navigateTo(page, category ? { category } : undefined);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Subtle Announcement Bar */}
      {announcementVisible && settings.announcementText && (
        <div className="bg-[#3A2924] text-[#F8F5F0] text-[11px] sm:text-xs font-normal tracking-widest uppercase py-2 px-4 text-center relative flex items-center justify-center border-b border-[#3A2924]/20">
          <span className="truncate max-w-[85%]">{settings.announcementText}</span>
          <button
            onClick={() => setAnnouncementVisible(false)}
            aria-label="Dismiss announcement"
            className="absolute right-4 text-[#F8F5F0]/60 hover:text-[#F8F5F0] transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#F8F5F0]/95 backdrop-blur-md shadow-xs py-3 border-b border-[#202020]/8' 
            : 'bg-[#F8F5F0] py-5 border-b border-[#202020]/6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Zone 1 (Mobile): Hamburger */}
            <div className="flex items-center lg:hidden">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="p-1.5 text-[#202020] hover:text-[#3A2924] transition-colors"
              >
                <Menu className="w-5 h-5 stroke-[1.5]" />
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open search"
                className="p-1.5 ml-2 text-[#202020] hover:text-[#3A2924] transition-colors"
              >
                <Search className="w-4.5 h-4.5 stroke-[1.5]" />
              </button>
            </div>

            {/* Zone 1 (Desktop): Brand Logo */}
            <div className="flex-1 lg:flex-initial text-center lg:text-left">
              <button 
                onClick={() => navigateTo('home')}
                className="group inline-flex flex-col items-center lg:items-start focus:outline-none"
              >
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] uppercase font-light text-[#202020] transition-colors group-hover:text-[#3A2924]">
                  {settings.brandName}
                </span>
                <span className="hidden lg:block text-[9px] tracking-[0.35em] uppercase text-[#3A2924]/70 -mt-1 font-sans font-medium">
                  {settings.brandTagline}
                </span>
              </button>
            </div>

            {/* Zone 2: Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              {navLinks.map((link) => {
                const isActive = 
                  activePage === link.page && 
                  (!link.category || link.category === 'all');
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.page, link.category)}
                    className={`text-[13px] tracking-wider uppercase font-medium transition-all duration-200 relative py-1 hover:text-[#3A2924] ${
                      isActive 
                        ? 'text-[#3A2924] font-semibold' 
                        : 'text-[#202020]/75'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#3A2924] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Zone 3: Header Actions (Search, Wishlist, Account, Cart, CMS trigger) */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* CMS Admin Quick Access button */}
              <button
                onClick={() => setIsAdminOpen(true)}
                title="Store Settings & CMS"
                aria-label="Open Store CMS Manager"
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium tracking-wide text-[#3A2924] bg-[#E8DED3]/60 hover:bg-[#E8DED3] rounded-full transition-colors"
              >
                <SlidersHorizontal className="w-3 h-3 text-[#3A2924]" />
                <span>Store CMS</span>
              </button>

              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search collection"
                className="hidden lg:flex p-2 text-[#202020]/80 hover:text-[#3A2924] transition-colors"
              >
                <Search className="w-4.5 h-4.5 stroke-[1.5]" />
              </button>

              <button
                onClick={() => setIsAccountOpen(true)}
                aria-label="Account & Orders"
                className="p-2 text-[#202020]/80 hover:text-[#3A2924] transition-colors"
              >
                <User className="w-4.5 h-4.5 stroke-[1.5]" />
              </button>

              <button
                onClick={() => navigateTo('wishlist')}
                aria-label="View Wishlist"
                className="p-2 text-[#202020]/80 hover:text-[#3A2924] transition-colors relative"
              >
                <Heart className={`w-4.5 h-4.5 stroke-[1.5] ${wishlist.length > 0 ? 'fill-[#B98282] text-[#B98282]' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#B98282] text-white text-[9px] font-bold flex items-center justify-center tabular-nums">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label={`Shopping bag containing ${cartCount} items`}
                className="p-2 text-[#202020] hover:text-[#3A2924] transition-colors relative"
              >
                <ShoppingBag className="w-4.5 h-4.5 stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#3A2924] text-[#F8F5F0] text-[9px] font-semibold flex items-center justify-center tabular-nums shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-[#202020]/40 backdrop-blur-xs transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#F8F5F0] shadow-xl flex flex-col z-10 border-r border-[#202020]/10">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#202020]/10">
              <span className="font-serif text-xl tracking-[0.2em] uppercase font-light text-[#202020]">
                {settings.brandName}
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-[#202020]/60 hover:text-[#202020]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.page, link.category)}
                    className="w-full flex items-center justify-between py-3 text-left text-sm tracking-wider uppercase font-medium text-[#202020] hover:text-[#B98282] transition-colors border-b border-[#202020]/5"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#202020]/40" />
                  </button>
                ))}
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('faq');
                  }}
                  className="w-full text-left py-2 text-xs uppercase tracking-wider text-[#202020]/70 hover:text-[#202020]"
                >
                  Customer FAQ & Assistance
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('contact');
                  }}
                  className="w-full text-left py-2 text-xs uppercase tracking-wider text-[#202020]/70 hover:text-[#202020]"
                >
                  Beauty Concierge & Contact
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminOpen(true);
                  }}
                  className="w-full text-left py-2 text-xs uppercase tracking-wider text-[#3A2924] font-medium flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Store CMS & Customization
                </button>
              </div>
            </div>

            <div className="p-6 bg-[#E8DED3]/40 border-t border-[#202020]/10 text-center">
              <p className="text-xs text-[#202020]/70 font-serif italic mb-1">
                {settings.heroHeadline}
              </p>
              <p className="text-[11px] text-[#202020]/60">
                {settings.contactEmail}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
