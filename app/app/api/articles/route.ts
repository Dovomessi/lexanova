
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '6');

    const where: any = {
      isPublished: true,
    };

    if (category && category !== 'all') {
      where.category = {
        slug: category,
      };
    }

    const articles = await prisma.article.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: limit,
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
