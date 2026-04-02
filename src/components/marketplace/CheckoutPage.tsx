'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/data';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import {
  CreditCard,
  Building2,
  Lock,
  Package,
  ShoppingBag,
  ArrowRight,
  LogIn,
} from 'lucide-react';
import type { Order } from '@/lib/types';

const SHIPPING_FEE = 5000;

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  paymentMethod: z.enum(['card', 'bank_transfer'], {
    required_error: 'Please select a payment method',
  }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const cart = useAppStore((s) => s.cart);
  const clearCart = useAppStore((s) => s.clearCart);
  const user = useAppStore((s) => s.user);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const navigate = useAppStore((s) => s.navigate);
  const getCartTotal = useAppStore((s) => s.getCartTotal);

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getCartTotal();
  const total = subtotal + SHIPPING_FEE;

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      state: user?.state || '',
      paymentMethod: 'card',
    },
  });

  function onSubmit(data: CheckoutFormData) {
    setIsSubmitting(true);

    // Simulate order processing
    setTimeout(() => {
      const order: Order = {
        id: `ORD-${Date.now().toString(36).toUpperCase()}`,
        userId: user?.id || 'guest',
        status: 'pending',
        totalAmount: total,
        shippingFee: SHIPPING_FEE,
        address: data.address,
        city: data.city,
        state: data.state,
        phone: data.phone,
        paymentMethod: data.paymentMethod,
        paymentStatus: 'pending',
        createdAt: new Date().toISOString(),
        items: cart.map((item) => ({
          id: `${Date.now()}-${item.product.id}`,
          orderId: '',
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.salePrice || item.product.price,
          product: item.product,
        })),
      };

      console.log('Order placed:', order);
      clearCart();
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1500);
  }

  function handleSuccessClose() {
    setShowSuccess(false);
    navigate('orders');
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="container max-w-lg mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <div className="mx-auto rounded-full bg-muted p-6 w-fit">
            <LogIn className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Please Login to Continue</h2>
            <p className="text-muted-foreground">
              You need to be logged in to proceed with checkout.
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => navigate('login')}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button onClick={() => navigate('register')}>
              Create Account
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container max-w-lg mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <div className="mx-auto rounded-full bg-muted p-6 w-fit">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="text-muted-foreground">
              Add some products to your cart before checking out.
            </p>
          </div>
          <Button onClick={() => navigate('products')}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground mt-1">
            Complete your order by filling in the details below
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Shipping Information
                  </CardTitle>
                  <CardDescription>
                    Where should we deliver your order?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+234 800 000 0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div />

                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="12 Solar Street, Ikeja"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Lagos" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="Lagos" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Method
                  </CardTitle>
                  <CardDescription>
                    Choose how you would like to pay
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="space-y-3"
                          >
                            <label
                              htmlFor="card"
                              className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                                field.value === 'card'
                                  ? 'border-primary bg-primary/5'
                                  : 'hover:bg-muted/50'
                              }`}
                            >
                              <RadioGroupItem value="card" id="card" />
                              <CreditCard className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium">Debit / Credit Card</p>
                                <p className="text-sm text-muted-foreground">
                                  Pay securely with Visa, Mastercard, or Verve
                                </p>
                              </div>
                            </label>

                            <label
                              htmlFor="bank_transfer"
                              className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                                field.value === 'bank_transfer'
                                  ? 'border-primary bg-primary/5'
                                  : 'hover:bg-muted/50'
                              }`}
                            >
                              <RadioGroupItem
                                value="bank_transfer"
                                id="bank_transfer"
                              />
                              <Building2 className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium">Bank Transfer</p>
                                <p className="text-sm text-muted-foreground">
                                  Transfer to our bank account
                                </p>
                              </div>
                            </label>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>
                    {cart.length} {cart.length === 1 ? 'item' : 'items'} in
                    your cart
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                    {cart.map((item) => {
                      const price =
                        item.product.salePrice || item.product.price;
                      return (
                        <div
                          key={item.product.id}
                          className="flex gap-3"
                        >
                          <div className="h-14 w-14 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="text-sm font-medium flex-shrink-0">
                            {formatPrice(price * item.quantity)}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Shipping Fee
                      </span>
                      <span>{formatPrice(SHIPPING_FEE)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Place Order
                      </span>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Your payment information is secure and encrypted
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center items-center">
            <div className="mx-auto rounded-full bg-green-100 p-3 mb-2">
              <Package className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl">Order Placed Successfully!</DialogTitle>
            <DialogDescription className="text-center mt-2">
              Thank you for your order. You will receive a confirmation email
              shortly. Your order is being processed and will be shipped soon.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={handleSuccessClose} className="gap-2">
              View My Orders
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
