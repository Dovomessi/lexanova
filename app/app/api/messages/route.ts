
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lawyerId = searchParams.get('lawyerId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!lawyerId) {
      return NextResponse.json(
        { error: 'ID avocat requis' },
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where: { lawyerId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.message.count({ where: { lawyerId } }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      messages,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      lawyerId,
      subject,
      content,
      senderType = 'client',
      senderName,
      senderEmail,
    } = body;

    if (!lawyerId || !subject || !content || !senderName || !senderEmail) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants' },
        { status: 400 }
      );
    }

    const message = await prisma.message.create({
      data: {
        lawyerId,
        subject,
        content,
        senderType,
        senderName,
        senderEmail,
      },
    });

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du message' },
      { status: 500 }
    );
  }
}
