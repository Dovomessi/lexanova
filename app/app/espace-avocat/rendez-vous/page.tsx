
'use client';

import { useState } from 'react';
import { Calendar, Clock, User, Video, Phone, MapPin, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function RendezVousAvocatPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  
  const appointments = [
    {
      id: '1',
      clientName: 'Jean Dupont',
      clientEmail: 'jean.dupont@email.com',
      date: '2025-01-20T14:00:00',
      duration: 60,
      type: 'consultation',
      mode: 'physique',
      subject: 'Optimisation fiscale entreprise',
      status: 'confirmed',
      message: 'Souhaite discuter de la restructuration de son holding familiale.',
    },
    {
      id: '2',
      clientName: 'Marie Martin',
      clientEmail: 'marie.martin@email.com',
      date: '2025-01-22T09:30:00',
      duration: 90,
      type: 'rdv',
      mode: 'visio',
      subject: 'Succession et transmission',
      status: 'pending',
      message: 'Questions sur la transmission de patrimoine immobilier.',
    },
    {
      id: '3',
      clientName: 'Pierre Leroy',
      clientEmail: 'pierre.leroy@email.com',
      date: '2025-01-18T16:00:00',
      duration: 45,
      type: 'consultation',
      mode: 'telephone',
      subject: 'Contrôle fiscal',
      status: 'completed',
      message: 'Accompagnement suite à contrôle fiscal.',
    },
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const statusLabels = {
    pending: 'En attente',
    confirmed: 'Confirmé',
    completed: 'Terminé',
    cancelled: 'Annulé',
  };

  const modeIcons = {
    physique: MapPin,
    visio: Video,
    telephone: Phone,
  };

  const filteredAppointments = appointments.filter(apt => 
    statusFilter === 'all' || apt.status === statusFilter
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mes Rendez-vous</h1>
            <p className="text-gray-600">Gérez votre agenda et vos consultations</p>
          </div>
          <Button className="bg-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)]/90">
            <Calendar className="w-4 h-4 mr-2" />
            Bloquer un créneau
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-yellow-100 rounded-lg p-3">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">En attente</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-lg p-3">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Cette semaine</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-lg p-3">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ce mois</p>
                  <p className="text-2xl font-bold text-gray-900">32</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-lg p-3">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Durée moy.</p>
                  <p className="text-2xl font-bold text-gray-900">75min</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Search className="w-5 h-5 text-gray-400" />
                <Input placeholder="Rechercher un client..." className="w-64" />
              </div>
              <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-gray-400" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="confirmed">Confirmés</SelectItem>
                    <SelectItem value="completed">Terminés</SelectItem>
                    <SelectItem value="cancelled">Annulés</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => {
            const ModeIcon = modeIcons[appointment.mode as keyof typeof modeIcons];
            
            return (
              <Card key={appointment.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-[var(--lexanova-blue)]/10 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-[var(--lexanova-blue)]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {appointment.clientName}
                          </h3>
                          <p className="text-sm text-gray-600">{appointment.clientEmail}</p>
                        </div>
                        <Badge className={statusColors[appointment.status as keyof typeof statusColors]}>
                          {statusLabels[appointment.status as keyof typeof statusLabels]}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(appointment.date).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                          })}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          {new Date(appointment.date).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })} ({appointment.duration}min)
                        </div>
                        <div className="flex items-center text-gray-600">
                          <ModeIcon className="w-4 h-4 mr-2" />
                          {appointment.mode === 'physique' ? 'En cabinet' : 
                           appointment.mode === 'visio' ? 'Visioconférence' : 'Téléphone'}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="font-medium text-gray-900 mb-2">
                          Objet: {appointment.subject}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {appointment.message}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-6">
                      {appointment.status === 'pending' && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-600/90">
                            Confirmer
                          </Button>
                          <Button variant="outline" size="sm">
                            Reporter
                          </Button>
                        </>
                      )}
                      {appointment.status === 'confirmed' && (
                        <>
                          <Button size="sm" className="bg-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)]/90">
                            Rejoindre
                          </Button>
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                        </>
                      )}
                      {appointment.status === 'completed' && (
                        <Button variant="outline" size="sm">
                          Voir détails
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredAppointments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucun rendez-vous
              </h3>
              <p className="text-gray-600">
                Aucun rendez-vous ne correspond à vos critères de filtrage.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
