import type { Product, Category, Vendor, Review, BlogPost, User, Order, Consultation } from './types';

// ─── Categories ───
export const categories: Category[] = [
  { id: 'cat-1', name: 'Solar Panels', slug: 'solar-panels', icon: '☀️', image: '/images/products/solar-panel-1.png', order: 1, productCount: 6 },
  { id: 'cat-2', name: 'Lithium Batteries', slug: 'lithium-batteries', icon: '🔋', image: '/images/products/battery-1.png', order: 2, productCount: 5 },
  { id: 'cat-3', name: 'Inverters', slug: 'inverters', icon: '⚡', image: '/images/products/inverter-1.png', order: 3, productCount: 4 },
  { id: 'cat-4', name: 'Accessories', slug: 'accessories', icon: '🔧', image: '/images/products/accessory-1.png', order: 4, productCount: 6 },
];

// ─── Vendors ───
export const vendors: Vendor[] = [
  { id: 'v-1', userId: 'u-2', companyName: 'SunPower Nigeria', description: 'Leading distributor of premium solar panels and accessories in West Africa.', logo: null, verified: true, rating: 4.8, commission: 5 },
  { id: 'v-2', userId: 'u-3', companyName: 'GreenTech Solutions', description: 'Your one-stop shop for renewable energy solutions and installation services.', logo: null, verified: true, rating: 4.6, commission: 5 },
  { id: 'v-3', userId: 'u-4', companyName: 'SolarMax Energy', description: 'Specializing in high-capacity lithium batteries and energy storage systems.', logo: null, verified: true, rating: 4.9, commission: 5 },
  { id: 'v-4', userId: 'u-5', companyName: 'PowerGrid Systems', description: 'Premium inverters and power management systems for residential and commercial use.', logo: null, verified: false, rating: 4.3, commission: 7 },
];

