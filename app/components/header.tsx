
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Scale, Phone, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Trouver un avocat', href: '/trouver-un-avocat-fiscaliste' },
    { name: 'Guides Fiscaux', href: '/guides-fiscaux' },
    { name: 'Blog', href: '/blog' },
    { name: 'Histoires Fiscales', href: '/histoires-fiscales' },
    { name: 'Simulateurs', href: '/simulateurs' },
    { 
      name: 'Ressources utiles', 
      href: '/ressources-utiles',
      submenu: [
        { name: 'Documents gratuits', href: '/ressources-utiles/documents' },
        { name: 'Modèles d\'actes', href: '/ressources-utiles/modeles' },
        { name: 'Guides pratiques', href: '/ressources-utiles/guides' },
      ]
    },
    { 
      name: 'Vous êtes avocat ?', 
      href: '/espace-avocat',
      submenu: [
        { name: 'Connexion', href: '/espace-avocat/connexion' },
        { name: 'Devenir partenaire', href: '/espace-avocat/devenir-partenaire' },
        { name: 'Mon profil', href: '/espace-avocat/profil' },
        { name: 'Mes rendez-vous', href: '/espace-avocat/rendez-vous' },
      ]
    },
    { name: 'À Propos', href: '/a-propos' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[var(--lexanova-blue)] to-[var(--lexanova-violet)] rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl lg:text-2xl font-bold text-[var(--lexanova-blue)]">
              Lexanova
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <>
                    <button className="flex items-center text-gray-700 hover:text-[var(--lexanova-blue)] transition-colors duration-200 font-medium">
                      {item.name}
                      <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-200" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:text-[var(--lexanova-blue)] hover:bg-gray-50 transition-colors duration-200"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-[var(--lexanova-blue)] transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/prise-rendez-vous">
              <Button 
                variant="outline" 
                size="sm"
                className="border-[var(--lexanova-blue)] text-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)] hover:text-white"
              >
                <Phone className="w-4 h-4 mr-2" />
                Prendre RDV
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="sm"
                className="bg-[var(--lexanova-violet)] hover:bg-[var(--lexanova-violet)]/90 text-white"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div className="space-y-1">
                      <div className="px-3 py-2 text-gray-700 font-medium border-b border-gray-100">
                        {item.name}
                      </div>
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-6 py-2 text-sm text-gray-600 hover:text-[var(--lexanova-blue)] hover:bg-gray-50 rounded-md transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-gray-700 hover:text-[var(--lexanova-blue)] hover:bg-gray-50 rounded-md transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <Link href="/prise-rendez-vous">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full border-[var(--lexanova-blue)] text-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)] hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Prendre RDV
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    size="sm"
                    className="w-full bg-[var(--lexanova-violet)] hover:bg-[var(--lexanova-violet)]/90 text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
