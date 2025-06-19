
import Link from 'next/link';
import { Scale, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    services: [
      { name: 'Trouver un avocat', href: '/trouver-un-avocat-fiscaliste' },
      { name: 'Guides Fiscaux', href: '/guides-fiscaux' },
      { name: 'Blog', href: '/blog' },
      { name: 'Simulateurs', href: '/simulateurs' },
    ],
    resources: [
      { name: 'Ressources utiles', href: '/ressources-utiles' },
      { name: 'Documents gratuits', href: '/ressources-utiles/documents' },
      { name: 'Modèles d\'actes', href: '/ressources-utiles/modeles' },
    ],
    lawyers: [
      { name: 'Espace Avocat', href: '/espace-avocat' },
      { name: 'Devenir partenaire', href: '/espace-avocat/devenir-partenaire' },
      { name: 'Connexion', href: '/espace-avocat/connexion' },
    ],
    company: [
      { name: 'À Propos', href: '/a-propos' },
      { name: 'Contact', href: '/contact' },
      { name: 'CVU Avocats', href: '/cvu-avocats' },
    ],
    legal: [
      { name: 'Mentions légales', href: '/mentions-legales' },
      { name: 'Politique de confidentialité', href: '/politique-confidentialite' },
      { name: 'CGU', href: '/cgu' },
    ],
  };

  return (
    <footer className="bg-[var(--lexanova-blue)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo et description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 text-[var(--lexanova-blue)]" />
              </div>
              <span className="text-2xl font-bold">Lexanova</span>
            </Link>
            <p className="text-blue-100 mb-6 max-w-md">
              Le pont direct vers les meilleurs avocats fiscalistes de France. 
              Faciliter la rencontre entre particuliers, entrepreneurs et dirigeants 
              avec le bon avocat fiscaliste.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-200" />
                <span className="text-blue-100 text-sm">
                  5 rue Auguste et Louis Lumière, 94190 Villeneuve-Saint-Georges
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-200" />
                <a 
                  href="mailto:contact@lexanova.fr" 
                  className="text-blue-100 text-sm hover:text-white transition-colors"
                >
                  contact@lexanova.fr
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {links.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-blue-100 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Ressources</h3>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-blue-100 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Avocats */}
          <div>
            <h3 className="font-semibold text-white mb-4">Avocats</h3>
            <ul className="space-y-2">
              {links.lawyers.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-blue-100 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h3 className="font-semibold text-white mb-4">Entreprise</h3>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-blue-100 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-blue-100 text-sm">
            © {currentYear} Lexanova. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            {links.legal.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="text-blue-200 hover:text-white transition-colors text-xs"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-blue-100 text-sm">Plateforme 100% française</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
