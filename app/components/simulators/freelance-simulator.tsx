
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EmailCapture } from './email-capture';
import { Calculator, User, TrendingUp, Shield, Info, Download } from 'lucide-react';
import { 
  calculateProgressiveIR, 
  calculateFamilialShares, 
  formatCurrency, 
  formatPercentage,
  SOCIAL_RATES_2024,
  CORPORATE_TAX_2024
} from '@/lib/tax-utils';

interface FreelanceFormData {
  // Situation personnelle
  maritalStatus: 'single' | 'married';
  children: number;
  otherIncomes: number;
  deductibleCharges: number;
  
  // Activité
  turnover: number;
  expenses: number;
  legalStatus: 'micro' | 'ei' | 'eurl-ir' | 'eurl-is' | 'sasu';
  
  // Options
  acre: boolean;
  vfl: boolean; // Versement forfaitaire libératoire (micro)
  managerSalary: number; // Pour sociétés
  dividends: number; // Pour sociétés
}

interface FreelanceResult {
  turnover: number;
  expenses: number;
  grossProfit: number;
  socialCharges: number;
  netSocial: number;
  taxableIncome: number;
  incomeTax: number;
  netIncome: number;
  
  // Détails par statut
  statusDetails: {
    microDetails?: any;
    societyDetails?: any;
    eiDetails?: any;
  };
  
  // Protection sociale
  socialProtection: {
    retirementQuarters: number;
    pensionEstimate: number;
    dailyAllowance: number;
    healthCoverage: number;
  };
}

