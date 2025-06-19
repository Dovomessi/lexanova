
import { Metadata } from 'next';
import Link from 'next/link';
import { Download, FileText, Book, Calculator, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const metadata: Metadata = {
  title: 'Ressources Utiles | Lexanova - Documents et Modèles Fiscaux Gratuits',
  description: 'Téléchargez gratuitement nos documents fiscaux, modèles d\'actes, guides pratiques et calculateurs. Ressources professionnelles pour optimiser votre fiscalité.',
  keywords: 'ressources fiscales, documents gratuits, modèles fiscaux, guides pratiques, calculateurs fiscaux',
};

async function getResources() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/resources?limit=20`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch resources');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching resources:', error);
    return { resources: [] };
  }
}

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

export default async function RessourcesUtilesPage() {
  const [resourcesData, fiscalDomainsData] = await Promise.all([
    getResources(),
    getFiscalDomains(),
  ]);

  const { resources } = resourcesData;
  const { fiscalDomains } = fiscalDomainsData;

  const resourceTypes = {
    document: { label: 'Documents', icon: FileText, color: '#3B82F6' },
    template: { label: 'Modèles', icon: Book, color: '#10B981' },
    guide: { label: 'Guides', icon: Book, color: '#F59E0B' },
    form: { label: 'Formulaires', icon: Calculator, color: '#8B5CF6' }
  };

  const groupedResources = resources.reduce((acc: any, resource: any) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    acc[resource.type].push(resource);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--lexanova-blue)] to-[var(--lexanova-violet)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 rounded-xl p-4">
                <Download className="w-8 h-8" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ressources <span className="text-yellow-300">Utiles</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Documents gratuits, modèles d'actes et guides pratiques pour optimiser votre fiscalité
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{resources.length}</div>
                <div className="text-blue-100">Ressources</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-blue-100">Gratuit</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">6</div>
                <div className="text-blue-100">Domaines</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">5K+</div>
                <div className="text-blue-100">Téléchargements</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Pourquoi Utiliser Nos Ressources ?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tous nos documents sont créés par nos experts fiscalistes et régulièrement mis à jour 
              selon les évolutions légales et réglementaires.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[var(--lexanova-blue)]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-[var(--lexanova-blue)]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expertise Garantie</h3>
              <p className="text-gray-600">Documents créés et validés par nos avocats fiscalistes</p>
            </div>
            <div className="text-center">
              <div className="bg-[var(--lexanova-violet)]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-[var(--lexanova-violet)]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Accès Immédiat</h3>
              <p className="text-gray-600">Téléchargement instantané sans inscription requise</p>
            </div>
            <div className="text-center">
              <div className="bg-green-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Book className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Toujours à Jour</h3>
              <p className="text-gray-600">Mise à jour régulière selon les évolutions légales</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 text-gray-600" />
              <Input 
                placeholder="Rechercher une ressource..." 
                className="w-64"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <div className="flex flex-wrap gap-2">
                {Object.entries(resourceTypes).map(([type, config]) => (
                  <Badge 
                    key={type}
                    variant="outline" 
                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                    style={{ borderColor: config.color, color: config.color }}
                  >
                    {config.label} ({groupedResources[type]?.length || 0})
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      {Object.entries(resourceTypes).map(([type, config]) => {
        const typeResources = groupedResources[type] || [];
        
        if (typeResources.length === 0) return null;
        
        const IconComponent = config.icon;
        
        return (
          <section key={type} className="py-16 odd:bg-white even:bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center mb-12">
                <div 
                  className="p-3 rounded-xl mr-4"
                  style={{ backgroundColor: `${config.color}15`, color: config.color }}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {config.label}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {typeResources.length} ressource{typeResources.length > 1 ? 's' : ''} disponible{typeResources.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {typeResources.map((resource: any) => (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div 
                          className="p-3 rounded-xl"
                          style={{ backgroundColor: `${config.color}15`, color: config.color }}
                        >
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{resource.format}</Badge>
                          <div className="text-sm text-gray-500 mt-1">{resource.fileSize}</div>
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-[var(--lexanova-blue)] transition-colors">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {resource.description}
                      </p>
                      
                      {resource.fiscalDomain && (
                        <div className="mb-4">
                          <Badge variant="secondary" className="text-xs">
                            {resource.fiscalDomain.name}
                          </Badge>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {resource.downloadCount || 0} téléchargements
                        </span>
                        <Link href={`/api/resources/${resource.slug}/download`}>
                          <Button 
                            size="sm"
                            className="group-hover:bg-[var(--lexanova-blue)] group-hover:text-white transition-colors"
                            style={{ backgroundColor: config.color }}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="py-16 bg-[var(--lexanova-blue)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Besoin d'Aide Personnalisée ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Nos ressources ne suffisent pas ? Contactez directement nos experts fiscalistes 
            pour un accompagnement sur mesure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Contacter un expert
              </Button>
            </Link>
            <Link href="/trouver-un-avocat-fiscaliste">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[var(--lexanova-blue)]">
                Trouver un avocat
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* No Resources Message */}
      {resources.length === 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg mb-4">
                Aucune ressource disponible pour le moment.
              </p>
              <p className="text-gray-400">
                Nos experts travaillent sur de nouveaux documents. Revenez bientôt !
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
