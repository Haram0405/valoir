import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';
import { AdminCMSDrawer } from './components/AdminCMSDrawer';

import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { WishlistView } from './views/WishlistView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { FAQView } from './views/FAQView';
import { OrderConfirmationView } from './views/OrderConfirmationView';

const MainContent: React.FC = () => {
  const { activePage } = useStore();

  const renderActiveView = () => {
    switch (activePage) {
      case 'home':
        return <HomeView />;
      case 'shop':
        return <ShopView />;
      case 'product':
        return <ProductDetailView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'wishlist':
        return <WishlistView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'faq':
        return <FAQView />;
      case 'order-confirmation':
        return <OrderConfirmationView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5F0] text-[#202020]">
      {/* Sticky Header with 3-Zone Contract */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* Sophisticated Editorial Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <SearchModal />
      <AccountModal />
      <AdminCMSDrawer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
