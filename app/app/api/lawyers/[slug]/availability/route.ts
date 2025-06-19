
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const lawyer = await prisma.lawyer.findUnique({
      where: { slug: params.slug },
      include: {
        availabilities: {
          where: { isActive: true },
          orderBy: { dayOfWeek: 'asc' },
        },
        appointments: {
          where: {
            status: { in: ['pending', 'confirmed'] },
            date: {
              gte: new Date(),
            },
          },
          orderBy: { date: 'asc' },
        },
      },
    });

    if (!lawyer) {
      return NextResponse.json(
        { error: 'Avocat non trouvé' },
        { status: 404 }
      );
    }

    // Generate available time slots for the next 30 days
    const availableSlots = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayOfWeek = date.getDay();

      const availability = lawyer.availabilities.find(
        (avail) => avail.dayOfWeek === dayOfWeek
      );

      if (availability) {
        const [startHour, startMinute] = availability.startTime.split(':').map(Number);
        const [endHour, endMinute] = availability.endTime.split(':').map(Number);

        const startTime = new Date(date);
        startTime.setHours(startHour, startMinute, 0, 0);

        const endTime = new Date(date);
        endTime.setHours(endHour, endMinute, 0, 0);

        // Generate hourly slots
        const currentTime = new Date(startTime);
        while (currentTime < endTime) {
          const slotStart = new Date(currentTime);
          const slotEnd = new Date(currentTime.getTime() + 60 * 60000); // 1 hour

          // Check if slot conflicts with existing appointments
          const hasConflict = lawyer.appointments.some((appointment) => {
            const appointmentStart = new Date(appointment.date);
            const appointmentEnd = new Date(
              appointmentStart.getTime() + appointment.duration * 60000
            );

            return (
              (slotStart >= appointmentStart && slotStart < appointmentEnd) ||
              (slotEnd > appointmentStart && slotEnd <= appointmentEnd) ||
              (slotStart <= appointmentStart && slotEnd >= appointmentEnd)
            );
          });

          if (!hasConflict && slotStart > new Date()) {
            availableSlots.push({
              start: slotStart.toISOString(),
              end: slotEnd.toISOString(),
              available: true,
            });
          }

          currentTime.setHours(currentTime.getHours() + 1);
        }
      }
    }

    return NextResponse.json({
      lawyer: {
        id: lawyer.id,
        nomComplet: lawyer.nomComplet,
        slug: lawyer.slug,
      },
      availabilities: lawyer.availabilities,
      availableSlots,
    });
  } catch (error) {
    console.error('Error fetching lawyer availability:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des disponibilités' },
      { status: 500 }
    );
  }
}
