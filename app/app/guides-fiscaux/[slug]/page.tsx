
import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const prisma = new PrismaClient();

interface PageProps {
  params: {
    slug: string;
  };
}

async function getArticle(slug: string) {
  try {
    const article = await prisma.article.findUnique({
      where: {
        slug: slug,
        isPublished: true,
      },
      include: {
        category: true,
      },
    });

    return article;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  const publishedDate = article.publishedAt ? new Date(article.publishedAt) : new Date();

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/guides-fiscaux">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux guides fiscaux
            </Button>
          </Link>
          
          {article.category && (
            <div className="mb-4">
              <span className="px-3 py-1 bg-[var(--lexanova-violet)] text-white text-sm font-medium rounded-full">
                {article.category.name}
              </span>
            </div>
          )}
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center space-x-6 text-gray-500 text-sm">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{publishedDate.toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{article.readTime} min de lecture</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-white rounded-lg shadow-sm">
            {/* Featured Image */}
            <div className="relative aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80"
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-8 md:p-12">
              {/* Excerpt */}
              {article.excerpt && (
                <div className="bg-blue-50 border-l-4 border-[var(--lexanova-blue)] p-6 mb-8">
                  <p className="text-lg text-gray-700 italic">
                    {article.excerpt}
                  </p>
                </div>
              )}
              
              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }} />
              </div>
              
              {/* Call to Action */}
              <div className="mt-12 p-8 bg-gradient-to-r from-[var(--lexanova-blue)] to-[var(--lexanova-violet)] rounded-lg text-white text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Besoin d'un conseil personnalisé ?
                </h3>
                <p className="text-blue-100 mb-6">
                  Nos avocats fiscalistes experts sont là pour vous accompagner
                </p>
                <Link href="/trouver-un-avocat-fiscaliste">
                  <Button size="lg" className="bg-white text-[var(--lexanova-blue)] hover:bg-gray-100">
                    Trouver un avocat fiscaliste
                  </Button>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        isPublished: true,
      },
      select: {
        slug: true,
      },
    });

    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}
