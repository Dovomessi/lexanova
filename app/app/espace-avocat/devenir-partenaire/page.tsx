
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { UserPlus, TrendingUp, Shield, Star, ArrowRight, Check, Users, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Devenir Partenaire | Lexanova - Rejoignez notre Réseau d\'Experts',
  description: 'Rejoignez le réseau Lexanova et développez votre cabinet d\'avocat fiscaliste. Accès privilégié aux clients, outils de gestion et support dédié.',
  keywords: 'devenir partenaire lexanova, réseau avocat, cabinet fiscaliste, développement clientèle',
};

export default function DevenirPartenairePage() {
  const benefits = [
    {
      icon: Users,
      title: 'Réseau de Clients Qualifiés',
      description: 'Accédez à une base de clients pré-qualifiés recherchant activement des conseils fiscaux spécialisés.',
    },
    {
      icon: TrendingUp,
      title: 'Croissance de votre CA',
      description: 'Augmentez votre chiffre d\'affaires grâce à un flux régulier de nouveaux clients et mandats.',
    },
    {
      icon: Calendar,
      title: 'Gestion Simplifiée',
      description: 'Outils intégrés pour la gestion des rendez-vous, facturation et suivi client.',
    },
    {
      icon: Award,
      title: 'Reconnaissance d\'Expertise',
      description: 'Badge partenaire, mise en avant de votre profil et témoignages clients.',
    },
    {
      icon: Shield,
      title: 'Formation Continue',
      description: 'Accès exclusif à nos formations, webinaires et mises à jour réglementaires.',
    },
    {
      icon: Star,
      title: 'Support Dédié',
      description: 'Accompagnement personnalisé par notre équipe et support technique prioritaire.',
    },
  ];

  const stats = [
    { value: '500+', label: 'Avocats partenaires' },
    { value: '10k+', label: 'Clients satisfaits' },
    { value: '€2.5M', label: 'CA généré en 2024' },
    { value: '95%', label: 'Taux de satisfaction' },
  ];

  const testimonials = [
    {
      name: 'Maître Sophie Dubois',
      title: 'Avocate fiscaliste à Paris',
      content: 'Lexanova m\'a permis de doubler ma clientèle en 6 mois. Les clients sont qualifiés et les outils de gestion excellent.',
      rating: 5,
    },
    {
      name: 'Maître Jean Martin',
      title: 'Expert en fiscalité internationale',
      content: 'Grâce au badge partenaire, ma visibilité a considérablement augmenté. Le support est réactif et professionnel.',
      rating: 5,
    },
    {
      name: 'Maître Claire Rousseau',
      title: 'Spécialiste en fiscalité immobilière',
      content: 'Les formations continues et les mises à jour réglementaires sont un vrai plus pour rester à la pointe.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--lexanova-blue)] to-[var(--lexanova-violet)] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-white/20 rounded-xl p-3">
                  <UserPlus className="w-8 h-8" />
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Programme partenaire
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Rejoignez l'Élite des <span className="text-yellow-300">Fiscalistes</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Développez votre cabinet avec le premier réseau d'avocats fiscalistes de France. 
                Accès privilégié aux meilleurs clients et outils de pointe.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-blue-100">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <Link href="/espace-avocat/connexion">
                <Button size="lg" variant="secondary" className="mr-4">
                  Devenir Partenaire
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="#benefits">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--lexanova-blue)]">
                  En savoir plus
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Avocat partenaire Lexanova"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">+150% CA moyen</div>
                    <div className="text-sm text-gray-600">Première année</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pourquoi Devenir Partenaire ?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Rejoignez un écosystème conçu pour maximiser votre réussite professionnelle 
              et développer votre expertise fiscale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 group">
                  <CardContent className="p-6">
                    <div className="bg-[var(--lexanova-blue)]/10 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-[var(--lexanova-blue)]/20 transition-colors">
                      <IconComponent className="w-8 h-8 text-[var(--lexanova-blue)]" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-[var(--lexanova-blue)] transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comment Devenir Partenaire ?
            </h2>
            <p className="text-lg text-gray-600">
              Un processus simple et transparent en 4 étapes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Candidature',
                description: 'Soumettez votre dossier avec vos qualifications et spécialisations',
              },
              {
                step: '2',
                title: 'Évaluation',
                description: 'Notre équipe examine votre profil et vos références',
              },
              {
                step: '3',
                title: 'Entretien',
                description: 'Échange avec nos experts pour valider votre expertise',
              },
              {
                step: '4',
                title: 'Intégration',
                description: 'Formation et mise en ligne de votre profil partenaire',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-[var(--lexanova-blue)] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Témoignages de nos Partenaires
            </h2>
            <p className="text-lg text-gray-600">
              Découvrez l'expérience de nos avocats partenaires
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[var(--lexanova-blue)]/10 rounded-full flex items-center justify-center mr-4">
                      <UserPlus className="w-6 h-6 text-[var(--lexanova-blue)]" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Critères de Sélection
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nous recherchons des avocats d'excellence partageant nos valeurs 
                de professionnalisme et d'innovation.
              </p>
              
              <div className="space-y-4">
                {[
                  'Diplôme en droit et inscription au barreau',
                  'Spécialisation en droit fiscal certifiée',
                  'Minimum 3 ans d\'expérience en fiscalité',
                  'Références clients et déontologie irréprochable',
                  'Engagement de formation continue',
                  'Maîtrise des outils numériques',
                ].map((requirement, index) => (
                  <div key={index} className="flex items-center">
                    <div className="bg-green-100 rounded-full p-1 mr-3">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Avocat professionnel"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--lexanova-blue)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à Rejoindre l'Excellence ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Devenez partenaire Lexanova et transformez votre pratique professionnelle. 
            L'opportunité vous attend.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/espace-avocat/connexion">
              <Button variant="secondary" size="lg">
                <UserPlus className="w-5 h-5 mr-2" />
                Postuler Maintenant
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[var(--lexanova-blue)]">
                Poser une Question
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-blue-200">
              Questions ? Contactez-nous au{' '}
              <a href="tel:+33123456789" className="underline hover:text-white">
                01 23 45 67 89
              </a>{' '}
              ou par{' '}
              <a href="mailto:partenaires@lexanova.fr" className="underline hover:text-white">
                email
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
