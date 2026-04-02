'use client'

import { useMemo, useState } from 'react'
import { useAppStore } from '@/lib/store'
import { categories, filterProducts, getUniqueBrands, formatPrice } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet'
import {
  Star,
  Heart,
  ShoppingCart,
  Filter,
  X,
  SlidersHorizontal,
  Search,
} from 'lucide-react'
import type { Product } from '@/lib/types'

// ─── Star Rating Display ───
function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'size-5' : size === 'md' ? 'size-4' : 'size-3.5'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizeClass,
            star <= Math.round(rating)
              ? 'fill-amber-400 text-amber-400'
              : 'fill-muted text-muted'
          )}
        />
      ))}
    </div>
  )
}

// ─── Product Card ───
function ProductCard({ product }: { product: Product }) {
  const { viewProduct, addToCart, toggleWishlist, isInWishlist } = useAppStore()
  const wishlisted = isInWishlist(product.id)
  const hasDiscount = product.salePrice !== null && product.salePrice !== undefined
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0

  return (
    <Card
      className="group cursor-pointer overflow-hidden border transition-all hover:shadow-lg hover:-translate-y-0.5"
      onClick={() => viewProduct(product.id)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <div
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-50 to-sky-100 transition-transform duration-300 group-hover:scale-105"
        >
          <span className="text-5xl opacity-40">
            {product.categoryId === 'cat-1' ? '☀️' : product.categoryId === 'cat-2' ? '🔋' : product.categoryId === 'cat-3' ? '⚡' : '🔧'}
          </span>
        </div>
        {/* Sale Badge */}
        {hasDiscount && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-0.5">
            -{discountPercent}%
          </Badge>
        )}
        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'absolute top-2 right-2 size-8 rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:scale-110',
            wishlisted && 'text-red-500'
          )}
          onClick={(e) => {
            e.stopPropagation()
            toggleWishlist(product.id)
          }}
        >
          <Heart className={cn('size-4', wishlisted && 'fill-current')} />
        </Button>
      </div>

      <CardContent className="p-3 space-y-2">
        {/* Product Name */}
        <h3 className="font-semibold text-sm leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Brand + Power */}
        <div className="flex items-center gap-2">
          {product.brand && (
            <span className="text-xs text-muted-foreground font-medium">{product.brand}</span>
          )}
          {product.powerCapacity && (
            <>
              <span className="text-muted-foreground/40">·</span>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 font-medium">
                {product.powerCapacity}
              </Badge>
            </>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} />
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-base font-bold text-primary">
            {formatPrice(product.salePrice || product.price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          size="sm"
          className="w-full gap-1.5 text-xs h-8 mt-1"
          onClick={(e) => {
            e.stopPropagation()
            addToCart(product)
          }}
        >
          <ShoppingCart className="size-3.5" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}

// ─── Filter Sidebar Content (shared between desktop sidebar and mobile sheet) ───
function FilterContent({ onFilterChange }: { onFilterChange?: () => void }) {
  const { filters, setFilters, clearFilters, searchQuery } = useAppStore()
  const brands = useMemo(() => getUniqueBrands(), [])
  const [priceMin, setPriceMin] = useState(filters.minPrice?.toString() || '')
  const [priceMax, setPriceMax] = useState(filters.maxPrice?.toString() || '')

  const hasActiveFilters = !!(
    filters.category || filters.brand || filters.minPrice || filters.maxPrice || filters.rating
  )

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setFilters({ category: checked ? categoryId : undefined })
    onFilterChange?.()
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    setFilters({ brand: checked ? brand : undefined })
    onFilterChange?.()
  }

  const handleRatingChange = (rating: number) => {
    setFilters({ rating: filters.rating === rating ? undefined : rating })
    onFilterChange?.()
  }

  const handlePriceApply = () => {
    const min = priceMin ? parseInt(priceMin, 10) : undefined
    const max = priceMax ? parseInt(priceMax, 10) : undefined
    setFilters({ minPrice: min, maxPrice: max })
    onFilterChange?.()
  }

  const handleClearFilters = () => {
    clearFilters()
    setPriceMin('')
    setPriceMax('')
    onFilterChange?.()
  }

  return (
    <div className="space-y-6">
      {/* Clear All Filters */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Active Filters</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-red-500 hover:text-red-600 h-7 px-2"
            onClick={handleClearFilters}
          >
            <X className="size-3 mr-1" />
            Clear All
          </Button>
        </div>
      )}

      {/* Search Active Indicator */}
      {searchQuery && (
        <div className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2">
          <Search className="size-3.5 text-primary" />
          <span className="text-sm text-primary truncate flex-1">
            &quot;{searchQuery}&quot;
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="size-5 h-5 w-5 text-primary hover:bg-primary/20"
            onClick={() => {
              useAppStore.getState().setSearchQuery('')
            }}
          >
            <X className="size-3" />
          </Button>
        </div>
      )}

      <Separator />

      {/* Category Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <Checkbox
                checked={filters.category === cat.id}
                onCheckedChange={(checked) => handleCategoryChange(cat.id, !!checked)}
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex-1">
                {cat.icon} {cat.name}
              </span>
              <span className="text-xs text-muted-foreground/60">({cat.productCount})</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Price Range</h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            className="h-8 text-sm"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
          />
          <span className="text-muted-foreground text-sm">—</span>
          <Input
            type="number"
            placeholder="Max"
            className="h-8 text-sm"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
          />
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="w-full h-8 text-xs"
          onClick={handlePriceApply}
        >
          Apply Price
        </Button>
      </div>

      <Separator />

      {/* Brand Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Brand</h3>
        <ScrollArea className="max-h-40">
          <div className="space-y-2 pr-2">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <Checkbox
                  checked={filters.brand === brand}
                  onCheckedChange={(checked) => handleBrandChange(brand, !!checked)}
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Separator />

      {/* Rating Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              className={cn(
                'flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm transition-colors',
                filters.rating === rating
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-muted text-muted-foreground'
              )}
              onClick={() => handleRatingChange(rating)}
            >
              <StarRating rating={rating} />
              <span>& up</span>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Sort By */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground">Sort By</Label>
        <Select
          value={filters.sortBy || 'newest'}
          onValueChange={(value) => {
            setFilters({ sortBy: value as 'price_asc' | 'price_desc' | 'rating' | 'newest' })
            onFilterChange?.()
          }}
        >
          <SelectTrigger className="w-full h-9 text-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

// ─── Main ProductCatalog Component ───
export default function ProductCatalog() {
  const { filters, searchQuery, clearFilters } = useAppStore()
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    return filterProducts({
      ...filters,
      search: searchQuery || filters.search,
    })
  }, [filters, searchQuery])

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Page Header */}
      <div className="bg-primary">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Products</h1>
          <p className="mt-1 text-primary-foreground/80 text-sm sm:text-base">
            Browse our complete catalog of solar energy products
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Mobile Filter Button + Sort + Result Count */}
        <div className="flex items-center justify-between gap-3 mb-6 lg:hidden">
          <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                <SlidersHorizontal className="size-4" />
                Filters
                {(filters.category || filters.brand || filters.minPrice || filters.maxPrice || filters.rating) && (
                  <Badge className="ml-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] rounded-full">
                    !
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] sm:w-[360px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Filter className="size-5" />
                  Filters
                </SheetTitle>
                <SheetDescription>Filter and sort products</SheetDescription>
              </SheetHeader>
              <div className="px-4 pb-6 pt-2">
                <FilterContent onFilterChange={() => setMobileFilterOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>

          <span className="text-sm text-muted-foreground">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </span>

          <Select
            value={filters.sortBy || 'newest'}
            onValueChange={(value) =>
              useAppStore.getState().setFilters({ sortBy: value as 'price_asc' | 'price_desc' | 'rating' | 'newest' })
            }
          >
            <SelectTrigger size="sm" className="w-[140px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price_asc">Price: Low</SelectItem>
              <SelectItem value="price_desc">Price: High</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search term banner */}
        {searchQuery && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-white border px-4 py-3">
            <Search className="size-4 text-muted-foreground" />
            <span className="text-sm">
              Showing results for <strong className="text-primary">&quot;{searchQuery}&quot;</strong>
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto text-xs h-6 px-2 text-muted-foreground hover:text-foreground"
              onClick={() => useAppStore.getState().setSearchQuery('')}
            >
              <X className="size-3 mr-1" />
              Clear search
            </Button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 rounded-xl bg-white border p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="size-4 text-primary" />
                <h2 className="font-semibold text-foreground">Filters</h2>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {/* Desktop Sort + Count */}
            <div className="hidden lg:flex items-center justify-between mb-5">
              <span className="text-sm text-muted-foreground">
                Showing <strong className="text-foreground">{filteredProducts.length}</strong> product{filteredProducts.length !== 1 ? 's' : ''}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select
                  value={filters.sortBy || 'newest'}
                  onValueChange={(value) =>
                    useAppStore.getState().setFilters({ sortBy: value as 'price_asc' | 'price_desc' | 'rating' | 'newest' })
                  }
                >
                  <SelectTrigger size="sm" className="w-[180px] text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="size-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Search className="size-8 text-muted-foreground/50" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
                <p className="text-sm text-muted-foreground max-w-sm mb-4">
                  We couldn&apos;t find any products matching your criteria. Try adjusting your filters or search terms.
                </p>
                <Button
                  variant="outline"
                  className="gap-1.5"
                  onClick={() => {
                    clearFilters()
                    useAppStore.getState().setSearchQuery('')
                  }}
                >
                  <X className="size-4" />
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
