import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FAQItem } from '../types';

export const FAQView: React.FC = () => {
  const { faqs, navigateTo } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-4', 'faq-7', 'faq-9']);

  const categories = ['all', 'Orders', 'Shipping', 'Returns', 'Products'];

  const toggleFaq = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCat = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesQuery = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#3A2924]/70 font-medium">
          Assistance & Inquiries
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#202020] font-light">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#202020]/70 font-light max-w-lg mx-auto">
          Everything you need to know about our luxury formulation rituals, delivery guidelines, and customer care.
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-md mx-auto relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. shipping, returns, shades)..."
            className="w-full px-4 py-3 pl-10 text-xs bg-[#FAF7F2] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
          />
          <Search className="w-4 h-4 text-[#202020]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-xs transition-colors ${
              selectedCategory === cat
                ? 'bg-[#3A2924] text-[#F8F5F0]'
                : 'bg-[#FAF7F2] text-[#202020]/70 hover:bg-[#E8DED3]/60 border border-[#202020]/10'
            }`}
          >
            {cat === 'all' ? 'All Questions' : cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="divide-y divide-[#202020]/10 border-y border-[#202020]/10">
        {filteredFaqs.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#202020]/60 space-y-2">
            <p>No questions matched your search criteria.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="text-[#3A2924] underline"
            >
              Reset search filters
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div key={faq.id} className="py-4">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between text-left py-2 group focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#E8DED3]/50 text-[#3A2924] rounded-xs font-medium">
                      {faq.category}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg text-[#202020] group-hover:text-[#3A2924] transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#3A2924] shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#202020]/50 shrink-0 ml-4" />
                  )}
                </button>
                {isOpen && (
                  <div className="pt-2 pb-3 pl-2 sm:pl-16 text-xs sm:text-sm text-[#202020]/75 font-light leading-relaxed">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still need help CTA */}
      <div className="p-8 bg-[#FAF7F2] border border-[#202020]/10 rounded-xs text-center space-y-3">
        <HelpCircle className="w-8 h-8 text-[#3A2924] mx-auto stroke-[1.3]" />
        <h3 className="font-serif text-xl text-[#202020]">Have A Distinct Inquiry?</h3>
        <p className="text-xs text-[#202020]/70 max-w-sm mx-auto font-light">
          Our beauty concierge team provides tailored guidance on shade matching, sensitive barrier rituals, and bespoke gifting.
        </p>
        <button
          onClick={() => navigateTo('contact')}
          className="py-2.5 px-6 bg-[#3A2924] hover:bg-[#202020] text-[#F8F5F0] text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors inline-flex items-center gap-1.5"
        >
          <span>Contact Beauty Concierge</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
