
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma as db } from '@/lib/db';

// Sauvegarder une simulation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      simulatorType,
      userEmail,
      inputData,
      resultData,
      pdfGenerated = false
    } = body;

    if (!simulatorType || !userEmail || !inputData || !resultData) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Récupérer les informations de la requête
    const userAgent = request.headers.get('user-agent') || '';
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    const simulation = await db.simulationHistory.create({
      data: {
        simulatorType,
        userEmail,
        inputData: JSON.stringify(inputData),
        resultData: JSON.stringify(resultData),
        pdfGenerated,
        userAgent,
        ipAddress
      }
    });

    return NextResponse.json(simulation);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la simulation:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// Récupérer l'historique des simulations pour un email
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email');
    const simulatorType = searchParams.get('type');

    if (!userEmail) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      );
    }

    const where: any = { userEmail };
    if (simulatorType) {
      where.simulatorType = simulatorType;
    }

    const simulations = await db.simulationHistory.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 50 // Limiter à 50 simulations
    });

    return NextResponse.json(simulations);
  } catch (error) {
    console.error('Erreur lors de la récupération des simulations:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
