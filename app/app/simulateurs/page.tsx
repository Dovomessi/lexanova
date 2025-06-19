
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Home, TrendingUp, User, Heart, Euro, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Import des nouveaux simulateurs
import { FreelanceSimulator } from '@/components/simulators/freelance-simulator';
import { DonationSimulator } from '@/components/simulators/donation-simulator';
import { PlusValueMobiliereSimulator } from '@/components/simulators/plus-value-mobiliere-simulator';
import { AcquisitionImmobiliereSimulator } from '@/components/simulators/acquisition-immobiliere-simulator';
import { ImpotRevenuSimulator } from '@/components/simulators/impot-revenu-simulator';

const simulateurs = [
  {
    id: 'freelance',
    title: 'Freelance & Indépendants',
    description: 'Comparez les statuts juridiques et optimisez votre fiscalité d\'indépendant',
    icon: User,
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'donation',
    title: 'Donation-Cession',
    description: 'Optimisez la transmission de votre entreprise par donation avant cession',
    icon: Heart,
    color: 'from-red-500 to-red-600',
  },
  {
    id: 'plus-value-mobiliere',
    title: 'Plus-value mobilière',
    description: 'Calculez l\'impôt sur les plus-values de cession de valeurs mobilières',
    icon: TrendingUp,
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 'acquisition-immobiliere',
    title: 'Acquisition immobilière',
    description: 'Estimez tous les frais et taxes lors de l\'achat d\'un bien immobilier',
    icon: Home,
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'plus-value-immobiliere',
    title: 'Plus-value immobilière',
    description: 'Calculez l\'impôt sur la plus-value de cession d\'un bien immobilier',
    icon: Home,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'impot-revenu',
    title: 'Impôt sur le revenu',
    description: 'Simulez votre impôt sur le revenu selon vos revenus et situation familiale',
    icon: Euro,
    color: 'from-indigo-500 to-indigo-600',
  },
];

