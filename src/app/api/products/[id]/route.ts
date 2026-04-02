import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const product = await db.product.findUnique({
        where: { id },
        include: {
          category: true,
          vendor: { include: { user: true } },
          reviews: { include: { user: true }, orderBy: { createdAt: 'desc' } },
        },
      });

      if (!product) {
        return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, product });
    }

    return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch product' }, { status: 500 });
  }
}
