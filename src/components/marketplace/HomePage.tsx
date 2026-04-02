'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  Star,
  Heart,
  Shield,
  MessageSquare,
  Lock,
  Truck,
  Search,
  ShoppingCart,
  Zap,
  ArrowRight,
  ChevronRight,
  Quote,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { categories, reviews, blogPosts, formatPrice, getFeaturedProducts } from '@/lib/data';

// ─── Animation helpers ───
function FadeInUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ title, subtitle, action, className = '' }: { title: string; subtitle?: string; action?: React.ReactNode; className?: string }) {
  return (
    <FadeInUp className={`flex flex-col items-center text-center sm:flex-row sm:items-end sm:justify-between sm:text-left ${className}`}>
      <div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </FadeInUp>
  );
}

// ─── Star Rating ───
function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? 'fill-secondary text-secondary' : 'fill-muted text-muted'}
        />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">({rating})</span>
    </div>
  );
}

// ─── 1. Hero Section ───
function HeroSection() {
  const { navigate } = useAppStore();
  return (
    <section className="relative min-h-[600px] overflow-hidden sm:min-h-[700px]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-solar.png"
          alt="Solar panels installation"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 mx-auto flex min-h-[600px] max-w-7xl flex-col items-start justify-center px-4 sm:min-h-[700px] sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <Badge className="mb-4 bg-secondary text-secondary-foreground px-3 py-1 text-sm">
            ☀️ Africa&apos;s #1 Solar Marketplace
          </Badge>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Power Your Future with{' '}
            <span className="text-secondary">Solar Energy</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Africa&apos;s trusted marketplace for premium solar panels, batteries, inverters and accessories
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6"
              onClick={() => navigate('products')}
            >
              <ShoppingCart className="size-5" />
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white text-base px-8 py-6"
              onClick={() => navigate('consultation')}
            >
              <MessageSquare className="size-5" />
              Talk to Expert
            </Button>
          </div>
        </motion.div>

        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          className="mt-12 grid grid-cols-3 gap-4 sm:gap-8"
        >
          {[
            { value: '10,000+', label: 'Products' },
            { value: '500+', label: 'Vendors' },
            { value: '50,000+', label: 'Happy Customers' },
          ].map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <div className="text-xl font-bold text-secondary sm:text-3xl">{stat.value}</div>
              <div className="text-xs text-white/70 sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 2. Categories Section ───
function CategoriesSection() {
  const { navigate, setFilters } = useAppStore();
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Browse by Category"
          subtitle="Find the perfect solar equipment for your needs"
          className="mb-10"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {categories.map((cat, i) => (
            <FadeInUp key={cat.id} delay={i * 0.1}>
              <Card
                className="group cursor-pointer border-0 bg-background py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                onClick={() => {
                  setFilters({ category: cat.id });
                  navigate('products');
                }}
              >
                <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl transition-transform duration-300 group-hover:scale-110">
                    {cat.icon}
                  </div>
                  <h3 className="font-semibold">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {cat.productCount} products
                  </p>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Browse <ChevronRight className="size-3" />
                  </span>
                </CardContent>
              </Card>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3. Featured Products Section ───
function FeaturedProductsSection() {
  const { navigate, viewProduct, addToCart, toggleWishlist, isInWishlist } = useAppStore();
  const featured = getFeaturedProducts().slice(0, 6);

  return (
    <section className="bg-muted/50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Featured Products"
          subtitle="Top-rated and most popular solar equipment"
          action={
            <Button variant="ghost" className="text-primary hover:text-primary" onClick={() => navigate('products')}>
              View All <ArrowRight className="size-4" />
            </Button>
          }
          className="mb-10"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {featured.map((product, i) => (
            <FadeInUp key={product.id} delay={i * 0.08}>
              <Card className="group overflow-hidden border-0 py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div
                  className="relative cursor-pointer overflow-hidden bg-muted"
                  onClick={() => viewProduct(product.id)}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {product.salePrice && (
                    <Badge className="absolute left-3 top-3 bg-red-500 text-white hover:bg-red-500">
                      Sale
                    </Badge>
                  )}
                  <button
                    className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-muted-foreground shadow-sm transition-all hover:bg-white hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                  >
                    <Heart
                      size={18}
                      className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}
                    />
                  </button>
                </div>
                <CardContent className="space-y-3 p-4">
                  <div
                    className="cursor-pointer"
                    onClick={() => viewProduct(product.id)}
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-primary">
                      {product.brand}
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug">
                      {product.name}
                    </h3>
                    {product.powerCapacity && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {product.powerCapacity}
                      </p>
                    )}
                    <div className="mt-2">
                      <StarRating rating={product.rating} size={13} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-foreground">
                        {formatPrice(product.salePrice || product.price)}
                      </span>
                      {product.salePrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      <ShoppingCart className="size-4" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. Why Choose Us Section ───
function WhyChooseSection() {
  const features = [
    {
      icon: Shield,
      title: 'Verified Vendors',
      description: 'All vendors are verified and vetted to ensure quality products and reliable service.',
    },
    {
      icon: MessageSquare,
      title: 'Expert Consultation',
      description: 'Get free expert advice to find the right solar solution for your home or business.',
    },
    {
      icon: Lock,
      title: 'Secure Payments',
      description: 'Your transactions are protected with bank-level security and encryption.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Reliable shipping across Africa with real-time tracking and insurance.',
    },
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Why Choose Us"
          subtitle="Trusted by thousands of customers across Africa"
          className="mb-10"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <FadeInUp key={f.title} delay={i * 0.1}>
              <Card className="border-0 bg-background py-0 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="flex flex-col items-center gap-3 p-6">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10">
                    <f.icon className="size-7 text-primary" />
                  </div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. How It Works Section ───
function HowItWorksSection() {
  const steps = [
    {
      icon: Search,
      title: 'Browse & Compare',
      description: 'Explore thousands of verified solar products and compare prices, specs, and reviews.',
    },
    {
      icon: ShoppingCart,
      title: 'Choose & Order',
      description: 'Select your products, add to cart, and checkout with our secure payment system.',
    },
    {
      icon: Zap,
      title: 'Install & Enjoy',
      description: 'Receive fast delivery and install your solar system. Start saving on electricity!',
    },
  ];

  return (
    <section className="solar-gradient py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">How It Works</h2>
            <p className="mt-2 text-white/75">Get started in 3 simple steps</p>
          </div>
        </FadeInUp>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <FadeInUp key={step.title} delay={i * 0.15}>
              <div className="relative text-center">
                {/* Step number */}
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-white/20 text-xl font-bold text-white">
                  {i + 1}
                </div>
                {/* Connector line (hidden on last item and mobile) */}
                {i < steps.length - 1 && (
                  <div className="absolute right-0 top-6 hidden h-0.5 w-full translate-x-1/2 bg-white/20 sm:block" />
                )}
                <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-white/10">
                  <step.icon className="size-7 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{step.description}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. Testimonials Section ───
function TestimonialsSection() {
  const featuredReviews = reviews.slice(0, 3);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="What Our Customers Say"
          subtitle="Real reviews from real solar energy users"
          className="mb-10"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredReviews.map((review, i) => (
            <FadeInUp key={review.id} delay={i * 0.1}>
              <Card className="border-0 py-0 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <Quote className="mb-4 size-8 text-primary/30" />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3 border-t pt-4">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {review.user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{review.user?.name}</p>
                      <StarRating rating={review.rating} size={12} />
                    </div>
                    {review.verified && (
                      <Badge variant="outline" className="ml-auto border-green-200 text-green-600 text-[10px]">
                        Verified
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 7. Solar Calculator CTA ───
function CalculatorCTASection() {
  const { navigate } = useAppStore();
  return (
    <section className="sunshine-gradient py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-white/30">
              <Zap className="size-8 text-yellow-700" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Not sure what you need?
            </h2>
            <p className="max-w-lg text-muted-foreground">
              Our intelligent solar cost calculator helps you estimate the right system size, cost, and savings for your home or business.
            </p>
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 text-base px-8 py-6"
              onClick={() => navigate('calculator')}
            >
              Try our Solar Cost Calculator
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

// ─── 8. Blog Preview Section ───
function BlogPreviewSection() {
  const { viewBlog } = useAppStore();
  const recentPosts = blogPosts.filter(p => p.published).slice(0, 3);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Latest Articles"
          subtitle="Stay informed with expert solar energy guides and tips"
          action={
            <Button variant="ghost" className="text-primary hover:text-primary" onClick={() => useAppStore.getState().navigate('blog')}>
              View All <ArrowRight className="size-4" />
            </Button>
          }
          className="mb-10"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post, i) => (
            <FadeInUp key={post.id} delay={i * 0.1}>
              <Card className="group cursor-pointer overflow-hidden border-0 py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
                    src={post.image || '/images/hero-solar.png'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <p className="mb-1 text-xs text-muted-foreground">{post.createdAt}</p>
                  <h3 className="line-clamp-2 font-semibold leading-snug">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  <button
                    className="mt-3 flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    onClick={() => viewBlog(post.slug)}
                  >
                    Read More <ChevronRight className="size-4" />
                  </button>
                </CardContent>
              </Card>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main HomePage ───
export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <WhyChooseSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CalculatorCTASection />
      <BlogPreviewSection />
    </div>
  );
}
