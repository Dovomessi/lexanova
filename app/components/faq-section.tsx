
'use client';

import { motion } from 'framer-motion';
import { ChevronDown, CheckCircle, Clock, Shield, Users, Phone } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    id: 'pourquoi-lexanova',
    question: 'Pourquoi choisir Lexanova ?',
    answer: 'Lexanova vous offre un accès rapide aux meilleurs avocats fiscalistes qualifiés, avec un processus simplifié et transparent. Notre service est entièrement gratuit pour les clients, sans commission sur vos rendez-vous.',
    icon: CheckCircle,
    highlights: ['Rapidité', 'Qualification', 'Simplification', 'Sans frais'],
  },
  {
    id: 'comment-ca-marche',
    question: 'Comment ça fonctionne ?',
    answer: 'Choisissez votre ville et spécialité, parcourez notre annuaire d\'avocats vérifiés, consultez leurs profils détaillés, puis prenez rendez-vous en ligne en quelques clics.',
    icon: Clock,
    highlights: ['Choix ville/spécialité', 'Parcours annuaire', 'Prise RDV en ligne'],
  },
  {
    id: 'est-ce-gratuit',
    question: 'Est-ce que c\'est gratuit ?',
    answer: 'Oui, notre service est entièrement gratuit et transparent pour les clients. Nous ne prélevons aucune commission sur vos rendez-vous. Les avocats paient un abonnement pour figurer dans notre annuaire.',
    icon: Shield,
    highlights: ['Service gratuit', 'Transparent', 'Pas de commission'],
  },
  {
    id: 'types-avocats',
    question: 'Quels types d\'avocats ?',
    answer: 'Notre annuaire rassemble une large gamme d\'avocats spécialisés en fiscalité : fiscalité des entreprises, des particuliers, internationale, immobilière, patrimoniale. Tous sont vérifiés et qualifiés.',
    icon: Users,
    highlights: ['Large gamme spécialisée', 'Vérifiés', 'Qualifiés en fiscalité'],
  },
  {
    id: 'prendre-rdv',
    question: 'Comment prendre rendez-vous ?',
    answer: 'Après avoir sélectionné votre avocat, choisissez votre mode de consultation : rendez-vous physique en cabinet, consultation en ligne par visioconférence, ou entretien téléphonique.',
    icon: Phone,
    highlights: ['Rendez-vous physique', 'Consultation en ligne', 'Entretien téléphone'],
  },
];

export default function FAQSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Découvrez pourquoi choisir un avocat fiscaliste via 
            <span className="text-[var(--lexanova-blue)]"> Lexanova</span> est la meilleure décision
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Toutes les réponses à vos questions sur notre service de mise en relation 
            avec les meilleurs avocats fiscalistes de France.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => {
              const IconComponent = faq.icon;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem 
                    value={faq.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 px-6"
                  >
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex items-center space-x-4 text-left">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-[var(--lexanova-blue)]" />
                        </div>
                        <span className="text-lg font-semibold text-gray-900">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <div className="ml-14">
                        <p className="text-gray-600 mb-4">
                          {faq.answer}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {faq.highlights.map((highlight, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-blue-50 text-[var(--lexanova-blue)] text-sm rounded-full"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
