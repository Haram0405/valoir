import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  ProductShade, 
  Review, 
  FAQItem, 
  Order, 
  StoreSettings, 
  FilterState 
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_SETTINGS, 
  INITIAL_REVIEWS, 
  INITIAL_FAQS 
} from '../data/mockData';

interface StoreContextType {
  // Navigation & Page State
  activePage: string;
  navigateTo: (page: string, options?: { productId?: string; category?: string }) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  
  // Data
  products: Product[];
  settings: StoreSettings;
  reviews: Review[];
  faqs: FAQItem[];
  orders: Order[];
  lastCompletedOrder: Order | null;
  
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, shade?: ProductShade, quantity?: number) => void;
  updateQuantity: (cartItemId: string, deltaOrQuantity: number, isAbsolute?: boolean) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  discountCode: string;
  discountPercentage: number;
  discountAmount: number;
  shippingFee: number;
  finalTotal: number;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  freeShippingProgress: { current: number; threshold: number; remaining: number; qualified: boolean; percent: number };
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Modals & Panels
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  
  // Filter state for Shop
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  // Order actions
  placeOrder: (customer: Order['customer'], paymentMethod: string) => Order;
  
  // CMS / Customization Actions
  updateProduct: (updated: Product) => void;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  resetToDefaults: () => void;
}

const defaultFilterState: FilterState = {
  category: 'all',
  productType: 'all',
  skinType: 'all',
  finish: 'all',
  priceMax: 100,
  inStockOnly: false,
  sortBy: 'featured',
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  // Products, Settings & Content
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('valoir_products_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('valoir_settings_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_SETTINGS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('valoir_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [faqs] = useState<FAQItem[]>(INITIAL_FAQS);

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('valoir_orders');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('valoir_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('valoir_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-3'];
  });

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Discounts
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  // Shop Filters
  const [filterState, setFilterState] = useState<FilterState>(defaultFilterState);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('valoir_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('valoir_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('valoir_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('valoir_settings_v2', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('valoir_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('valoir_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Navigation Handler
  const navigateTo = (page: string, options?: { productId?: string; category?: string }) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (options?.productId) {
      setSelectedProductId(options.productId);
    }
    if (options?.category) {
      setFilterState(prev => ({ ...prev, category: options.category as any }));
    }
    setActivePage(page);
    setIsCartOpen(false);
    setIsSearchOpen(false);
  };

  // Cart operations
  const addToCart = (product: Product, shade?: ProductShade, quantity = 1) => {
    const defaultShade = shade || (product.shades && product.shades.length > 0 ? product.shades[0] : undefined);
    const cartItemId = defaultShade ? `${product.id}-${defaultShade.id}` : product.id;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item => 
          item.id === cartItemId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        id: cartItemId,
        product,
        selectedShade: defaultShade,
        quantity,
      }];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, value: number, isAbsolute = false) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === cartItemId) {
          const newQty = isAbsolute ? value : item.quantity + value;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Discount Codes
  const applyDiscountCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'VALOIR15') {
      setDiscountCode('VALOIR15');
      setDiscountPercentage(15);
      return { success: true, message: '15% luxury courtesy discount applied!' };
    }
    if (cleanCode === 'WELCOME10') {
      setDiscountCode('WELCOME10');
      setDiscountPercentage(10);
      return { success: true, message: '10% welcome invitation discount applied!' };
    }
    if (cleanCode === 'VIP20') {
      setDiscountCode('VIP20');
      setDiscountPercentage(20);
      return { success: true, message: '20% VIP collector discount applied!' };
    }
    return { success: false, message: 'Invalid or expired promotional code.' };
  };

  const discountAmount = Number(((cartSubtotal * discountPercentage) / 100).toFixed(2));
  const shippingThreshold = settings.freeShippingThreshold || 75;
  const isFreeShipping = cartSubtotal >= shippingThreshold || cartSubtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 6.00;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const freeShippingProgress = {
    current: cartSubtotal,
    threshold: shippingThreshold,
    remaining: Math.max(0, shippingThreshold - cartSubtotal),
    qualified: cartSubtotal >= shippingThreshold,
    percent: Math.min(100, Math.round((cartSubtotal / shippingThreshold) * 100)),
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const resetFilters = () => {
    setFilterState(defaultFilterState);
  };

  // Place Order
  const placeOrder = (customer: Order['customer'], paymentMethod: string): Order => {
    const newOrder: Order = {
      id: `VL-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: finalTotal,
      status: 'confirmed',
      trackingNumber: `1Z9999999${Math.floor(100000000 + Math.random() * 900000000)}`,
      customer,
      paymentMethod,
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastCompletedOrder(newOrder);
    clearCart();
    setActivePage('order-confirmation');
    return newOrder;
  };

  // CMS
  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addReview = (newReview: Omit<Review, 'id' | 'date'>) => {
    const created: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };
    setReviews(prev => [created, ...prev]);
  };

  const resetToDefaults = () => {
    localStorage.removeItem('valoir_products');
    localStorage.removeItem('valoir_settings');
    localStorage.removeItem('valoir_reviews');
    setProducts(INITIAL_PRODUCTS);
    setSettings(INITIAL_SETTINGS);
    setReviews(INITIAL_REVIEWS);
  };

  return (
    <StoreContext.Provider
      value={{
        activePage,
        navigateTo,
        selectedProductId,
        setSelectedProductId,
        products,
        settings,
        reviews,
        faqs,
        orders,
        lastCompletedOrder,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        discountCode,
        discountPercentage,
        discountAmount,
        shippingFee,
        finalTotal,
        applyDiscountCode,
        freeShippingProgress,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isSearchOpen,
        setIsSearchOpen,
        isAccountOpen,
        setIsAccountOpen,
        isAdminOpen,
        setIsAdminOpen,
        filterState,
        setFilterState,
        resetFilters,
        placeOrder,
        updateProduct,
        updateSettings,
        addReview,
        resetToDefaults,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
