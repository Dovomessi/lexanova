
'use client';

import { useState } from 'react';
import { User, Camera, Save, MapPin, Phone, Mail, Globe, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export default function ProfilAvocatPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nomComplet: 'Maître Sophie Dubois',
    email: 'sophie.dubois@cabinet-dubois.fr',
    telephone: '01 23 45 67 89',
    ville: 'Paris',
    adresseCabinet: '25 rue de la Paix, 75001 Paris',
    barreau: 'Barreau de Paris',
    numeroRCS: 'RCS Paris 123 456 789',
    siteWeb: 'https://cabinet-dubois.fr',
    biographie: 'Avocate fiscaliste spécialisée depuis 15 ans, j\'accompagne entreprises et particuliers dans leurs stratégies d\'optimisation fiscale. Expert en fiscalité internationale et transmission d\'entreprise.',
    specialisations: ['Fiscalité des entreprises', 'Fiscalité internationale', 'Transmission d\'entreprise'],
    tarifs: '300-500€ / heure',
    langues: ['Français', 'Anglais', 'Allemand'],
  });

  const handleSave = () => {
    // Logic to save profile
    setIsEditing(false);
    console.log('Profil sauvegardé:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
            <p className="text-gray-600">Gérez vos informations professionnelles</p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
          >
            {isEditing ? 'Annuler' : 'Modifier le profil'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture & Stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 bg-[var(--lexanova-blue)] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto">
                    SD
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{formData.nomComplet}</h2>
                <p className="text-gray-600">{formData.barreau}</p>
                <Badge className="mt-2 bg-yellow-100 text-yellow-800">
                  <Award className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Consultations</span>
                  <span className="font-semibold">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Note moyenne</span>
                  <span className="font-semibold">4.8/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taux de réponse</span>
                  <span className="font-semibold">98%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations personnelles */}
            <Card>
              <CardHeader>
                <CardTitle>Informations Personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nomComplet">Nom complet</Label>
                    <Input
                      id="nomComplet"
                      value={formData.nomComplet}
                      onChange={(e) => setFormData(prev => ({ ...prev, nomComplet: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input
                      id="telephone"
                      value={formData.telephone}
                      onChange={(e) => setFormData(prev => ({ ...prev, telephone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ville">Ville</Label>
                    <Input
                      id="ville"
                      value={formData.ville}
                      onChange={(e) => setFormData(prev => ({ ...prev, ville: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations cabinet */}
            <Card>
              <CardHeader>
                <CardTitle>Informations Cabinet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="adresseCabinet">Adresse du cabinet</Label>
                  <Input
                    id="adresseCabinet"
                    value={formData.adresseCabinet}
                    onChange={(e) => setFormData(prev => ({ ...prev, adresseCabinet: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="barreau">Barreau</Label>
                    <Input
                      id="barreau"
                      value={formData.barreau}
                      onChange={(e) => setFormData(prev => ({ ...prev, barreau: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="numeroRCS">Numéro RCS</Label>
                    <Input
                      id="numeroRCS"
                      value={formData.numeroRCS}
                      onChange={(e) => setFormData(prev => ({ ...prev, numeroRCS: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="siteWeb">Site web</Label>
                  <Input
                    id="siteWeb"
                    value={formData.siteWeb}
                    onChange={(e) => setFormData(prev => ({ ...prev, siteWeb: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Biographie */}
            <Card>
              <CardHeader>
                <CardTitle>Biographie Professionnelle</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="biographie">Présentation</Label>
                <Textarea
                  id="biographie"
                  rows={6}
                  value={formData.biographie}
                  onChange={(e) => setFormData(prev => ({ ...prev, biographie: e.target.value }))}
                  disabled={!isEditing}
                  className="mt-2"
                />
              </CardContent>
            </Card>

            {/* Spécialisations et tarifs */}
            <Card>
              <CardHeader>
                <CardTitle>Expertise et Tarifs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Spécialisations</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.specialisations.map((spec, index) => (
                      <Badge key={index} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        + Ajouter
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tarifs">Fourchette de tarifs</Label>
                    <Input
                      id="tarifs"
                      value={formData.tarifs}
                      onChange={(e) => setFormData(prev => ({ ...prev, tarifs: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label>Langues parlées</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.langues.map((langue, index) => (
                        <Badge key={index} variant="outline">
                          {langue}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end">
                <Button onClick={handleSave} className="bg-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)]/90">
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder les modifications
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
