
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prenom, nom, email, telephone, message } = body;

    // Basic validation
    if (!prenom || !nom || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        prenom,
        nom,
        email,
        telephone: telephone || '',
        message,
      },
    });

    return NextResponse.json(
      { message: 'Contact message saved successfully', id: contact.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json(
      { error: 'Failed to save contact message' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
