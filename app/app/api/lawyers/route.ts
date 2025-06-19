
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ville = searchParams.get('ville');
    const specialite = searchParams.get('specialite');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '10');
    const premium = searchParams.get('premium');

    const where: any = {
      isActive: true,
    };

    if (ville && ville !== 'all') {
      where.ville = ville;
    }

    if (premium === 'true') {
      where.isPremium = true;
    }

    if (search) {
      where.OR = [
        { nomComplet: { contains: search, mode: 'insensitive' } },
        { biographie: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (specialite && specialite !== 'all') {
      where.specializations = {
        some: {
          slug: specialite,
        },
      };
    }

    const lawyers = await prisma.lawyer.findMany({
      where,
      include: {
        city: true,
        specializations: true,
      },
      orderBy: [
        { isPremium: 'desc' },
        { createdAt: 'desc' },
      ],
      take: limit,
    });

    return NextResponse.json({ lawyers });
  } catch (error) {
    console.error('Error fetching lawyers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lawyers' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
