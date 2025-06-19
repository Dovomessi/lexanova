
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const fiscalDomains = await prisma.fiscalDomain.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: {
            articles: { where: { isPublished: true } },
            blogPosts: { where: { isPublished: true } },
            caseStudies: { where: { isPublished: true } },
            lawyers: { where: { isActive: true } },
            resources: { where: { isPublic: true } },
          },
        },
      },
    });

    return NextResponse.json({ fiscalDomains });
  } catch (error) {
    console.error('Error fetching fiscal domains:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des domaines fiscaux' },
      { status: 500 }
    );
  }
}