// ─── Products ───
export const products: Product[] = [
  // Solar Panels
  {
    id: 'p-1', name: 'SunPower Maxeon 6 500W Mono Panel', slug: 'sunpower-maxeon-6-500w',
    description: 'Industry-leading efficiency with Maxeon Gen 6 solar cells. delivers up to 500W of power with unmatched reliability. Perfect for residential and commercial installations.',
    price: 185000, salePrice: 165000, images: ['/images/products/solar-panel-1.png'],
    brand: 'SunPower', model: 'Maxeon 6', powerCapacity: '500W',
    categoryId: 'cat-1', vendorId: 'v-1', stock: 45, featured: true, rating: 4.8, reviewCount: 124,
    specs: { 'Cell Type': 'Monocrystalline', 'Efficiency': '22.8%', 'Dimensions': '2270 × 1134 × 30mm', 'Weight': '22.5 kg', 'Warranty': '25 Years', 'Voltage': '52.5V' }
  },
  {
    id: 'p-2', name: 'Jinko Solar Tiger Neo 550W', slug: 'jinko-tiger-neo-550w',
    description: 'Next-generation N-type TOPCon technology delivers exceptional performance even in low light conditions. High power output with superior temperature coefficients.',
    price: 165000, salePrice: 148000, images: ['/images/products/solar-panel-1.png'],
    brand: 'Jinko Solar', model: 'Tiger Neo', powerCapacity: '550W',
    categoryId: 'cat-1', vendorId: 'v-1', stock: 38, featured: true, rating: 4.7, reviewCount: 89,
    specs: { 'Cell Type': 'N-type TOPCon', 'Efficiency': '22.3%', 'Dimensions': '2278 × 1134 × 30mm', 'Weight': '24.6 kg', 'Warranty': '25 Years', 'Voltage': '49.6V' }
  },
  {
    id: 'p-3', name: 'Canadian Solar HiKu6 450W', slug: 'canadian-solar-hiku6-450w',
    description: 'Optimized for maximum energy yield with half-cut cell technology. Excellent performance in hot climates ideal for tropical regions.',
    price: 125000, salePrice: null, images: ['/images/products/solar-panel-1.png'],
    brand: 'Canadian Solar', model: 'HiKu6', powerCapacity: '450W',
    categoryId: 'cat-1', vendorId: 'v-2', stock: 60, featured: false, rating: 4.5, reviewCount: 67,
    specs: { 'Cell Type': 'Monocrystalline PERC', 'Efficiency': '20.7%', 'Dimensions': '2115 × 1051 × 30mm', 'Weight': '22.8 kg', 'Warranty': '25 Years', 'Voltage': '41.5V' }
  },
  {
    id: 'p-4', name: 'Trina Solar Vertex S+ 430W', slug: 'trina-vertex-s-430w',
    description: 'Compact yet powerful residential panel with multi-busbar technology. Ideal for limited roof space with maximum power density.',
    price: 118000, salePrice: 105000, images: ['/images/products/solar-panel-1.png'],
    brand: 'Trina Solar', model: 'Vertex S+', powerCapacity: '430W',
    categoryId: 'cat-1', vendorId: 'v-2', stock: 72, featured: false, rating: 4.6, reviewCount: 53,
    specs: { 'Cell Type': 'Monocrystalline', 'Efficiency': '21.5%', 'Dimensions': '1767 × 1042 × 30mm', 'Weight': '19.5 kg', 'Warranty': '25 Years', 'Voltage': '38.2V' }
  },
  {
    id: 'p-5', name: 'LONGi Solar Hi-MO 6 400W', slug: 'longi-hi-mo-6-400w',
    description: 'High-efficiency monocrystalline panel with advanced PERC technology. Cost-effective solution for large-scale solar farms and installations.',
    price: 95000, salePrice: null, images: ['/images/products/solar-panel-1.png'],
    brand: 'LONGi', model: 'Hi-MO 6', powerCapacity: '400W',
    categoryId: 'cat-1', vendorId: 'v-1', stock: 100, featured: true, rating: 4.4, reviewCount: 42,
    specs: { 'Cell Type': 'Monocrystalline PERC', 'Efficiency': '20.6%', 'Dimensions': '1722 × 1134 × 30mm', 'Weight': '20.8 kg', 'Warranty': '25 Years', 'Voltage': '38.5V' }
  },
  {
    id: 'p-6', name: 'JA Solar Deep Blue 3.0 580W', slug: 'ja-solar-deep-blue-580w',
    description: 'Commercial-grade high power panel with Gemini technology. Maximizes energy harvest with bifacial design for ground-mount systems.',
    price: 195000, salePrice: 178000, images: ['/images/products/solar-panel-1.png'],
    brand: 'JA Solar', model: 'Deep Blue 3.0', powerCapacity: '580W',
    categoryId: 'cat-1', vendorId: 'v-1', stock: 30, featured: false, rating: 4.3, reviewCount: 28,
    specs: { 'Cell Type': 'N-type', 'Efficiency': '22.5%', 'Dimensions': '2465 × 1134 × 30mm', 'Weight': '27.8 kg', 'Warranty': '25 Years', 'Voltage': '49.6V' }
  },

  // Lithium Batteries
  {
    id: 'p-7', name: 'Pylontech US5000C 5kWh Battery', slug: 'pylontech-us5000c-5kwh',
    description: 'Premium lithium iron phosphate (LFP) battery with 5000Wh capacity. Industry-leading cycle life with intelligent BMS for optimal performance.',
    price: 850000, salePrice: 780000, images: ['/images/products/battery-1.png'],
    brand: 'Pylontech', model: 'US5000C', powerCapacity: '5kWh',
    categoryId: 'cat-2', vendorId: 'v-3', stock: 20, featured: true, rating: 4.9, reviewCount: 76,
    specs: { 'Type': 'LFP', 'Capacity': '5.12kWh', 'Voltage': '51.2V', 'Cycle Life': '>6000', 'Weight': '32 kg', 'Warranty': '10 Years' }
  },
  {
    id: 'p-8', name: 'BYD Premium LVS 4kWh Battery', slug: 'byd-premium-lvs-4kwh',
    description: 'Compact and lightweight lithium battery module with modular design. Easy to expand for growing energy needs with stackable architecture.',
    price: 680000, salePrice: null, images: ['/images/products/battery-1.png'],
    brand: 'BYD', model: 'Premium LVS', powerCapacity: '4kWh',
    categoryId: 'cat-2', vendorId: 'v-3', stock: 35, featured: true, rating: 4.7, reviewCount: 54,
    specs: { 'Type': 'LFP', 'Capacity': '4.0kWh', 'Voltage': '51.2V', 'Cycle Life': '>5000', 'Weight': '28 kg', 'Warranty': '10 Years' }
  },
  {
    id: 'p-9', name: 'Deye 10kWh All-in-One Battery', slug: 'deye-10kwh-all-in-one',
    description: 'High-capacity energy storage solution with built-in inverter and BMS. Perfect for complete home energy independence with smart energy management.',
    price: 1500000, salePrice: 1380000, images: ['/images/products/battery-1.png'],
    brand: 'Deye', model: 'BOS-G', powerCapacity: '10kWh',
    categoryId: 'cat-2', vendorId: 'v-3', stock: 12, featured: false, rating: 4.8, reviewCount: 38,
    specs: { 'Type': 'LFP', 'Capacity': '10.24kWh', 'Voltage': '51.2V', 'Cycle Life': '>6000', 'Weight': '85 kg', 'Warranty': '10 Years' }
  },
  {
    id: 'p-10', name: 'Seplos 3U 10kWh Rack Battery', slug: 'seplos-3u-10kwh-rack',
    description: 'Professional rack-mount battery system for commercial installations. Modular design allows flexible capacity expansion with hot-swappable modules.',
    price: 920000, salePrice: null, images: ['/images/products/battery-1.png'],
    brand: 'Seplos', model: '3U Rack', powerCapacity: '10kWh',
    categoryId: 'cat-2', vendorId: 'v-3', stock: 18, featured: false, rating: 4.5, reviewCount: 22,
    specs: { 'Type': 'LFP', 'Capacity': '10.24kWh', 'Voltage': '51.2V', 'Cycle Life': '>6000', 'Weight': '62 kg', 'Warranty': '8 Years' }
  },
  {
    id: 'p-11', name: 'EVE LF280K 3.2kWh Cell', slug: 'eve-lf280k-3-2kwh',
    description: 'Individual Grade A LFP cell for DIY battery builders. Consistent quality with laser-welded terminals and ultra-low internal resistance.',
    price: 85000, salePrice: 72000, images: ['/images/products/battery-1.png'],
    brand: 'EVE', model: 'LF280K', powerCapacity: '3.2kWh',
    categoryId: 'cat-2', vendorId: 'v-3', stock: 200, featured: false, rating: 4.6, reviewCount: 156,
    specs: { 'Type': 'LFP', 'Capacity': '280Ah / 3.2kWh', 'Voltage': '3.2V', 'Cycle Life': '>8000', 'Weight': '5.4 kg', 'Warranty': '5 Years' }
  },

  // Inverters
  {
    id: 'p-12', name: 'Deye 8kW Hybrid Inverter', slug: 'deye-8kw-hybrid-inverter',
    description: 'Powerful hybrid inverter with dual PV input and built-in MPPT. Supports grid-tie, off-grid, and backup modes with smart energy management.',
    price: 620000, salePrice: 568000, images: ['/images/products/inverter-1.png'],
    brand: 'Deye', model: 'SUN-8K-SG04LP3', powerCapacity: '8kW',
    categoryId: 'cat-3', vendorId: 'v-4', stock: 15, featured: true, rating: 4.8, reviewCount: 91,
    specs: { 'Type': 'Hybrid', 'Power': '8kW', 'Input Voltage': '500V DC', 'Output': '230V AC', 'MPPT': '2 x 4kW', 'Warranty': '5 Years' }
  },
  {
    id: 'p-13', name: 'Growatt 5kW Off-Grid Inverter', slug: 'growatt-5kw-off-grid',
    description: 'Reliable off-grid inverter with built-in 80A MPPT charge controller. Perfect for remote locations without grid access with configurable priority modes.',
    price: 380000, salePrice: null, images: ['/images/products/inverter-1.png'],
    brand: 'Growatt', model: 'SPF 5000 ES', powerCapacity: '5kW',
    categoryId: 'cat-3', vendorId: 'v-4', stock: 25, featured: false, rating: 4.5, reviewCount: 68,
    specs: { 'Type': 'Off-Grid', 'Power': '5kW', 'Input Voltage': '145V DC', 'Output': '230V AC', 'MPPT': '80A', 'Warranty': '3 Years' }
  },
  {
    id: 'p-14', name: 'Solis 10kW 3-Phase Inverter', slug: 'solis-10kw-3phase',
    description: 'High-efficiency three-phase inverter for commercial installations. Advanced grid support with reactive power control and multiple MPPT trackers.',
    price: 750000, salePrice: 698000, images: ['/images/products/inverter-1.png'],
    brand: 'Solis', model: 'S5-GC(10K)', powerCapacity: '10kW',
    categoryId: 'cat-3', vendorId: 'v-4', stock: 10, featured: false, rating: 4.7, reviewCount: 35,
    specs: { 'Type': 'Grid-Tie', 'Power': '10kW', 'Input Voltage': '1000V DC', 'Output': '400V 3-Phase', 'MPPT': '2 x 6kW', 'Warranty': '5 Years' }
  },
  {
    id: 'p-15', name: 'Victron MultiPlus-II 3kVA', slug: 'victron-multiplus-ii-3kva',
    description: 'Premium compact inverter/charger with PowerAssist technology. Unique feature: combines inverter, battery charger, and transfer switch in one unit.',
    price: 520000, salePrice: null, images: ['/images/products/inverter-1.png'],
    brand: 'Victron', model: 'MultiPlus-II 24/3000', powerCapacity: '3kVA',
    categoryId: 'cat-3', vendorId: 'v-4', stock: 8, featured: true, rating: 4.9, reviewCount: 112,
    specs: { 'Type': 'Hybrid', 'Power': '3kVA / 2.4kW', 'Input': '24V DC', 'Output': '230V AC', 'Charger': '70A', 'Warranty': '5 Years' }
  },

  // Accessories
  {
    id: 'p-16', name: 'Solar Panel Mounting Kit (4 Panels)', slug: 'mounting-kit-4-panels',
    description: 'Complete roof mounting system for 4 solar panels. Heavy-duty aluminum rails with stainless steel clamps. Includes all necessary hardware for installation.',
    price: 85000, salePrice: 72000, images: ['/images/products/accessory-1.png'],
    brand: 'IronRidge', model: 'XR100', powerCapacity: null,
    categoryId: 'cat-4', vendorId: 'v-2', stock: 50, featured: false, rating: 4.4, reviewCount: 45,
    specs: { 'Material': 'Aluminum + Stainless Steel', 'Panels': 'Up to 4', 'Rail Length': '4m x 2', 'Weight Capacity': '50kg/m', 'Warranty': '10 Years' }
  },
  {
    id: 'p-17', name: 'MC4 Solar Connectors (10 Pairs)', slug: 'mc4-connectors-10-pairs',
    description: 'IP67 waterproof MC4 connectors for solar panel connections. Gold-plated pins for maximum conductivity with UV-resistant housing.',
    price: 12000, salePrice: null, images: ['/images/products/accessory-1.png'],
    brand: 'Stäubli', model: 'MC4', powerCapacity: null,
    categoryId: 'cat-4', vendorId: 'v-2', stock: 200, featured: false, rating: 4.6, reviewCount: 234,
    specs: { 'Current Rating': '30A', 'Voltage Rating': '1000V DC', 'Protection': 'IP67', 'Contact': 'Gold-Plated', 'Warranty': '5 Years' }
  },
  {
    id: 'p-18', name: '6mm² Solar Cable (100m)', slug: 'solar-cable-6mm-100m',
    description: 'TUV-certified solar DC cable with excellent UV and weather resistance. Double insulated for outdoor installation with flame retardant properties.',
    price: 45000, salePrice: 38000, images: ['/images/products/accessory-1.png'],
    brand: 'Lapp', model: 'Ölflex Solar', powerCapacity: null,
    categoryId: 'cat-4', vendorId: 'v-2', stock: 80, featured: false, rating: 4.5, reviewCount: 167,
    specs: { 'Size': '6mm²', 'Length': '100m', 'Rating': '1000V DC', 'Temperature': '-40°C to +90°C', 'Certification': 'TUV 2 PfG 1169/08' }
  },
  {
    id: 'p-19', name: 'Solar Power Optimizer 350W', slug: 'solar-optimizer-350w',
    description: 'Module-level power optimizer for maximum energy harvest. Mitigates shading effects and enables panel-level monitoring via cloud platform.',
    price: 35000, salePrice: 30000, images: ['/images/products/accessory-1.png'],
    brand: 'SolarEdge', model: 'P350', powerCapacity: '350W',
    categoryId: 'cat-4', vendorId: 'v-2', stock: 120, featured: true, rating: 4.7, reviewCount: 78,
    specs: { 'Power': '350W', 'Input Voltage': '8-60V', 'Output': '8-80V', 'Efficiency': '99.5%', 'Weight': '0.78 kg', 'Warranty': '25 Years' }
  },
  {
    id: 'p-20', name: 'Battery Rack Cabinet 19"', slug: 'battery-rack-cabinet-19',
    description: 'Professional 19-inch rack cabinet for housing battery modules and inverters. Ventilated design with cable management and locking doors.',
    price: 125000, salePrice: null, images: ['/images/products/accessory-1.png'],
    brand: 'Rittal', model: 'AE 1060', powerCapacity: null,
    categoryId: 'cat-4', vendorId: 'v-2', stock: 15, featured: false, rating: 4.3, reviewCount: 19,
    specs: { 'Size': '42U / 19"', 'Dimensions': '600x800x2000mm', 'Load Capacity': '800kg', 'Material': 'Steel', 'Color': 'RAL 7035' }
  },
  {
    id: 'p-21', name: 'Combiner Box 6-String', slug: 'combiner-box-6-string',
    description: 'PV combiner box with 6 input strings, surge protection, and DC disconnect. Streamlines wiring from multiple panel strings to the inverter.',
    price: 28000, salePrice: 24000, images: ['/images/products/accessory-1.png'],
    brand: 'SMA', model: 'CB-6', powerCapacity: null,
    categoryId: 'cat-4', vendorId: 'v-2', stock: 60, featured: false, rating: 4.5, reviewCount: 56,
    specs: { 'Inputs': '6 Strings', 'Max Current': '30A/string', 'Voltage': '1000V DC', 'Protection': 'SPD Type II', 'IP Rating': 'IP65' }
  },
];

