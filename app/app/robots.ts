
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/espace-avocat/profil/',
        '/espace-avocat/rendez-vous/',
        '/espace-avocat/messagerie/',
        '/espace-avocat/abonnement/',
        '/_next/',
        '/admin/',
      ],
    },
    sitemap: 'https://lexanova.fr/sitemap.xml',
  }
}
