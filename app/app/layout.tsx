import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import './globals.css'
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import SchemaScript from '@/components/seo/schema-script'
import { generateOrganizationSchema, generateLocalBusinessSchema, defaultSEO } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: defaultSEO.title,
    template: '%s | Lexanova - Avocats Fiscalistes',
  },
  description: defaultSEO.description,
  keywords: defaultSEO.keywords,
  authors: [{ name: 'Lexanova', url: 'https://lexanova.fr' }],
  creator: 'Lexanova',
  publisher: 'Lexanova',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lexanova.fr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://lexanova.fr',
    siteName: 'Lexanova',
    title: defaultSEO.title,
    description: defaultSEO.description,
    images: [
      {
        url: '/images/lexanova-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Lexanova - Réseau d\'avocats fiscalistes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultSEO.title,
    description: defaultSEO.description,
    creator: '@lexanova_fr',
    images: ['/images/lexanova-og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = generateOrganizationSchema()
  const localBusinessSchema = generateLocalBusinessSchema()

  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <SchemaScript schema={[organizationSchema, localBusinessSchema]} />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}