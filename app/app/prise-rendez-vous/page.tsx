
'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Phone, Video, User, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Lawyer {
  id: string;
  nomComplet: string;
  ville: string;
  specializations: Array<{ name: string }>;
  slug: string;
  isPremium: boolean;
}

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

export default function PriseRendezVousPage() {
  const [step, setStep] = useState(1);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    subject: '',
    message: '',
    type: 'consultation',
    mode: 'physique',
    selectedDate: '',
    selectedTime: '',
  });

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      const response = await fetch('/api/lawyers?limit=20');
      const data = await response.json();
      setLawyers(data.lawyers || []);
    } catch (error) {
      console.error('Error fetching lawyers:', error);
    }
  };

  const fetchAvailability = async (lawyerSlug: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/lawyers/${lawyerSlug}/availability`);
      const data = await response.json();
      setAvailableSlots(data.availableSlots || []);
    } catch (error) {
      console.error('Error fetching availability:', error);
      setError('Erreur lors de la récupération des disponibilités');
    } finally {
      setLoading(false);
    }
  };

  const handleLawyerSelect = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    fetchAvailability(lawyer.slug);
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!selectedLawyer || !formData.selectedDate || !formData.selectedTime) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const appointmentData = {
        lawyerId: selectedLawyer.id,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        date: `${formData.selectedDate}T${formData.selectedTime}:00`,
        type: formData.type,
        mode: formData.mode,
        subject: formData.subject,
        message: formData.message,
      };

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la prise de rendez-vous');
      }

      setSuccess(true);
      setStep(4);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Rendez-vous confirmé !
            </h2>
            <p className="text-gray-600 mb-6">
              Votre demande de rendez-vous a été envoyée à {selectedLawyer?.nomComplet}. 
              Vous recevrez une confirmation par email sous 24h.
            </p>
            <Button onClick={() => window.location.href = '/'} className="w-full">
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--lexanova-blue)] to-[var(--lexanova-violet)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Prendre Rendez-vous
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Consultez un expert fiscal en quelques clics
            </p>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              {[
                { number: 1, label: 'Choisir un avocat' },
                { number: 2, label: 'Sélectionner un créneau' },
                { number: 3, label: 'Confirmer les détails' },
              ].map((stepItem) => (
                <div key={stepItem.number} className="flex items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= stepItem.number 
                        ? 'bg-white text-[var(--lexanova-blue)]' 
                        : 'bg-white/20 text-white'
                    }`}
                  >
                    {stepItem.number}
                  </div>
                  <span className="ml-2 text-sm text-blue-100">{stepItem.label}</span>
                  {stepItem.number < 3 && (
                    <ArrowRight className="w-4 h-4 ml-4 text-blue-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Step 1: Choose Lawyer */}
        {step === 1 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Choisissez votre avocat fiscaliste
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lawyers.map((lawyer) => (
                <Card 
                  key={lawyer.id} 
                  className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                  onClick={() => handleLawyerSelect(lawyer)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-[var(--lexanova-blue)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-8 h-8 text-[var(--lexanova-blue)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[var(--lexanova-blue)] transition-colors">
                            {lawyer.nomComplet}
                          </h3>
                          {lawyer.isPremium && (
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                              Premium
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{lawyer.ville}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {lawyer.specializations?.slice(0, 2).map((spec, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {spec.name}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="outline" size="sm" className="w-full group-hover:bg-[var(--lexanova-blue)] group-hover:text-white transition-colors">
                          Choisir cet avocat
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Time Slot */}
        {step === 2 && selectedLawyer && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Sélectionnez un créneau
              </h2>
              <p className="text-lg text-gray-600">
                Rendez-vous avec <strong>{selectedLawyer.nomComplet}</strong> à {selectedLawyer.ville}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calendar and Time Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Créneaux disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--lexanova-blue)] mx-auto"></div>
                      <p className="text-gray-500 mt-2">Chargement des disponibilités...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {availableSlots.slice(0, 10).map((slot, index) => {
                        const date = new Date(slot.start);
                        const dateStr = date.toISOString().split('T')[0];
                        const timeStr = date.toTimeString().slice(0, 5);
                        
                        return (
                          <div 
                            key={index}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              formData.selectedDate === dateStr && formData.selectedTime === timeStr
                                ? 'border-[var(--lexanova-blue)] bg-[var(--lexanova-blue)]/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                selectedDate: dateStr,
                                selectedTime: timeStr,
                              }));
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">
                                  {date.toLocaleDateString('fr-FR', { 
                                    weekday: 'long', 
                                    day: 'numeric', 
                                    month: 'long' 
                                  })}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {timeStr} - {new Date(slot.end).toTimeString().slice(0, 5)}
                                </div>
                              </div>
                              <Clock className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                        );
                      })}
                      
                      {availableSlots.length === 0 && (
                        <div className="text-center py-8">
                          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">Aucun créneau disponible</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Appointment Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Type de consultation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="type">Type de rendez-vous</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="rdv">Rendez-vous de suivi</SelectItem>
                        <SelectItem value="conference">Conférence</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="mode">Mode de consultation</Label>
                    <Select value={formData.mode} onValueChange={(value) => setFormData(prev => ({ ...prev, mode: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physique">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            En cabinet
                          </div>
                        </SelectItem>
                        <SelectItem value="visio">
                          <div className="flex items-center">
                            <Video className="w-4 h-4 mr-2" />
                            Visioconférence
                          </div>
                        </SelectItem>
                        <SelectItem value="telephone">
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            Téléphone
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.selectedDate && formData.selectedTime && (
                    <Button 
                      onClick={() => setStep(3)} 
                      className="w-full bg-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)]/90"
                    >
                      Continuer
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Step 3: Contact Information */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Vos informations de contact
            </h2>

            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="clientName">Nom complet *</Label>
                    <Input
                      id="clientName"
                      value={formData.clientName}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                      placeholder="Votre nom et prénom"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientPhone">Téléphone</Label>
                    <Input
                      id="clientPhone"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                      placeholder="Votre numéro de téléphone"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="clientEmail">Email *</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                    placeholder="votre.email@exemple.com"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Objet de la consultation *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Ex: Optimisation fiscale, Succession, etc."
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message (optionnel)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Décrivez brièvement votre situation..."
                    rows={4}
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Récapitulatif</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Avocat :</strong> {selectedLawyer?.nomComplet}</p>
                    <p><strong>Date :</strong> {formData.selectedDate && new Date(formData.selectedDate).toLocaleDateString('fr-FR')}</p>
                    <p><strong>Heure :</strong> {formData.selectedTime}</p>
                    <p><strong>Mode :</strong> {formData.mode}</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(2)}
                    className="flex-1"
                  >
                    Retour
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={loading || !formData.clientName || !formData.clientEmail || !formData.subject}
                    className="flex-1 bg-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)]/90"
                  >
                    {loading ? 'Envoi...' : 'Confirmer le rendez-vous'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
