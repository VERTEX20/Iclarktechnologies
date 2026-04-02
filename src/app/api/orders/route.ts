import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, address, city, state, phone, paymentMethod, items, totalAmount, shippingFee } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, error: 'No items in order' }, { status: 400 });
    }

    const order = await db.order.create({
      data: {
        userId,
        address,
        city,
        state,
        phone,
        paymentMethod: paymentMethod || 'card',
        totalAmount: parseFloat(totalAmount),
        shippingFee: parseFloat(shippingFee) || 0,
        paymentStatus: 'pending',
        status: 'pending',
        items: {
          create: items.map((item: { productId: string; quantity: number; price: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: parseFloat(String(item.price)),
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID required' }, { status: 400 });
    }

    const orders = await db.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { items: { include: { product: true } } },
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch orders' }, { status: 500 });
  }
}
