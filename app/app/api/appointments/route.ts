
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lawyerId = searchParams.get('lawyerId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    const where: any = {};

    if (lawyerId) {
      where.lawyerId = lawyerId;
    }

    if (status) {
      where.status = status;
    }

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        orderBy: { date: 'desc' },
        skip,
        take: limit,
        include: {
          lawyer: {
            include: {
              city: true,
            },
          },
        },
      }),
      prisma.appointment.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      appointments,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des rendez-vous' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      lawyerId,
      clientName,
      clientEmail,
      clientPhone,
      date,
      duration = 60,
      type = 'consultation',
      mode = 'physique',
      subject,
      message,
    } = body;

    // Validate required fields
    if (!lawyerId || !clientName || !clientEmail || !date || !subject) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants' },
        { status: 400 }
      );
    }

    // Check if lawyer exists and is active
    const lawyer = await prisma.lawyer.findFirst({
      where: {
        id: lawyerId,
        isActive: true,
      },
    });

    if (!lawyer) {
      return NextResponse.json(
        { error: 'Avocat non trouvé ou inactif' },
        { status: 404 }
      );
    }

    // Check for appointment conflicts
    const appointmentDate = new Date(date);
    const endTime = new Date(appointmentDate.getTime() + duration * 60000);

    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        lawyerId,
        status: { in: ['pending', 'confirmed'] },
        date: {
          lt: endTime,
        },
        AND: {
          // Check if the end time of existing appointment overlaps
          date: {
            gte: new Date(appointmentDate.getTime() - 60 * 60000), // 1 hour buffer
          },
        },
      },
    });

    if (conflictingAppointment) {
      return NextResponse.json(
        { error: 'Créneau non disponible' },
        { status: 409 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        lawyerId,
        clientName,
        clientEmail,
        clientPhone,
        date: appointmentDate,
        duration,
        type,
        mode,
        subject,
        message,
        status: 'pending',
      },
      include: {
        lawyer: {
          include: {
            city: true,
          },
        },
      },
    });

    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du rendez-vous' },
      { status: 500 }
    );
  }
}
