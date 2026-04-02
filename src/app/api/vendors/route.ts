import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const vendors = await db.vendor.findMany({
      include: {
        user: true,
        _count: { select: { products: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, vendors });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch vendors' }, { status: 500 });
  }
}