export default function SimulateursPage() {
  const [activeSimulator, setActiveSimulator] = useState<string | null>(null);

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
              Simulateurs Fiscaux
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Calculez vos impôts et optimisez votre fiscalité avec nos outils gratuits
            </p>
            <div className="flex items-center justify-center space-x-2 text-blue-100">
              <Calculator className="w-5 h-5" />
              <span>6 simulateurs à votre disposition</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simulators Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!activeSimulator ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Choisissez votre simulateur
                </h2>
                <p className="text-lg text-gray-600">
                  Sélectionnez le simulateur correspondant à votre situation
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {simulateurs.map((simulator, index) => {
                  const IconComponent = simulator.icon;
                  return (
                    <motion.div
                      key={simulator.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                      onClick={() => setActiveSimulator(simulator.id)}
                    >
                      <div className="p-6">
                        <div className={`w-12 h-12 bg-gradient-to-r ${simulator.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[var(--lexanova-blue)] transition-colors">
                          {simulator.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {simulator.description}
                        </p>
                        <div className="flex items-center text-[var(--lexanova-blue)] text-sm font-medium">
                          <span>Utiliser ce simulateur</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          ) : (
            <SimulatorContent 
              simulator={simulateurs.find(s => s.id === activeSimulator)!} 
              onBack={() => setActiveSimulator(null)}
            />
          )}
        </div>
      </section>
    </div>
  );
}

interface SimulatorContentProps {
  simulator: typeof simulateurs[0];
  onBack: () => void;
}

function SimulatorContent({ simulator, onBack }: SimulatorContentProps) {
  const IconComponent = simulator.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          Retour aux simulateurs
        </Button>
        
        <div className="flex items-center space-x-4 mb-6">
          <div className={`w-12 h-12 bg-gradient-to-r ${simulator.color} rounded-lg flex items-center justify-center`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{simulator.title}</h1>
            <p className="text-gray-600">{simulator.description}</p>
          </div>
        </div>
      </div>

      {simulator.id === 'freelance' && <FreelanceSimulator />}
      {simulator.id === 'donation' && <DonationSimulator />}
      {simulator.id === 'plus-value-mobiliere' && <PlusValueMobiliereSimulator />}
      {simulator.id === 'acquisition-immobiliere' && <AcquisitionImmobiliereSimulator />}
      {simulator.id === 'plus-value-immobiliere' && <PlusValueImmobiliereSimulator />}
      {simulator.id === 'impot-revenu' && <ImpotRevenuSimulator />}
    </motion.div>
  );
}

// Simulateur de plus-value immobilière amélioré
function PlusValueImmobiliereSimulator() {
  const [formData, setFormData] = useState({
    prixAcquisition: '',
    prixCession: '',
    anneesDetention: '',
    fraisAcquisition: '',
    fraisCession: '',
    travaux: '',
  });
  const [result, setResult] = useState<any>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const calculate = () => {
    const prixAchat = parseFloat(formData.prixAcquisition) || 0;
    const prixVente = parseFloat(formData.prixCession) || 0;
    const annees = parseFloat(formData.anneesDetention) || 0;
    const fraisAchat = parseFloat(formData.fraisAcquisition) || 0;
    const fraisVente = parseFloat(formData.fraisCession) || 0;
    const travaux = parseFloat(formData.travaux) || 0;

    const plusValueBrute = prixVente - prixAchat - fraisAchat - fraisVente - travaux;
    
    // Abattements simplifiés
    let abattementIR = 0;
    let abattementPS = 0;
    
    if (annees > 5) {
      abattementIR = Math.min((annees - 5) * 6, 100);
    }
    if (annees > 22) {
      abattementIR = 100;
    }
    
    if (annees > 5) {
      abattementPS = Math.min((annees - 5) * 1.65, 100);
    }
    if (annees > 30) {
      abattementPS = 100;
    }

    const plusValueIR = plusValueBrute * (1 - abattementIR / 100);
    const plusValuePS = plusValueBrute * (1 - abattementPS / 100);
    
    const impotRevenu = Math.max(0, plusValueIR * 0.19);
    const prelevementsSociaux = Math.max(0, plusValuePS * 0.172);
    const totalImpot = impotRevenu + prelevementsSociaux;

    setResult({
      plusValueBrute,
      abattementIR,
      abattementPS,
      impotRevenu,
      prelevementsSociaux,
      totalImpot,
      plusValueNette: plusValueBrute - totalImpot,
    });
  };

  const handleEmailSubmit = async (email: string, acceptNewsletter: boolean) => {
    setIsGeneratingPDF(true);
    
    try {
      const saveResponse = await fetch('/api/simulations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          simulatorType: 'plus-value-immobiliere',
          userEmail: email,
          inputData: formData,
          resultData: result
        })
      });
      
      if (!saveResponse.ok) throw new Error('Erreur sauvegarde');
      
      const simulation = await saveResponse.json();
      
      const pdfResponse = await fetch('/api/simulations/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          simulationId: simulation.id,
          simulatorType: 'plus-value-immobiliere',
          inputData: formData,
          resultData: result,
          userEmail: email
        })
      });
      
      if (!pdfResponse.ok) throw new Error('Erreur génération PDF');
      
      const blob = await pdfResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `simulation-plus-value-immobiliere-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      setShowEmailCapture(false);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de la génération du PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (showEmailCapture) {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Télécharger votre simulation</CardTitle>
            <CardDescription>
              Recevez votre rapport détaillé au format PDF par email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const email = (e.target as any).email.value;
                const newsletter = (e.target as any).newsletter.checked;
                handleEmailSubmit(email, newsletter);
              }} 
              className="space-y-4"
            >
              <div>
                <Label htmlFor="email">Adresse email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre.email@exemple.com"
                  required
                  disabled={isGeneratingPDF}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  disabled={isGeneratingPDF}
                />
                <Label htmlFor="newsletter" className="text-sm">
                  Recevoir notre newsletter fiscale mensuelle
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isGeneratingPDF}
              >
                {isGeneratingPDF ? 'Génération...' : 'Télécharger le rapport PDF'}
              </Button>
              
              <Button 
                type="button" 
                variant="ghost"
                onClick={() => setShowEmailCapture(false)}
                className="w-full"
              >
                Retour
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Informations sur le bien</CardTitle>
          <CardDescription>Renseignez les données de votre transaction immobilière</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="prixAcquisition">Prix d'acquisition (€)</Label>
            <Input
              id="prixAcquisition"
              type="number"
              value={formData.prixAcquisition}
              onChange={(e) => setFormData(prev => ({ ...prev, prixAcquisition: e.target.value }))}
              placeholder="250000"
            />
          </div>
          
          <div>
            <Label htmlFor="prixCession">Prix de cession (€)</Label>
            <Input
              id="prixCession"
              type="number"
              value={formData.prixCession}
              onChange={(e) => setFormData(prev => ({ ...prev, prixCession: e.target.value }))}
              placeholder="350000"
            />
          </div>
          
          <div>
            <Label htmlFor="anneesDetention">Années de détention</Label>
            <Input
              id="anneesDetention"
              type="number"
              value={formData.anneesDetention}
              onChange={(e) => setFormData(prev => ({ ...prev, anneesDetention: e.target.value }))}
              placeholder="8"
            />
          </div>
          
          <div>
            <Label htmlFor="fraisAcquisition">Frais d'acquisition (€)</Label>
            <Input
              id="fraisAcquisition"
              type="number"
              value={formData.fraisAcquisition}
              onChange={(e) => setFormData(prev => ({ ...prev, fraisAcquisition: e.target.value }))}
              placeholder="20000"
            />
          </div>
          
          <div>
            <Label htmlFor="fraisCession">Frais de cession (€)</Label>
            <Input
              id="fraisCession"
              type="number"
              value={formData.fraisCession}
              onChange={(e) => setFormData(prev => ({ ...prev, fraisCession: e.target.value }))}
              placeholder="25000"
            />
          </div>
          
          <div>
            <Label htmlFor="travaux">Travaux déductibles (€)</Label>
            <Input
              id="travaux"
              type="number"
              value={formData.travaux}
              onChange={(e) => setFormData(prev => ({ ...prev, travaux: e.target.value }))}
              placeholder="15000"
            />
          </div>
          
          <Button onClick={calculate} className="w-full">
            <Calculator className="w-4 h-4 mr-2" />
            Calculer la plus-value
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Résultat du calcul</CardTitle>
          <CardDescription>Estimation de votre plus-value et impôts</CardDescription>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Plus-value brute :</span>
                  <span className="text-lg font-bold">{result.plusValueBrute.toLocaleString('fr-FR')} €</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Abattement IR ({result.abattementIR}%) :</span>
                  <span>{(result.plusValueBrute * result.abattementIR / 100).toLocaleString('fr-FR')} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Abattement PS ({result.abattementPS}%) :</span>
                  <span>{(result.plusValueBrute * result.abattementPS / 100).toLocaleString('fr-FR')} €</span>
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Impôt sur le revenu (19%) :</span>
                  <span>{result.impotRevenu.toLocaleString('fr-FR')} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Prélèvements sociaux (17,2%) :</span>
                  <span>{result.prelevementsSociaux.toLocaleString('fr-FR')} €</span>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border-t-2 border-green-500">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Total des impôts :</span>
                  <span className="text-lg font-bold text-red-600">{result.totalImpot.toLocaleString('fr-FR')} €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Plus-value nette :</span>
                  <span className="text-lg font-bold text-green-600">{result.plusValueNette.toLocaleString('fr-FR')} €</span>
                </div>
              </div>
              
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Ce calcul est une estimation basée sur les règles générales. Consultez un avocat fiscaliste pour une analyse précise de votre situation.
                </AlertDescription>
              </Alert>
              
              <Button 
                onClick={() => setShowEmailCapture(true)} 
                className="w-full"
                size="lg"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Télécharger le rapport détaillé
              </Button>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Remplissez le formulaire pour voir le calcul</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
