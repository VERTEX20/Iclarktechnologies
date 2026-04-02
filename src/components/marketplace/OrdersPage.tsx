'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  Package,
  Calendar,
  Clock,
  MapPin,
  Phone,
  CreditCard,
  Eye,
  ShoppingBag,
  ChevronRight,
  Truck,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import type { Order, OrderStatus } from '@/lib/types';

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  shipped: 'bg-purple-100 text-purple-800 border-purple-200',
  delivered: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const statusIcons: Record<OrderStatus, React.ReactNode> = {
  pending: <Clock className="h-4 w-4 text-yellow-600" />,
  confirmed: <CheckCircle2 className="h-4 w-4 text-blue-600" />,
  shipped: <Truck className="h-4 w-4 text-purple-600" />,
  delivered: <CheckCircle2 className="h-4 w-4 text-green-600" />,
  cancelled: <XCircle className="h-4 w-4 text-red-600" />,
};

const mockOrders: Order[] = [
  {
    id: 'ORD-ABC123',
    userId: 'u-100',
    status: 'delivered',
    totalAmount: 733000,
    shippingFee: 5000,
    address: '12 Solar Street, Ikeja',
    city: 'Lagos',
    state: 'Lagos',
    phone: '+2348056789012',
    paymentMethod: 'Card (Visa ****4532)',
    paymentStatus: 'paid',
    createdAt: '2024-11-15T10:30:00Z',
    items: [
      {
        id: 'oi-1',
        orderId: 'ORD-ABC123',
        productId: 'p-1',
        quantity: 1,
        price: 165000,
        product: {
          id: 'p-1',
          name: 'SunPower Maxeon 6 500W Mono Panel',
          slug: 'sunpower-maxeon-6-500w',
          description: 'Industry-leading efficiency',
          price: 185000,
          salePrice: 165000,
          images: ['/images/products/solar-panel-1.png'],
          brand: 'SunPower',
          categoryId: 'cat-1',
          vendorId: 'v-1',
          stock: 45,
          specs: {},
          featured: true,
          rating: 4.8,
          reviewCount: 124,
        },
      },
      {
        id: 'oi-2',
        orderId: 'ORD-ABC123',
        productId: 'p-12',
        quantity: 1,
        price: 568000,
        product: {
          id: 'p-12',
          name: 'Deye 8kW Hybrid Inverter',
          slug: 'deye-8kw-hybrid-inverter',
          description: 'Powerful hybrid inverter',
          price: 620000,
          salePrice: 568000,
          images: ['/images/products/inverter-1.png'],
          brand: 'Deye',
          categoryId: 'cat-3',
          vendorId: 'v-4',
          stock: 15,
          specs: {},
          featured: true,
          rating: 4.8,
          reviewCount: 91,
        },
      },
    ],
  },
  {
    id: 'ORD-DEF456',
    userId: 'u-100',
    status: 'shipped',
    totalAmount: 785000,
    shippingFee: 5000,
    address: '12 Solar Street, Ikeja',
    city: 'Lagos',
    state: 'Lagos',
    phone: '+2348056789012',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'paid',
    createdAt: '2024-12-01T14:00:00Z',
    items: [
      {
        id: 'oi-3',
        orderId: 'ORD-DEF456',
        productId: 'p-7',
        quantity: 1,
        price: 780000,
        product: {
          id: 'p-7',
          name: 'Pylontech US5000C 5kWh Battery',
          slug: 'pylontech-us5000c-5kwh',
          description: 'Premium LFP battery',
          price: 850000,
          salePrice: 780000,
          images: ['/images/products/battery-1.png'],
          brand: 'Pylontech',
          categoryId: 'cat-2',
          vendorId: 'v-3',
          stock: 20,
          specs: {},
          featured: true,
          rating: 4.9,
          reviewCount: 76,
        },
      },
    ],
  },
  {
    id: 'ORD-GHI789',
    userId: 'u-100',
    status: 'confirmed',
    totalAmount: 112000,
    shippingFee: 5000,
    address: '12 Solar Street, Ikeja',
    city: 'Lagos',
    state: 'Lagos',
    phone: '+2348056789012',
    paymentMethod: 'Card (Mastercard ****8901)',
    paymentStatus: 'paid',
    createdAt: '2024-12-20T09:15:00Z',
    items: [
      {
        id: 'oi-4',
        orderId: 'ORD-GHI789',
        productId: 'p-17',
        quantity: 2,
        price: 12000,
        product: {
          id: 'p-17',
          name: 'MC4 Solar Connectors (10 Pairs)',
          slug: 'mc4-connectors-10-pairs',
          description: 'IP67 waterproof connectors',
          price: 12000,
          images: ['/images/products/accessory-1.png'],
          brand: 'Stäubli',
          categoryId: 'cat-4',
          vendorId: 'v-2',
          stock: 200,
          specs: {},
          featured: false,
          rating: 4.6,
          reviewCount: 234,
        },
      },
      {
        id: 'oi-5',
        orderId: 'ORD-GHI789',
        productId: 'p-18',
        quantity: 1,
        price: 38000,
        product: {
          id: 'p-18',
          name: '6mm² Solar Cable (100m)',
          slug: 'solar-cable-6mm-100m',
          description: 'TUV-certified solar DC cable',
          price: 45000,
          salePrice: 38000,
          images: ['/images/products/accessory-1.png'],
          brand: 'Lapp',
          categoryId: 'cat-4',
          vendorId: 'v-2',
          stock: 80,
          specs: {},
          featured: false,
          rating: 4.5,
          reviewCount: 167,
        },
      },
    ],
  },
  {
    id: 'ORD-JKL012',
    userId: 'u-100',
    status: 'pending',
    totalAmount: 105000,
    shippingFee: 5000,
    address: '12 Solar Street, Ikeja',
    city: 'Lagos',
    state: 'Lagos',
    phone: '+2348056789012',
    paymentMethod: 'Card (Visa ****4532)',
    paymentStatus: 'pending',
    createdAt: '2024-12-28T16:45:00Z',
    items: [
      {
        id: 'oi-6',
        orderId: 'ORD-JKL012',
        productId: 'p-4',
        quantity: 1,
        price: 105000,
        product: {
          id: 'p-4',
          name: 'Trina Solar Vertex S+ 430W',
          slug: 'trina-vertex-s-430w',
          description: 'Compact residential panel',
          price: 118000,
          salePrice: 105000,
          images: ['/images/products/solar-panel-1.png'],
          brand: 'Trina Solar',
          categoryId: 'cat-1',
          vendorId: 'v-2',
          stock: 72,
          specs: {},
          featured: false,
          rating: 4.6,
          reviewCount: 53,
        },
      },
    ],
  },
  {
    id: 'ORD-MNO345',
    userId: 'u-100',
    status: 'cancelled',
    totalAmount: 520000,
    shippingFee: 5000,
    address: '12 Solar Street, Ikeja',
    city: 'Lagos',
    state: 'Lagos',
    phone: '+2348056789012',
    paymentMethod: 'Card (Visa ****4532)',
    paymentStatus: 'failed',
    createdAt: '2024-12-05T11:20:00Z',
    items: [
      {
        id: 'oi-7',
        orderId: 'ORD-MNO345',
        productId: 'p-15',
        quantity: 1,
        price: 520000,
        product: {
          id: 'p-15',
          name: 'Victron MultiPlus-II 3kVA',
          slug: 'victron-multiplus-ii-3kva',
          description: 'Premium inverter/charger',
          price: 520000,
          images: ['/images/products/inverter-1.png'],
          brand: 'Victron',
          categoryId: 'cat-3',
          vendorId: 'v-4',
          stock: 8,
          specs: {},
          featured: true,
          rating: 4.9,
          reviewCount: 112,
        },
      },
    ],
  },
];

