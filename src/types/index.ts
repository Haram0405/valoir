export type ProductCategory = 'makeup' | 'skincare' | 'new-arrivals' | 'best-sellers';

export type ProductType = 
  | 'lipstick' 
  | 'foundation' 
  | 'serum' 
  | 'blush' 
  | 'moisturizer' 
  | 'eye' 
  | 'bronzer' 
  | 'cleanser' 
  | 'oil';

export interface ProductShade {
  id: string;
  name: string;
  hex: string;
  description?: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  shadeUsed?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: 'makeup' | 'skincare';
  productType: ProductType;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  secondaryImage?: string;
  shades?: ProductShade[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  stockCount: number;
  skinType?: ('all' | 'sensitive' | 'dry' | 'normal' | 'combination')[];
  finish?: 'matte' | 'luminous' | 'satin' | 'dewy' | 'natural';
  size: string;
  description: string;
  benefits: string[];
  ingredients: string;
  howToUse: string;
  shippingInfo: string;
}

export interface CartItem {
  id: string; // unique item cart id e.g. `${product.id}-${shade.id}`
  product: Product;
  selectedShade?: ProductShade;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  trackingNumber: string;
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
}

export interface FAQItem {
  id: string;
  category: 'Orders' | 'Shipping' | 'Returns' | 'Products';
  question: string;
  answer: string;
}

export interface StoreSettings {
  brandName: string;
  brandTagline: string;
  announcementText: string;
  freeShippingThreshold: number;
  heroHeadline: string;
  heroSubheading: string;
  heroImage: string;
  instagramHandle: string;
  contactEmail: string;
  contactPhone: string;
}

export interface FilterState {
  category: 'all' | 'makeup' | 'skincare' | 'new-arrivals' | 'best-sellers';
  productType: string;
  skinType: string;
  finish: string;
  priceMax: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'newest' | 'best-selling' | 'price-low' | 'price-high';
}
