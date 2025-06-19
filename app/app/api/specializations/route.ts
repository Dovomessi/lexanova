
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const specializations = await prisma.specialization.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({ specializations });
  } catch (error) {
    console.error('Error fetching specializations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch specializations' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
