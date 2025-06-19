
'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';

export default function PolitiqueConfidentialitePage() {
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
            <Shield className="w-16 h-16 mx-auto mb-6 text-blue-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Politique de Confidentialité
            </h1>
            <p className="text-xl text-blue-100">
              Protection et traitement de vos données personnelles
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
              <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
                <div className="flex items-center mb-2">
                  <Lock className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">Engagement de confidentialité</span>
                </div>
                <p className="text-green-700 text-sm">
                  Lexanova s'engage à protéger vos données personnelles et à respecter votre vie privée 
                  conformément au Règlement Général sur la Protection des Données (RGPD).
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Responsable du traitement</h2>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <p className="mb-2"><strong>Lexanova</strong></p>
                <p className="mb-2">5 rue Auguste et Louis Lumière, 94190 Villeneuve-Saint-Georges</p>
                <p>Email : contact@lexanova.fr</p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Données collectées</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2.1. Données directement collectées</h3>
              <p className="mb-4">Nous collectons les données que vous nous fournissez directement :</p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Formulaire de contact :</strong> nom, prénom, adresse email, numéro de téléphone, message</li>
                <li><strong>Recherche d'avocats :</strong> critères de recherche (ville, spécialité, mots-clés)</li>
                <li><strong>Utilisation des simulateurs :</strong> données fiscales anonymisées pour les calculs</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">2.2. Données automatiquement collectées</h3>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Données techniques :</strong> adresse IP, navigateur, système d'exploitation</li>
                <li><strong>Données de navigation :</strong> pages visitées, durée de visite, source de trafic</li>
                <li><strong>Cookies :</strong> cookies techniques nécessaires au fonctionnement du site</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Finalités du traitement</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <UserCheck className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-semibold">Service principal</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Mise en relation avec des avocats</li>
                    <li>• Traitement des demandes de contact</li>
                    <li>• Amélioration de nos services</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Eye className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="font-semibold">Analyse et amélioration</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Statistiques d'utilisation</li>
                    <li>• Optimisation de l'expérience</li>
                    <li>• Prévention de la fraude</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Base légale du traitement</h2>
              <p className="mb-4">Le traitement de vos données repose sur les bases légales suivantes :</p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Exécution d'un contrat :</strong> pour fournir nos services de mise en relation</li>
                <li><strong>Intérêt légitime :</strong> pour améliorer nos services et prévenir les abus</li>
                <li><strong>Consentement :</strong> pour les cookies non essentiels et communications marketing</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Partage des données</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
                <div className="flex items-center mb-2">
                  <Database className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="font-semibold text-yellow-800">Principe de non-commercialisation</span>
                </div>
                <p className="text-yellow-700 text-sm">
                  Lexanova ne vend, ne loue, ni ne commercialise vos données personnelles à des tiers.
                </p>
              </div>

              <p className="mb-4">Vos données peuvent être partagées uniquement dans les cas suivants :</p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Avocats partenaires :</strong> transmission de vos coordonnées lors d'une demande de contact</li>
                <li><strong>Prestataires techniques :</strong> hébergement, maintenance (sous contrat de confidentialité)</li>
                <li><strong>Obligations légales :</strong> si requis par la loi ou une autorité compétente</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Durée de conservation</h2>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold mb-3">Durées de conservation par type de données :</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>Messages de contact :</strong> 3 ans après traitement</li>
                  <li><strong>Données de navigation :</strong> 13 mois maximum</li>
                  <li><strong>Logs techniques :</strong> 1 an pour la sécurité</li>
                  <li><strong>Données simulateurs :</strong> non conservées (traitement en temps réel)</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Vos droits</h2>
              <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Droits d'accès et de rectification</h4>
                  <p className="text-sm text-gray-600">Accéder à vos données et les corriger si nécessaire</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Droit d'effacement</h4>
                  <p className="text-sm text-gray-600">Demander la suppression de vos données</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Droit de portabilité</h4>
                  <p className="text-sm text-gray-600">Récupérer vos données dans un format structuré</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Droit d'opposition</h4>
                  <p className="text-sm text-gray-600">Vous opposer au traitement pour motif légitime</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Sécurité des données</h2>
              <p className="mb-4">Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données :</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Chiffrement des données en transit (HTTPS/SSL)</li>
                <li>Contrôles d'accès stricts aux données</li>
                <li>Sauvegardes régulières et sécurisées</li>
                <li>Surveillance continue de la sécurité</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Cookies</h2>
              <p className="mb-4">Nous utilisons des cookies pour :</p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Cookies essentiels :</strong> fonctionnement du site (pas de consentement requis)</li>
                <li><strong>Cookies analytiques :</strong> statistiques d'usage (consentement requis)</li>
                <li><strong>Cookies de préférences :</strong> mémorisation de vos choix</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Contact et réclamations</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercer vos droits</h3>
                <p className="mb-4">
                  Pour exercer vos droits ou pour toute question relative à cette politique :
                </p>
                <div className="flex items-center mb-2">
                  <Mail className="w-4 h-4 mr-2 text-gray-600" />
                  <a href="mailto:contact@lexanova.fr" className="text-[var(--lexanova-blue)] hover:underline">
                    contact@lexanova.fr
                  </a>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  En cas de non-réponse ou de réponse insatisfaisante, vous avez le droit de saisir la CNIL 
                  (Commission Nationale de l'Informatique et des Libertés).
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Modifications</h2>
              <p className="mb-6">
                Cette politique de confidentialité peut être modifiée pour refléter les changements dans nos pratiques 
                ou la réglementation. Nous vous informerons de toute modification substantielle.
              </p>

              <div className="text-sm text-gray-500 border-t pt-6">
                <p><strong>Dernière mise à jour :</strong> 18 juin 2025</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
