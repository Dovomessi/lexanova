
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EmailCapture } from './email-capture';
import { Heart, Calculator, Users, Shield, TrendingUp, Download, Info, AlertTriangle } from 'lucide-react';
import { 
  calculateDonationTax, 
  calculateBareOwnershipValue,
  calculateProgressiveIR,
  calculateFamilialShares,
  formatCurrency, 
  formatPercentage,
  PFU_2024
} from '@/lib/tax-utils';

interface DonationFormData {
  // Foyer fiscal
  maritalStatus: 'single' | 'married';
  shares: number;
  taxableIncome: number;
  otherRFR: number;
  rfrN1: number;
  rfrN2: number;
  
  // Participation et cession
  participationValue: number;
  salePrice: number;
  acquisitionPrice: number;
  detentionYears: number;
  enhancedAbatement: boolean;
  fixedAbatement: boolean;
  quotientSystem: boolean;
  
  // Donation
  donationValueFullOwnership: number;
  previousAbatementUsed: number;
  numberOfChildren: number;
  assetNature: 'separate' | 'common';
  donationType: 'full' | 'bare';
  donorAge1: number;
  donorAge2?: number;
}

interface DonationResult {
  // Scénario sans donation
  withoutDonation: {
    capitalGain: number;
    taxPFU: number;
    taxProgressive: number;
    bestTax: number;
    netAmount: number;
  };
  
  // Scénario avec donation
  withDonation: {
    donationTax: number;
    remainingCapitalGain: number;
    capitalGainTax: number;
    totalTax: number;
    netAmount: number;
    fiscalGain: number;
  };
  
  // Optimisation
  optimization: {
    optimalAmountFull: number;
    optimalTaxFull: number;
    optimalGainFull: number;
    optimalAmountBare: number;
    optimalTaxBare: number;
    optimalGainBare: number;
  };
}