export default function OrdersPage() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const navigate = useAppStore((s) => s.navigate);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="container max-w-lg mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <div className="mx-auto rounded-full bg-muted p-6 w-fit">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Please Login</h2>
            <p className="text-muted-foreground">
              You need to be logged in to view your orders.
            </p>
          </div>
          <Button onClick={() => navigate('login')}>Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your orders
          </p>
        </div>

        {/* Summary Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] as OrderStatus[]).map(
            (status) => {
              const count = mockOrders.filter((o) => o.status === status).length;
              return (
                <Card
                  key={status}
                  className="cursor-pointer hover:shadow-sm transition-shadow"
                  onClick={() => {}}
                >
                  <CardContent className="p-3 text-center">
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {status}
                    </p>
                  </CardContent>
                </Card>
              );
            }
          )}
        </div>

        {/* Orders List */}
        {mockOrders.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <div className="mx-auto rounded-full bg-muted p-6 w-fit mb-4">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No orders yet</h3>
              <p className="text-muted-foreground text-sm mt-1 mb-6">
                You haven&apos;t placed any orders. Start shopping to see them here!
              </p>
              <Button onClick={() => navigate('products')}>Browse Products</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col gap-4">
                    {/* Top Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <p className="font-bold text-lg">{order.id}</p>
                          <Badge
                            variant="secondary"
                            className={`border ${statusColors[order.status]}`}
                          >
                            <span className="flex items-center gap-1.5">
                              {statusIcons[order.status]}
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(order.createdAt).toLocaleDateString('en-NG', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Package className="h-3.5 w-3.5" />
                            {order.items?.length || 0}{' '}
                            {order.items?.length === 1 ? 'item' : 'items'}
                          </span>
                          <span className="flex items-center gap-1">
                            <CreditCard className="h-3.5 w-3.5" />
                            {order.paymentMethod}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-lg font-bold">
                            {formatPrice(order.totalAmount)}
                          </p>
                          {order.shippingFee > 0 && (
                            <p className="text-xs text-muted-foreground">
                              Shipping: {formatPrice(order.shippingFee)}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 flex-shrink-0"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="hidden sm:inline">View Details</span>
                        </Button>
                      </div>
                    </div>

                    {/* Items Preview */}
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {order.items?.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 flex-shrink-0 bg-muted/50 rounded-lg px-3 py-2"
                        >
                          <div className="h-10 w-10 rounded overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={item.product?.images[0] || ''}
                              alt={item.product?.name || 'Product'}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium truncate max-w-[150px]">
                              {item.product?.name || 'Unknown Product'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatPrice(item.price)} x {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Order Detail Dialog */}
      <Dialog
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
      >
        {selectedOrder && (
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Order {selectedOrder.id}
              </DialogTitle>
              <DialogDescription>
                Placed on{' '}
                {new Date(selectedOrder.createdAt).toLocaleDateString('en-NG', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {/* Status */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Status:</span>
                <Badge
                  variant="secondary"
                  className={`border ${statusColors[selectedOrder.status]}`}
                >
                  <span className="flex items-center gap-1.5">
                    {statusIcons[selectedOrder.status]}
                    {selectedOrder.status.charAt(0).toUpperCase() +
                      selectedOrder.status.slice(1)}
                  </span>
                </Badge>
                <Badge
                  variant="outline"
                  className={
                    selectedOrder.paymentStatus === 'paid'
                      ? 'border-green-200 text-green-700'
                      : 'border-yellow-200 text-yellow-700'
                  }
                >
                  {selectedOrder.paymentStatus === 'paid' ? 'Paid' : 'Payment Pending'}
                </Badge>
              </div>

              <Separator />

              {/* Shipping Info */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Shipping Information
                </h4>
                <div className="text-sm space-y-1 pl-6">
                  <p>{selectedOrder.address}</p>
                  <p>
                    {selectedOrder.city}, {selectedOrder.state}
                  </p>
                  <p className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {selectedOrder.phone}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Order Items */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 items-center"
                    >
                      <div className="h-12 w-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.product?.images[0] || ''}
                          alt={item.product?.name || 'Product'}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.product?.name || 'Unknown Product'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                      <p className="text-sm font-medium flex-shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>
                    {formatPrice(
                      (selectedOrder.items || []).reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      ) - selectedOrder.shippingFee
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatPrice(selectedOrder.shippingFee)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span className="text-primary">
                    {formatPrice(selectedOrder.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
