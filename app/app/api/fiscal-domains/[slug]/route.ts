
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const fiscalDomain = await prisma.fiscalDomain.findUnique({
      where: { slug: params.slug },
      include: {
        articles: {
          where: { isPublished: true },
          orderBy: { publishedAt: 'desc' },
          take: 10,
        },
        blogPosts: {
          where: { isPublished: true },
          orderBy: { publishedAt: 'desc' },
          take: 10,
        },
        caseStudies: {
          where: { isPublished: true },
          orderBy: { publishedAt: 'desc' },
          take: 10,
        },
        lawyers: {
          where: { isActive: true },
          orderBy: { isPremium: 'desc' },
          take: 12,
          include: {
            city: true,
            specializations: true,
          },
        },
        resources: {
          where: { isPublic: true },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!fiscalDomain) {
      return NextResponse.json(
        { error: 'Domaine fiscal non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ fiscalDomain });
  } catch (error) {
    console.error('Error fetching fiscal domain:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du domaine fiscal' },
      { status: 500 }
    );
  }
}
