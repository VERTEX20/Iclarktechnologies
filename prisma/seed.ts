import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.consultation.deleteMany();
  await prisma.product.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // ─── Users ───
  const users = await Promise.all([
    prisma.user.create({ data: { id: 'u-1', email: 'admin@iclarke.com', name: 'Admin User', role: 'admin', phone: '+2348012345678' } }),
    prisma.user.create({ data: { id: 'u-2', email: 'sunpower@iclarke.com', name: 'Kunle Adebayo', role: 'vendor', phone: '+2348023456789' } }),
    prisma.user.create({ data: { id: 'u-3', email: 'greentech@iclarke.com', name: 'Chioma Eze', role: 'vendor', phone: '+2348034567890' } }),
    prisma.user.create({ data: { id: 'u-4', email: 'solarmax@iclarke.com', name: 'Ibrahim Musa', role: 'vendor', phone: '+2348045678901' } }),
    prisma.user.create({ data: { id: 'u-5', email: 'powergrid@iclarke.com', name: 'Bola Ahmed', role: 'vendor', phone: '+2348056789012' } }),
    prisma.user.create({ data: { id: 'u-100', email: 'user@example.com', name: 'John Doe', role: 'user', phone: '+2348067890123', address: '12 Solar Street', city: 'Lagos', state: 'Lagos', country: 'Nigeria' } }),
  ]);
  console.log(`  ✅ Created ${users.length} users`);

  // ─── Vendors ───
  const vendors = await Promise.all([
    prisma.vendor.create({ data: { id: 'v-1', userId: 'u-2', companyName: 'SunPower Nigeria', description: 'Leading distributor of premium solar panels and accessories in West Africa.', verified: true, rating: 4.8 } }),
    prisma.vendor.create({ data: { id: 'v-2', userId: 'u-3', companyName: 'GreenTech Solutions', description: 'Your one-stop shop for renewable energy solutions and installation services.', verified: true, rating: 4.6 } }),
    prisma.vendor.create({ data: { id: 'v-3', userId: 'u-4', companyName: 'SolarMax Energy', description: 'Specializing in high-capacity lithium batteries and energy storage systems.', verified: true, rating: 4.9 } }),
    prisma.vendor.create({ data: { id: 'v-4', userId: 'u-5', companyName: 'PowerGrid Systems', description: 'Premium inverters and power management systems for residential and commercial use.', verified: false, rating: 4.3 } }),
  ]);
  console.log(`  ✅ Created ${vendors.length} vendors`);

  // ─── Categories ───
  const categories = await Promise.all([
    prisma.category.create({ data: { id: 'cat-1', name: 'Solar Panels', slug: 'solar-panels', icon: '☀️', order: 1 } }),
    prisma.category.create({ data: { id: 'cat-2', name: 'Lithium Batteries', slug: 'lithium-batteries', icon: '🔋', order: 2 } }),
    prisma.category.create({ data: { id: 'cat-3', name: 'Inverters', slug: 'inverters', icon: '⚡', order: 3 } }),
    prisma.category.create({ data: { id: 'cat-4', name: 'Accessories', slug: 'accessories', icon: '🔧', order: 4 } }),
  ]);
  console.log(`  ✅ Created ${categories.length} categories`);

  // ─── Products ───
  const productsData = [
    { id: 'p-1', name: 'SunPower Maxeon 6 500W Mono Panel', description: 'Industry-leading efficiency with Maxeon Gen 6 solar cells. Delivers up to 500W of power with unmatched reliability.', price: 185000, salePrice: 165000, brand: 'SunPower', model: 'Maxeon 6', powerCapacity: '500W', categoryId: 'cat-1', vendorId: 'v-1', stock: 45, featured: true, rating: 4.8, reviewCount: 124 },
    { id: 'p-2', name: 'Jinko Solar Tiger Neo 550W', description: 'Next-generation N-type TOPCon technology delivers exceptional performance even in low light conditions.', price: 165000, salePrice: 148000, brand: 'Jinko Solar', model: 'Tiger Neo', powerCapacity: '550W', categoryId: 'cat-1', vendorId: 'v-1', stock: 38, featured: true, rating: 4.7, reviewCount: 89 },
    { id: 'p-3', name: 'Canadian Solar HiKu6 450W', description: 'Optimized for maximum energy yield with half-cut cell technology. Excellent performance in hot climates.', price: 125000, salePrice: null, brand: 'Canadian Solar', model: 'HiKu6', powerCapacity: '450W', categoryId: 'cat-1', vendorId: 'v-2', stock: 60, featured: false, rating: 4.5, reviewCount: 67 },
    { id: 'p-4', name: 'Trina Solar Vertex S+ 430W', description: 'Compact yet powerful residential panel with multi-busbar technology. Ideal for limited roof space.', price: 118000, salePrice: 105000, brand: 'Trina Solar', model: 'Vertex S+', powerCapacity: '430W', categoryId: 'cat-1', vendorId: 'v-2', stock: 72, featured: false, rating: 4.6, reviewCount: 53 },
    { id: 'p-5', name: 'LONGi Solar Hi-MO 6 400W', description: 'High-efficiency monocrystalline panel with advanced PERC technology. Cost-effective for large-scale installations.', price: 95000, salePrice: null, brand: 'LONGi', model: 'Hi-MO 6', powerCapacity: '400W', categoryId: 'cat-1', vendorId: 'v-1', stock: 100, featured: true, rating: 4.4, reviewCount: 42 },
    { id: 'p-6', name: 'JA Solar Deep Blue 3.0 580W', description: 'Commercial-grade high power panel with Gemini technology. Bifacial design for ground-mount systems.', price: 195000, salePrice: 178000, brand: 'JA Solar', model: 'Deep Blue 3.0', powerCapacity: '580W', categoryId: 'cat-1', vendorId: 'v-1', stock: 30, featured: false, rating: 4.3, reviewCount: 28 },
    { id: 'p-7', name: 'Pylontech US5000C 5kWh Battery', description: 'Premium LFP battery with 5000Wh capacity. Industry-leading cycle life with intelligent BMS.', price: 850000, salePrice: 780000, brand: 'Pylontech', model: 'US5000C', powerCapacity: '5kWh', categoryId: 'cat-2', vendorId: 'v-3', stock: 20, featured: true, rating: 4.9, reviewCount: 76 },
    { id: 'p-8', name: 'BYD Premium LVS 4kWh Battery', description: 'Compact lithium battery module with modular design. Easy to expand for growing energy needs.', price: 680000, salePrice: null, brand: 'BYD', model: 'Premium LVS', powerCapacity: '4kWh', categoryId: 'cat-2', vendorId: 'v-3', stock: 35, featured: true, rating: 4.7, reviewCount: 54 },
    { id: 'p-9', name: 'Deye 10kWh All-in-One Battery', description: 'High-capacity energy storage with built-in inverter and BMS. Perfect for complete home energy independence.', price: 1500000, salePrice: 1380000, brand: 'Deye', model: 'BOS-G', powerCapacity: '10kWh', categoryId: 'cat-2', vendorId: 'v-3', stock: 12, featured: false, rating: 4.8, reviewCount: 38 },
    { id: 'p-10', name: 'Seplos 3U 10kWh Rack Battery', description: 'Professional rack-mount battery for commercial installations. Hot-swappable modules.', price: 920000, salePrice: null, brand: 'Seplos', model: '3U Rack', powerCapacity: '10kWh', categoryId: 'cat-2', vendorId: 'v-3', stock: 18, featured: false, rating: 4.5, reviewCount: 22 },
    { id: 'p-11', name: 'EVE LF280K 3.2kWh Cell', description: 'Grade A LFP cell for DIY battery builders. Laser-welded terminals, ultra-low internal resistance.', price: 85000, salePrice: 72000, brand: 'EVE', model: 'LF280K', powerCapacity: '3.2kWh', categoryId: 'cat-2', vendorId: 'v-3', stock: 200, featured: false, rating: 4.6, reviewCount: 156 },
    { id: 'p-12', name: 'Deye 8kW Hybrid Inverter', description: 'Powerful hybrid inverter with dual PV input and built-in MPPT. Supports grid-tie, off-grid, and backup.', price: 620000, salePrice: 568000, brand: 'Deye', model: 'SUN-8K-SG04LP3', powerCapacity: '8kW', categoryId: 'cat-3', vendorId: 'v-4', stock: 15, featured: true, rating: 4.8, reviewCount: 91 },
    { id: 'p-13', name: 'Growatt 5kW Off-Grid Inverter', description: 'Reliable off-grid inverter with 80A MPPT charge controller. Perfect for remote locations.', price: 380000, salePrice: null, brand: 'Growatt', model: 'SPF 5000 ES', powerCapacity: '5kW', categoryId: 'cat-3', vendorId: 'v-4', stock: 25, featured: false, rating: 4.5, reviewCount: 68 },
    { id: 'p-14', name: 'Solis 10kW 3-Phase Inverter', description: 'High-efficiency three-phase inverter for commercial installations with reactive power control.', price: 750000, salePrice: 698000, brand: 'Solis', model: 'S5-GC(10K)', powerCapacity: '10kW', categoryId: 'cat-3', vendorId: 'v-4', stock: 10, featured: false, rating: 4.7, reviewCount: 35 },
    { id: 'p-15', name: 'Victron MultiPlus-II 3kVA', description: 'Premium inverter/charger with PowerAssist technology. Combines inverter, charger, and transfer switch.', price: 520000, salePrice: null, brand: 'Victron', model: 'MultiPlus-II', powerCapacity: '3kVA', categoryId: 'cat-3', vendorId: 'v-4', stock: 8, featured: true, rating: 4.9, reviewCount: 112 },
    { id: 'p-16', name: 'Solar Panel Mounting Kit (4 Panels)', description: 'Complete roof mounting system for 4 solar panels. Heavy-duty aluminum rails with stainless steel clamps.', price: 85000, salePrice: 72000, brand: 'IronRidge', model: 'XR100', categoryId: 'cat-4', vendorId: 'v-2', stock: 50, featured: false, rating: 4.4, reviewCount: 45 },
    { id: 'p-17', name: 'MC4 Solar Connectors (10 Pairs)', description: 'IP67 waterproof MC4 connectors. Gold-plated pins for maximum conductivity.', price: 12000, salePrice: null, brand: 'Stäubli', model: 'MC4', categoryId: 'cat-4', vendorId: 'v-2', stock: 200, featured: false, rating: 4.6, reviewCount: 234 },
    { id: 'p-18', name: '6mm² Solar Cable (100m)', description: 'TUV-certified solar DC cable with excellent UV resistance. Double insulated for outdoor use.', price: 45000, salePrice: 38000, brand: 'Lapp', model: 'Ölflex Solar', categoryId: 'cat-4', vendorId: 'v-2', stock: 80, featured: false, rating: 4.5, reviewCount: 167 },
    { id: 'p-19', name: 'Solar Power Optimizer 350W', description: 'Module-level optimizer for maximum energy harvest. Mitigates shading effects with cloud monitoring.', price: 35000, salePrice: 30000, brand: 'SolarEdge', model: 'P350', powerCapacity: '350W', categoryId: 'cat-4', vendorId: 'v-2', stock: 120, featured: true, rating: 4.7, reviewCount: 78 },
    { id: 'p-20', name: 'Battery Rack Cabinet 19"', description: 'Professional rack cabinet for battery modules and inverters. Ventilated with cable management.', price: 125000, salePrice: null, brand: 'Rittal', model: 'AE 1060', categoryId: 'cat-4', vendorId: 'v-2', stock: 15, featured: false, rating: 4.3, reviewCount: 19 },
    { id: 'p-21', name: 'Combiner Box 6-String', description: 'PV combiner box with 6 input strings, surge protection, and DC disconnect.', price: 28000, salePrice: 24000, brand: 'SMA', model: 'CB-6', categoryId: 'cat-4', vendorId: 'v-2', stock: 60, featured: false, rating: 4.5, reviewCount: 56 },
  ];

  const products = await Promise.all(
    productsData.map((p) =>
      prisma.product.create({
        data: {
          ...p,
          slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + p.id,
          images: JSON.stringify(['/images/products/' + (p.categoryId === 'cat-1' ? 'solar-panel-1' : p.categoryId === 'cat-2' ? 'battery-1' : p.categoryId === 'cat-3' ? 'inverter-1' : 'accessory-1') + '.png']),
          specs: JSON.stringify({ Type: p.brand, Power: p.powerCapacity, Warranty: '5-25 Years' }),
        },
      })
    )
  );
  console.log(`  ✅ Created ${products.length} products`);

  // ─── Reviews ───
  const reviewsData = [
    { userId: 'u-100', productId: 'p-1', rating: 5, title: 'Outstanding performance!', comment: 'These panels exceeded my expectations. Generating more power than rated even on cloudy days.', verified: true },
    { userId: 'u-100', productId: 'p-7', rating: 5, title: 'Reliable energy storage', comment: 'This battery has been running flawlessly for 4 months. The BMS works perfectly.', verified: true },
    { userId: 'u-100', productId: 'p-12', rating: 5, title: 'Perfect hybrid solution', comment: 'The Deye inverter handles grid-tie, battery, and backup seamlessly.', verified: true },
    { userId: 'u-100', productId: 'p-2', rating: 4, title: 'Good value for money', comment: 'The Jinko panels offer excellent value. Performance is comparable to more expensive brands.', verified: true },
    { userId: 'u-100', productId: 'p-15', rating: 5, title: 'Premium quality', comment: 'Victron is the gold standard. This MultiPlus-II has been running my entire home perfectly.', verified: true },
  ];

  const reviews = await Promise.all(
    reviewsData.map((r) => prisma.review.create({ data: r }))
  );
  console.log(`  ✅ Created ${reviews.length} reviews`);

  // ─── Blog Posts ───
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        id: 'b-1', title: 'How to Choose the Right Solar Panels for Your Home', slug: 'choose-right-solar-panels',
        excerpt: 'A comprehensive guide to selecting solar panels based on efficiency, cost, roof space, and energy needs.',
        content: '<h2>Understanding Solar Panel Types</h2><p>When choosing solar panels, understand the three main types: monocrystalline, polycrystalline, and thin-film.</p><h2>Key Factors</h2><p>Look at efficiency ratings, power output, temperature coefficients, and warranty terms.</p>',
        image: '/images/hero-solar.png', author: 'Iclark Tech Team', published: true,
      },
    }),
    prisma.blogPost.create({
      data: {
        id: 'b-2', title: 'Solar Battery Storage: Complete Buyer\'s Guide', slug: 'solar-battery-buyers-guide',
        excerpt: 'Everything you need to know about solar batteries, from LFP to lead-acid options.',
        content: '<h2>Why Battery Storage Matters</h2><p>Solar batteries store excess energy for use at night or during power outages.</p><h2>Types of Solar Batteries</h2><p>LFP batteries are most popular due to long lifespan and safety.</p>',
        image: '/images/hero-solar.png', author: 'Iclark Tech Team', published: true,
      },
    }),
    prisma.blogPost.create({
      data: {
        id: 'b-3', title: 'Complete Solar Installation Guide for Beginners', slug: 'solar-installation-guide',
        excerpt: 'Step-by-step guide to installing your own solar power system safely.',
        content: '<h2>Planning Your Installation</h2><p>Assess your roof condition, orientation, and available space.</p><h2>Safety First</h2><p>Solar installations involve high DC voltages. Follow NEC/IEC standards.</p>',
        image: '/images/hero-solar.png', author: 'Iclark Tech Team', published: true,
      },
    }),
  ]);
  console.log(`  ✅ Created ${blogPosts.length} blog posts`);

  // ─── Sample Orders ───
  const orders = await Promise.all([
    prisma.order.create({
      data: {
        id: 'o-1', userId: 'u-100', status: 'delivered', totalAmount: 165000, shippingFee: 5000,
        address: '12 Solar Street', city: 'Lagos', state: 'Lagos', phone: '+2348067890123',
        paymentMethod: 'card', paymentStatus: 'paid',
        items: { create: { productId: 'p-1', quantity: 1, price: 165000 } },
      },
    }),
    prisma.order.create({
      data: {
        id: 'o-2', userId: 'u-100', status: 'shipped', totalAmount: 780000, shippingFee: 5000,
        address: '12 Solar Street', city: 'Lagos', state: 'Lagos', phone: '+2348067890123',
        paymentMethod: 'bank_transfer', paymentStatus: 'paid',
        items: { create: { productId: 'p-7', quantity: 1, price: 780000 } },
      },
    }),
    prisma.order.create({
      data: {
        id: 'o-3', userId: 'u-100', status: 'pending', totalAmount: 568000, shippingFee: 5000,
        address: '12 Solar Street', city: 'Lagos', state: 'Lagos', phone: '+2348067890123',
        paymentMethod: 'card', paymentStatus: 'pending',
        items: { create: { productId: 'p-12', quantity: 1, price: 568000 } },
      },
    }),
  ]);
  console.log(`  ✅ Created ${orders.length} orders`);

  console.log('\n🎉 Database seeded successfully!');
  console.log(`   - ${users.length} users`);
  console.log(`   - ${vendors.length} vendors`);
  console.log(`   - ${categories.length} categories`);
  console.log(`   - ${products.length} products`);
  console.log(`   - ${reviews.length} reviews`);
  console.log(`   - ${blogPosts.length} blog posts`);
  console.log(`   - ${orders.length} orders`);
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
