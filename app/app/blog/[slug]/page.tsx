
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, User, Eye, Calendar, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  params: { slug: string };
}

async function getBlogPost(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog-posts/${slug}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getBlogPost(params.slug);
  
  if (!data?.blogPost) {
    return {
      title: 'Article non trouvé | Blog Lexanova',
    };
  }
  
  const { blogPost } = data;
  
  return {
    title: `${blogPost.title} | Blog Lexanova`,
    description: blogPost.excerpt,
    keywords: blogPost.tags?.map((tag: any) => tag.name).join(', '),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const data = await getBlogPost(params.slug);
  
  if (!data?.blogPost) {
    notFound();
  }
  
  const { blogPost, relatedPosts } = data;

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center mb-8">
          <Link href="/blog" className="flex items-center text-[var(--lexanova-blue)] hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au blog
          </Link>
        </div>

        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          {blogPost.image && (
            <div className="relative aspect-[2/1] overflow-hidden">
              <Image
                src={blogPost.image}
                alt={blogPost.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {blogPost.tags?.map((tag: any) => (
                <Badge key={tag.id} variant="secondary" style={{ backgroundColor: `${tag.color}20`, color: tag.color }}>
                  <Tag className="w-3 h-3 mr-1" />
                  {tag.name}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {blogPost.title}
            </h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{blogPost.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(blogPost.publishedAt).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{blogPost.readTime} min de lecture</span>
                </div>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                <span>{blogPost.views} vues</span>
              </div>
            </div>
            
            {blogPost.authorBio && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 italic">{blogPost.authorBio}</p>
              </div>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {blogPost.content}
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Articles Connexes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((post: any) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
                  {post.image && (
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2 hover:text-[var(--lexanova-blue)] transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{post.author}</span>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm">
                          Lire la suite
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-[var(--lexanova-blue)] text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Besoin d'un Conseil Personnalisé ?
          </h3>
          <p className="text-blue-100 mb-6">
            Nos experts fiscalistes sont là pour vous accompagner dans vos démarches.
          </p>
          <Link href="/trouver-un-avocat-fiscaliste">
            <Button variant="secondary" size="lg">
              Trouver un Avocat Fiscaliste
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
