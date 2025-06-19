
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const fiscalDomainSlug = searchParams.get('domain');
    const complexity = searchParams.get('complexity');
    const featured = searchParams.get('featured') === 'true';

    const skip = (page - 1) * limit;

    const where: any = { isPublished: true };

    if (fiscalDomainSlug) {
      where.fiscalDomain = { slug: fiscalDomainSlug };
    }

    if (complexity) {
      where.complexity = complexity;
    }

    if (featured) {
      where.isFeatured = true;
    }

    const [caseStudies, total] = await Promise.all([
      prisma.caseStudy.findMany({
        where,
        orderBy: [
          { isFeatured: 'desc' },
          { publishedAt: 'desc' },
        ],
        skip,
        take: limit,
        include: {
          fiscalDomain: true,
        },
      }),
      prisma.caseStudy.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      caseStudies,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des cas pratiques' },
      { status: 500 }
    );
  }
}
