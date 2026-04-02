import { create } from 'zustand';
import type { PageView, Product, CartItem, User, ProductFilters, Consultation } from './types';

interface AppState {
  // Navigation
  currentPage: PageView;
  previousPage: PageView | null;
  selectedProductId: string | null;
  selectedBlogSlug: string | null;
  navigate: (page: PageView) => void;
  viewProduct: (productId: string) => void;
  viewBlog: (slug: string) => void;
  goBack: () => void;

  // Auth
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;

  // Cart
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Products
  filters: ProductFilters;
  setFilters: (filters: Partial<ProductFilters>) => void;
  clearFilters: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Consultation
  consultations: Consultation[];
  addConsultation: (consultation: Consultation) => void;

  // Mobile menu
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Navigation
  currentPage: 'home',
  previousPage: null,
  selectedProductId: null,
  selectedBlogSlug: null,
  navigate: (page) => set((state) => ({ currentPage: page, previousPage: state.currentPage, mobileMenuOpen: false })),
  viewProduct: (productId) => set((state) => ({ selectedProductId: productId, previousPage: state.currentPage, currentPage: 'product-detail', mobileMenuOpen: false })),
  viewBlog: (slug) => set((state) => ({ selectedBlogSlug: slug, previousPage: state.currentPage, currentPage: 'blog-detail', mobileMenuOpen: false })),
  goBack: () => set((state) => ({
    currentPage: state.previousPage || 'home',
    previousPage: null,
  })),

  // Auth
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),

  // Cart
  cart: [],
  cartOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  addToCart: (product, quantity = 1) => set((state) => {
    const existingItem = state.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      return {
        cart: state.cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
        cartOpen: true,
      };
    }
    return { cart: [...state.cart, { product, quantity }], cartOpen: true };
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.product.id !== productId),
  })),
  updateCartQuantity: (productId, quantity) => set((state) => ({
    cart: quantity <= 0
      ? state.cart.filter(item => item.product.id !== productId)
      : state.cart.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
  })),
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => get().cart.reduce((total, item) => {
    const price = item.product.salePrice || item.product.price;
    return total + price * item.quantity;
  }, 0),
  getCartCount: () => get().cart.reduce((count, item) => count + item.quantity, 0),

  // Wishlist
  wishlist: [],
  toggleWishlist: (productId) => set((state) => ({
    wishlist: state.wishlist.includes(productId)
      ? state.wishlist.filter(id => id !== productId)
      : [...state.wishlist, productId],
  })),
  isInWishlist: (productId) => get().wishlist.includes(productId),

  // Products
  filters: {},
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters },
  })),
  clearFilters: () => set({ filters: {} }),

  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Consultation
  consultations: [],
  addConsultation: (consultation) => set((state) => ({
    consultations: [...state.consultations, consultation],
  })),

  // Mobile menu
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));
