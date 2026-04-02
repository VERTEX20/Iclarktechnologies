'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { products, vendors, sampleUsers, categories, formatPrice } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { toast } from 'sonner';
import {
  Users,
  Store,
  Package,
  DollarSign,
  ShieldCheck,
  ShieldX,
  Eye,
  CheckCircle2,
  XCircle,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

const revenueData = [
  { month: 'Jan', revenue: 12000000, orders: 85 },
  { month: 'Feb', revenue: 10500000, orders: 72 },
  { month: 'Mar', revenue: 14800000, orders: 96 },
  { month: 'Apr', revenue: 13200000, orders: 88 },
  { month: 'May', revenue: 16500000, orders: 110 },
  { month: 'Jun', revenue: 18900000, orders: 125 },
  { month: 'Jul', revenue: 21000000, orders: 140 },
  { month: 'Aug', revenue: 19500000, orders: 130 },
  { month: 'Sep', revenue: 17500000, orders: 115 },
  { month: 'Oct', revenue: 22000000, orders: 150 },
  { month: 'Nov', revenue: 24000000, orders: 162 },
  { month: 'Dec', revenue: 28000000, orders: 185 },
];

const categoryData = categories.map(cat => ({
  name: cat.name,
  value: products.filter(p => p.categoryId === cat.id).length,
}));

const COLORS = ['hsl(var(--primary))', '#10b981', '#f59e0b', '#8b5cf6'];

const roleColors: Record<string, string> = {
  admin: 'bg-red-100 text-red-700',
  vendor: 'bg-blue-100 text-blue-700',
  user: 'bg-gray-100 text-gray-700',
};

export default function AdminDashboard() {
  const { navigate } = useAppStore();
  const [vendorApproval, setVendorApproval] = useState<Record<string, boolean>>({
    'v-4': false,
  });
  const [productModeration, setProductModeration] = useState<Record<string, 'approved' | 'rejected' | null>>({});

  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = revenueData.reduce((sum, d) => sum + d.orders, 0);
  const pendingVendors = vendors.filter(v => !v.verified);

  const handleApproveVendor = (vendorId: string) => {
    setVendorApproval(prev => ({ ...prev, [vendorId]: true }));
    toast.success('Vendor has been approved successfully!');
  };

  const handleModerateProduct = (productId: string, action: 'approved' | 'rejected') => {
    setProductModeration(prev => ({ ...prev, [productId]: action }));
    toast.success(`Product ${action === 'approved' ? 'approved' : 'rejected'} successfully!`);
  };

  const overviewStats = [
    { label: 'Total Users', value: sampleUsers.length, icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Total Vendors', value: vendors.length, icon: Store, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Products', value: products.length, icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Total Revenue', value: formatPrice(totalRevenue), icon: DollarSign, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-red-50">
            <TrendingUp className="size-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your marketplace</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => navigate('home')}>
          Back to Store
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="flex flex-wrap gap-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
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

          {/* Pending Actions */}
          {pendingVendors.length > 0 && (
            <Card className="border-yellow-200 bg-yellow-50/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="size-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-800">Pending Vendor Approvals</p>
                    <p className="text-sm text-yellow-600">
                      {pendingVendors.length} vendor{pendingVendors.length > 1 ? 's' : ''} waiting for approval
                    </p>
                  </div>
                  <Button size="sm" className="ml-auto" onClick={() => toast.info('Navigate to Vendors tab')}>
                    Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Users */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Registered Users ({sampleUsers.length})</CardTitle>
              <CardDescription>Manage all platform users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="hidden sm:table-cell">Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={roleColors[user.role]}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{user.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => toast.info(`Viewing user: ${user.name}`)}>
                            <Eye className="mr-1 size-3.5" /> View
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

        {/* Vendors */}
        <TabsContent value="vendors" className="space-y-6">
          {/* Pending */}
          {pendingVendors.length > 0 && (
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldX className="size-5 text-yellow-600" /> Pending Approvals
                </CardTitle>
                <CardDescription>Vendors awaiting verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingVendors.map((vendor) => (
                    <div key={vendor.id} className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-semibold">{vendor.companyName}</h3>
                        <p className="text-sm text-muted-foreground">{vendor.description}</p>
                        <p className="mt-1 text-xs text-muted-foreground">Rating: {vendor.rating}/5.0</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="gap-1"
                          onClick={() => handleApproveVendor(vendor.id)}
                        >
                          <CheckCircle2 className="size-4" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-destructive hover:text-destructive"
                          onClick={() => toast.info('Vendor application rejected')}
                        >
                          <XCircle className="size-4" /> Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Verified */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-green-600" /> Verified Vendors
              </CardTitle>
              <CardDescription>All verified vendor accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead className="hidden md:table-cell">Description</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead className="hidden sm:table-cell">Commission</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendors.filter(v => v.verified).map((vendor) => (
                      <TableRow key={vendor.id}>
                        <TableCell className="font-medium">{vendor.companyName}</TableCell>
                        <TableCell className="hidden max-w-[250px] truncate md:table-cell text-muted-foreground">
                          {vendor.description}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span> {vendor.rating}
                          </div>
                        </TableCell>
                        <TableCell>{products.filter(p => p.vendorId === vendor.id).length}</TableCell>
                        <TableCell className="hidden sm:table-cell">{vendor.commission}%</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Verified</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products */}
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Products ({products.length})</CardTitle>
              <CardDescription>Manage and moderate product listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="hidden md:table-cell">Brand</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="hidden sm:table-cell">Stock</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.slice(0, 10).map((product) => {
                      const vendor = vendors.find(v => v.id === product.vendorId);
                      const moderationStatus = productModeration[product.id];
                      return (
                        <TableRow key={product.id}>
                          <TableCell className="max-w-[200px] truncate font-medium">{product.name}</TableCell>
                          <TableCell className="hidden md:table-cell">{product.brand}</TableCell>
                          <TableCell className="font-medium">{formatPrice(product.salePrice || product.price)}</TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge variant={product.stock > 20 ? 'secondary' : 'destructive'}>
                              {product.stock}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{vendor?.companyName}</TableCell>
                          <TableCell className="text-right">
                            {moderationStatus ? (
                              <Badge variant="secondary" className={
                                moderationStatus === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }>
                                {moderationStatus}
                              </Badge>
                            ) : (
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-green-600 hover:text-green-700"
                                  onClick={() => handleModerateProduct(product.id, 'approved')}
                                >
                                  <CheckCircle2 className="size-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => handleModerateProduct(product.id, 'rejected')}
                                >
                                  <XCircle className="size-4" />
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Revenue Line Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(val: number) => `₦${(val / 1000000).toFixed(0)}M`} />
                      <Tooltip formatter={(val: number) => formatPrice(val)} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Category Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Products by Category</CardTitle>
                <CardDescription>Distribution of products across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={4}
                        dataKey="value"
                        label={({ name, value }) => `${name} (${value})`}
                      >
                        {categoryData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Orders</CardTitle>
              <CardDescription>Order volume over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} />
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
