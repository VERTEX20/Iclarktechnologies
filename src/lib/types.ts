export type UserRole = 'user' | 'vendor' | 'admin';
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed';
export type ConsultationStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  createdAt: string;
}

export interface Vendor {
  id: string;
  userId: string;
  companyName: string;
  description?: string;
  logo?: string;
  verified: boolean;
  rating: number;
  commission: number;
  user?: User;
  products?: Product[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  order: number;
  productCount?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  brand?: string;
  model?: string;
  powerCapacity?: string;
  categoryId: string;
  vendorId: string;
  stock: number;
  specs: Record<string, string>;
  featured: boolean;
  rating: number;
  reviewCount: number;
  category?: Category;
  vendor?: Vendor;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  shippingFee: number;
  address: string;
  city: string;
  state: string;
  phone: string;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  createdAt: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title?: string;
  comment: string;
  verified: boolean;
  createdAt: string;
  user?: User;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
}

export interface Consultation {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  status: ConsultationStatus;
  scheduledAt?: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  published: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PageView =
  | 'home'
  | 'products'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'login'
  | 'register'
  | 'vendor-register'
  | 'profile'
  | 'vendor-dashboard'
  | 'admin-dashboard'
  | 'consultation'
  | 'calculator'
  | 'blog'
  | 'blog-detail'
  | 'about'
  | 'orders'
  | 'wishlist';

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
}
