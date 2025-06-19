
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Share2, BookOpen, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // En production, on récupérerait les données de l'article depuis l'API
  const title = 'L\'Entrepreneur qui a Économisé 300k€ d\'Impôts | Lexanova';
  const description = 'Découvrez comment Marc, dirigeant d\'une PME tech, a optimisé sa fiscalité grâce à une restructuration intelligente et a économisé 300k€ d\'impôts.';

  return {
    title,
    description,
    keywords: 'optimisation fiscale, PME, holding, économie d\'impôts, restructuration fiscale',
  };
}

// Données simulées - en production viendraient de l'API
const articleData = {
  id: '1',
  title: 'L\'Entrepreneur qui a Économisé 300k€ d\'Impôts avec une Simple Restructuration',
  excerpt: 'Marc, dirigeant d\'une PME tech, découvre comment optimiser sa fiscalité grâce à une holding bien structurée.',
  image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop',
  category: 'Optimisation',
  readTime: 8,
  publishedAt: '15 juin 2024',
  author: 'Me. Sophie Dubois',
  authorBio: 'Avocate fiscaliste spécialisée en restructurations d\'entreprises',
  tags: ['PME', 'Holding', 'Optimisation fiscale'],
  story: `Marc Durand, 45 ans, a créé sa société de développement logiciel il y a 15 ans. Ce qui a commencé comme une petite entreprise de 3 personnes est devenu aujourd'hui une PME florissante de 50 salariés générant 8 millions d'euros de chiffre d'affaires annuel.

Mais Marc faisait face à un problème de taille : ses impôts explosaient année après année.`,
  
  legalIssue: `"L'année dernière, j'ai payé plus de 800 000 euros d'impôts entre l'IS, l'IR sur mes dividendes, et les charges sociales," nous confie Marc. "Je commençais à me demander si tout ce travail en valait la peine."

Le problème de Marc est classique pour les dirigeants de PME en croissance : plus l'entreprise réussit, plus la pression fiscale devient insoutenable. Avec une rémunération de dirigeant de 150 000 euros et des dividendes de 300 000 euros, Marc se trouvait dans les tranches d'imposition les plus élevées.

**Les enjeux étaient multiples :**
- Optimiser la charge fiscale globale
- Préparer la transmission future de l'entreprise
- Maintenir la capacité d'investissement et de croissance
- Sécuriser juridiquement les opérations`,

  solution: `Après avoir consulté notre cabinet, nous avons analysé la structure de Marc et proposé une restructuration en trois étapes :

**1. Création d'une holding de tête**
Nous avons créé "MD Invest", une holding détenant 100% des parts de la société opérationnelle. Cette structure permet de bénéficier du régime mère-fille et d'optimiser les flux de dividendes.

**2. Optimisation de la rémunération**
Réduction du salaire de Marc à 80 000 euros (optimal pour les charges sociales) et compensation par une augmentation des dividendes remontés à la holding.

**3. Mise en place d'un pacte Dutreil**
Signature d'un engagement collectif de conservation des titres pour bénéficier de l'abattement de 75% en cas de transmission.

**Les calculs étaient éloquents :**
- Avant : 800 000€ d'impôts et charges
- Après : 500 000€ d'impôts et charges
- **Économie annuelle : 300 000€**`,

  outcome: `Six mois après la restructuration, Marc a pu constater les premiers effets :

**Résultats financiers :**
- Économie immédiate de 300 000€ par an
- Trésorerie disponible pour l'investissement
- Optimisation de la transmission future

**Impact sur l'entreprise :**
- Capacité d'investissement renforcée
- Recrutement de 10 nouveaux collaborateurs
- Lancement d'un nouveau produit grâce aux liquidités dégagées

**Témoignage de Marc :**
"Cette restructuration a été un game-changer. Non seulement j'économise 300 000€ par an, mais j'ai aussi sécurisé l'avenir de mon entreprise et préparé sa transmission à mes enfants. L'investissement dans le conseil fiscal s'est amorti en moins de deux mois."

**Enseignements clés :**
- L'optimisation fiscale doit s'anticiper dès que l'entreprise atteint une certaine taille
- La création d'une holding peut diviser par deux la charge fiscale
- Le pacte Dutreil est un outil incontournable pour la transmission
- Un conseil expert permet d'éviter les pièges juridiques`,

  relatedArticles: [
    {
      id: '2',
      title: 'Holding : 5 Erreurs à Éviter Absolument',
      category: 'Optimisation',
      readTime: 6
    },
    {
      id: '3',
      title: 'Pacte Dutreil : Mode d\'Emploi Complet',
      category: 'Transmission',
      readTime: 10
    }
  ]
};

export default function ArticleDetailPage({ params }: Props) {
  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/histoires-fiscales">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux histoires
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="outline" className="border-blue-500 text-blue-600">
              {articleData.category}
            </Badge>
            <Badge variant="destructive" className="bg-red-500">
              🔥 POPULAIRE
            </Badge>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {articleData.readTime} min de lecture
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {articleData.title}
          </h1>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{articleData.author}</p>
                <p className="text-sm text-gray-500">{articleData.authorBio}</p>
                <p className="text-sm text-gray-500">{articleData.publishedAt}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
          </div>

          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-8">
            <img 
              src={articleData.image} 
              alt={articleData.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {/* Introduction */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-3 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              L'Histoire
            </h2>
            <p className="text-blue-800 leading-relaxed whitespace-pre-line">
              {articleData.story}
            </p>
          </div>

          {/* Legal Issue */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg mb-8">
            <h2 className="text-xl font-semibold text-orange-900 mb-3 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              La Problématique Juridique
            </h2>
            <div className="text-orange-800 leading-relaxed whitespace-pre-line">
              {articleData.legalIssue}
            </div>
          </div>

          {/* Solution */}
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
            <h2 className="text-xl font-semibold text-green-900 mb-3 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              La Solution Mise en Œuvre
            </h2>
            <div className="text-green-800 leading-relaxed whitespace-pre-line">
              {articleData.solution}
            </div>
          </div>

          {/* Outcome */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg mb-8">
            <h2 className="text-xl font-semibold text-purple-900 mb-3 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Le Résultat et les Enseignements
            </h2>
            <div className="text-purple-800 leading-relaxed whitespace-pre-line">
              {articleData.outcome}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {articleData.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Articles Similaires
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {articleData.relatedArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {article.category}
                  </Badge>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-[var(--lexanova-blue)] transition-colors">
                    <Link href={`/histoires-fiscales/${article.id}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {article.readTime} min
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-[var(--lexanova-blue)] to-[var(--lexanova-violet)] rounded-lg text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Vous avez une situation similaire ?
          </h3>
          <p className="text-blue-100 mb-6">
            Nos experts fiscalistes peuvent vous aider à optimiser votre fiscalité. 
            Demandez une consultation personnalisée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/prise-rendez-vous">
              <Button variant="secondary" size="lg">
                Prendre rendez-vous
              </Button>
            </Link>
            <Link href="/simulateurs">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[var(--lexanova-blue)]">
                Simuler ma situation
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
