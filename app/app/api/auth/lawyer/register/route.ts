
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma as db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { 
      email, 
      password, 
      nomComplet, 
      ville, 
      adresseCabinet, 
      telephone, 
      anneesExperience, 
      biographie,
      cityId,
      specializations = [],
      fiscalDomains = []
    } = await request.json();

    if (!email || !password || !nomComplet) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existingAuth = await db.lawyerAuth.findUnique({
      where: { email }
    });

    if (existingAuth) {
      return NextResponse.json(
        { error: 'Un compte avec cet email existe déjà' },
        { status: 400 }
      );
    }

    // Hacher le mot de passe
    const passwordHash = await bcrypt.hash(password, 12);

    // Créer le slug
    const slug = nomComplet
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Créer l'avocat et son authentification
    const lawyer = await db.lawyer.create({
      data: {
        nomComplet,
        ville,
        adresseCabinet,
        telephone,
        email,
        anneesExperience: parseInt(anneesExperience) || 0,
        biographie,
        slug: `${slug}-${Date.now()}`, // Ajouter timestamp pour unicité
        cityId,
        isActive: false, // Inactif jusqu'à validation admin
        specializations: {
          connect: specializations.map((id: string) => ({ id }))
        },
        fiscalDomains: {
          connect: fiscalDomains.map((id: string) => ({ id }))
        },
        auth: {
          create: {
            email,
            passwordHash,
            isVerified: false,
            role: 'lawyer'
          }
        }
      },
      include: {
        city: true,
        specializations: true,
        fiscalDomains: true,
        auth: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Compte créé avec succès. En attente de validation par notre équipe.',
      lawyerId: lawyer.id
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
