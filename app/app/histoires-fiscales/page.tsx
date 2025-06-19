
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, User, TrendingUp, AlertCircle, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Histoires Fiscales | Lexanova - Histoires et Cas Pratiques',
  description: 'Découvrez nos histoires fiscales à travers des histoires réelles et des cas pratiques concrets. Analyse juridique et conseils d\'experts.',
  keywords: 'histoires fiscales, cas pratiques fiscaux, histoires fiscales, jurisprudence, droit fiscal',
};

// Données simulées - en production, ces données viendraient de l'API
const featuredStories = [
  {
    id: '1',
    title: 'L\'Entrepreneur qui a Économisé 300k€ d\'Impôts avec une Simple Restructuration',
    excerpt: 'Marc, dirigeant d\'une PME tech, découvre comment optimiser sa fiscalité grâce à une holding bien structurée.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop',
    category: 'Optimisation',
    readTime: 8,
    publishedAt: '2024-06-15',
    author: 'Me. Sophie Dubois',
    isHot: true,
    tags: ['PME', 'Holding', 'Optimisation fiscale']
  },
  {
    id: '2',
    title: 'La Famille qui a Transmis son Patrimoine sans Payer un Euro de Droits',
    excerpt: 'Comment la famille Durand a utilisé le démembrement de propriété pour optimiser sa transmission patrimoniale.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop',
    category: 'Transmission',
    readTime: 12,
    publishedAt: '2024-06-10',
    author: 'Me. Jean Martin',
    isHot: false,
    tags: ['Patrimoine', 'Transmission', 'Démembrement']
  },
  {
    id: '3',
    title: 'L\'Expatrié qui a Évité la Double Imposition grâce à une Convention Méconnue',
    excerpt: 'Thomas découvre une subtilité de la convention fiscale France-Singapour qui lui fait économiser 180k€.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=400&fit=crop',
    category: 'International',
    readTime: 10,
    publishedAt: '2024-06-05',
    author: 'Me. Claire Rousseau',
    isHot: true,
    tags: ['Expatriation', 'Convention fiscale', 'International']
  }
];

const latestNews = [
  {
    id: '4',
    title: 'Loi de Finances 2025 : Les 5 Changements qui Vont Impacter Votre Fiscalité',
    excerpt: 'Analyse détaillée des nouvelles mesures fiscales et de leur impact sur les entreprises et particuliers.',
    category: 'Réglementation',
    readTime: 6,
    publishedAt: '2024-06-18',
    isUrgent: true
  },
  {
    id: '5',
    title: 'Contrôle Fiscal : L\'Histoire de l\'Entreprise qui a Retourné la Situation',
    excerpt: 'Comment une PME a transformé un contrôle fiscal en opportunité d\'optimisation.',
    category: 'Contrôle',
    readTime: 9,
    publishedAt: '2024-06-16',
    isUrgent: false
  },
  {
    id: '6',
    title: 'Plus-Values Immobilières : Le Nouveau Calcul qui Change Tout',
    excerpt: 'Décryptage de la nouvelle méthode de calcul des abattements pour durée de détention.',
    category: 'Immobilier',
    readTime: 7,
    publishedAt: '2024-06-12',
    isUrgent: false
  }
];

const categories = [
  { name: 'Optimisation', count: 24, color: 'bg-blue-500' },
  { name: 'Transmission', count: 18, color: 'bg-purple-500' },
  { name: 'International', count: 15, color: 'bg-green-500' },
  { name: 'Contrôle', count: 12, color: 'bg-orange-500' },
  { name: 'Réglementation', count: 31, color: 'bg-red-500' },
  { name: 'Immobilier', count: 21, color: 'bg-indigo-500' }
];

export default function ActualitesFiscalesPage() {
  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--lexanova-blue)] to-[var(--lexanova-violet)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Histoires Fiscales
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Découvrez les histoires fiscales qui font l'actualité à travers des cas pratiques concrets et des analyses d'experts
            </p>
            <div className="flex items-center justify-center space-x-2 text-blue-100">
              <BookOpen className="w-5 h-5" />
              <span>Nouvelles histoires chaque semaine</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Stories */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Histoires à la Une
                </h2>
                <Badge variant="destructive" className="bg-red-500">
                  🔥 Tendances
                </Badge>
              </div>

              <div className="grid gap-8">
                {featuredStories.map((story, index) => (
                  <Card key={story.id} className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${
                    index === 0 ? 'lg:grid lg:grid-cols-2' : ''
                  }`}>
                    <div className={index === 0 ? 'lg:order-2' : ''}>
                      <div className="aspect-video bg-gray-200 overflow-hidden">
                        <img 
                          src={story.image} 
                          alt={story.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <div className={`p-6 ${index === 0 ? 'lg:order-1 lg:flex lg:flex-col lg:justify-center' : ''}`}>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant="outline" className={`text-xs ${
                          story.category === 'Optimisation' ? 'border-blue-500 text-blue-600' :
                          story.category === 'Transmission' ? 'border-purple-500 text-purple-600' :
                          'border-green-500 text-green-600'
                        }`}>
                          {story.category}
                        </Badge>
                        {story.isHot && (
                          <Badge variant="destructive" className="text-xs bg-red-500">
                            🔥 HOT
                          </Badge>
                        )}
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {story.readTime} min
                        </div>
                      </div>

                      <h3 className={`font-bold text-gray-900 mb-3 hover:text-[var(--lexanova-blue)] transition-colors ${
                        index === 0 ? 'text-xl lg:text-2xl' : 'text-lg'
                      }`}>
                        <Link href={`/histoires-fiscales/${story.id}`}>
                          {story.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {story.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{story.author}</p>
                            <p className="text-xs text-gray-500">{story.publishedAt}</p>
                          </div>
                        </div>

                        <Link href={`/histoires-fiscales/${story.id}`}>
                          <Button size="sm" variant="ghost" className="hover:bg-[var(--lexanova-blue)] hover:text-white">
                            Lire l'histoire
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {story.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Latest News */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Dernières Actualités
              </h2>

              <div className="space-y-6">
                {latestNews.map((news) => (
                  <Card key={news.id} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {news.category}
                            </Badge>
                            {news.isUrgent && (
                              <Badge variant="destructive" className="text-xs bg-red-500">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                URGENT
                              </Badge>
                            )}
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              {news.readTime} min
                            </div>
                          </div>

                          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-[var(--lexanova-blue)] transition-colors">
                            <Link href={`/histoires-fiscales/${news.id}`}>
                              {news.title}
                            </Link>
                          </h3>

                          <p className="text-gray-600 mb-3">
                            {news.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">{news.publishedAt}</p>
                            <Link href={`/histoires-fiscales/${news.id}`}>
                              <Button size="sm" variant="ghost">
                                Lire la suite
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Voir plus d'actualités
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Catégories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <Link key={category.name} href={`/histoires-fiscales/categorie/${category.name.toLowerCase()}`}>
                        <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                            <span className="text-sm font-medium">{category.name}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="bg-gradient-to-br from-[var(--lexanova-blue)] to-[var(--lexanova-violet)] text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Newsletter Fiscale
                  </h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Recevez nos dernières actualités et analyses directement par email.
                  </p>
                  <Button variant="secondary" size="sm" className="w-full">
                    S'abonner
                  </Button>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tags Populaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['Optimisation fiscale', 'PME', 'Holding', 'IFI', 'Plus-values', 'Donation', 'LMNP', 'TVA', 'Expatriation'].map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs cursor-pointer hover:bg-gray-100">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
