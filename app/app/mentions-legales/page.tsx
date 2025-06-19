
'use client';

import { motion } from 'framer-motion';
import { Scale, MapPin, Mail, Phone } from 'lucide-react';

export default function MentionsLegalesPage() {
  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[var(--lexanova-blue)] to-[var(--lexanova-violet)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Scale className="w-16 h-16 mx-auto mb-6 text-blue-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mentions Légales & CGU
            </h1>
            <p className="text-xl text-blue-100">
              Informations légales et conditions d'utilisation de Lexanova
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-sm p-8 md:p-12"
          >
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Informations légales</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Éditeur du site</h3>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <p className="mb-2"><strong>Raison sociale :</strong> Lexanova</p>
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-gray-600" />
                  <span><strong>Adresse :</strong> 5 rue Auguste et Louis Lumière, 94190 Villeneuve-Saint-Georges</span>
                </div>
                <div className="flex items-center mb-2">
                  <Mail className="w-4 h-4 mr-2 text-gray-600" />
                  <span><strong>Email :</strong> contact@lexanova.fr</span>
                </div>
                <p className="mb-2"><strong>Directeur de la publication :</strong> Équipe Lexanova</p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Hébergement</h3>
              <p className="mb-6">
                Le site est hébergé par un prestataire technique garantissant la sécurité et la disponibilité du service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Conditions Générales d'Utilisation</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">2.1. Objet</h3>
              <p className="mb-6">
                Les présentes conditions générales d'utilisation (CGU) ont pour objet de définir les modalités et conditions 
                d'utilisation de la plateforme Lexanova, ainsi que les droits et obligations des utilisateurs.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">2.2. Acceptation des CGU</h3>
              <p className="mb-6">
                L'utilisation de la plateforme Lexanova implique l'acceptation pleine et entière des présentes CGU. 
                Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser le service.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">2.3. Description du service</h3>
              <p className="mb-6">
                Lexanova est une plateforme de mise en relation entre particuliers, entrepreneurs, dirigeants et avocats 
                fiscalistes qualifiés. Le service comprend :
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Un annuaire d'avocats fiscalistes vérifiés</li>
                <li>Des outils de recherche et de filtrage</li>
                <li>Des guides et articles fiscaux</li>
                <li>Des simulateurs fiscaux</li>
                <li>Un service de prise de rendez-vous</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">2.4. Utilisation du service</h3>
              <p className="mb-4">L'utilisateur s'engage à :</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Fournir des informations exactes et à jour</li>
                <li>Utiliser le service de manière conforme à sa destination</li>
                <li>Ne pas porter atteinte au fonctionnement du service</li>
                <li>Respecter les droits des tiers</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">2.5. Gratuité du service</h3>
              <p className="mb-6">
                L'utilisation de la plateforme Lexanova est entièrement gratuite pour les utilisateurs finaux. 
                Aucune commission n'est prélevée sur les rendez-vous pris via la plateforme.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">2.6. Responsabilité</h3>
              <p className="mb-6">
                Lexanova agit en qualité d'intermédiaire technique. La responsabilité de Lexanova ne saurait être engagée 
                concernant la qualité des prestations fournies par les avocats fiscalistes référencés sur la plateforme.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">2.7. Propriété intellectuelle</h3>
              <p className="mb-6">
                Tous les éléments du site (textes, images, logos, etc.) sont protégés par le droit de la propriété intellectuelle. 
                Toute reproduction non autorisée est interdite.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Protection des données personnelles</h2>
              <p className="mb-6">
                Les données personnelles collectées sur la plateforme sont traitées conformément au Règlement Général 
                sur la Protection des Données (RGPD). Pour plus d'informations, consultez notre 
                <a href="/politique-confidentialite" className="text-[var(--lexanova-blue)] hover:underline ml-1">
                  politique de confidentialité
                </a>.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Modification des CGU</h2>
              <p className="mb-6">
                Lexanova se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés 
                de toute modification par tout moyen approprié.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Droit applicable et juridiction</h2>
              <p className="mb-6">
                Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
                <p className="mb-2">
                  Pour toute question concernant ces mentions légales ou conditions d'utilisation :
                </p>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-600" />
                  <a href="mailto:contact@lexanova.fr" className="text-[var(--lexanova-blue)] hover:underline">
                    contact@lexanova.fr
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
