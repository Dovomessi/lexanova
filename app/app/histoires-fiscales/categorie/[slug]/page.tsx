
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, User, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryName = decodeURIComponent(params.slug).charAt(0).toUpperCase() + decodeURIComponent(params.slug).slice(1);
  
  return {
    title: `Histoires Fiscales - ${categoryName} | Lexanova`,
    description: `Découvrez toutes les histoires fiscales de la catégorie ${categoryName}. Cas pratiques et analyses d'experts.`,
    keywords: `histoires fiscales, ${categoryName}, cas pratiques fiscaux, droit fiscal`,
  };
}

// Données simulées pour les catégories
const categoryData: Record<string, any> = {
  'optimisation': {
    name: 'Optimisation',
    description: 'Histoires d\'optimisation fiscale réussies',
    color: 'bg-blue-500',
    stories: [
      {
        id: '1',
        title: 'L\'Entrepreneur qui a Économisé 300k€ d\'Impôts avec une Simple Restructuration',
        excerpt: 'Marc, dirigeant d\'une PME tech, découvre comment optimiser sa fiscalité grâce à une holding bien structurée.',
        readTime: 8,
        publishedAt: '2024-06-15',
        author: 'Me. Sophie Dubois'
      }
    ]
  },
  'transmission': {
    name: 'Transmission',
    description: 'Stratégies de transmission patrimoniale',
    color: 'bg-purple-500',
    stories: [
      {
        id: '2',
        title: 'La Famille qui a Transmis son Patrimoine sans Payer un Euro de Droits',
        excerpt: 'Comment la famille Durand a utilisé le démembrement de propriété pour optimiser sa transmission patrimoniale.',
        readTime: 12,
        publishedAt: '2024-06-10',
        author: 'Me. Jean Martin'
      }
    ]
  },
  'international': {
    name: 'International',
    description: 'Fiscalité internationale et expatriation',
    color: 'bg-green-500',
    stories: [
      {
        id: '3',
        title: 'L\'Expatrié qui a Évité la Double Imposition grâce à une Convention Méconnue',
        excerpt: 'Thomas découvre une subtilité de la convention fiscale France-Singapour qui lui fait économiser 180k€.',
        readTime: 10,
        publishedAt: '2024-06-05',
        author: 'Me. Claire Rousseau'
      }
    ]
  },
  'contrôle': {
    name: 'Contrôle',
    description: 'Contrôles fiscaux et contentieux',
    color: 'bg-orange-500',
    stories: []
  },
  'réglementation': {
    name: 'Réglementation',
    description: 'Évolutions réglementaires et impacts',
    color: 'bg-red-500',
    stories: []
  },
  'immobilier': {
    name: 'Immobilier',
    description: 'Fiscalité immobilière et foncière',
    color: 'bg-indigo-500',
    stories: []
  }
};

export default function CategoryPage({ params }: Props) {
  const slug = decodeURIComponent(params.slug);
  const category = categoryData[slug] || {
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    description: `Histoires fiscales de la catégorie ${slug}`,
    color: 'bg-gray-500',
    stories: []
  };

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/histoires-fiscales">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux histoires
          </Button>
        </Link>
      </div>

      {/* Header */}
      <section className={`${category.color} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              {category.description}
            </p>
            <div className="flex items-center justify-center space-x-2 text-white/80">
              <BookOpen className="w-5 h-5" />
              <span>{category.stories.length} histoire(s) disponible(s)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {category.stories.length > 0 ? (
          <div className="grid gap-8">
            {category.stories.map((story: any) => (
              <Card key={story.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge variant="outline" className={`border-current`}>
                      {category.name}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {story.readTime} min
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-[var(--lexanova-blue)] transition-colors">
                    <Link href={`/histoires-fiscales/${story.id}`}>
                      {story.title}
                    </Link>
                  </h2>

                  <p className="text-gray-600 mb-6 leading-relaxed">
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
                      <Button variant="outline">
                        Lire l'histoire
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Aucune histoire disponible
            </h2>
            <p className="text-gray-600 mb-8">
              Cette catégorie sera bientôt enrichie avec de nouvelles histoires fiscales.
            </p>
            <Link href="/histoires-fiscales">
              <Button>
                Voir toutes les histoires
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
