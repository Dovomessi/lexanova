
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const blogPost = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
      include: {
        fiscalDomain: true,
        tags: true,
      },
    });

    if (!blogPost || !blogPost.isPublished) {
      return NextResponse.json(
        { error: 'Article de blog non trouvé' },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.blogPost.update({
      where: { id: blogPost.id },
      data: { views: { increment: 1 } },
    });

    // Get related posts
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        id: { not: blogPost.id },
        isPublished: true,
        OR: [
          { fiscalDomainId: blogPost.fiscalDomainId },
          { tags: { some: { id: { in: blogPost.tags.map(tag => tag.id) } } } },
        ],
      },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      include: {
        fiscalDomain: true,
        tags: true,
      },
    });

    return NextResponse.json({ blogPost, relatedPosts });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'article de blog' },
      { status: 500 }
    );
  }
}
