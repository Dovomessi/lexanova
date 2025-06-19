
import { Metadata } from 'next';
import Link from 'next/link';
import { Scale, Shield, Users, Award, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'CVU Avocats | Lexanova - Conditions de Vie et d\'Utilisation pour les Avocats',
  description: 'Conditions de Vie et d\'Utilisation spécifiques aux avocats partenaires de Lexanova. Droits, obligations et bonnes pratiques professionnelles.',
  keywords: 'CVU avocats, conditions utilisation avocat, charte déontologique avocat, Lexanova',
};

export default function CVUAvocatsPage() {
  const principles = [
    {
      icon: Shield,
      title: 'Déontologie Professionnelle',
      description: 'Respect strict du code de déontologie des avocats et des règles professionnelles du barreau.',
    },
    {
      icon: Users,
      title: 'Excellence du Service Client',
      description: 'Engagement à fournir des conseils de haute qualité et un service client irréprochable.',
    },
    {
      icon: Scale,
      title: 'Transparence Tarifaire',
      description: 'Communication claire et transparente des honoraires et conditions d\'intervention.',
    },
    {
      icon: Award,
      title: 'Formation Continue',
      description: 'Maintien à jour des compétences et veille juridique permanente.',
    },
  ];

  const obligations = [
    {
      category: 'Profil et Présentation',
      items: [
        'Maintenir un profil complet et à jour avec informations exactes',
        'Présenter ses qualifications et spécialisations de manière véridique',
        'Mentionner son barreau d\'inscription et numéro RPVA',
        'Utiliser une photo professionnelle et appropriée',
      ],
    },
    {
      category: 'Relation Client',
      items: [
        'Répondre aux demandes dans un délai maximum de 48h',
        'Fixer des rendez-vous dans des délais raisonnables',
        'Respecter les horaires convenus et prévenir en cas d\'empêchement',
        'Communiquer de manière claire et pédagogique',
      ],
    },
    {
      category: 'Exercice Professionnel',
      items: [
        'Respecter le secret professionnel et la confidentialité',
        'Éviter les conflits d\'intérêts et les signaler le cas échéant',
        'Refuser les dossiers hors de son domaine de compétence',
        'Orienter vers un confrère spécialisé si nécessaire',
      ],
    },
    {
      category: 'Utilisation de la Plateforme',
      items: [
        'Ne pas solliciter de règlement hors plateforme pour les services Lexanova',
        'Signaler tout dysfonctionnement ou problème technique',
        'Respecter les autres utilisateurs et maintenir un langage professionnel',
        'Ne pas utiliser la plateforme à des fins publicitaires externes',
      ],
    },
  ];

  const sanctions = [
    {
      level: 'Avertissement',
      triggers: 'Non-respect mineur des CVU, retard de réponse occasionnel',
      consequences: 'Rappel des obligations, accompagnement renforcé',
    },
    {
      level: 'Suspension temporaire',
      triggers: 'Manquements répétés, plaintes clients justifiées',
      consequences: 'Profil masqué 7 à 30 jours, formation obligatoire',
    },
    {
      level: 'Exclusion définitive',
      triggers: 'Manquement grave à la déontologie, fraude, comportement inapproprié',
      consequences: 'Suppression du profil, interdiction de réinscription',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--lexanova-blue)] to-[var(--lexanova-violet)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 rounded-xl p-4">
                <Scale className="w-8 h-8" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CVU <span className="text-yellow-300">Avocats</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Conditions de Vie et d'Utilisation pour les avocats partenaires de Lexanova
            </p>
            
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Version 2.0 - Janvier 2025
            </Badge>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Préambule
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-600 mb-6">
                Les présentes Conditions de Vie et d'Utilisation (CVU) définissent le cadre de collaboration 
                entre Lexanova et les avocats partenaires utilisant notre plateforme. Elles complètent les 
                conditions générales d'utilisation et s'appliquent spécifiquement aux professionnels du droit.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                En tant qu'avocat partenaire, vous vous engagez à respecter ces conditions ainsi que 
                les règles déontologiques de votre profession et les règlements de votre barreau d'inscription.
              </p>
              <p className="text-lg text-gray-600">
                L'objectif de ces CVU est de garantir la qualité du service rendu aux clients et 
                de maintenir l'excellence de notre réseau d'experts fiscalistes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Principes Fondamentaux
            </h2>
            <p className="text-lg text-gray-600">
              Les valeurs qui guident notre collaboration
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle, index) => {
              const IconComponent = principle.icon;
              
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="bg-[var(--lexanova-blue)]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-[var(--lexanova-blue)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {principle.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Obligations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Obligations des Avocats Partenaires
            </h2>
            <p className="text-lg text-gray-600">
              Engagements pour maintenir l'excellence du service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {obligations.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-[var(--lexanova-blue)]">
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sanctions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Système de Sanctions
            </h2>
            <p className="text-lg text-gray-600">
              Mesures disciplinaires en cas de manquement aux CVU
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {sanctions.map((sanction, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {sanction.level}
                      </h3>
                      <Badge 
                        variant={index === 0 ? 'secondary' : index === 1 ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        Niveau {index + 1}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Déclencheurs</h4>
                      <p className="text-sm text-gray-600">{sanction.triggers}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Conséquences</h4>
                      <p className="text-sm text-gray-600">{sanction.consequences}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Support et Accompagnement
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Nous nous engageons à accompagner nos avocats partenaires dans leur réussite 
                sur notre plateforme. Notre équipe est à votre disposition pour vous aider 
                à optimiser votre présence et développer votre activité.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-[var(--lexanova-blue)]/10 rounded-lg p-2 mr-4">
                    <Users className="w-5 h-5 text-[var(--lexanova-blue)]" />
                  </div>
                  <span className="text-gray-700">Support dédié pour les partenaires</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-[var(--lexanova-blue)]/10 rounded-lg p-2 mr-4">
                    <Award className="w-5 h-5 text-[var(--lexanova-blue)]" />
                  </div>
                  <span className="text-gray-700">Formations et webinaires exclusifs</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-[var(--lexanova-blue)]/10 rounded-lg p-2 mr-4">
                    <Shield className="w-5 h-5 text-[var(--lexanova-blue)]" />
                  </div>
                  <span className="text-gray-700">Assistance technique prioritaire</span>
                </div>
              </div>
            </div>
            
            <Card className="bg-[var(--lexanova-blue)]/5 border-[var(--lexanova-blue)]/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Besoin d'Aide ?
                </h3>
                <p className="text-gray-600 mb-6">
                  Notre équipe support est disponible pour répondre à vos questions 
                  sur les CVU ou vous accompagner dans votre utilisation de la plateforme.
                </p>
                <div className="space-y-3">
                  <Link href="/contact">
                    <Button className="w-full bg-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)]/90">
                      Contacter le Support
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/espace-avocat">
                    <Button variant="outline" className="w-full">
                      Accéder à mon Espace
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Révision et Mise à Jour
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Ces CVU peuvent être modifiées pour s'adapter aux évolutions réglementaires 
              et aux besoins de notre communauté. Les avocats partenaires sont informés 
              de toute modification avec un préavis de 30 jours.
            </p>
            <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-700 text-sm">Dernière mise à jour : Janvier 2025</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
