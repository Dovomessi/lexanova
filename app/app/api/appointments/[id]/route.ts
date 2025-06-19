
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
      include: {
        lawyer: {
          include: {
            city: true,
          },
        },
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: 'Rendez-vous non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ appointment });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du rendez-vous' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, date, duration, message } = body;

    const updateData: any = {};

    if (status) updateData.status = status;
    if (date) updateData.date = new Date(date);
    if (duration) updateData.duration = duration;
    if (message !== undefined) updateData.message = message;

    const appointment = await prisma.appointment.update({
      where: { id: params.id },
      data: updateData,
      include: {
        lawyer: {
          include: {
            city: true,
          },
        },
      },
    });

    return NextResponse.json({ appointment });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du rendez-vous' },
      { status: 500 }
    );
  }
}