export function DonationSimulator() {
  const [formData, setFormData] = useState<DonationFormData>({
    maritalStatus: 'married',
    shares: 2,
    taxableIncome: 80000,
    otherRFR: 0,
    rfrN1: 80000,
    rfrN2: 75000,
    
    participationValue: 1000000,
    salePrice: 1200000,
    acquisitionPrice: 200000,
    detentionYears: 8,
    enhancedAbatement: false,
    fixedAbatement: false,
    quotientSystem: false,
    
    donationValueFullOwnership: 600000,
    previousAbatementUsed: 0,
    numberOfChildren: 2,
    assetNature: 'common',
    donationType: 'full',
    donorAge1: 55,
    donorAge2: 52
  });
  
  const [result, setResult] = useState<DonationResult | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const calculate = () => {
    const capitalGain = formData.salePrice - formData.acquisitionPrice;
    
    // Calcul sans donation
    const withoutDonation = calculateWithoutDonation(capitalGain);
    
    // Calcul avec donation
    const withDonation = calculateWithDonation(capitalGain);
    
    // Optimisation
    const optimization = calculateOptimization(capitalGain);
    
    setResult({
      withoutDonation,
      withDonation,
      optimization
    });
  };
  
  const calculateWithoutDonation = (capitalGain: number) => {
    let adjustedCapitalGain = capitalGain;
    
    // Abattement renforcé
    if (formData.enhancedAbatement) {
      adjustedCapitalGain *= 0.5; // 50% d'abattement
    }
    
    // Abattement fixe
    if (formData.fixedAbatement) {
      adjustedCapitalGain = Math.max(0, adjustedCapitalGain - 500000);
    }
    
    // Calcul PFU
    const taxPFU = adjustedCapitalGain * PFU_2024.TOTAL_RATE;
    
    // Calcul barème progressif
    const totalTaxableIncome = formData.taxableIncome + adjustedCapitalGain;
    const totalTaxProgressive = calculateProgressiveIR(totalTaxableIncome, formData.shares);
    const baseTax = calculateProgressiveIR(formData.taxableIncome, formData.shares);
    const additionalTax = totalTaxProgressive - baseTax;
    
    // Prélèvements sociaux
    const socialTax = adjustedCapitalGain * 0.172;
    const taxProgressive = additionalTax + socialTax;
    
    // Système du quotient si applicable
    let finalTaxProgressive = taxProgressive;
    if (formData.quotientSystem) {
      const averageIncome = (formData.taxableIncome + formData.rfrN1 + formData.rfrN2) / 3;
      if (adjustedCapitalGain > averageIncome) {
        // Application simplifiée du quotient
        finalTaxProgressive *= 0.8;
      }
    }
    
    const bestTax = Math.min(taxPFU, finalTaxProgressive);
    const netAmount = formData.salePrice - bestTax;
    
    return {
      capitalGain,
      taxPFU,
      taxProgressive: finalTaxProgressive,
      bestTax,
      netAmount
    };
  };
  
  const calculateWithDonation = (capitalGain: number) => {
    // Calcul des droits de donation
    let donationAmount = formData.donationValueFullOwnership;
    
    // Si donation en nue-propriété
    if (formData.donationType === 'bare') {
      donationAmount = calculateBareOwnershipValue(
        formData.donationValueFullOwnership, 
        formData.donorAge1
      );
    }
    
    // Calcul des droits par enfant
    const donationPerChild = donationAmount / formData.numberOfChildren;
    const abatementPerChild = formData.previousAbatementUsed / formData.numberOfChildren;
    
    const donationTaxPerChild = calculateDonationTax(
      donationPerChild,
      'child',
      abatementPerChild
    );
    
    const totalDonationTax = donationTaxPerChild.tax * formData.numberOfChildren;
    
    // Si biens communs, multiplication par 2 (donations des deux parents)
    const finalDonationTax = formData.assetNature === 'common' ? totalDonationTax * 2 : totalDonationTax;
    
    // Plus-value résiduelle après donation
    const donatedProportion = formData.donationValueFullOwnership / formData.participationValue;
    const remainingCapitalGain = capitalGain * (1 - donatedProportion);
    
    // Calcul de l'impôt sur la plus-value résiduelle
    let adjustedRemainingGain = remainingCapitalGain;
    
    if (formData.enhancedAbatement) {
      adjustedRemainingGain *= 0.5;
    }
    
    if (formData.fixedAbatement) {
      adjustedRemainingGain = Math.max(0, adjustedRemainingGain - 500000);
    }
    
    const remainingTaxPFU = adjustedRemainingGain * PFU_2024.TOTAL_RATE;
    
    const totalTaxableIncome = formData.taxableIncome + adjustedRemainingGain;
    const totalTaxProgressive = calculateProgressiveIR(totalTaxableIncome, formData.shares);
    const baseTax = calculateProgressiveIR(formData.taxableIncome, formData.shares);
    const additionalTax = totalTaxProgressive - baseTax;
    const socialTax = adjustedRemainingGain * 0.172;
    const remainingTaxProgressive = additionalTax + socialTax;
    
    const capitalGainTax = Math.min(remainingTaxPFU, remainingTaxProgressive);
    const totalTax = finalDonationTax + capitalGainTax;
    const netAmount = formData.salePrice - totalTax;
    
    // Calcul du gain fiscal
    const withoutDonationResult = calculateWithoutDonation(capitalGain);
    const fiscalGain = withoutDonationResult.bestTax - totalTax;
    
    return {
      donationTax: finalDonationTax,
      remainingCapitalGain,
      capitalGainTax,
      totalTax,
      netAmount,
      fiscalGain
    };
  };
  
  const calculateOptimization = (capitalGain: number) => {
    // Optimisation simplifiée - en réalité, il faudrait tester plusieurs montants
    const maxDonationAmount = formData.participationValue * 0.8; // Maximum 80% de la participation
    
    // Optimisation en pleine propriété
    let bestAmountFull = 0;
    let bestTaxFull = Infinity;
    let bestGainFull = 0;
    
    // Test de différents montants (par paliers)
    for (let amount = 100000; amount <= maxDonationAmount; amount += 50000) {
      const tempFormData = { ...formData, donationValueFullOwnership: amount, donationType: 'full' as const };
      
      // Calcul simplifié pour l'optimisation
      const donationPerChild = amount / formData.numberOfChildren;
      const donationTaxPerChild = calculateDonationTax(donationPerChild, 'child', 0);
      const totalDonationTax = donationTaxPerChild.tax * formData.numberOfChildren;
      const finalDonationTax = formData.assetNature === 'common' ? totalDonationTax * 2 : totalDonationTax;
      
      const donatedProportion = amount / formData.participationValue;
      const remainingGain = capitalGain * (1 - donatedProportion);
      const remainingTax = remainingGain * PFU_2024.TOTAL_RATE;
      
      const totalTax = finalDonationTax + remainingTax;
      const withoutDonationTax = capitalGain * PFU_2024.TOTAL_RATE;
      const gain = withoutDonationTax - totalTax;
      
      if (gain > bestGainFull) {
        bestAmountFull = amount;
        bestTaxFull = totalTax;
        bestGainFull = gain;
      }
    }
    
    // Optimisation en nue-propriété (simplifié)
    const bareOwnershipValue = calculateBareOwnershipValue(bestAmountFull, formData.donorAge1);
    const donationPerChildBare = bareOwnershipValue / formData.numberOfChildren;
    const donationTaxPerChildBare = calculateDonationTax(donationPerChildBare, 'child', 0);
    const totalDonationTaxBare = donationTaxPerChildBare.tax * formData.numberOfChildren;
    const finalDonationTaxBare = formData.assetNature === 'common' ? totalDonationTaxBare * 2 : totalDonationTaxBare;
    
    const optimalAmountBare = bestAmountFull;
    const optimalTaxBare = finalDonationTaxBare;
    const optimalGainBare = (capitalGain * PFU_2024.TOTAL_RATE) - finalDonationTaxBare;
    
    return {
      optimalAmountFull: bestAmountFull,
      optimalTaxFull: bestTaxFull,
      optimalGainFull: bestGainFull,
      optimalAmountBare,
      optimalTaxBare,
      optimalGainBare
    };
  };
  
  const handleEmailSubmit = async (email: string, acceptNewsletter: boolean) => {
    setIsGeneratingPDF(true);
    
    try {
      // Sauvegarder la simulation
      const saveResponse = await fetch('/api/simulations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          simulatorType: 'donation',
          userEmail: email,
          inputData: formData,
          resultData: result
        })
      });
      
      if (!saveResponse.ok) throw new Error('Erreur sauvegarde');
      
      const simulation = await saveResponse.json();
      
      // Générer le PDF
      const pdfResponse = await fetch('/api/simulations/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          simulationId: simulation.id,
          simulatorType: 'donation',
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
      a.download = `simulation-donation-${new Date().toISOString().split('T')[0]}.pdf`;
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
      <EmailCapture
        onEmailSubmit={handleEmailSubmit}
        isGenerating={isGeneratingPDF}
        simulatorType="donation"
      />
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Alert>
        <Heart className="h-4 w-4" />
        <AlertDescription>
          <strong>Simulateur de donation-cession :</strong> Optimisez la fiscalité de la transmission de votre entreprise 
          en combinant donation et cession. Ce simulateur compare l'impact fiscal d'une cession directe versus 
          une donation préalable suivie d'une cession.
        </AlertDescription>
      </Alert>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formulaire */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Foyer fiscal</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Situation familiale</Label>
                  <Select 
                    value={formData.maritalStatus} 
                    onValueChange={(value: 'single' | 'married') => {
                      const shares = value === 'married' ? 2 : 1;
                      setFormData(prev => ({ ...prev, maritalStatus: value, shares }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Célibataire/Veuf/Divorcé</SelectItem>
                      <SelectItem value="married">Marié/Pacsé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="shares">Nombre de parts</Label>
                  <Input
                    id="shares"
                    type="number"
                    step="0.5"
                    min="1"
                    max="7"
                    value={formData.shares}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      shares: parseFloat(e.target.value) || 1 
                    }))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="taxableIncome">Revenu imposable (€)</Label>
                <Input
                  id="taxableIncome"
                  type="number"
                  value={formData.taxableIncome}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    taxableIncome: parseFloat(e.target.value) || 0 
                  }))}
                  placeholder="80000"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Revenu soumis au barème progressif de l'IR
                </p>
              </div>
              
              <div>
                <Label htmlFor="otherRFR">Autres revenus RFR (€)</Label>
                <Input
                  id="otherRFR"
                  type="number"
                  value={formData.otherRFR}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    otherRFR: parseFloat(e.target.value) || 0 
                  }))}
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Pour le calcul de la CEHR (hors plus-value de cette cession)
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rfrN1">RFR N-1 (€)</Label>
                  <Input
                    id="rfrN1"
                    type="number"
                    value={formData.rfrN1}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      rfrN1: parseFloat(e.target.value) || 0 
                    }))}
                    placeholder="80000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="rfrN2">RFR N-2 (€)</Label>
                  <Input
                    id="rfrN2"
                    type="number"
                    value={formData.rfrN2}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      rfrN2: parseFloat(e.target.value) || 0 
                    }))}
                    placeholder="75000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Participation et cession</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="participationValue">Valorisation participation (€)</Label>
                <Input
                  id="participationValue"
                  type="number"
                  value={formData.participationValue}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    participationValue: parseFloat(e.target.value) || 0 
                  }))}
                  placeholder="1000000"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Valeur retenue pour les droits de donation
                </p>
              </div>
              
              <div>
                <Label htmlFor="salePrice">Prix de cession (€)</Label>
                <Input
                  id="salePrice"
                  type="number"
                  value={formData.salePrice}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    salePrice: parseFloat(e.target.value) || 0 
                  }))}
                  placeholder="1200000"
                />
              </div>
              
              <div>
                <Label htmlFor="acquisitionPrice">Prix d'acquisition (€)</Label>
                <Input
                  id="acquisitionPrice"
                  type="number"
                  value={formData.acquisitionPrice}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    acquisitionPrice: parseFloat(e.target.value) || 0 
                  }))}
                  placeholder="200000"
                />
              </div>
              
              <div>
                <Label htmlFor="detentionYears">Durée de détention (années)</Label>
                <Input
                  id="detentionYears"
                  type="number"
                  value={formData.detentionYears}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    detentionYears: parseFloat(e.target.value) || 0 
                  }))}
                  placeholder="8"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="enhancedAbatement"
                    checked={formData.enhancedAbatement}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      enhancedAbatement: e.target.checked 
                    }))}
                    className="rounded"
                  />
                  <Label htmlFor="enhancedAbatement" className="text-sm">
                    Abattement renforcé (50%)
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="fixedAbatement"
                    checked={formData.fixedAbatement}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      fixedAbatement: e.target.checked 
                    }))}
                    className="rounded"
                  />
                  <Label htmlFor="fixedAbatement" className="text-sm">
                    Abattement fixe 500 000 € (départ retraite)
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="quotientSystem"
                    checked={formData.quotientSystem}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      quotientSystem: e.target.checked 
                    }))}
                    className="rounded"
                  />
                  <Label htmlFor="quotientSystem" className="text-sm">
                    Système du quotient
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Donation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="donationValueFullOwnership">
                  Valeur en pleine propriété des titres à donner (€)
                </Label>
                <Input
                  id="donationValueFullOwnership"
                  type="number"
                  value={formData.donationValueFullOwnership}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    donationValueFullOwnership: parseFloat(e.target.value) || 0 
                  }))}
                  placeholder="600000"
                />
              </div>
              
              <div>
                <Label htmlFor="previousAbatementUsed">Abattement déjà utilisé (€)</Label>
                <Input
                  id="previousAbatementUsed"
                  type="number"
                  value={formData.previousAbatementUsed}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    previousAbatementUsed: parseFloat(e.target.value) || 0 
                  }))}
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Montant par donateur et donataire (15 dernières années)
                </p>
              </div>
              
              <div>
                <Label htmlFor="numberOfChildren">Nombre d'enfants bénéficiaires</Label>
                <Input
                  id="numberOfChildren"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.numberOfChildren}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    numberOfChildren: parseInt(e.target.value) || 1 
                  }))}
                  placeholder="2"
                />
              </div>
              
              <div>
                <Label>Nature matrimoniale des actions</Label>
                <Select 
                  value={formData.assetNature} 
                  onValueChange={(value: 'separate' | 'common') => 
                    setFormData(prev => ({ ...prev, assetNature: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="separate">Biens propres</SelectItem>
                    <SelectItem value="common">Biens communs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Nature de la donation</Label>
                <Select 
                  value={formData.donationType} 
                  onValueChange={(value: 'full' | 'bare') => 
                    setFormData(prev => ({ ...prev, donationType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Pleine propriété</SelectItem>
                    <SelectItem value="bare">Nue-propriété</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="donorAge1">Âge donateur 1</Label>
                  <Input
                    id="donorAge1"
                    type="number"
                    min="18"
                    max="100"
                    value={formData.donorAge1}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      donorAge1: parseInt(e.target.value) || 18 
                    }))}
                    placeholder="55"
                  />
                </div>
                
                {formData.assetNature === 'common' && (
                  <div>
                    <Label htmlFor="donorAge2">Âge donateur 2</Label>
                    <Input
                      id="donorAge2"
                      type="number"
                      min="18"
                      max="100"
                      value={formData.donorAge2 || ''}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        donorAge2: parseInt(e.target.value) || undefined 
                      }))}
                      placeholder="52"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Button onClick={calculate} className="w-full" size="lg">
            <Calculator className="w-4 h-4 mr-2" />
            Calculer l'optimisation
          </Button>
        </div>
        
        {/* Résultats */}
        <div className="space-y-6">
          {result ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Comparaison des scénarios</CardTitle>
                  <CardDescription>
                    Analyse de l'impact fiscal avec et sans donation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="comparison" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="comparison">Comparaison</TabsTrigger>
                      <TabsTrigger value="optimization">Optimisation</TabsTrigger>
                      <TabsTrigger value="details">Détails</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="comparison" className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        {/* Sans donation */}
                        <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                          <h4 className="font-medium text-red-900 mb-3">Sans donation (cession directe)</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Plus-value :</span>
                              <span className="font-medium">
                                {formatCurrency(result.withoutDonation.capitalGain)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Impôt optimal :</span>
                              <span className="font-medium text-red-600">
                                {formatCurrency(result.withoutDonation.bestTax)}
                              </span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                              <span className="font-medium">Net après impôt :</span>
                              <span className="font-bold">
                                {formatCurrency(result.withoutDonation.netAmount)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Avec donation */}
                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <h4 className="font-medium text-green-900 mb-3">
                            Avec donation ({formData.donationType === 'full' ? 'pleine propriété' : 'nue-propriété'})
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Droits de donation :</span>
                              <span className="font-medium text-orange-600">
                                {formatCurrency(result.withDonation.donationTax)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Impôt plus-value résiduelle :</span>
                              <span className="font-medium text-red-600">
                                {formatCurrency(result.withDonation.capitalGainTax)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total impôts :</span>
                              <span className="font-medium text-red-600">
                                {formatCurrency(result.withDonation.totalTax)}
                              </span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                              <span className="font-medium">Net après impôt :</span>
                              <span className="font-bold">
                                {formatCurrency(result.withDonation.netAmount)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Gain fiscal */}
                        <div className={`p-4 rounded-lg border-l-4 ${
                          result.withDonation.fiscalGain > 0 
                            ? 'bg-blue-50 border-blue-500' 
                            : 'bg-orange-50 border-orange-500'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">
                              {result.withDonation.fiscalGain > 0 ? 'Gain fiscal :' : 'Surcoût fiscal :'}
                            </span>
                            <span className={`text-lg font-bold ${
                              result.withDonation.fiscalGain > 0 ? 'text-blue-600' : 'text-orange-600'
                            }`}>
                              {result.withDonation.fiscalGain > 0 ? '+' : ''}
                              {formatCurrency(result.withDonation.fiscalGain)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {result.withDonation.fiscalGain > 0 
                              ? 'La donation est fiscalement avantageuse'
                              : 'La donation génère un surcoût fiscal'
                            }
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="optimization" className="space-y-4">
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Optimisation automatique :</strong> Montants de donation calculés pour maximiser le gain fiscal.
                        </AlertDescription>
                      </Alert>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <h4 className="font-medium text-purple-900 mb-3">Donation optimale en pleine propriété</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Montant optimal :</span>
                              <span className="font-medium">
                                {formatCurrency(result.optimization.optimalAmountFull)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Impôts totaux :</span>
                              <span className="font-medium text-red-600">
                                {formatCurrency(result.optimization.optimalTaxFull)}
                              </span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                              <span className="font-medium">Gain fiscal :</span>
                              <span className="font-bold text-purple-600">
                                +{formatCurrency(result.optimization.optimalGainFull)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-indigo-50 rounded-lg">
                          <h4 className="font-medium text-indigo-900 mb-3">Donation optimale en nue-propriété</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Montant en pleine propriété :</span>
                              <span className="font-medium">
                                {formatCurrency(result.optimization.optimalAmountBare)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Valeur nue-propriété :</span>
                              <span className="font-medium">
                                {formatCurrency(
                                  calculateBareOwnershipValue(
                                    result.optimization.optimalAmountBare,
                                    formData.donorAge1
                                  )
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Droits de donation :</span>
                              <span className="font-medium text-orange-600">
                                {formatCurrency(result.optimization.optimalTaxBare)}
                              </span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                              <span className="font-medium">Gain fiscal :</span>
                              <span className="font-bold text-indigo-600">
                                +{formatCurrency(result.optimization.optimalGainBare)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Recommandation :</strong> La donation en{' '}
                            {result.optimization.optimalGainFull > result.optimization.optimalGainBare 
                              ? 'pleine propriété' 
                              : 'nue-propriété'
                            } génère le gain fiscal optimal de{' '}
                            <strong>
                              {formatCurrency(
                                Math.max(result.optimization.optimalGainFull, result.optimization.optimalGainBare)
                              )}
                            </strong>.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="details" className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Calculs détaillés</h4>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Plus-value brute :</span>
                              <span>{formatCurrency(formData.salePrice - formData.acquisitionPrice)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Impôt PFU (30%) :</span>
                              <span>{formatCurrency(result.withoutDonation.taxPFU)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Impôt barème progressif :</span>
                              <span>{formatCurrency(result.withoutDonation.taxProgressive)}</span>
                            </div>
                          </div>
                        </div>
                        
                        {formData.donationType === 'bare' && (
                          <div>
                            <h4 className="font-medium mb-2">Démembrement</h4>
                            <div className="text-sm space-y-1">
                              <div className="flex justify-between">
                                <span>Valeur pleine propriété :</span>
                                <span>{formatCurrency(formData.donationValueFullOwnership)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Valeur nue-propriété ({formData.donorAge1} ans) :</span>
                                <span>
                                  {formatCurrency(
                                    calculateBareOwnershipValue(
                                      formData.donationValueFullOwnership,
                                      formData.donorAge1
                                    )
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="mt-6 pt-4 border-t">
                    <Button 
                      onClick={() => setShowEmailCapture(true)} 
                      className="w-full"
                      size="lg"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger l'analyse complète
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-gray-500">
                  <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Remplissez le formulaire pour voir l'analyse</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
