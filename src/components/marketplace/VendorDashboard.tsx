'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { products, vendors, formatPrice } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { toast } from 'sonner';
import {
  Package,
  DollarSign,
  ShoppingBag,
  Star,
  Plus,
  Pencil,
  Trash2,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

const monthlySalesData = [
  { month: 'Jan', sales: 4500000 },
  { month: 'Feb', sales: 3800000 },
  { month: 'Mar', sales: 5200000 },
  { month: 'Apr', sales: 6100000 },
  { month: 'May', sales: 5500000 },
  { month: 'Jun', sales: 7200000 },
  { month: 'Jul', sales: 8100000 },
  { month: 'Aug', sales: 7600000 },
  { month: 'Sep', sales: 6800000 },
  { month: 'Oct', sales: 9200000 },
  { month: 'Nov', sales: 8700000 },
  { month: 'Dec', sales: 10500000 },
];

const mockOrders = [
  { id: 'ORD-001', customer: 'Adeola Johnson', product: 'SunPower Maxeon 6 500W', amount: 330000, status: 'delivered' as const, date: '2024-12-15' },
  { id: 'ORD-002', customer: 'Emeka Okafor', product: 'Jinko Tiger Neo 550W', amount: 296000, status: 'shipped' as const, date: '2024-12-18' },
  { id: 'ORD-003', customer: 'Kemi Adeyemi', product: 'LONGi Hi-MO 6 400W', amount: 190000, status: 'confirmed' as const, date: '2024-12-20' },
  { id: 'ORD-004', customer: 'Chidi Nwosu', product: 'JA Solar Deep Blue 580W', amount: 356000, status: 'pending' as const, date: '2024-12-22' },
  { id: 'ORD-005', customer: 'Funke Adekunle', product: 'SunPower Maxeon 6 500W', amount: 660000, status: 'shipped' as const, date: '2024-12-23' },
  { id: 'ORD-006', customer: 'Blessing Obi', product: 'Jinko Tiger Neo 550W', amount: 148000, status: 'delivered' as const, date: '2024-12-10' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function VendorDashboard() {
  const { navigate } = useAppStore();
  const vendor = vendors.find(v => v.id === 'v-1')!;
  const vendorProducts = products.filter(p => p.vendorId === 'v-1');

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '' });

  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.amount, 0);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success(`Product "${newProduct.name}" added successfully!`);
    setAddDialogOpen(false);
    setNewProduct({ name: '', price: '', category: '' });
  };

  const handleDeleteProduct = (productName: string) => {
    toast.success(`Product "${productName}" has been deleted`);
  };

  const overviewStats = [
    { label: 'Total Products', value: vendorProducts.length, icon: Package, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Total Revenue', value: formatPrice(totalRevenue), icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Orders', value: mockOrders.length, icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Rating', value: vendor.rating.toFixed(1), icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
            <TrendingUp className="size-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{vendor.companyName}</h1>
              {vendor.verified && (
                <Badge className="gap-1 bg-green-100 text-green-700 hover:bg-green-100">
                  <ShieldCheck className="size-3" /> Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Vendor Management Dashboard</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => navigate('home')}>
          Back to Store
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {overviewStats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`flex size-10 items-center justify-center rounded-lg ${stat.bg}`}>
                      <stat.icon className={`size-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest orders from your store</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead className="hidden sm:table-cell">Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.slice(0, 5).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell className="hidden sm:table-cell">{order.customer}</TableCell>
                      <TableCell>{formatPrice(order.amount)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={statusColors[order.status]}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products */}
        <TabsContent value="products" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Your Products ({vendorProducts.length})</h2>
              <p className="text-sm text-muted-foreground">Manage your product listings</p>
            </div>
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="size-4" /> Add Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>Fill in the details to add a new product to your store.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="prod-name">Product Name *</Label>
                    <Input
                      id="prod-name"
                      placeholder="e.g. SunPower Maxeon 7 600W"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="prod-price">Price (₦) *</Label>
                    <Input
                      id="prod-price"
                      type="number"
                      placeholder="e.g. 200000"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="prod-cat">Category</Label>
                    <Input
                      id="prod-cat"
                      placeholder="e.g. Solar Panels"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddProduct}>Add Product</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            {vendorProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex size-16 items-center justify-center rounded-lg bg-muted">
                      <Package className="size-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span>{product.brand}</span>
                        <span>·</span>
                        <span>{product.powerCapacity}</span>
                        <span>·</span>
                        <span>Stock: {product.stock}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="font-semibold text-primary">{formatPrice(product.salePrice || product.price)}</span>
                        {product.salePrice && (
                          <span className="text-sm text-muted-foreground line-through">{formatPrice(product.price)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-50 text-green-700">
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                    <Button variant="ghost" size="icon" className="size-8">
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-destructive hover:text-destructive"
                      onClick={() => handleDeleteProduct(product.name)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Orders */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>Manage and track all customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden md:table-cell">Product</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden sm:table-cell">Date</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell className="hidden max-w-[200px] truncate md:table-cell">{order.product}</TableCell>
                        <TableCell className="font-medium">{formatPrice(order.amount)}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={statusColors[order.status]}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{order.date}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => toast.info(`Viewing order ${order.id}`)}>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Total Sales (12mo)</p>
                <p className="mt-1 text-2xl font-bold">{formatPrice(totalRevenue)}</p>
                <p className="mt-1 text-sm text-green-600">+18.2% from last year</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <p className="mt-1 text-2xl font-bold">{formatPrice(Math.round(totalRevenue / mockOrders.length))}</p>
                <p className="mt-1 text-sm text-green-600">+5.4% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="mt-1 text-2xl font-bold">3.8%</p>
                <p className="mt-1 text-sm text-red-500">-0.2% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales Revenue</CardTitle>
              <CardDescription>Your sales performance over the past 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlySalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(val: number) => `₦${(val / 1000000).toFixed(0)}M`} />
                    <Tooltip formatter={(val: number) => formatPrice(val)} />
                    <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
