
'use client';

import { useState } from 'react';
import { CreditCard, Check, Zap, Star, Users, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AbonnementAvocatPage() {
  const [currentPlan, setCurrentPlan] = useState('premium');
  
  const plans = [
    {
      id: 'essentiel',
      name: 'Essentiel',
      price: 29,
      description: 'Pour débuter sur Lexanova',
      features: [
        'Profil avocat complet',
        'Jusqu\'à 10 RDV/mois',
        'Messagerie de base',
        'Support email',
        'Statistiques basiques',
      ],
      limits: {
        appointments: '10/mois',
        messages: '50/mois',
        featured: false,
      },
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 79,
      description: 'Le plus populaire',
      popular: true,
      features: [
        'Tout de l\'Essentiel',
        'RDV illimités',
        'Profil mis en avant',
        'Messagerie avancée',
        'Support prioritaire',
        'Statistiques détaillées',
        'Badge Premium',
      ],
      limits: {
        appointments: 'Illimité',
        messages: 'Illimité',
        featured: true,
      },
    },
    {
      id: 'partenaire',
      name: 'Partenaire',
      price: 149,
      description: 'Pour les experts reconnus',
      features: [
        'Tout du Premium',
        'Badge "Partenaire"',
        'Articles de blog',
        'Référencement prioritaire',
        'Support dédié',
        'Formations exclusives',
        'API access',
      ],
      limits: {
        appointments: 'Illimité',
        messages: 'Illimité',
        featured: true,
        priority: true,
      },
    },
  ];

  const currentPlanData = plans.find(p => p.id === currentPlan);

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Mon Abonnement
          </h1>
          <p className="text-lg text-gray-600">
            Gérez votre formule et optimisez votre présence sur Lexanova
          </p>
        </div>

        {/* Current Plan */}
        <Card className="mb-12 border-[var(--lexanova-blue)] shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[var(--lexanova-blue)] to-[var(--lexanova-violet)] text-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Abonnement Actuel</CardTitle>
                <p className="text-blue-100 mt-2">
                  Votre formule {currentPlanData?.name}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{currentPlanData?.price}€</div>
                <div className="text-blue-100">par mois</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Utilisation ce mois</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rendez-vous</span>
                    <span className="font-medium">24/{currentPlanData?.limits.appointments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Messages</span>
                    <span className="font-medium">67/{currentPlanData?.limits.messages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Profil mis en avant</span>
                    <span className="font-medium">
                      {currentPlanData?.limits.featured ? '✅' : '❌'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Prochaine facturation</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="font-medium">15 février 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Montant</span>
                    <span className="font-medium">{currentPlanData?.price}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Méthode</span>
                    <span className="font-medium">**** 4567</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Actions</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Modifier le paiement
                  </Button>
                  <Button variant="outline" className="w-full">
                    Télécharger les factures
                  </Button>
                  <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                    Annuler l'abonnement
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* All Plans */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Changer de Formule
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative ${
                  plan.popular 
                    ? 'border-[var(--lexanova-blue)] shadow-lg transform scale-105' 
                    : 'border-gray-200'
                } ${plan.id === currentPlan ? 'bg-blue-50' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[var(--lexanova-blue)] text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Populaire
                    </Badge>
                  </div>
                )}
                
                {plan.id === currentPlan && (
                  <div className="absolute -top-4 right-4">
                    <Badge className="bg-green-600 text-white px-3 py-1">
                      <Check className="w-3 h-3 mr-1" />
                      Actuel
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-gray-600">{plan.description}</p>
                  <div className="text-4xl font-bold text-[var(--lexanova-blue)] mt-4">
                    {plan.price}€<span className="text-lg font-normal text-gray-600">/mois</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-6">
                    {plan.id === currentPlan ? (
                      <Button disabled className="w-full">
                        <Check className="w-4 h-4 mr-2" />
                        Formule actuelle
                      </Button>
                    ) : (
                      <Button 
                        className="w-full"
                        variant={plan.id === 'partenaire' ? 'default' : 'outline'}
                        onClick={() => {
                          console.log(`Changement vers la formule ${plan.name}`);
                          setCurrentPlan(plan.id);
                        }}
                      >
                        {plan.id === 'partenaire' && <Zap className="w-4 h-4 mr-2" />}
                        {plan.price > (currentPlanData?.price || 0) ? 'Upgrader' : 'Changer'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Questions Fréquentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Puis-je changer de formule à tout moment ?
              </h4>
              <p className="text-gray-600">
                Oui, vous pouvez upgrader ou downgrader votre formule à tout moment. 
                Les changements prennent effet immédiatement.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Que se passe-t-il si j'annule mon abonnement ?
              </h4>
              <p className="text-gray-600">
                Votre profil reste actif jusqu'à la fin de la période de facturation en cours, 
                puis passe automatiquement en formule gratuite limitée.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Y a-t-il des frais d'installation ?
              </h4>
              <p className="text-gray-600">
                Non, aucun frais d'installation ou d'engagement. Vous ne payez que l'abonnement mensuel.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