// ─── Reviews ───
export const reviews: Review[] = [
  { id: 'r-1', userId: 'u-10', productId: 'p-1', rating: 5, title: 'Outstanding performance!', comment: 'These panels exceeded my expectations. Generating more power than rated even on cloudy days. The build quality is exceptional and SunPower support has been great.', verified: true, createdAt: '2024-12-15', user: { id: 'u-10', email: 'ade@test.com', name: 'Adeola Johnson', role: 'user', createdAt: '2024-01-01' } },
  { id: 'r-2', userId: 'u-11', productId: 'p-1', rating: 5, title: 'Best investment ever', comment: 'After 6 months of use, these panels have reduced my electricity bill by 80%. The efficiency is unmatched and installation was straightforward.', verified: true, createdAt: '2024-11-20', user: { id: 'u-11', email: 'emeka@test.com', name: 'Emeka Okafor', role: 'user', createdAt: '2024-02-01' } },
  { id: 'r-3', userId: 'u-12', productId: 'p-1', rating: 4, title: 'Great quality, bit pricey', comment: 'The panels are excellent quality with impressive output. Only concern is the higher price point compared to alternatives, but the performance justifies it.', verified: true, createdAt: '2024-10-05', user: { id: 'u-12', email: 'kemi@test.com', name: 'Kemi Adeyemi', role: 'user', createdAt: '2024-03-01' } },
  { id: 'r-4', userId: 'u-13', productId: 'p-7', rating: 5, title: 'Reliable energy storage', comment: 'This battery system has been running flawlessly for 4 months. The BMS works perfectly and the app integration makes monitoring easy. Highly recommended!', verified: true, createdAt: '2024-12-01', user: { id: 'u-13', email: 'chidi@test.com', name: 'Chidi Nwosu', role: 'user', createdAt: '2024-04-01' } },
  { id: 'r-5', userId: 'u-14', productId: 'p-12', rating: 5, title: 'Perfect hybrid solution', comment: 'The Deye inverter handles grid-tie, battery, and backup seamlessly. The touchscreen interface is intuitive and the WiFi monitoring app works great.', verified: true, createdAt: '2024-11-10', user: { id: 'u-14', email: 'blessing@test.com', name: 'Blessing Obi', role: 'user', createdAt: '2024-05-01' } },
  { id: 'r-6', userId: 'u-15', productId: 'p-2', rating: 4, title: 'Good value for money', comment: 'The Jinko panels offer excellent value. Performance is comparable to more expensive brands. Delivery was fast and well-packaged.', verified: true, createdAt: '2024-12-08', user: { id: 'u-15', email: 'tunde@test.com', name: 'Tunde Bakare', role: 'user', createdAt: '2024-06-01' } },
  { id: 'r-7', userId: 'u-16', productId: 'p-8', rating: 5, title: 'Compact and powerful', comment: 'BYD has done it again. This compact battery module packs serious energy. The modular design means I can easily add more capacity later.', verified: true, createdAt: '2024-11-25', user: { id: 'u-16', email: 'funke@test.com', name: 'Funke Adekunle', role: 'user', createdAt: '2024-07-01' } },
  { id: 'r-8', userId: 'u-17', productId: 'p-15', rating: 5, title: 'Premium quality', comment: 'Victron is the gold standard. This MultiPlus-II has been running my entire home for 3 months with zero issues. Worth every naira.', verified: true, createdAt: '2024-10-20', user: { id: 'u-17', email: 'musa@test.com', name: 'Musa Ibrahim', role: 'user', createdAt: '2024-08-01' } },
];

