'use client';

import { useState, useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import { searchProducts } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Sun,
  Menu,
  Search,
  ShoppingCart,
  User,
  Phone,
  Mail,
  X,
  Heart,
  Package,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';

const navLinks = [
  { label: 'Home', page: 'home' as const },
  { label: 'Products', page: 'products' as const },
  { label: 'Calculator', page: 'calculator' as const },
  { label: 'Blog', page: 'blog' as const },
  { label: 'About', page: 'about' as const },
  { label: 'Contact', page: 'consultation' as const },
];

export default function Header() {
  const {
    currentPage,
    navigate,
    searchQuery,
    setSearchQuery,
    mobileMenuOpen,
    setMobileMenuOpen,
    isAuthenticated,
    user,
    getCartCount,
    setUser,
    wishlist,
    setCartOpen,
  } = useAppStore();

  const [searchInput, setSearchInput] = useState(searchQuery);

  const cartCount = getCartCount();

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchInput.trim()) {
        const results = searchProducts(searchInput);
        setSearchQuery(searchInput.trim());
        navigate('products');
      }
    },
    [searchInput, setSearchQuery, navigate]
  );

  const handleNavClick = useCallback(
    (page: typeof navLinks[number]['page']) => {
      navigate(page);
      setMobileMenuOpen(false);
    },
    [navigate, setMobileMenuOpen]
  );

  const handleLogout = useCallback(() => {
    setUser(null);
    navigate('home');
  }, [setUser, navigate]);

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ── Top Bar ── */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs sm:px-6 lg:px-8">
          {/* Contact info */}
          <div className="hidden items-center gap-4 sm:flex">
            <a
              href="tel:+2348012345678"
              className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <Phone className="size-3" />
              <span>+234 801 234 5678</span>
            </a>
            <Separator
              orientation="vertical"
              className="h-3 bg-primary-foreground/30"
            />
            <a
              href="mailto:info@iclarke.com"
              className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <Mail className="size-3" />
              <span>info@iclarke.com</span>
            </a>
          </div>

          {/* Social links + trust badge */}
          <div className="flex w-full items-center justify-between sm:w-auto sm:gap-4">
            <span className="font-medium text-secondary">
              Free Shipping on Orders Over ₦100,000
            </span>
            <div className="hidden items-center gap-3 md:flex">
              <a href="#" aria-label="Facebook" className="transition-opacity hover:opacity-80">
                <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="transition-opacity hover:opacity-80">
                <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="transition-opacity hover:opacity-80">
                <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Bar ── */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>

          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sun className="size-5" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold leading-tight text-foreground">
                Iclark
              </span>
              <span className="text-lg font-bold leading-tight text-primary">
                technologies
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Button
                key={link.page}
                variant="ghost"
                size="sm"
                onClick={() => handleNavClick(link.page)}
                className={`relative h-auto px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === link.page
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {currentPage === link.page && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary" />
                )}
              </Button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search bar - hidden on small mobile */}
            <form
              onSubmit={handleSearch}
              className="hidden relative md:block"
            >
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="h-9 w-44 rounded-full pl-9 pr-4 lg:w-56"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                    setSearchQuery('');
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </form>

            {/* Mobile search button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => {
                setMobileMenuOpen(true);
              }}
              aria-label="Search"
            >
              <Search className="size-5" />
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hidden sm:inline-flex"
              onClick={() => handleNavClick('wishlist')}
              aria-label="Wishlist"
            >
              <Heart className="size-5" />
              {wishlist.length > 0 && (
                <Badge className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full p-0 text-[10px]">
                  {wishlist.length}
                </Badge>
              )}
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
            >
              <ShoppingCart className="size-5" />
              {cartCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-secondary p-0 text-[10px] text-secondary-foreground">
                  {cartCount > 99 ? '99+' : cartCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hidden gap-1.5 pl-2 pr-1 sm:flex"
                  >
                    <Avatar className="size-7">
                      <AvatarFallback className="bg-primary text-[11px] text-primary-foreground">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden max-w-[100px] truncate text-sm lg:inline">
                      {user.name}
                    </span>
                    <ChevronDown className="size-3.5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('profile')}>
                    <User className="mr-2 size-4" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('orders')}>
                    <Package className="mr-2 size-4" />
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('wishlist')}>
                    <Heart className="mr-2 size-4" />
                    Wishlist
                  </DropdownMenuItem>
                  {(user.role === 'vendor' || user.role === 'admin') && (
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(
                          user.role === 'admin'
                            ? 'admin-dashboard'
                            : 'vendor-dashboard'
                        )
                      }
                    >
                      <Settings className="mr-2 size-4" />
                      {user.role === 'admin'
                        ? 'Admin Dashboard'
                        : 'Vendor Dashboard'}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 size-4" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('login')}
                >
                  Log In
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('register')}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                >
                  Register
                </Button>
              </div>
            )}

            {/* Mobile user button */}
            {!isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden"
                onClick={() => navigate('login')}
                aria-label="Account"
              >
                <User className="size-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile Sheet Menu ── */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-[300px] overflow-y-auto p-0">
          <SheetHeader className="border-b px-4 py-4">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sun className="size-5" />
              </div>
              <SheetTitle className="text-left">
                <span className="font-bold text-foreground">Iclark</span>
                <span className="font-bold text-primary">technologies</span>
              </SheetTitle>
            </div>
            <SheetDescription className="text-left">
              Solar Energy Marketplace
            </SheetDescription>
          </SheetHeader>

          {/* Mobile search */}
          <div className="border-b px-4 py-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="h-10 rounded-full pl-9 pr-9"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                    setSearchQuery('');
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </form>
          </div>

          {/* Mobile nav */}
          <nav className="flex flex-col px-2 py-2">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  currentPage === link.page
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                {link.label}
              </button>
            ))}

            <Separator className="my-2" />

            {/* Account section */}
            {isAuthenticated && user ? (
              <>
                <button
                  onClick={() => handleNavClick('profile')}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <User className="size-4" />
                  My Profile
                </button>
                <button
                  onClick={() => handleNavClick('orders')}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Package className="size-4" />
                  My Orders
                </button>
                <button
                  onClick={() => handleNavClick('wishlist')}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Heart className="size-4" />
                  Wishlist
                  {wishlist.length > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {wishlist.length}
                    </Badge>
                  )}
                </button>
                {(user.role === 'vendor' || user.role === 'admin') && (
                  <button
                    onClick={() =>
                      handleNavClick(
                        user.role === 'admin'
                          ? 'admin-dashboard'
                          : 'vendor-dashboard'
                      )
                    }
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Settings className="size-4" />
                    {user.role === 'admin'
                      ? 'Admin Dashboard'
                      : 'Vendor Dashboard'}
                  </button>
                )}
                <Separator className="my-2" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                  <LogOut className="size-4" />
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="justify-start px-3"
                  onClick={() => {
                    navigate('login');
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="mr-3 size-4" />
                  Log In
                </Button>
                <Button
                  className="mx-2 mt-1 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  onClick={() => {
                    navigate('register');
                    setMobileMenuOpen(false);
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </nav>

          {/* Mobile contact info */}
          <div className="mt-auto border-t px-4 py-4">
            <div className="flex flex-col gap-2 text-xs text-muted-foreground">
              <a
                href="tel:+2348012345678"
                className="flex items-center gap-2 hover:text-foreground"
              >
                <Phone className="size-3.5" />
                +234 801 234 5678
              </a>
              <a
                href="mailto:info@iclarke.com"
                className="flex items-center gap-2 hover:text-foreground"
              >
                <Mail className="size-3.5" />
                info@iclarke.com
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
