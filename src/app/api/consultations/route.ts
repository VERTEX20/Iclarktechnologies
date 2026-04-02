import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, name, email, phone, topic, message, scheduledAt } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Name, email, and message are required' }, { status: 400 });
    }

    const consultation = await db.consultation.create({
      data: {
        userId,
        name,
        email,
        phone,
        topic,
        message,
        status: 'pending',
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      },
    });

    return NextResponse.json({ success: true, consultation });
  } catch (error) {
    console.error('Error creating consultation:', error);
    return NextResponse.json({ success: false, error: 'Failed to create consultation' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const where: Record<string, unknown> = {};
    if (userId) where.userId = userId;

    const consultations = await db.consultation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, consultations });
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch consultations' }, { status: 500 });
  }
}