// ─── Blog Posts ───
export const blogPosts: BlogPost[] = [
  {
    id: 'b-1', title: 'How to Choose the Right Solar Panels for Your Home', slug: 'choose-right-solar-panels',
    excerpt: 'A comprehensive guide to selecting solar panels based on efficiency, cost, roof space, and energy needs.',
    content: `<h2>Understanding Solar Panel Types</h2><p>When choosing solar panels, it's important to understand the three main types available: monocrystalline, polycrystalline, and thin-film. Each has its advantages and ideal use cases.</p><h2>Key Factors to Consider</h2><p>Look at efficiency ratings (typically 15-22%), power output (measured in watts), temperature coefficients, and warranty terms. Higher efficiency panels produce more power per square meter, making them ideal for limited roof space.</p><h2>Calculating Your Needs</h2><p>Start by analyzing your monthly electricity bills to determine your average consumption. A typical Nigerian home uses 2,000-5,000 kWh annually. For this range, a 3-5kW system is usually sufficient.</p><h2>Brand Recommendations</h2><p>Top brands like SunPower, Jinko Solar, and Canadian Solar offer reliable products with strong warranties. Always check for TUV and IEC certifications before purchasing.</p>`,
    image: '/images/hero-solar.png', author: 'Iclark Tech Team', published: true, createdAt: '2024-12-01'
  },
  {
    id: 'b-2', title: 'Solar Battery Storage: Complete Buyer\'s Guide', slug: 'solar-battery-buyers-guide',
    excerpt: 'Everything you need to know about solar batteries, from lithium iron phosphate to lead-acid options.',
    content: `<h2>Why Battery Storage Matters</h2><p>Solar batteries store excess energy produced during the day for use at night or during power outages. They are essential for energy independence and can significantly reduce your reliance on the grid.</p><h2>Types of Solar Batteries</h2><p>Lithium Iron Phosphate (LFP) batteries are the most popular choice due to their long lifespan (6000+ cycles), safety, and decreasing costs. Lead-acid batteries remain a budget option but have shorter lifespans.</p><h2>Sizing Your Battery</h2><p>A typical Nigerian home needs 5-15kWh of storage for comfortable overnight use. Consider your essential loads: lighting, refrigeration, fans, and electronics.</p>`,
    image: '/images/hero-solar.png', author: 'Iclark Tech Team', published: true, createdAt: '2024-11-15'
  },
  {
    id: 'b-3', title: 'Complete Solar Installation Guide for Beginners', slug: 'solar-installation-guide',
    excerpt: 'Step-by-step guide to installing your own solar power system safely and efficiently.',
    content: `<h2>Planning Your Installation</h2><p>Before purchasing equipment, assess your roof condition, orientation, and available space. South-facing roofs with minimal shading are ideal in Nigeria's location near the equator.</p><h2>Components You'll Need</h2><p>A complete system includes: solar panels, inverter, batteries, mounting hardware, cables, connectors, combiner box, and protection devices. Don't forget about proper earthing and surge protection.</p><h2>Safety First</h2><p>Solar installations involve high DC voltages. Always follow NEC/IEC standards, use proper PPE, and consider hiring a certified installer for complex systems.</p>`,
    image: '/images/hero-solar.png', author: 'Iclark Tech Team', published: true, createdAt: '2024-11-01'
  },
  {
    id: 'b-4', title: 'Understanding Solar Inverters: Hybrid vs Off-Grid vs Grid-Tie', slug: 'understanding-solar-inverters',
    excerpt: 'Learn the differences between inverter types and which one is right for your energy needs.',
    content: `<h2>Grid-Tie Inverters</h2><p>These convert DC power from panels directly to AC for your home and grid. They're the simplest and most cost-effective option but require grid power to function.</p><h2>Off-Grid Inverters</h2><p>Designed for standalone systems without grid connection. They draw power from batteries and solar panels, providing complete energy independence.</p><h2>Hybrid Inverters</h2><p>The best of both worlds - hybrid inverters can work with or without the grid, manage battery charging, and even feed excess power back to the grid. They are the most versatile option.</p>`,
    image: '/images/hero-solar.png', author: 'Iclark Tech Team', published: true, createdAt: '2024-10-15'
  },
];

