import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Clock, User, ArrowRight, Users, FileText, TrendingUp, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Guides Fiscaux | Lexanova - Expertise Fiscale Française',
  description: 'Découvrez nos guides fiscaux complets organisés par domaines d\'expertise. Analyses, conseils pratiques et décryptages pour maîtriser la fiscalité française.',
  keywords: 'guides fiscaux, conseils fiscaux, fiscalité française, optimisation fiscale, domaines fiscaux',
};

async function getFiscalDomains() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/fiscal-domains`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch fiscal domains');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching fiscal domains:', error);
    return { fiscalDomains: [] };
  }
}

async function getRecentArticles() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/articles?limit=6`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch articles');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return { articles: [] };
  }
}

export default async function GuidesFiscauxPage() {
  const [fiscalDomainsData, articlesData] = await Promise.all([
    getFiscalDomains(),
    getRecentArticles(),
  ]);

  const { fiscalDomains } = fiscalDomainsData;
  const { articles } = articlesData;

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--lexanova-blue)] to-[var(--lexanova-violet)] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Maîtrisez la Fiscalité <span className="text-yellow-300">Française</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Guides complets, analyses expertes et conseils pratiques pour naviguer dans la complexité fiscale française
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">6</div>
                <div className="text-blue-100">Domaines Fiscaux</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Guides Détaillés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">30</div>
                <div className="text-blue-100">Experts Fiscalistes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
                <div className="text-blue-100">Mis à Jour</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                La Fiscalité Française Décryptée
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                La fiscalité française est reconnue pour sa complexité et ses évolutions constantes. 
                Nos guides vous accompagnent dans cette jungle réglementaire avec des explications 
                claires, des exemples concrets et des conseils d'optimisation légale.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Que vous soyez entrepreneur, investisseur, particulier ou professionnel du chiffre, 
                nos experts fiscalistes vous fournissent les clés pour comprendre et optimiser 
                votre situation fiscale.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-[var(--lexanova-blue)]/10 rounded-lg p-2">
                    <Shield className="w-6 h-6 text-[var(--lexanova-blue)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Conformité Légale</h4>
                    <p className="text-sm text-gray-600">Respect strict de la réglementation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-[var(--lexanova-violet)]/10 rounded-lg p-2">
                    <TrendingUp className="w-6 h-6 text-[var(--lexanova-violet)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Optimisation</h4>
                    <p className="text-sm text-gray-600">Stratégies d'économie fiscale</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Expert en fiscalité analysant des documents"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Expertise Garantie</div>
                    <div className="text-sm text-gray-600">Par des avocats fiscalistes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fiscal Domains Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Domaines d'Expertise Fiscale
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explorez nos guides organisés par domaines fiscaux spécialisés. 
              Chaque section contient des analyses approfondies et des conseils pratiques.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fiscalDomains.map((domain: any) => {
              const IconComponent = require('lucide-react')[domain.icon] || BookOpen;
              
              return (
                <Link key={domain.id} href={`/guides-fiscaux/domaines/${domain.slug}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div 
                          className="p-3 rounded-xl"
                          style={{ 
                            backgroundColor: `${domain.color}15`,
                            color: domain.color 
                          }}
                        >
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {domain._count?.articles || 0} guides
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-[var(--lexanova-blue)] transition-colors">
                        {domain.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {domain.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-6">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          {domain._count?.articles || 0} articles
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {domain._count?.lawyers || 0} experts
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-[var(--lexanova-blue)] group-hover:text-white group-hover:border-[var(--lexanova-blue)] transition-colors"
                      >
                        Explorer ce domaine
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Articles Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Derniers Guides Publiés
              </h2>
              <p className="text-lg text-gray-600">
                Restez informé des dernières analyses et évolutions fiscales
              </p>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="hidden md:flex">
                Voir tous les articles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">
                      {article.category?.name}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime} min
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-[var(--lexanova-blue)] transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-[var(--lexanova-blue)]/10 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-[var(--lexanova-blue)]" />
                      </div>
                      <span className="text-sm text-gray-600">{article.author}</span>
                    </div>
                    <Link href={`/guides-fiscaux/${article.slug}`}>
                      <Button variant="ghost" size="sm" className="group-hover:bg-[var(--lexanova-blue)] group-hover:text-white transition-colors">
                        Lire
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {articles.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg mb-4">
                Aucun guide disponible pour le moment.
              </p>
              <p className="text-gray-400">
                Nos experts travaillent sur de nouveaux contenus. Revenez bientôt !
              </p>
            </div>
          )}
          
          <div className="text-center mt-12 md:hidden">
            <Link href="/blog">
              <Button variant="outline">
                Voir tous les articles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
