'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, BookOpen, Calculator, Briefcase, Search, MapPin, Phone, Mail, Star, Building2, Shield, Clock, FileText, TrendingUp, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import LawyerCard from '@/components/lawyer-card';
import ArticleCard from '@/components/article-card';
import FAQSection from '@/components/faq-section';
import CounterAnimation from '@/components/counter-animation';

interface Lawyer {
  id: string;
  nomComplet: string;
  ville: string;
  adresseCabinet: string;
  telephone: string;
  email: string;
  anneesExperience: number;
  biographie: string;
  isPremium: boolean;
  specializations: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  author: string;
  readTime: number;
  publishedAt: Date | null;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

export default function Home() {
  const [featuredLawyers, setFeaturedLawyers] = useState<Lawyer[]>([]);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lawyersResponse, articlesResponse] = await Promise.all([
          fetch('/api/lawyers?limit=6&premium=true'),
          fetch('/api/articles?limit=6'),
        ]);

        const lawyersData = await lawyersResponse.json();
        const articlesData = await articlesResponse.json();

        setFeaturedLawyers(lawyersData.lawyers || []);
        setRecentArticles(articlesData.articles || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fiscalDomains = [
    {
      title: 'Fiscalité des dirigeants',
      description: 'Optimisation fiscale pour dirigeants d\'entreprise',
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Fiscalité patrimoniale',
      description: 'Gestion et transmission de patrimoine',
      icon: Building2,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Fiscalité internationale',
      description: 'Fiscalité transfrontalière et résidence fiscale',
      icon: MapPin,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Fiscalité immobilière',
      description: 'Investissement et transactions immobilières',
      icon: Building2,
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Fiscalité des particuliers',
      description: 'Impôt sur le revenu et obligations fiscales',
      icon: Users,
      color: 'from-red-500 to-red-600',
    },
    {
      title: 'Fiscalité des entreprises',
      description: 'Impôt sur les sociétés et TVA',
      icon: Briefcase,
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Sélectionnez votre ville et spécialité',
      description: 'Un processus simple et efficace pour trouver le bon avocat',
      icon: Search,
    },
    {
      step: '2',
      title: 'Accédez à des profils détaillés d\'avocats',
      description: 'Consultez les avis et spécialités de nos avocats vérifiés',
      icon: Users,
    },
    {
      step: '3',
      title: 'Prenez rendez-vous en quelques clics',
      description: 'Réservez votre consultation en ligne, téléphone ou cabinet',
      icon: Phone,
    },
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--lexanova-blue)] via-blue-900 to-[var(--lexanova-violet)] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Trouvez votre avocat fiscaliste 
                <span className="text-yellow-400"> simplement</span> sur Lexanova
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100">
                Consultation, optimisation ou contentieux
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/trouver-un-avocat-fiscaliste">
                  <Button size="lg" className="bg-white text-[var(--lexanova-blue)] hover:bg-gray-100 text-lg px-8 py-4">
                    <Search className="w-5 h-5 mr-2" />
                    Prendre rendez-vous
                  </Button>
                </Link>
                <Link href="/simulateurs">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[var(--lexanova-blue)] text-lg px-8 py-4">
                    <Calculator className="w-5 h-5 mr-2" />
                    Simulateurs fiscaux
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-video bg-white/10 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80"
                  alt="Consultation avec un avocat fiscaliste"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Floating cards with stats */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex space-x-6"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[var(--lexanova-blue)]">
                <CounterAnimation end={30} suffix="+" />
              </div>
              <div className="text-sm text-gray-600">Avocats experts</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[var(--lexanova-blue)]">
                <CounterAnimation end={5} />
              </div>
              <div className="text-sm text-gray-600">Grandes villes</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[var(--lexanova-blue)]">
                <CounterAnimation end={100} suffix="%" />
              </div>
              <div className="text-sm text-gray-600">Gratuit</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Lawyers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explorez notre annuaire d'avocats 
              <span className="text-[var(--lexanova-blue)]"> Fiscalistes</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Trouvez votre avocat fiscaliste en un clic
            </p>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredLawyers.slice(0, 6).map((lawyer, index) => (
                <LawyerCard key={lawyer.id} lawyer={lawyer} index={index} />
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/trouver-un-avocat-fiscaliste">
              <Button size="lg" className="bg-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)]/90">
                Voir tous nos avocats fiscalistes
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment trouver votre 
              <span className="text-[var(--lexanova-blue)]"> avocat fiscaliste</span>
            </h2>
            <p className="text-lg text-gray-600">
              Un processus simple et efficace en 3 étapes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-[var(--lexanova-blue)] to-[var(--lexanova-violet)] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/trouver-un-avocat-fiscaliste">
              <Button size="lg" className="bg-[var(--lexanova-violet)] hover:bg-[var(--lexanova-violet)]/90">
                <Phone className="w-5 h-5 mr-2" />
                Prendre RDV maintenant
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Fiscal Domains Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Guides <span className="text-[var(--lexanova-blue)]">Fiscaux</span>
            </h2>
            <p className="text-lg text-gray-600">
              Pour comprendre vos droits & obligations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fiscalDomains.map((domain, index) => {
              const IconComponent = domain.icon;
              return (
                <motion.div
                  key={domain.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${domain.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[var(--lexanova-blue)] transition-colors">
                    {domain.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {domain.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/guides-fiscaux">
              <Button size="lg" variant="outline" className="border-[var(--lexanova-blue)] text-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)] hover:text-white">
                <BookOpen className="w-5 h-5 mr-2" />
                Découvrir tous les guides
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Recent Articles Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Derniers articles & 
              <span className="text-[var(--lexanova-blue)]"> actualités fiscales</span>
            </h2>
            <p className="text-lg text-gray-600">
              Pour être à jour de vos obligations fiscales
            </p>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentArticles.slice(0, 6).map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/guides-fiscaux">
              <Button size="lg" className="bg-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)]/90">
                Voir tous les articles
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* For Lawyers Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--lexanova-violet)] to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Vous êtes avocat(e) fiscaliste ?
              </h2>
              <p className="text-xl mb-8 text-purple-100">
                Augmentez votre visibilité et recevez de nouveaux clients qualifiés
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  'Visibilité premium sur les requêtes géolocalisées',
                  'Profil optimisé & SEO performant',
                  'Génération de contacts pertinents',
                  'Pilotage autonome de votre fiche et agenda',
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-purple-100">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              
              <Button size="lg" className="bg-white text-[var(--lexanova-violet)] hover:bg-gray-100">
                <Star className="w-5 h-5 mr-2" />
                Rejoindre Lexanova
              </Button>
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
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                  alt="Avocat fiscaliste travaillant"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-gray-800 font-medium">
                  "Lexanova, votre partenaire digital. Rejoignez le 1er annuaire spécialisé pour les avocats fiscalistes."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-video bg-gray-200 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80"
                  alt="À propos de Lexanova"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                A propos de <span className="text-[var(--lexanova-blue)]">Lexanova</span>
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Le pont direct vers les meilleurs avocats fiscalistes de France
              </p>
              
              <p className="text-gray-600 mb-8">
                Lexanova est née d'une conviction : chacun mérite un accès rapide, fiable et rassurant 
                à la meilleure expertise fiscale adaptée à ses besoins. Notre mission : 
                <strong className="text-[var(--lexanova-blue)]"> faciliter la rencontre entre les particuliers, 
                entrepreneurs et dirigeants</strong> avec le bon avocat fiscaliste, tout en rendant 
                l'information fiscale enfin accessible.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  { icon: Shield, text: 'Indépendance et transparence' },
                  { icon: HeartHandshake, text: 'Satisfaction garantie pour chaque utilisateur' },
                  { icon: MapPin, text: 'Couverture dans toutes les grandes villes françaises' },
                  { icon: CheckCircle, text: 'Utilisation gratuite et pas de commission' },
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <IconComponent className="w-5 h-5 text-[var(--lexanova-blue)] flex-shrink-0" />
                      <span className="text-gray-700">{item.text}</span>
                    </motion.div>
                  );
                })}
              </div>
              
              <Link href="/a-propos">
                <Button size="lg" variant="outline" className="border-[var(--lexanova-blue)] text-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)] hover:text-white">
                  En savoir plus
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}