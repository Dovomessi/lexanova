
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma as db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      simulationId,
      simulatorType,
      inputData,
      resultData,
      userEmail
    } = body;

    if (!simulatorType || !inputData || !resultData || !userEmail) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Générer le contenu HTML pour le PDF
    const htmlContent = generatePDFContent(simulatorType, inputData, resultData);
    
    // En production, ici on utiliserait une librairie comme Puppeteer
    // Pour cette démo, on simule la génération du PDF
    const pdfBuffer = Buffer.from(htmlContent, 'utf-8');
    
    // Marquer la simulation comme ayant généré un PDF
    if (simulationId) {
      await db.simulationHistory.update({
        where: { id: simulationId },
        data: { pdfGenerated: true }
      });
    }

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="simulation-${simulatorType}-${new Date().toISOString().split('T')[0]}.pdf"`
      }
    });
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

function generatePDFContent(simulatorType: string, inputData: any, resultData: any): string {
  const date = new Date().toLocaleDateString('fr-FR');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Simulation ${simulatorType}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px; }
        h2 { color: #374151; margin-top: 30px; }
        .section { margin: 20px 0; padding: 15px; background: #f9fafb; border-radius: 8px; }
        .result { background: #ecfdf5; border-left: 4px solid #10b981; }
        .warning { background: #fef3c7; border-left: 4px solid #f59e0b; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: #f3f4f6; font-weight: bold; }
        .amount { font-weight: bold; color: #1e40af; }
      </style>
    </head>
    <body>
      <h1>Simulation Fiscale - ${simulatorType}</h1>
      <p><strong>Date de génération :</strong> ${date}</p>
      
      <div class="section">
        <h2>Données saisies</h2>
        <pre>${JSON.stringify(inputData, null, 2)}</pre>
      </div>
      
      <div class="section result">
        <h2>Résultats</h2>
        <pre>${JSON.stringify(resultData, null, 2)}</pre>
      </div>
      
      <div class="section warning">
        <h2>Avertissement</h2>
        <p>Cette simulation est fournie à titre indicatif et ne saurait se substituer aux conseils d'un avocat fiscaliste. Les résultats peuvent varier selon votre situation particulière et l'évolution de la législation.</p>
        <p><strong>Lexanova</strong> - Plateforme de conseil fiscal</p>
      </div>
    </body>
    </html>
  `;
}
