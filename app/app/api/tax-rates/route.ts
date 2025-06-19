
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma as db } from '@/lib/db';

// Récupérer les taux fiscaux actifs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const where: any = {
      isActive: true,
      validFrom: { lte: new Date() },
      OR: [
        { validTo: null },
        { validTo: { gte: new Date() } }
      ]
    };

    if (category) {
      where.category = category;
    }

    const taxRates = await db.taxRate.findMany({
      where,
      orderBy: [
        { category: 'asc' },
        { name: 'asc' }
      ]
    });

    return NextResponse.json(taxRates);
  } catch (error) {
    console.error('Erreur lors de la récupération des taux:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// Créer/Mettre à jour des taux fiscaux (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      category,
      name,
      value,
      description,
      validFrom,
      validTo
    } = body;

    if (!category || !name || value === undefined || !validFrom) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    const taxRate = await db.taxRate.create({
      data: {
        category,
        name,
        value,
        description,
        validFrom: new Date(validFrom),
        validTo: validTo ? new Date(validTo) : null
      }
    });

    return NextResponse.json(taxRate);
  } catch (error) {
    console.error('Erreur lors de la création du taux:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
