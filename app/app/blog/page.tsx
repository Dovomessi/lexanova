
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Clock, User, ArrowRight, Filter, TrendingUp, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Blog Fiscal | Lexanova - Actualités et Analyses Fiscales',
  description: 'Suivez les dernières actualités fiscales, analyses juridiques et décryptages d\'experts. Blog spécialisé en droit fiscal français.',
  keywords: 'blog fiscal, actualités fiscales, analyses juridiques, décryptage fiscal, expertise fiscale',
};

async function getBlogPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog-posts?limit=12`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { blogPosts: [] };
  }
}

async function getFeaturedPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog-posts?featured=true&limit=3`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch featured posts');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return { blogPosts: [] };
  }
}

async function getBlogTags() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog-tags`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch blog tags');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching blog tags:', error);
    return { blogTags: [] };
  }
}

export default async function BlogPage() {
  const [blogPostsData, featuredPostsData, blogTagsData] = await Promise.all([
    getBlogPosts(),
    getFeaturedPosts(),
    getBlogTags(),
  ]);

  const { blogPosts } = blogPostsData;
  const { blogPosts: featuredPosts } = featuredPostsData;
  const { blogTags } = blogTagsData;

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--lexanova-blue)] to-[var(--lexanova-violet)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Blog Fiscal Lexanova
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Actualités, analyses et décryptages par nos experts fiscalistes
            </p>
            
            <div className="flex items-center justify-center space-x-8 mt-12">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">{blogPosts.length}</div>
                <div className="text-blue-100">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">{blogTags.length}</div>
                <div className="text-blue-100">Catégories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">5</div>
                <div className="text-blue-100">Experts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-12">
              <TrendingUp className="w-6 h-6 text-[var(--lexanova-blue)] mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">
                Articles à la Une
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post: any, index: number) => (
                <Card key={post.id} className={`hover:shadow-xl transition-all duration-300 group ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                  {post.image && (
                    <div className={`relative ${index === 0 ? 'aspect-[2/1]' : 'aspect-[3/2]'} overflow-hidden`}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-[var(--lexanova-blue)] text-white">
                          À la une
                        </Badge>
                      </div>
                    </div>
                  )}
                  <CardHeader className={index === 0 ? 'p-8' : 'p-6'}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {post.tags?.slice(0, 2).map((tag: any) => (
                          <Badge key={tag.id} variant="secondary" style={{ backgroundColor: `${tag.color}20`, color: tag.color }}>
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime} min
                      </div>
                    </div>
                    <CardTitle className={`${index === 0 ? 'text-2xl' : 'text-lg'} line-clamp-2 group-hover:text-[var(--lexanova-blue)] transition-colors`}>
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={index === 0 ? 'px-8 pb-8' : 'px-6 pb-6'}>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[var(--lexanova-blue)]/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-[var(--lexanova-blue)]" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{post.author}</div>
                          <div className="text-xs text-gray-500">{post.authorBio}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {post.views}
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="ghost" size="sm">
                            Lire
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tags Section */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 font-medium">Filtrer par sujet :</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {blogTags.map((tag: any) => (
                <Badge 
                  key={tag.id} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                  style={{ borderColor: tag.color, color: tag.color }}
                >
                  {tag.name} ({tag._count?.blogPosts || 0})
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Tous les Articles
            </h2>
            <div className="text-sm text-gray-500">
              {blogPosts.length} article{blogPosts.length > 1 ? 's' : ''} publié{blogPosts.length > 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter((post: any) => !post.isFeatured).map((post: any) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300 group">
                {post.image && (
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {post.tags?.slice(0, 1).map((tag: any) => (
                        <Badge key={tag.id} variant="secondary" style={{ backgroundColor: `${tag.color}20`, color: tag.color }}>
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime} min
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-[var(--lexanova-blue)] transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-[var(--lexanova-blue)]/10 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-[var(--lexanova-blue)]" />
                      </div>
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="w-4 h-4 mr-1" />
                        {post.views}
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm">
                          Lire
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {blogPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg mb-4">
                Aucun article de blog disponible pour le moment.
              </p>
              <p className="text-gray-400">
                Nos experts travaillent sur de nouveaux contenus. Revenez bientôt !
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
