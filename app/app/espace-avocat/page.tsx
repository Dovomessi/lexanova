
import { Metadata } from 'next';
import Link from 'next/link';
import { User, Calendar, MessageSquare, CreditCard, UserPlus, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Espace Avocat | Lexanova - Gestion de votre Cabinet',
  description: 'Accédez à votre espace avocat Lexanova. Gérez vos rendez-vous, votre profil, vos abonnements et développez votre cabinet.',
  keywords: 'espace avocat, gestion cabinet, rendez-vous avocat, profil avocat, abonnement avocat',
};

export default function EspaceAvocatPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--lexanova-blue)] to-[var(--lexanova-violet)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Espace <span className="text-yellow-300">Avocat</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Gérez votre cabinet, développez votre clientèle et optimisez votre activité
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Avocats partenaires</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">10K+</div>
                <div className="text-blue-100">Clients satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-blue-100">Taux de satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Support disponible</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Accès Rapide
            </h2>
            <p className="text-lg text-gray-600">
              Gérez tous les aspects de votre activité depuis un seul endroit
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/espace-avocat/connexion">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="bg-[var(--lexanova-blue)]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-[var(--lexanova-blue)]/20 transition-colors">
                    <User className="w-8 h-8 text-[var(--lexanova-blue)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[var(--lexanova-blue)] transition-colors">
                    Mon Profil
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Gérez vos informations et votre présentation
                  </p>
                  <Button variant="ghost" size="sm" className="group-hover:bg-[var(--lexanova-blue)] group-hover:text-white transition-colors">
                    Accéder
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/espace-avocat/rendez-vous">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="bg-[var(--lexanova-violet)]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-[var(--lexanova-violet)]/20 transition-colors">
                    <Calendar className="w-8 h-8 text-[var(--lexanova-violet)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[var(--lexanova-violet)] transition-colors">
                    Mes Rendez-vous
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Agenda et gestion des consultations
                  </p>
                  <Button variant="ghost" size="sm" className="group-hover:bg-[var(--lexanova-violet)] group-hover:text-white transition-colors">
                    Voir l'agenda
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/espace-avocat/messagerie">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="bg-green-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/20 transition-colors">
                    <MessageSquare className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    Messagerie
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Échanges avec vos clients
                  </p>
                  <Button variant="ghost" size="sm" className="group-hover:bg-green-600 group-hover:text-white transition-colors">
                    Voir messages
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/espace-avocat/abonnement">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="bg-orange-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/20 transition-colors">
                    <CreditCard className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    Abonnement
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Gestion de votre formule
                  </p>
                  <Button variant="ghost" size="sm" className="group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    Gérer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Pourquoi Rejoindre Lexanova ?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Développez votre cabinet avec nos outils de pointe et notre réseau d'experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[var(--lexanova-blue)]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <UserPlus className="w-8 h-8 text-[var(--lexanova-blue)]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Développez votre Clientèle
              </h3>
              <p className="text-gray-600">
                Accédez à un réseau qualifié de clients recherchant activement des conseils fiscaux. 
                Notre plateforme vous met en relation avec des prospects sérieux.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[var(--lexanova-violet)]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-[var(--lexanova-violet)]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Gestion Simplifiée
              </h3>
              <p className="text-gray-600">
                Agenda intégré, gestion des rendez-vous, facturation automatisée. 
                Concentrez-vous sur votre expertise, nous nous occupons de l'administratif.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Communication Fluide
              </h3>
              <p className="text-gray-600">
                Messagerie sécurisée, visioconférences intégrées, partage de documents. 
                Maintenez le contact avec vos clients en toute simplicité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Formules d'Abonnement
            </h2>
            <p className="text-lg text-gray-600">
              Choisissez la formule qui correspond à votre activité
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Essentiel</CardTitle>
                <div className="text-4xl font-bold text-[var(--lexanova-blue)] mt-4">
                  29€<span className="text-lg font-normal text-gray-600">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[var(--lexanova-blue)] rounded-full mr-3"></div>
                    Profil avocat complet
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[var(--lexanova-blue)] rounded-full mr-3"></div>
                    Jusqu'à 10 RDV/mois
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[var(--lexanova-blue)] rounded-full mr-3"></div>
                    Messagerie de base
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[var(--lexanova-blue)] rounded-full mr-3"></div>
                    Support email
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6">
                  Commencer
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative border-[var(--lexanova-blue)] shadow-lg">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-[var(--lexanova-blue)] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Populaire
                </div>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Premium</CardTitle>
                <div className="text-4xl font-bold text-[var(--lexanova-blue)] mt-4">
                  79€<span className="text-lg font-normal text-gray-600">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[var(--lexanova-blue)] rounded-full mr-3"></div>
                    Tout de l'Essentiel
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[var(--lexanova-blue)] rounded-full mr-3"></div>
                    RDV illimités
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[var(--lexanova-blue)] rounded-full mr-3"></div>
                    Profil mis en avant
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[var(--lexanova-blue)] rounded-full mr-3"></div>
                    Messagerie avancée
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[var(--lexanova-blue)] rounded-full mr-3"></div>
                    Support prioritaire
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)]/90">
                  Choisir Premium
                </Button>
              </CardContent>
            </Card>

            {/* Partner Plan */}
            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Partenaire</CardTitle>
                <div className="text-4xl font-bold text-[var(--lexanova-blue)] mt-4">
                  149€<span className="text-lg font-normal text-gray-600">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[var(--lexanova-blue)] rounded-full mr-3"></div>
                    Tout du Premium
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[var(--lexanova-blue)] rounded-full mr-3"></div>
                    Badge "Partenaire"
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[var(--lexanova-blue)] rounded-full mr-3"></div>
                    Articles de blog
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[var(--lexanova-blue)] rounded-full mr-3"></div>
                    Référencement prioritaire
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[var(--lexanova-blue)] rounded-full mr-3"></div>
                    Support dédié
                  </li>
                </ul>
                <Link href="/espace-avocat/devenir-partenaire">
                  <Button variant="outline" className="w-full mt-6">
                    Devenir Partenaire
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--lexanova-blue)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pas encore membre ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez notre réseau d'avocats fiscalistes et développez votre cabinet 
            avec les meilleurs outils du marché.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/espace-avocat/devenir-partenaire">
              <Button variant="secondary" size="lg">
                Devenir Partenaire
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/espace-avocat/connexion">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[var(--lexanova-blue)]">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
