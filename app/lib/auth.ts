
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { prisma as db } from '@/lib/db';

export interface LawyerToken {
  lawyerId: string;
  email: string;
  role: string;
}

export async function verifyLawyerToken(request: NextRequest): Promise<LawyerToken | null> {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as LawyerToken;
    
    // Vérifier que l'avocat existe toujours
    const lawyerAuth = await db.lawyerAuth.findUnique({
      where: { lawyerId: decoded.lawyerId }
    });

    if (!lawyerAuth || !lawyerAuth.isVerified) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error('Erreur vérification token:', error);
    return null;
  }
}

export function requireAuth(handler: (request: NextRequest, token: LawyerToken) => Promise<Response>) {
  return async (request: NextRequest) => {
    const token = await verifyLawyerToken(request);
    
    if (!token) {
      return new Response(JSON.stringify({ error: 'Non autorisé' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return handler(request, token);
  };
}

export function requireAdmin(handler: (request: NextRequest, token: LawyerToken) => Promise<Response>) {
  return async (request: NextRequest) => {
    const token = await verifyLawyerToken(request);
    
    if (!token || token.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Non autorisé - Admin requis' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return handler(request, token);
  };
}
