
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const resource = await prisma.resource.findUnique({
      where: { slug: params.slug },
    });

    if (!resource || !resource.isPublic) {
      return NextResponse.json(
        { error: 'Ressource non trouvée' },
        { status: 404 }
      );
    }

    // Increment download count
    await prisma.resource.update({
      where: { id: resource.id },
      data: { downloadCount: { increment: 1 } },
    });

    // In a real application, you would serve the actual file here
    // For now, we'll return the download URL or file information
    return NextResponse.json({
      resource: {
        title: resource.title,
        description: resource.description,
        format: resource.format,
        fileSize: resource.fileSize,
        downloadUrl: resource.fileUrl || `/downloads/${resource.slug}.${resource.format?.toLowerCase()}`,
      },
      message: 'Téléchargement initié',
    });
  } catch (error) {
    console.error('Error downloading resource:', error);
    return NextResponse.json(
      { error: 'Erreur lors du téléchargement' },
      { status: 500 }
    );
  }
}
