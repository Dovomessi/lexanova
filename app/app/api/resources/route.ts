
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const fiscalDomainSlug = searchParams.get('domain');
    const type = searchParams.get('type');

    const skip = (page - 1) * limit;

    const where: any = { isPublic: true };

    if (fiscalDomainSlug) {
      where.fiscalDomain = { slug: fiscalDomainSlug };
    }

    if (type) {
      where.type = type;
    }

    const [resources, total] = await Promise.all([
      prisma.resource.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          fiscalDomain: true,
        },
      }),
      prisma.resource.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      resources,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des ressources' },
      { status: 500 }
    );
  }
}
