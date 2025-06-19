
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowRight, BookOpen, Clock, User, Users, FileText, Download, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface Props {
  params: { slug: string };
}

async function getFiscalDomain(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/fiscal-domains/${slug}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching fiscal domain:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getFiscalDomain(params.slug);
  
  if (!data?.fiscalDomain) {
    return {
      title: 'Domaine fiscal non trouvé | Lexanova',
    };
  }
  
  const { fiscalDomain } = data;
  
  return {
    title: `${fiscalDomain.name} | Guides Fiscaux Lexanova`,
    description: fiscalDomain.description,
    keywords: `${fiscalDomain.name}, guides fiscaux, conseils fiscaux, expertise fiscale`,
  };
}

export default async function FiscalDomainPage({ params }: Props) {
  const data = await getFiscalDomain(params.slug);
  
  if (!data?.fiscalDomain) {
    notFound();
  }
  
  const { fiscalDomain } = data;
  const IconComponent = require('lucide-react')[fiscalDomain.icon] || BookOpen;

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
      {/* Hero Section */}
      <section 
        className="relative py-24 text-white overflow-hidden"
        style={{ backgroundColor: fiscalDomain.color }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-white/20 rounded-xl p-3">
                  <IconComponent className="w-8 h-8" />
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Domaine fiscal
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {fiscalDomain.name}
              </h1>
              <p className="text-xl text-white/90 mb-8">
                {fiscalDomain.description}
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">{fiscalDomain.articles?.length || 0}</div>
                  <div className="text-sm text-white/80">Guides</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">{fiscalDomain.lawyers?.length || 0}</div>
                  <div className="text-sm text-white/80">Experts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">{fiscalDomain.resources?.length || 0}</div>
                  <div className="text-sm text-white/80">Ressources</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt={`Expertise en ${fiscalDomain.name}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-16 lg:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto scrollbar-hide">
            <a href="#guides" className="py-4 px-1 border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 whitespace-nowrap">
              Guides ({fiscalDomain.articles?.length || 0})
            </a>
            <a href="#experts" className="py-4 px-1 border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 whitespace-nowrap">
              Experts ({fiscalDomain.lawyers?.length || 0})
            </a>
            <a href="#ressources" className="py-4 px-1 border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 whitespace-nowrap">
              Ressources ({fiscalDomain.resources?.length || 0})
            </a>
          </nav>
        </div>
      </section>

      {/* Guides Section */}
      <section id="guides" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Guides et Articles
              </h2>
              <p className="text-lg text-gray-600">
                Analyses approfondies et conseils pratiques par nos experts
              </p>
            </div>
            <Button variant="outline">
              Voir tous les guides
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fiscalDomain.articles?.map((article: any) => (
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
                      <Button variant="ghost" size="sm">
                        Lire
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )) || (
              <div className="col-span-full text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucun guide disponible pour ce domaine.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section id="experts" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Experts Spécialisés
              </h2>
              <p className="text-lg text-gray-600">
                Avocats fiscalistes experts dans ce domaine
              </p>
            </div>
            <Link href="/trouver-un-avocat-fiscaliste">
              <Button variant="outline">
                Voir tous les experts
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fiscalDomain.lawyers?.slice(0, 6).map((lawyer: any) => (
              <Card key={lawyer.id} className="hover:shadow-lg transition-shadow duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-[var(--lexanova-blue)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-8 h-8 text-[var(--lexanova-blue)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[var(--lexanova-blue)] transition-colors">
                        {lawyer.nomComplet}
                      </h3>
                      <p className="text-gray-600 mb-2">{lawyer.ville}</p>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {lawyer.biographie}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {lawyer.anneesExperience} ans d'expérience
                        </span>
                        <Link href={`/avocat/${lawyer.slug}`}>
                          <Button variant="ghost" size="sm">
                            Voir profil
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) || (
              <div className="col-span-full text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucun expert spécialisé pour ce domaine.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="ressources" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ressources Utiles
              </h2>
              <p className="text-lg text-gray-600">
                Documents, modèles et guides pratiques à télécharger
              </p>
            </div>
            <Link href="/ressources-utiles">
              <Button variant="outline">
                Voir toutes les ressources
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fiscalDomain.resources?.map((resource: any) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[var(--lexanova-blue)]/10 rounded-lg p-3 flex-shrink-0">
                      <Download className="w-6 h-6 text-[var(--lexanova-blue)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[var(--lexanova-blue)] transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline">{resource.format}</Badge>
                        <span className="text-sm text-gray-500">{resource.fileSize}</span>
                      </div>
                      <Link href={`/api/resources/${resource.slug}/download`}>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) || (
              <div className="col-span-full text-center py-12">
                <Download className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucune ressource disponible pour ce domaine.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