export function FreelanceSimulator() {
  const [formData, setFormData] = useState<FreelanceFormData>({
    maritalStatus: 'single',
    children: 0,
    otherIncomes: 0,
    deductibleCharges: 0,
    turnover: 60000,
    expenses: 12000,
    legalStatus: 'micro',
    acre: false,
    vfl: false,
    managerSalary: 30000,
    dividends: 15000
  });
  
  const [result, setResult] = useState<FreelanceResult | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const calculate = () => {
    const shares = calculateFamilialShares(
      formData.maritalStatus === 'married', 
      formData.children
    );
    
    let result: FreelanceResult;
    
    switch (formData.legalStatus) {
      case 'micro':
        result = calculateMicroEnterprise();
        break;
      case 'ei':
        result = calculateEI();
        break;
      case 'eurl-ir':
        result = calculateEURLIR();
        break;
      case 'eurl-is':
        result = calculateEURLIS();
        break;
      case 'sasu':
        result = calculateSASU();
        break;
      default:
        result = calculateMicroEnterprise();
    }
    
    setResult(result);
  };
  
  const calculateMicroEnterprise = (): FreelanceResult => {
    const { turnover, acre, vfl } = formData;
    
    // Abattement forfaitaire (service = 50%, vente = 71%, libéral = 34%)
    const abatementRate = 0.34; // Services BNC
    const abatement = turnover * abatementRate;
    const taxableIncome = turnover - abatement;
    
    // Cotisations sociales (taux réduit ACRE première année)
    const socialRate = acre ? 0.055 : 0.22; // Taux réduit ou normal
    const socialCharges = turnover * socialRate;
    
    // Impôt sur le revenu
    let incomeTax = 0;
    if (vfl) {
      // Versement forfaitaire libératoire
      incomeTax = turnover * 0.022; // 2.2% pour BNC
    } else {
      // Barème progressif
      const totalTaxableIncome = taxableIncome + formData.otherIncomes - formData.deductibleCharges;
      const shares = calculateFamilialShares(formData.maritalStatus === 'married', formData.children);
      incomeTax = calculateProgressiveIR(totalTaxableIncome, shares);
    }
    
    const netIncome = turnover - socialCharges - incomeTax;
    
    return {
      turnover,
      expenses: 0,
      grossProfit: turnover,
      socialCharges,
      netSocial: turnover - socialCharges,
      taxableIncome,
      incomeTax,
      netIncome,
      statusDetails: {
        microDetails: {
          abatement,
          abatementRate,
          socialRate,
          vfl,
          acre
        }
      },
      socialProtection: calculateSocialProtection('micro', netIncome)
    };
  };
  
  const calculateEI = (): FreelanceResult => {
    const { turnover, expenses } = formData;
    const grossProfit = turnover - expenses;
    
    // Cotisations sociales TNS
    const socialCharges = grossProfit * SOCIAL_RATES_2024.TNS;
    const netSocial = grossProfit - socialCharges;
    
    // Impôt sur le revenu
    const totalTaxableIncome = grossProfit + formData.otherIncomes - formData.deductibleCharges;
    const shares = calculateFamilialShares(formData.maritalStatus === 'married', formData.children);
    const incomeTax = calculateProgressiveIR(totalTaxableIncome, shares);
    
    const netIncome = grossProfit - socialCharges - incomeTax;
    
    return {
      turnover,
      expenses,
      grossProfit,
      socialCharges,
      netSocial,
      taxableIncome: grossProfit,
      incomeTax,
      netIncome,
      statusDetails: {
        eiDetails: {
          socialRate: SOCIAL_RATES_2024.TNS
        }
      },
      socialProtection: calculateSocialProtection('ei', netIncome)
    };
  };
  
  const calculateEURLIR = (): FreelanceResult => {
    // Similaire à EI mais avec possibilité d'optimisation
    return calculateEI();
  };
  
  const calculateEURLIS = (): FreelanceResult => {
    const { turnover, expenses, managerSalary, dividends } = formData;
    const grossProfit = turnover - expenses;
    
    // Charges sociales du gérant (assimilé TNS)
    const managerSocialCharges = managerSalary * SOCIAL_RATES_2024.TNS;
    
    // Bénéfice après rémunération du gérant
    const companyProfit = grossProfit - managerSalary - managerSocialCharges;
    
    // Impôt sur les sociétés
    const corporateTax = companyProfit <= 42500 
      ? companyProfit * CORPORATE_TAX_2024.REDUCED_RATE
      : 42500 * CORPORATE_TAX_2024.REDUCED_RATE + (companyProfit - 42500) * CORPORATE_TAX_2024.STANDARD_RATE;
    
    // Dividendes après IS
    const availableForDividends = companyProfit - corporateTax;
    const actualDividends = Math.min(dividends, availableForDividends);
    
    // Fiscalité des dividendes (PFU ou barème)
    const dividendTaxPFU = actualDividends * 0.30;
    
    // Impôt sur le salaire du gérant
    const managerTaxableIncome = managerSalary + formData.otherIncomes - formData.deductibleCharges;
    const shares = calculateFamilialShares(formData.maritalStatus === 'married', formData.children);
    const managerIncomeTax = calculateProgressiveIR(managerTaxableIncome, shares);
    
    const totalTax = corporateTax + dividendTaxPFU + managerIncomeTax;
    const netIncome = managerSalary + actualDividends - managerSocialCharges - managerIncomeTax - dividendTaxPFU;
    
    return {
      turnover,
      expenses,
      grossProfit,
      socialCharges: managerSocialCharges,
      netSocial: managerSalary - managerSocialCharges,
      taxableIncome: managerSalary,
      incomeTax: totalTax,
      netIncome,
      statusDetails: {
        societyDetails: {
          managerSalary,
          managerSocialCharges,
          companyProfit,
          corporateTax,
          actualDividends,
          dividendTax: dividendTaxPFU
        }
      },
      socialProtection: calculateSocialProtection('eurl-is', netIncome)
    };
  };
  
  const calculateSASU = (): FreelanceResult => {
    const { turnover, expenses, managerSalary, dividends } = formData;
    const grossProfit = turnover - expenses;
    
    // Charges sociales du président (assimilé salarié)
    const managerSocialCharges = managerSalary * (SOCIAL_RATES_2024.SALARY_EMPLOYEE + SOCIAL_RATES_2024.SALARY_EMPLOYER);
    
    // Bénéfice après rémunération du président
    const companyProfit = grossProfit - managerSalary - managerSocialCharges;
    
    // Impôt sur les sociétés
    const corporateTax = companyProfit <= 42500 
      ? companyProfit * CORPORATE_TAX_2024.REDUCED_RATE
      : 42500 * CORPORATE_TAX_2024.REDUCED_RATE + (companyProfit - 42500) * CORPORATE_TAX_2024.STANDARD_RATE;
    
    // Dividendes après IS
    const availableForDividends = companyProfit - corporateTax;
    const actualDividends = Math.min(dividends, availableForDividends);
    
    // Fiscalité des dividendes (PFU)
    const dividendTaxPFU = actualDividends * 0.30;
    
    // Impôt sur le salaire du président
    const managerTaxableIncome = managerSalary + formData.otherIncomes - formData.deductibleCharges;
    const shares = calculateFamilialShares(formData.maritalStatus === 'married', formData.children);
    const managerIncomeTax = calculateProgressiveIR(managerTaxableIncome, shares);
    
    const totalTax = corporateTax + dividendTaxPFU + managerIncomeTax;
    const netIncome = managerSalary + actualDividends - managerSocialCharges - managerIncomeTax - dividendTaxPFU;
    
    return {
      turnover,
      expenses,
      grossProfit,
      socialCharges: managerSocialCharges,
      netSocial: managerSalary - managerSocialCharges,
      taxableIncome: managerSalary,
      incomeTax: totalTax,
      netIncome,
      statusDetails: {
        societyDetails: {
          managerSalary,
          managerSocialCharges,
          companyProfit,
          corporateTax,
          actualDividends,
          dividendTax: dividendTaxPFU
        }
      },
      socialProtection: calculateSocialProtection('sasu', netIncome)
    };
  };
  
  const calculateSocialProtection = (status: string, netIncome: number) => {
    // Calculs simplifiés de protection sociale
    let retirementQuarters = 0;
    let pensionEstimate = 0;
    let dailyAllowance = 0;
    let healthCoverage = 70;
    
    switch (status) {
      case 'micro':
      case 'ei':
      case 'eurl-ir':
        retirementQuarters = Math.min(4, Math.floor(netIncome / 15000));
        pensionEstimate = netIncome * 0.0075; // Estimation très simplifiée
        dailyAllowance = Math.min(56, netIncome / 365 * 0.5);
        break;
      case 'sasu':
        retirementQuarters = 4;
        pensionEstimate = netIncome * 0.012;
        dailyAllowance = Math.min(95, netIncome / 365 * 0.6);
        healthCoverage = 100;
        break;
    }
    
    return {
      retirementQuarters,
      pensionEstimate,
      dailyAllowance,
      healthCoverage
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
          simulatorType: 'freelance',
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
          simulatorType: 'freelance',
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
      a.download = `simulation-freelance-${new Date().toISOString().split('T')[0]}.pdf`;
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
        simulatorType="freelance"
      />
    );
  }
  
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Formulaire */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Situation personnelle</span>
            </CardTitle>
            <CardDescription>
              Informations sur votre foyer fiscal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Situation familiale</Label>
              <Select 
                value={formData.maritalStatus} 
                onValueChange={(value: 'single' | 'married') => 
                  setFormData(prev => ({ ...prev, maritalStatus: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Célibataire</SelectItem>
                  <SelectItem value="married">Marié(e) / Pacsé(e)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="children">Nombre d'enfants à charge</Label>
              <Input
                id="children"
                type="number"
                min="0"
                max="10"
                value={formData.children}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  children: parseInt(e.target.value) || 0 
                }))}
              />
            </div>
            
            <div>
              <Label htmlFor="otherIncomes">Autres revenus du foyer (€)</Label>
              <Input
                id="otherIncomes"
                type="number"
                value={formData.otherIncomes}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  otherIncomes: parseFloat(e.target.value) || 0 
                }))}
                placeholder="40000"
              />
            </div>
            
            <div>
              <Label htmlFor="deductibleCharges">Charges déductibles (€)</Label>
              <Input
                id="deductibleCharges"
                type="number"
                value={formData.deductibleCharges}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  deductibleCharges: parseFloat(e.target.value) || 0 
                }))}
                placeholder="2000"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Activité professionnelle</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="turnover">Chiffre d'affaires annuel (€)</Label>
              <Input
                id="turnover"
                type="number"
                value={formData.turnover}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  turnover: parseFloat(e.target.value) || 0 
                }))}
                placeholder="60000"
              />
            </div>
            
            <div>
              <Label htmlFor="expenses">Frais professionnels (€)</Label>
              <Input
                id="expenses"
                type="number"
                value={formData.expenses}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  expenses: parseFloat(e.target.value) || 0 
                }))}
                placeholder="12000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Non applicable pour la micro-entreprise (abattement forfaitaire)
              </p>
            </div>
            
            <div>
              <Label>Statut juridique</Label>
              <Select 
                value={formData.legalStatus} 
                onValueChange={(value: any) => 
                  setFormData(prev => ({ ...prev, legalStatus: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="micro">Micro-entreprise</SelectItem>
                  <SelectItem value="ei">Entreprise Individuelle</SelectItem>
                  <SelectItem value="eurl-ir">EURL à l'IR</SelectItem>
                  <SelectItem value="eurl-is">EURL à l'IS</SelectItem>
                  <SelectItem value="sasu">SASU</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {formData.legalStatus === 'micro' && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="acre"
                    checked={formData.acre}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, acre: checked as boolean }))
                    }
                  />
                  <Label htmlFor="acre" className="text-sm">
                    ACRE (Aide aux Créateurs d'Entreprise)
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vfl"
                    checked={formData.vfl}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, vfl: checked as boolean }))
                    }
                  />
                  <Label htmlFor="vfl" className="text-sm">
                    Versement forfaitaire libératoire
                  </Label>
                </div>
              </div>
            )}
            
            {(formData.legalStatus === 'eurl-is' || formData.legalStatus === 'sasu') && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="managerSalary">Rémunération du dirigeant (€)</Label>
                  <Input
                    id="managerSalary"
                    type="number"
                    value={formData.managerSalary}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      managerSalary: parseFloat(e.target.value) || 0 
                    }))}
                    placeholder="30000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dividends">Dividendes prévus (€)</Label>
                  <Input
                    id="dividends"
                    type="number"
                    value={formData.dividends}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      dividends: parseFloat(e.target.value) || 0 
                    }))}
                    placeholder="15000"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Button onClick={calculate} className="w-full" size="lg">
          <Calculator className="w-4 h-4 mr-2" />
          Calculer ma situation
        </Button>
      </div>
      
      {/* Résultats */}
      <div className="space-y-6">
        {result ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Résultat de votre simulation</CardTitle>
                <CardDescription>
                  Statut : <Badge variant="outline">{formData.legalStatus.toUpperCase()}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="synthesis" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="synthesis">Synthèse</TabsTrigger>
                    <TabsTrigger value="details">Détails</TabsTrigger>
                    <TabsTrigger value="protection">Protection</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="synthesis" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Chiffre d'affaires</p>
                        <p className="text-lg font-bold text-blue-600">
                          {formatCurrency(result.turnover)}
                        </p>
                      </div>
                      
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">Revenu net</p>
                        <p className="text-lg font-bold text-green-600">
                          {formatCurrency(result.netIncome)}
                        </p>
                      </div>
                      
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm text-gray-600">Charges sociales</p>
                        <p className="text-lg font-bold text-orange-600">
                          {formatCurrency(result.socialCharges)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatPercentage((result.socialCharges / result.turnover) * 100)} du CA
                        </p>
                      </div>
                      
                      <div className="p-4 bg-red-50 rounded-lg">
                        <p className="text-sm text-gray-600">Impôts</p>
                        <p className="text-lg font-bold text-red-600">
                          {formatCurrency(result.incomeTax)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatPercentage((result.incomeTax / result.turnover) * 100)} du CA
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-green-500">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Taux de prélèvement global :</span>
                        <span className="text-lg font-bold">
                          {formatPercentage(((result.socialCharges + result.incomeTax) / result.turnover) * 100)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-medium">Revenu net mensuel :</span>
                        <span className="text-lg font-bold text-green-600">
                          {formatCurrency(result.netIncome / 12)}
                        </span>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Chiffre d'affaires :</span>
                        <span className="font-medium">{formatCurrency(result.turnover)}</span>
                      </div>
                      
                      {result.expenses > 0 && (
                        <div className="flex justify-between">
                          <span>Frais professionnels :</span>
                          <span className="font-medium text-red-600">
                            -{formatCurrency(result.expenses)}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex justify-between border-t pt-2">
                        <span>Bénéfice brut :</span>
                        <span className="font-medium">{formatCurrency(result.grossProfit)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Charges sociales :</span>
                        <span className="font-medium text-orange-600">
                          -{formatCurrency(result.socialCharges)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Résultat social :</span>
                        <span className="font-medium">{formatCurrency(result.netSocial)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Impôt sur le revenu :</span>
                        <span className="font-medium text-red-600">
                          -{formatCurrency(result.incomeTax)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between border-t pt-2 font-bold">
                        <span>Revenu net disponible :</span>
                        <span className="text-green-600">{formatCurrency(result.netIncome)}</span>
                      </div>
                    </div>
                    
                    {result.statusDetails.microDetails && (
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Micro-entreprise :</strong> Abattement forfaitaire de {formatPercentage(result.statusDetails.microDetails.abatementRate)} 
                          {result.statusDetails.microDetails.acre && ', ACRE appliquée (cotisations réduites)'}
                          {result.statusDetails.microDetails.vfl && ', Versement forfaitaire libératoire'}
                        </AlertDescription>
                      </Alert>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="protection" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-purple-900 mb-2">Retraite</h4>
                        <p className="text-sm text-gray-600">Trimestres validés par an :</p>
                        <p className="text-lg font-bold">{result.socialProtection.retirementQuarters}</p>
                        <p className="text-sm text-gray-600 mt-2">Estimation pension annuelle :</p>
                        <p className="font-medium">{formatCurrency(result.socialProtection.pensionEstimate)}</p>
                      </div>
                      
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Maladie</h4>
                        <p className="text-sm text-gray-600">Indemnités journalières :</p>
                        <p className="text-lg font-bold">{formatCurrency(result.socialProtection.dailyAllowance)}/jour</p>
                        <p className="text-sm text-gray-600 mt-2">Remboursement soins :</p>
                        <p className="font-medium">{result.socialProtection.healthCoverage}%</p>
                      </div>
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
                    Télécharger le rapport détaillé
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
                <p>Remplissez le formulaire pour voir votre simulation</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
