
'use client';

import { motion } from 'framer-motion';
import { Shield, HeartHandshake, MapPin, CheckCircle, Users, Briefcase, Award, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function AProposPage() {
  const engagements = [
    {
      icon: Shield,
      title: 'Indépendance et transparence',
      description: 'Nous garantissons une sélection impartiale des avocats et une transparence totale sur nos critères.',
    },
    {
      icon: HeartHandshake,
      title: 'Satisfaction garantie pour chaque utilisateur',
      description: 'Notre priorité est votre satisfaction. Nous nous engageons à vous accompagner dans votre recherche.',
    },
    {
      icon: MapPin,
      title: 'Couverture dans toutes les grandes villes françaises',
      description: 'Notre réseau s\'étend dans les principales métropoles françaises pour vous servir au mieux.',
    },
    {
      icon: CheckCircle,
      title: 'Utilisation gratuite et pas de commission',
      description: 'Notre service est entièrement gratuit pour les utilisateurs, sans commission sur vos rendez-vous.',
    },
  ];

  const valeurs = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'Nous sélectionnons uniquement les meilleurs avocats fiscalistes pour garantir un service de qualité.',
    },
    {
      icon: Users,
      title: 'Accessibilité',
      description: 'Rendre l\'expertise fiscale accessible à tous, particuliers comme professionnels.',
    },
    {
      icon: Award,
      title: 'Qualité',
      description: 'Tous nos avocats partenaires sont vérifiés et reconnus pour leur expertise en fiscalité.',
    },
    {
      icon: Briefcase,
      title: 'Professionnalisme',
      description: 'Une approche professionnelle et éthique dans toutes nos relations.',
    },
  ];

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--lexanova-blue)] to-[var(--lexanova-violet)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              A propos de Lexanova
            </h1>
            <p className="text-2xl text-blue-100">
              Le pont direct vers les meilleurs avocats fiscalistes de France
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Notre Mission
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-6">
                  Lexanova est née d'une conviction : chacun mérite un accès rapide, fiable et rassurant 
                  à la meilleure expertise fiscale adaptée à ses besoins.
                </p>
                <p className="mb-6">
                  Notre mission : <strong className="text-[var(--lexanova-blue)]">faciliter la rencontre 
                  entre les particuliers, entrepreneurs et dirigeants</strong> avec le bon avocat fiscaliste, 
                  tout en rendant l'information fiscale enfin accessible.
                </p>
                <p>
                  Plateforme 100% française, Lexanova s'engage pour l'éthique, la clarté et la performance 
                  digitale au service du droit.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-video bg-gray-200 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                  alt="Mission Lexanova"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Engagements Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Engagements
            </h2>
            <p className="text-lg text-gray-600">
              Des valeurs qui guident notre action au quotidien
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {engagements.map((engagement, index) => {
              const IconComponent = engagement.icon;
              return (
                <motion.div
                  key={engagement.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-[var(--lexanova-blue)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {engagement.title}
                  </h3>
                  <p className="text-gray-600">
                    {engagement.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Valeurs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-lg text-gray-600">
              Les principes fondamentaux qui définissent Lexanova
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valeurs.map((valeur, index) => {
              const IconComponent = valeur.icon;
              return (
                <motion.div
                  key={valeur.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[var(--lexanova-blue)] to-[var(--lexanova-violet)] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {valeur.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {valeur.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-[var(--lexanova-blue)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Contactez-nous
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Une question ? Une suggestion ? Nous sommes à votre écoute !
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-200" />
                  <span className="text-blue-100">
                    5 rue Auguste et Louis Lumière, 94190 Villeneuve-Saint-Georges
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-200" />
                  <span className="text-blue-100">
                    contact@lexanova.fr
                  </span>
                </div>
              </div>
              
              <Link href="/contact">
                <Button size="lg" className="bg-white text-[var(--lexanova-blue)] hover:bg-gray-100">
                  Nous contacter
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-square bg-white/10 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80"
                  alt="Contact Lexanova"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-gray-800 font-medium">
                  "Lexanova, votre partenaire de confiance pour tous vos besoins en fiscalité."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
