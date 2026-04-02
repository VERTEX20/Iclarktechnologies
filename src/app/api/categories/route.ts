import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: { select: { products: true } },
      },
    });

    const formatted = categories.map(c => ({
      ...c,
      productCount: c._count.products,
      _count: undefined,
    }));

    return NextResponse.json({ success: true, categories: formatted });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch categories' }, { status: 500 });
  }
}
