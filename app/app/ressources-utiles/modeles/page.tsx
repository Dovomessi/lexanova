
import { Metadata } from 'next';
import Link from 'next/link';
import { Download, Book, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Modèles d\'Actes | Ressources Fiscales Lexanova',
  description: 'Téléchargez gratuitement nos modèles d\'actes fiscaux : pacte Dutreil, conventions, contrats et documents juridiques.',
  keywords: 'modèles actes fiscaux, pacte dutreil, conventions fiscales, contrats',
};

export default function ModelesPage() {
  const modeles = [
    {
      title: 'Modèle de Pacte Dutreil',
      description: 'Modèle type de pacte Dutreil pour l\'engagement collectif de conservation des titres.',
      format: 'DOCX',
      size: '150 KB',
      downloads: 543,
    },
    {
      title: 'Convention de Portage',
      description: 'Modèle de convention de portage de titres avec clauses fiscales.',
      format: 'DOCX',
      size: '180 KB',
      downloads: 234,
    },
    {
      title: 'Acte de Donation Simple',
      description: 'Modèle d\'acte de donation avec optimisation fiscale.',
      format: 'DOCX',
      size: '120 KB',
      downloads: 789,
    },
    {
      title: 'Contrat de Management Package',
      description: 'Modèle de contrat pour l\'attribution d\'actions gratuites.',
      format: 'DOCX',
      size: '200 KB',
      downloads: 156,
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
          <div className="bg-green-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <Book className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Modèles d'Actes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Modèles juridiques et fiscaux prêts à utiliser, validés par nos experts
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modeles.map((modele, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-green-500/10 rounded-lg p-3">
                    <Book className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{modele.format}</Badge>
                    <div className="text-sm text-gray-500 mt-1">{modele.size}</div>
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
                  {modele.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {modele.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {modele.downloads} téléchargements
                  </span>
                  <Button size="sm" className="bg-green-600 hover:bg-green-600/90">
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
