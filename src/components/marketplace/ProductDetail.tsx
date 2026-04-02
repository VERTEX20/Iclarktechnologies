'use client'

import { useMemo, useState } from 'react'
import { useAppStore } from '@/lib/store'
import {
  getProductById,
  getCategoryById,
  getVendorById,
  getReviewsByProduct,
  formatPrice,
} from '@/lib/data'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Star,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Shield,
  Check,
  ThumbsUp,
  Package,
  X,
  User,
} from 'lucide-react'

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

// ─── Interactive Star Rating (for review form) ───
function InteractiveStarRating({
  value,
  onChange,
}: {
  value: number
  onChange: (val: number) => void
}) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="p-0.5 transition-transform hover:scale-110"
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(star)}
        >
          <Star
            className={cn(
              'size-6 transition-colors',
              (hover || value) >= star
                ? 'fill-amber-400 text-amber-400'
                : 'fill-muted text-muted'
            )}
          />
        </button>
      ))}
    </div>
  )
}

// ─── Review Form Dialog ───
function ReviewFormDialog({ productId, productName }: { productId: string; productName: string }) {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0 || !comment.trim()) return
    // In a real app, this would call an API
    setSubmitted(true)
    setTimeout(() => {
      setOpen(false)
      setSubmitted(false)
      setRating(0)
      setTitle('')
      setComment('')
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <ThumbsUp className="size-3.5" />
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your experience with {productName}
          </DialogDescription>
        </DialogHeader>
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="size-14 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="size-7 text-green-600" />
            </div>
            <p className="font-medium text-foreground">Thank you for your review!</p>
            <p className="text-sm text-muted-foreground">Your review has been submitted successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Rating</Label>
              <InteractiveStarRating value={rating} onChange={setRating} />
              {rating === 0 && (
                <p className="text-xs text-muted-foreground">Please select a rating</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="review-title">Title (optional)</Label>
              <Input
                id="review-title"
                placeholder="Summarize your experience"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="review-comment">Your Review</Label>
              <Textarea
                id="review-comment"
                placeholder="Tell us what you liked or disliked about this product..."
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={rating === 0 || !comment.trim()}>
                Submit Review
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

// ─── Rating Distribution ───
function RatingDistribution({ reviews }: { reviews: ReturnType<typeof getReviewsByProduct> }) {
  const distribution = useMemo(() => {
    const dist = [0, 0, 0, 0, 0] // 1-5 star counts
    reviews.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) dist[r.rating - 1]++
    })
    return dist
  }, [reviews])

  const totalCount = reviews.length

  return (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((star) => {
        const count = distribution[star - 1]
        const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0
        return (
          <div key={star} className="flex items-center gap-2 text-sm">
            <span className="w-12 text-right text-muted-foreground">
              {star} star{star > 1 ? 's' : ''}
            </span>
            <Progress value={percentage} className="flex-1 h-2" />
            <span className="w-8 text-right text-muted-foreground text-xs">
              {percentage}%
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Main ProductDetail Component ───
export default function ProductDetail() {
  const { selectedProductId, addToCart, toggleWishlist, isInWishlist, navigate, goBack } = useAppStore()
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const product = useMemo(
    () => (selectedProductId ? getProductById(selectedProductId) : undefined),
    [selectedProductId]
  )
  const category = useMemo(
    () => (product?.categoryId ? getCategoryById(product.categoryId) : undefined),
    [product]
  )
  const vendor = useMemo(
    () => (product?.vendorId ? getVendorById(product.vendorId) : undefined),
    [product]
  )
  const productReviews = useMemo(
    () => (selectedProductId ? getReviewsByProduct(selectedProductId) : []),
    [selectedProductId]
  )


  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="text-center">
          <Package className="size-12 text-muted-foreground/40 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Product not found</h2>
          <p className="text-sm text-muted-foreground mb-4">
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Button variant="outline" onClick={() => navigate('products')}>
            Back to Products
          </Button>
        </div>
      </div>
    )
  }

  const hasDiscount = product.salePrice !== null && product.salePrice !== undefined
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0
  const wishlisted = isInWishlist(product.id)

  const getStockStatus = () => {
    if (product.stock <= 0) return { label: 'Out of Stock', color: 'text-red-500 bg-red-50', dot: 'bg-red-500' }
    if (product.stock <= 10) return { label: 'Low Stock', color: 'text-amber-600 bg-amber-50', dot: 'bg-amber-500' }
    return { label: 'In Stock', color: 'text-green-600 bg-green-50', dot: 'bg-green-500' }
  }

  const stockStatus = getStockStatus()
  const categoryIcon = product.categoryId === 'cat-1' ? '☀️' : product.categoryId === 'cat-2' ? '🔋' : product.categoryId === 'cat-3' ? '⚡' : '🔧'

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleQuantityChange = (delta: number) => {
    const newQty = Math.max(1, Math.min(product.stock, quantity + delta))
    setQuantity(newQty)
  }

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="cursor-pointer"
                  onClick={() => navigate('home')}
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="cursor-pointer"
                  onClick={() => navigate('products')}
                >
                  Products
                </BreadcrumbLink>
              </BreadcrumbItem>
              {category && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      className="cursor-pointer"
                      onClick={() => {
                        useAppStore.getState().setFilters({ category: category.id })
                        navigate('products')
                      }}
                    >
                      {category.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium truncate max-w-[200px] sm:max-w-none">
                  {product.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Back button (mobile) */}
        <Button
          variant="ghost"
          size="sm"
          className="mb-4 gap-1 text-muted-foreground lg:hidden"
          onClick={goBack}
        >
          <ChevronLeft className="size-4" />
          Back
        </Button>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left: Image Gallery */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white border shadow-sm">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-50 to-sky-100">
                <span className="text-8xl opacity-30">{categoryIcon}</span>
              </div>

              {/* Sale Badge */}
              {hasDiscount && (
                <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm">
                  -{discountPercent}% OFF
                </Badge>
              )}

              {/* Navigation arrows */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full size-8 bg-white/90 shadow-sm opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity lg:opacity-100"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full size-8 bg-white/90 shadow-sm opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity lg:opacity-100"
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      'w-16 h-16 rounded-lg overflow-hidden border-2 transition-all',
                      selectedImageIndex === index
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-transparent hover:border-gray-300'
                    )}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-50 to-sky-100">
                      <span className="text-xl opacity-30">{categoryIcon}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-5">
            {/* Product Name */}
            <div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Badges */}
            <div className="flex items-center flex-wrap gap-2">
              {product.brand && (
                <Badge variant="secondary" className="font-medium">
                  {product.brand}
                </Badge>
              )}
              {product.powerCapacity && (
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 font-medium">
                  {product.powerCapacity}
                </Badge>
              )}
              {category && (
                <Badge variant="outline" className="text-muted-foreground">
                  {category.icon} {category.name}
                </Badge>
              )}
            </div>

            {/* Rating + Reviews */}
            <div className="flex items-center gap-3 flex-wrap">
              <StarRating rating={product.rating} size="md" />
              <span className="text-sm font-medium text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} review{product.reviewCount !== 1 ? 's' : ''})
              </span>
              <ReviewFormDialog productId={product.id} productName={product.name} />
            </div>

            <Separator />

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.salePrice || product.price)}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              {hasDiscount && (
                <p className="text-sm text-green-600 font-medium">
                  You save {formatPrice(product.price - product.salePrice!)} ({discountPercent}% off)
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <Separator />

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={cn('flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium', stockStatus.color)}>
                <span className={cn('size-2 rounded-full', stockStatus.dot)} />
                {stockStatus.label}
              </div>
              {product.stock > 0 && product.stock <= 20 && (
                <span className="text-xs text-muted-foreground">
                  Only {product.stock} left in stock
                </span>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-9 rounded-r-none"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="size-4" />
                  </Button>
                  <Input
                    type="number"
                    min={1}
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10)
                      if (!isNaN(val) && val >= 1 && val <= product.stock) {
                        setQuantity(val)
                      }
                    }}
                    className="w-14 h-9 text-center border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-9 rounded-l-none"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 gap-2 h-12 text-base"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                >
                  <ShoppingCart className="size-5" />
                  {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className={cn(
                    'h-12 w-12 p-0 shrink-0',
                    wishlisted && 'text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600'
                  )}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart className={cn('size-5', wishlisted && 'fill-current')} />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Vendor Info */}
            {vendor && (
              <Card className="border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Package className="size-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground text-sm">
                          {vendor.companyName}
                        </span>
                        {vendor.verified && (
                          <Badge variant="secondary" className="gap-1 text-[10px] h-5 px-1.5 bg-green-50 text-green-700 border-green-200">
                            <Shield className="size-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <StarRating rating={vendor.rating} />
                        <span className="text-xs text-muted-foreground">{vendor.rating}</span>
                      </div>
                      {vendor.description && (
                        <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                          {vendor.description}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Specifications Table */}
        <div className="mb-12">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="size-5 text-primary" />
                Specifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3 font-semibold">Specification</TableHead>
                    <TableHead className="font-semibold">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell className="font-medium text-muted-foreground">{key}</TableCell>
                      <TableCell className="text-foreground">{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="size-5 text-amber-400 fill-amber-400" />
                  Customer Reviews
                </CardTitle>
                <ReviewFormDialog productId={product.id} productName={product.name} />
              </div>
            </CardHeader>
            <CardContent>
              {productReviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Rating Summary */}
                  <div className="md:col-span-1 space-y-4">
                    <div className="text-center md:text-left">
                      <div className="text-5xl font-bold text-foreground">{product.rating}</div>
                      <div className="flex items-center justify-center md:justify-start mt-2">
                        <StarRating rating={product.rating} size="lg" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Based on {product.reviewCount} review{product.reviewCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <RatingDistribution reviews={productReviews} />
                  </div>

                  {/* Individual Reviews */}
                  <div className="md:col-span-2 space-y-4">
                    {productReviews.map((review) => (
                      <div
                        key={review.id}
                        className="rounded-lg border p-4 space-y-3"
                      >
                        {/* User Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="size-4 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-medium text-foreground">
                                  {review.user?.name || 'Anonymous'}
                                </span>
                                {review.verified && (
                                  <Badge variant="secondary" className="gap-1 text-[10px] h-4 px-1.5 bg-green-50 text-green-700 border-green-200">
                                    <Check className="size-2.5" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {new Date(review.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                          </div>
                          <StarRating rating={review.rating} size="sm" />
                        </div>

                        {/* Review Content */}
                        <div>
                          {review.title && (
                            <h4 className="text-sm font-semibold text-foreground mb-1">
                              {review.title}
                            </h4>
                          )}
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Star className="size-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-3">
                    No reviews yet for this product. Be the first to share your experience!
                  </p>
                  <ReviewFormDialog productId={product.id} productName={product.name} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
