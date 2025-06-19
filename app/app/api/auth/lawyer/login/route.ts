
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { prisma as db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Chercher l'avocat avec son auth
    const lawyerAuth = await db.lawyerAuth.findUnique({
      where: { email },
      include: {
        lawyer: {
          include: {
            city: true,
            specializations: true,
            fiscalDomains: true
          }
        }
      }
    });

    if (!lawyerAuth) {
      return NextResponse.json(
        { error: 'Identifiants invalides' },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    const passwordValid = await bcrypt.compare(password, lawyerAuth.passwordHash);
    if (!passwordValid) {
      return NextResponse.json(
        { error: 'Identifiants invalides' },
        { status: 401 }
      );
    }

    if (!lawyerAuth.isVerified) {
      return NextResponse.json(
        { error: 'Compte non vérifié' },
        { status: 401 }
      );
    }

    // Générer le JWT
    const token = jwt.sign(
      { 
        lawyerId: lawyerAuth.lawyerId,
        email: lawyerAuth.email,
        role: lawyerAuth.role
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Réponse avec le token en cookie
    const response = NextResponse.json({
      success: true,
      lawyer: {
        id: lawyerAuth.lawyer.id,
        nomComplet: lawyerAuth.lawyer.nomComplet,
        email: lawyerAuth.email,
        ville: lawyerAuth.lawyer.ville,
        role: lawyerAuth.role,
        isPremium: lawyerAuth.lawyer.isPremium
      }
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
