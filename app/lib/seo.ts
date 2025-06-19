
// SEO utilities and Schema.org helpers for Lexanova

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  schemaType?: 'WebPage' | 'Article' | 'Organization' | 'Person' | 'Service' | 'LocalBusiness';
  schemaData?: any;
}

export const defaultSEO = {
  title: 'Lexanova - Le Premier Réseau d\'Avocats Fiscalistes de France',
  description: 'Trouvez rapidement le meilleur avocat fiscaliste près de chez vous. Consultation, optimisation fiscale, conseil patrimonial. Réseau de +500 experts certifiés.',
  keywords: 'avocat fiscaliste, conseil fiscal, optimisation fiscale, droit fiscal, avocat impôts, fiscalité entreprise, fiscalité particuliers',
  ogImage: '/images/lexanova-og.jpg',
  url: 'https://lexanova.fr',
};

export function generatePageSEO(config: SEOConfig) {
  const seo = {
    title: config.title,
    description: config.description,
    keywords: config.keywords || defaultSEO.keywords,
    canonical: config.canonical,
    openGraph: {
      title: config.title,
      description: config.description,
      images: [
        {
          url: config.ogImage || defaultSEO.ogImage,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
      type: 'website',
      siteName: 'Lexanova',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [config.ogImage || defaultSEO.ogImage],
    },
    robots: {
      index: !config.noindex,
      follow: !config.noindex,
    },
  };

  return seo;
}

export function generateLawyerSchema(lawyer: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    name: lawyer.nomComplet,
    alternateName: `Maître ${lawyer.nomComplet}`,
    description: lawyer.biographie,
    address: {
      '@type': 'PostalAddress',
      streetAddress: lawyer.adresseCabinet,
      addressLocality: lawyer.ville,
      addressCountry: 'FR',
    },
    telephone: lawyer.telephone,
    email: lawyer.email,
    url: `https://lexanova.fr/avocat/${lawyer.slug}`,
    areaServed: lawyer.ville,
    knowsAbout: lawyer.specializations?.map((spec: any) => spec.name) || [],
    hasCredential: 'Avocat inscrit au Barreau',
    memberOf: {
      '@type': 'ProfessionalService',
      name: 'Lexanova',
      url: 'https://lexanova.fr',
    },
    priceRange: lawyer.tarifs || '€€€',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export function generateArticleSchema(article: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Person',
      name: article.author,
      jobTitle: 'Avocat Fiscaliste',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lexanova',
      logo: {
        '@type': 'ImageObject',
        url: 'https://i.pinimg.com/originals/72/99/a3/7299a32181aa1aadf9d44c7d7e39e347.jpg',
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://lexanova.fr/guides-fiscaux/${article.slug}`,
    },
    articleSection: article.category?.name,
    about: article.fiscalDomain?.name,
    keywords: [
      article.category?.name,
      article.fiscalDomain?.name,
      'conseil fiscal',
      'optimisation fiscale',
    ].filter(Boolean),
    wordCount: article.content?.length || 1000,
    timeRequired: `PT${article.readTime || 5}M`,
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lexanova',
    alternateName: 'Lexanova - Réseau d\'Avocats Fiscalistes',
    url: 'https://lexanova.fr',
    logo: 'https://i.ytimg.com/vi/UaJevpM9F3w/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-DoACuAiKAgwIABABGGUgZShlMA8=&rs=AOn4CLAf2mssmKEixBIgWzKwKhfQLoExCA',
    description: 'Premier réseau d\'avocats fiscalistes de France. Plus de 500 experts certifiés pour vos conseils en optimisation fiscale.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '5 rue Auguste et Louis Lumière',
      addressLocality: 'Villeneuve-Saint-Georges',
      postalCode: '94190',
      addressCountry: 'FR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33-1-23-45-67-89',
      contactType: 'customer service',
      email: 'contact@lexanova.fr',
      availableLanguage: 'French',
    },
    sameAs: [
      'https://www.linkedin.com/company/lexanova',
      'https://twitter.com/lexanova_fr',
    ],
    foundingDate: '2020',
    numberOfEmployees: '50-100',
    areaServed: 'FR',
    serviceType: [
      'Conseil fiscal',
      'Optimisation fiscale',
      'Droit fiscal',
      'Fiscalité des entreprises',
      'Fiscalité patrimoniale',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services Fiscaux',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Consultation Fiscale',
            description: 'Conseil personnalisé en fiscalité',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Optimisation Fiscale',
            description: 'Stratégies d\'optimisation fiscale légale',
          },
        },
      ],
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Lexanova',
    description: 'Réseau d\'avocats fiscalistes - Conseil et optimisation fiscale',
    url: 'https://lexanova.fr',
    telephone: '+33-1-23-45-67-89',
    email: 'contact@lexanova.fr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '5 rue Auguste et Louis Lumière',
      addressLocality: 'Villeneuve-Saint-Georges',
      postalCode: '94190',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.7373,
      longitude: 2.4344,
    },
    openingHours: 'Mo-Fr 09:00-18:00',
    priceRange: '€€€',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services Juridiques Fiscaux',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Avocat Fiscaliste',
            category: 'Droit Fiscal',
            areaServed: 'France',
          },
        },
      ],
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateServiceSchema(service: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Lexanova',
      url: 'https://lexanova.fr',
    },
    areaServed: 'France',
    serviceType: 'Legal Services',
    category: 'Tax Law',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.name,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.description,
          },
          seller: {
            '@type': 'Organization',
            name: 'Lexanova',
          },
        },
      ],
    },
  };
}

// SEO constants for better rankings
export const SEO_CONSTANTS = {
  SITE_NAME: 'Lexanova',
  SITE_URL: 'https://lexanova.fr',
  COMPANY_NAME: 'Lexanova SAS',
  FOUNDING_YEAR: '2020',
  PRIMARY_KEYWORDS: [
    'avocat fiscaliste',
    'conseil fiscal',
    'optimisation fiscale',
    'droit fiscal',
    'fiscalité entreprise',
    'avocat impôts',
  ],
  LOCATIONS: [
    'Paris',
    'Lyon',
    'Marseille',
    'Toulouse',
    'Nice',
    'Bordeaux',
    'Lille',
    'Strasbourg',
  ],
  SERVICES: [
    'Fiscalité des entreprises',
    'Fiscalité internationale',
    'Fiscalité immobilière',
    'Fiscalité patrimoniale',
    'Fiscalité des dirigeants',
    'Fiscalité des particuliers',
  ],
};
