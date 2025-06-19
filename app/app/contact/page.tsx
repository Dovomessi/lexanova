
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    message: '',
    acceptCGU: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptCGU) {
      toast({
        title: "Erreur",
        description: "Vous devez accepter les CGU pour continuer.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message envoyé !",
          description: "Nous vous répondrons dans les plus brefs délais.",
        });
        
        setFormData({
          prenom: '',
          nom: '',
          email: '',
          telephone: '',
          message: '',
          acceptCGU: false,
        });
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contacter Lexanova
            </h1>
            <p className="text-xl text-blue-100">
              Pour toute question, suggestion ou demande : nous sommes à votre écoute !
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Envoyez-nous un message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
                      Votre Prénom *
                    </label>
                    <Input
                      id="prenom"
                      name="prenom"
                      type="text"
                      required
                      value={formData.prenom}
                      onChange={handleChange}
                      placeholder="Entrez votre prénom"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                      Votre Nom de famille *
                    </label>
                    <Input
                      id="nom"
                      name="nom"
                      type="text"
                      required
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Entrez votre nom"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Votre adresse mail *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                    Votre Numéro de téléphone
                  </label>
                  <Input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="06 12 34 56 78"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre demande..."
                  />
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="acceptCGU"
                    checked={formData.acceptCGU}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, acceptCGU: !!checked }))
                    }
                  />
                  <label htmlFor="acceptCGU" className="text-sm text-gray-600">
                    J'accepte les <a href="/cgu" className="text-[var(--lexanova-blue)] hover:underline">CGU</a> *
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)]/90"
                  size="lg"
                >
                  {isSubmitting ? (
                    'Envoi en cours...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Coordonnées de Lexanova
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[var(--lexanova-blue)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                      <p className="text-gray-600">
                        5 rue Auguste et Louis Lumière<br />
                        94190 Villeneuve-Saint-Georges
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a 
                        href="mailto:contact@lexanova.fr"
                        className="text-[var(--lexanova-blue)] hover:underline"
                      >
                        contact@lexanova.fr
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[var(--lexanova-blue)] to-[var(--lexanova-violet)] rounded-lg shadow-lg p-8 text-white">
                <h3 className="text-xl font-bold mb-4">
                  Pourquoi nous contacter ?
                </h3>
                <div className="space-y-3">
                  {[
                    'Questions sur nos services',
                    'Demande d\'information',
                    'Problème technique',
                    'Suggestion d\'amélioration',
                    'Demande de partenariat',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-300 flex-shrink-0" />
                      <span className="text-blue-100">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
