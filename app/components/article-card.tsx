
'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    author: string;
    readTime: number;
    publishedAt: Date | null;
    category: {
      id: string;
      name: string;
      slug: string;
    };
  };
  index?: number;
}

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const publishedDate = article.publishedAt ? new Date(article.publishedAt) : new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-video bg-gray-200 overflow-hidden">
        <Image
          src="https://thumbs.dreamstime.com/b/classic-law-office-library-pro-workspace-dark-wooden-bookshelves-filled-legal-documents-desk-leather-chair-study-research-350804605.jpg"
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-[var(--lexanova-violet)] text-white text-xs font-medium rounded-full">
            {article.category.name}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-[var(--lexanova-blue)] transition-colors">
          {article.title}
        </h3>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {article.excerpt}
          </p>
        )}

        {/* Meta info */}
        <div className="flex items-center justify-between text-gray-500 text-xs mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User className="w-3 h-3 mr-1" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{publishedDate.toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>{article.readTime} min</span>
            </div>
          </div>
        </div>

        {/* Read more */}
        <Link href={`/guides-fiscaux/${article.slug}`}>
          <Button 
            variant="ghost" 
            size="sm"
            className="w-full justify-between group/btn text-[var(--lexanova-blue)] hover:bg-blue-50"
          >
            <span>Lire l'article</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