// ─── Sample Users ───
export const sampleUsers: User[] = [
  { id: 'u-1', email: 'admin@iclarke.com', name: 'Admin User', role: 'admin', createdAt: '2024-01-01' },
  { id: 'u-2', email: 'sunpower@iclarke.com', name: 'Kunle Adebayo', role: 'vendor', phone: '+2348012345678', company: 'SunPower Nigeria', createdAt: '2024-01-15' },
  { id: 'u-3', email: 'greentech@iclarke.com', name: 'Chioma Eze', role: 'vendor', phone: '+2348023456789', company: 'GreenTech Solutions', createdAt: '2024-02-01' },
  { id: 'u-4', email: 'solarmax@iclarke.com', name: 'Ibrahim Musa', role: 'vendor', phone: '+2348034567890', company: 'SolarMax Energy', createdAt: '2024-02-15' },
  { id: 'u-5', email: 'powergrid@iclarke.com', name: 'Bola Tinubu', role: 'vendor', phone: '+2348045678901', company: 'PowerGrid Systems', createdAt: '2024-03-01' },
  { id: 'u-100', email: 'user@example.com', name: 'John Doe', role: 'user', phone: '+2348056789012', address: '12 Solar Street', city: 'Lagos', state: 'Lagos', country: 'Nigeria', createdAt: '2024-06-01' },
];

