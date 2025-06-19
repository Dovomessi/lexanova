
import { Metadata } from 'next';
import Link from 'next/link';
import { Download, FileText, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Documents Gratuits | Ressources Fiscales Lexanova',
  description: 'Téléchargez gratuitement nos documents fiscaux : guides, déclarations, modèles de lettres et formulaires officiels.',
  keywords: 'documents fiscaux gratuits, guides fiscaux, formulaires, déclarations impôts',
};

export default function DocumentsPage() {
  const documents = [
    {
      title: 'Guide de Calcul IFI 2025',
      description: 'Guide complet pour calculer et déclarer l\'Impôt sur la Fortune Immobilière.',
      format: 'PDF',
      size: '2.1 MB',
      downloads: 1247,
    },
    {
      title: 'Checklist Résidence Fiscale',
      description: 'Liste de vérification pour déterminer votre résidence fiscale.',
      format: 'PDF',
      size: '500 KB',
      downloads: 892,
    },
    {
      title: 'Guide Déclaration 2025',
      description: 'Tout savoir sur la déclaration de revenus 2025.',
      format: 'PDF',
      size: '1.8 MB',
      downloads: 2156,
    },
    {
      title: 'Règles de Déduction Fiscale',
      description: 'Les principales déductions fiscales pour les particuliers.',
      format: 'PDF',
      size: '750 KB',
      downloads: 654,
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
          <div className="bg-[var(--lexanova-blue)]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-[var(--lexanova-blue)]" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Documents Gratuits
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Téléchargez nos guides et documents fiscaux rédigés par nos experts
          </p>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documents.map((doc, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-[var(--lexanova-blue)]/10 rounded-lg p-3">
                    <FileText className="w-6 h-6 text-[var(--lexanova-blue)]" />
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{doc.format}</Badge>
                    <div className="text-sm text-gray-500 mt-1">{doc.size}</div>
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-[var(--lexanova-blue)] transition-colors">
                  {doc.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {doc.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {doc.downloads} téléchargements
                  </span>
                  <Button size="sm" className="bg-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)]/90">
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
