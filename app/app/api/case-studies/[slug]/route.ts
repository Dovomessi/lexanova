
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { slug: params.slug },
      include: {
        fiscalDomain: true,
      },
    });

    if (!caseStudy || !caseStudy.isPublished) {
      return NextResponse.json(
        { error: 'Cas pratique non trouvé' },
        { status: 404 }
      );
    }

    // Get related case studies
    const relatedCaseStudies = await prisma.caseStudy.findMany({
      where: {
        id: { not: caseStudy.id },
        isPublished: true,
        fiscalDomainId: caseStudy.fiscalDomainId,
      },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      include: {
        fiscalDomain: true,
      },
    });

    return NextResponse.json({ caseStudy, relatedCaseStudies });
  } catch (error) {
    console.error('Error fetching case study:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du cas pratique' },
      { status: 500 }
    );
  }
}
