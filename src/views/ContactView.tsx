import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, CheckCircle2, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactView: React.FC = () => {
  const { settings } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Shade Consultation',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Shade Consultation',
      message: '',
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#3A2924]/70 font-medium">
          Beauty Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#202020] font-light">
          We'd Love To Hear From You
        </h1>
        <p className="text-xs sm:text-sm text-[#202020]/70 font-light">
          Have a question about shades, formulation rituals, or an order in transit? Our beauty concierge is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-[#FAF7F2] p-8 sm:p-10 border border-[#202020]/10 rounded-xs space-y-6">
          <h2 className="font-serif text-2xl text-[#202020]">Send A Message</h2>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xs space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <strong className="text-sm font-medium">Message Dispatched Successfully</strong>
              </div>
              <p className="text-xs">
                Thank you for reaching out. A dedicated Valoir beauty concierge will respond to your inquiry within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Camille Laurent"
                    className="w-full px-3.5 py-2.5 bg-[#F8F5F0] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. camille@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#F8F5F0] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 bg-[#F8F5F0] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F5F0] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
                  >
                    <option value="Shade Consultation">Shade Consultation & Matching</option>
                    <option value="Order Status">Order or Shipping Inquiry</option>
                    <option value="Returns & Exchanges">Returns & Exchanges</option>
                    <option value="Press & Artistry">Press, Editorial & Artistry</option>
                    <option value="General Question">General Atelier Question</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#202020]/80 mb-1">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our concierge assist your beauty ritual today?..."
                  className="w-full px-3.5 py-2.5 bg-[#F8F5F0] border border-[#202020]/15 rounded-xs focus:outline-none focus:border-[#3A2924]"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-8 bg-[#3A2924] hover:bg-[#202020] text-[#F8F5F0] text-xs uppercase tracking-[0.2em] font-semibold rounded-xs shadow-xs transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Customer Support Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-6">
            <h2 className="font-serif text-2xl text-[#202020]">Direct Inquiries</h2>

            <div className="space-y-4 text-xs text-[#202020]/80">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#3A2924] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#202020] uppercase tracking-wider text-[11px]">Email Concierge</strong>
                  <span>{settings.contactEmail}</span>
                  <p className="text-[11px] text-[#202020]/50 mt-0.5">Average reply time: under 3 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#3A2924] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#202020] uppercase tracking-wider text-[11px]">Direct Assistance</strong>
                  <span>{settings.contactPhone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#3A2924] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#202020] uppercase tracking-wider text-[11px]">Concierge Hours</strong>
                  <span>Monday – Friday: 9:00 AM – 6:00 PM EST</span>
                  <p className="text-[11px] text-[#202020]/50 mt-0.5">Weekend inquiries answered Monday morning</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#3A2924] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#202020] uppercase tracking-wider text-[11px]">Atelier Headquarters</strong>
                  <span>420 Madison Avenue, 18th Floor<br />New York, NY 10017</span>
                </div>
              </div>
            </div>
          </div>

          {/* Complimentary Consultation Box */}
          <div className="p-6 bg-[#FAF7F2] border border-[#202020]/10 rounded-xs space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-[#B98282] font-semibold block">
              Personalized Artistry
            </span>
            <h3 className="font-serif text-lg text-[#202020]">
              Virtual Shade Consultation
            </h3>
            <p className="text-xs text-[#202020]/75 font-light leading-relaxed">
              Unsure between neutral or warm undertones? Send a natural-light selfie to <strong>shades@valoirbeauty.com</strong> for a custom color profile curated by our lead makeup artists.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