// ─── Helper functions ───
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.categoryId === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}

export function getVendorById(id: string): Vendor | undefined {
  return vendors.find(v => v.id === id);
}

export function getReviewsByProduct(productId: string): Review[] {
  return reviews.filter(r => r.productId === productId);
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(b => b.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand?.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.powerCapacity?.toLowerCase().includes(q)
  );
}

export function filterProducts(filters: {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  search?: string;
  sortBy?: string;
}): Product[] {
  let result = [...products];

  if (filters.search) {
    result = searchProducts(filters.search);
  }
  if (filters.category) {
    result = result.filter(p => p.categoryId === filters.category);
  }
  if (filters.brand) {
    result = result.filter(p => p.brand?.toLowerCase() === filters.brand?.toLowerCase());
  }
  if (filters.minPrice !== undefined) {
    result = result.filter(p => (p.salePrice || p.price) >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter(p => (p.salePrice || p.price) <= filters.maxPrice!);
  }
  if (filters.rating) {
    result = result.filter(p => p.rating >= filters.rating!);
  }
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price_asc': result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price)); break;
      case 'price_desc': result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => b.id.localeCompare(a.id)); break;
    }
  }

  return result;
}

export function getUniqueBrands(): string[] {
  return [...new Set(products.map(p => p.brand).filter(Boolean))] as string[];
}

export function formatPrice(price: number): string {
  return `₦${price.toLocaleString('en-NG')}`;
}
