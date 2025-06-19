
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const fiscalDomainSlug = searchParams.get('domain');
    const tag = searchParams.get('tag');
    const featured = searchParams.get('featured') === 'true';

    const skip = (page - 1) * limit;

    const where: any = { isPublished: true };

    if (fiscalDomainSlug) {
      where.fiscalDomain = { slug: fiscalDomainSlug };
    }

    if (tag) {
      where.tags = { some: { slug: tag } };
    }

    if (featured) {
      where.isFeatured = true;
    }

    const [blogPosts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: [
          { isFeatured: 'desc' },
          { publishedAt: 'desc' },
        ],
        skip,
        take: limit,
        include: {
          fiscalDomain: true,
          tags: true,
        },
      }),
      prisma.blogPost.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      blogPosts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des articles de blog' },
      { status: 500 }
    );
  }
}
