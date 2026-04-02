'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/data';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Heart,
  Edit3,
  Save,
  X,
  Star,
  Calendar,
} from 'lucide-react';
import type { Order, OrderStatus } from '@/lib/types';
import { products as allProducts } from '@/lib/data';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const mockOrders: Order[] = [
  {
    id: 'ORD-ABC123',
    userId: 'u-100',
    status: 'delivered',
    totalAmount: 342000,
    shippingFee: 5000,
    address: '12 Solar Street',
    city: 'Lagos',
    state: 'Lagos',
    phone: '+2348056789012',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    createdAt: '2024-11-15T10:30:00Z',
    items: [
      { id: 'oi-1', orderId: 'ORD-ABC123', productId: 'p-1', quantity: 1, price: 165000 },
      { id: 'oi-2', orderId: 'ORD-ABC123', productId: 'p-12', quantity: 1, price: 568000 },
    ],
  },
  {
    id: 'ORD-DEF456',
    userId: 'u-100',
    status: 'shipped',
    totalAmount: 780000,
    shippingFee: 5000,
    address: '12 Solar Street',
    city: 'Lagos',
    state: 'Lagos',
    phone: '+2348056789012',
    paymentMethod: 'bank_transfer',
    paymentStatus: 'paid',
    createdAt: '2024-12-01T14:00:00Z',
    items: [
      { id: 'oi-3', orderId: 'ORD-DEF456', productId: 'p-7', quantity: 1, price: 780000 },
    ],
  },
  {
    id: 'ORD-GHI789',
    userId: 'u-100',
    status: 'pending',
    totalAmount: 84000,
    shippingFee: 5000,
    address: '12 Solar Street',
    city: 'Lagos',
    state: 'Lagos',
    phone: '+2348056789012',
    paymentMethod: 'card',
    paymentStatus: 'pending',
    createdAt: '2024-12-20T09:15:00Z',
    items: [
      { id: 'oi-4', orderId: 'ORD-GHI789', productId: 'p-17', quantity: 2, price: 12000 },
      { id: 'oi-5', orderId: 'ORD-GHI789', productId: 'p-18', quantity: 1, price: 38000 },
    ],
  },
];

export default function ProfilePage() {
  const user = useAppStore((s) => s.user);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const navigate = useAppStore((s) => s.navigate);
  const wishlist = useAppStore((s) => s.wishlist);
  const setUser = useAppStore((s) => s.setUser);

  const [isEditing, setIsEditing] = useState(false);
  const [orders] = useState<Order[]>(mockOrders);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      state: user?.state || '',
    },
  });

  // Update form defaults when user changes
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
      });
    }
  }, [user, form]);

  function onSaveProfile(data: ProfileFormData) {
    if (user) {
      setUser({
        ...user,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
      });
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    }
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="container max-w-lg mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <div className="mx-auto rounded-full bg-muted p-6 w-fit">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Please Login</h2>
            <p className="text-muted-foreground">
              You need to be logged in to view your profile.
            </p>
          </div>
          <Button onClick={() => navigate('login')}>Sign In</Button>
        </div>
      </div>
    );
  }

  const wishlistProducts = allProducts.filter((p) =>
    wishlist.includes(p.id)
  );

  const roleBadgeVariant = {
    user: 'default' as const,
    vendor: 'secondary' as const,
    admin: 'destructive' as const,
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      {/* User Info Header */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-primary">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold">{user.name}</h1>
                <Badge variant={roleBadgeVariant[user.role]}>
                  {user.role === 'vendor' ? 'Vendor' : user.role === 'admin' ? 'Admin' : 'Customer'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{user.email}</p>
              {user.phone && (
                <p className="text-sm text-muted-foreground">{user.phone}</p>
              )}
              {user.city && user.state && (
                <p className="text-sm text-muted-foreground">
                  {user.city}, {user.state}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Member since {new Date(user.createdAt).toLocaleDateString('en-NG', { year: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Orders</span>
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="gap-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Wishlist</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details here
                </CardDescription>
              </div>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEditing(false);
                      form.reset();
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={form.handleSubmit(onSaveProfile)}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              disabled={!isEditing}
                              className="pl-10"
                              {...field}
                            />
                          </FormControl>
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type="email"
                              disabled={!isEditing}
                              className="pl-10"
                              {...field}
                            />
                          </FormControl>
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              disabled={!isEditing}
                              className="pl-10"
                              {...field}
                            />
                          </FormControl>
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              disabled={!isEditing}
                              className="pl-10"
                              {...field}
                            />
                          </FormControl>
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              disabled={!isEditing}
                              className="pl-10"
                              {...field}
                            />
                          </FormControl>
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
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
                        <div className="relative">
                          <FormControl>
                            <Input
                              disabled={!isEditing}
                              className="pl-10"
                              {...field}
                            />
                          </FormControl>
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No orders yet</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Start shopping to see your orders here
                </p>
                <Button className="mt-4" onClick={() => navigate('products')}>
                  Browse Products
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm">{order.id}</p>
                          <Badge
                            variant="secondary"
                            className={statusColors[order.status]}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(order.createdAt).toLocaleDateString('en-NG', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                          <span>
                            {order.items?.length || 0}{' '}
                            {order.items?.length === 1 ? 'item' : 'items'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-semibold">
                          {formatPrice(order.totalAmount)}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate('orders')}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Wishlist Tab */}
        <TabsContent value="wishlist">
          {wishlistProducts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">Wishlist is empty</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Save products you love for later
                </p>
                <Button className="mt-4" onClick={() => navigate('products')}>
                  Discover Products
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlistProducts.map((product) => (
                <Card
                  key={product.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => useAppStore.getState().viewProduct(product.id)}
                >
                  <div className="h-40 rounded-t-lg overflow-hidden bg-muted">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 space-y-2">
                    {product.brand && (
                      <p className="text-xs text-muted-foreground">
                        {product.brand}
                      </p>
                    )}
                    <p className="font-medium text-sm line-clamp-2">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-primary">
                        {formatPrice(product.salePrice || product.price)}
                      </span>
                      {product.salePrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
