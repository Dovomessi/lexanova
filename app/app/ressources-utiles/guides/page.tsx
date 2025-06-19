
import { Metadata } from 'next';
import Link from 'next/link';
import { Download, BookOpen, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Guides Pratiques | Ressources Fiscales Lexanova',
  description: 'Téléchargez gratuitement nos guides pratiques fiscaux : méthodologies, procédures et conseils d\'experts.',
  keywords: 'guides pratiques fiscaux, méthodologies fiscales, procédures, conseils fiscaux',
};

export default function GuidesPage() {
  const guides = [
    {
      title: 'Guide Pratique de l\'Expatriation',
      description: 'Toutes les étapes pour organiser son départ fiscal et éviter les pièges.',
      format: 'PDF',
      size: '3.2 MB',
      downloads: 1876,
    },
    {
      title: 'Méthodologie Audit Fiscal',
      description: 'Guide complet pour réaliser un audit fiscal d\'entreprise.',
      format: 'PDF',
      size: '2.8 MB',
      downloads: 432,
    },
    {
      title: 'Guide de la Holding Familiale',
      description: 'Création et gestion d\'une holding familiale optimisée.',
      format: 'PDF',
      size: '2.1 MB',
      downloads: 967,
    },
    {
      title: 'Procédures de Contrôle Fiscal',
      description: 'Comment se préparer et réagir face à un contrôle fiscal.',
      format: 'PDF',
      size: '1.9 MB',
      downloads: 1234,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center mb-8">
          <Link href="/ressources-utiles" className="flex items-center text-[var(--lexanova-blue)] hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux ressources
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-orange-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Guides Pratiques
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Méthodologies et procédures détaillées pour vos démarches fiscales
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-orange-500/10 rounded-lg p-3">
                    <BookOpen className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{guide.format}</Badge>
                    <div className="text-sm text-gray-500 mt-1">{guide.size}</div>
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
                  {guide.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {guide.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {guide.downloads} téléchargements
                  </span>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-600/90">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
