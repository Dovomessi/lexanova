
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const blogTags = await prisma.blogTag.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            blogPosts: { where: { isPublished: true } },
          },
        },
      },
    });

    return NextResponse.json({ blogTags });
  } catch (error) {
    console.error('Error fetching blog tags:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des tags' },
      { status: 500 }
    );
  }
}
