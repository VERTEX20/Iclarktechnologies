import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy');
    const featured = searchParams.get('featured');

    const where: Record<string, unknown> = {};

    if (category) where.categoryId = category;
    if (brand) where.brand = brand;
    if (featured === 'true') where.featured = true;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { brand: { contains: search } },
        { description: { contains: search } },
      ];
    }
    if (minPrice || maxPrice) {
      const priceFilter: Record<string, number> = {};
      if (minPrice) priceFilter.gte = parseFloat(minPrice);
      if (maxPrice) priceFilter.lte = parseFloat(maxPrice);
      where.price = priceFilter;
    }

    const orderBy: Record<string, string> = {};
    if (sortBy === 'price_asc') orderBy.price = 'asc';
    else if (sortBy === 'price_desc') orderBy.price = 'desc';
    else if (sortBy === 'rating') orderBy.rating = 'desc';
    else orderBy.createdAt = 'desc';

    const products = await db.product.findMany({
      where,
      orderBy,
      include: {
        category: true,
        vendor: { include: { user: true } },
      },
      take: 50,
    });

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, salePrice, images, brand, model, powerCapacity, categoryId, vendorId, stock, specs } = body;

    const product = await db.product.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
        description,
        price: parseFloat(price),
        salePrice: salePrice ? parseFloat(salePrice) : null,
        images: JSON.stringify(images || []),
        brand,
        model,
        powerCapacity,
        categoryId,
        vendorId,
        stock: parseInt(stock) || 0,
        specs: specs ? JSON.stringify(specs) : null,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}
