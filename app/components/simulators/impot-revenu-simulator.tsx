
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
import { Euro, Calculator, Users, TrendingDown, Info, Download } from 'lucide-react';
import { 
  calculateProgressiveIR, 
  calculateFamilialShares, 
  calculateCEHR,
  formatCurrency, 
  formatPercentage,
  IR_BRACKETS_2024
} from '@/lib/tax-utils';

interface ImpotRevenuFormData {
  // Situation familiale
  maritalStatus: 'single' | 'married';
  children: number;
  hasDisability: boolean;
  
  // Revenus
  salaryIncome: number;
  pensionIncome: number;
  businessIncome: number;
  propertyIncome: number;
  capitalIncome: number;
  otherIncome: number;
  
  // Charges déductibles
  pensionContributions: number;
  employmentExpenses: number;
  propertyExpenses: number;
  alimonyPaid: number;
  charitableDonations: number;
  otherDeductions: number;
  
  // Options
  employmentExpenseChoice: 'standard' | 'actual';
  propertyRegime: 'micro' | 'real';
}

interface ImpotRevenuResult {
  // Revenus
  totalGrossIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  
  // Calcul de l'impôt
  familialShares: number;
  incomePerShare: number;
  grossTax: number;
  
  // Quotient familial
  quotientFamilialReduction: number;
  quotientFamilialCap: number;
  
  // Impôt final
  finalTax: number;
  effectiveRate: number;
  marginalRate: number;
  
  // CEHR
  cehr: number;
  
  // Détails par tranche
  taxBreakdown: Array<{
    bracket: number;
    min: number;
    max: number | null;
    rate: number;
    taxableAmount: number;
    tax: number;
  }>;
  
  // Net mensuel
  monthlyNet: number;
}

export function ImpotRevenuSimulator() {
  const [formData, setFormData] = useState<ImpotRevenuFormData>({
    maritalStatus: 'married',
    children: 2,
    hasDisability: false,
    
    salaryIncome: 45000,
    pensionIncome: 0,
    businessIncome: 0,
    propertyIncome: 0,
    capitalIncome: 0,
    otherIncome: 0,
    
    pensionContributions: 0,
    employmentExpenses: 0,
    propertyExpenses: 0,
    alimonyPaid: 0,
    charitableDonations: 0,
    otherDeductions: 0,
    
    employmentExpenseChoice: 'standard',
    propertyRegime: 'micro'
  });
  
  const [result, setResult] = useState<ImpotRevenuResult | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const calculate = () => {
    // Calcul des revenus nets
    let netSalaryIncome = formData.salaryIncome;
    if (formData.employmentExpenseChoice === 'standard') {
      netSalaryIncome *= 0.9; // Abattement standard de 10%
    } else {
      netSalaryIncome -= formData.employmentExpenses;
    }
    
    let netPropertyIncome = formData.propertyIncome;
    if (formData.propertyRegime === 'micro') {
      netPropertyIncome *= 0.7; // Abattement micro-foncier de 30%
    } else {
      netPropertyIncome -= formData.propertyExpenses;
    }
    
    const totalGrossIncome = formData.salaryIncome + formData.pensionIncome + 
                            formData.businessIncome + formData.propertyIncome + 
                            formData.capitalIncome + formData.otherIncome;
    
    const totalDeductions = formData.pensionContributions + formData.employmentExpenses + 
                           formData.propertyExpenses + formData.alimonyPaid + 
                           formData.charitableDonations + formData.otherDeductions;
    
    const revenuNet = netSalaryIncome + formData.pensionIncome + 
                     formData.businessIncome + netPropertyIncome + 
                     formData.capitalIncome + formData.otherIncome;
    
    const taxableIncome = Math.max(0, revenuNet - formData.pensionContributions - 
                                  formData.alimonyPaid - formData.charitableDonations - 
                                  formData.otherDeductions);
    
    // Calcul des parts fiscales
    const familialShares = calculateFamilialShares(
      formData.maritalStatus === 'married', 
      formData.children, 
      formData.hasDisability
    );
    
    const incomePerShare = taxableIncome / familialShares;
    
    // Calcul de l'impôt sans quotient familial
    const grossTax = calculateProgressiveIR(taxableIncome, 1);
    
    // Calcul de l'impôt avec quotient familial
    const finalTax = calculateProgressiveIR(taxableIncome, familialShares);
    
    // Calcul de la réduction due au quotient familial
    const quotientFamilialReduction = grossTax - finalTax;
    
    // Plafonnement du quotient familial
    const quotientFamilialCap = calculateQuotientFamilialCap(familialShares, formData.children);
    const cappedReduction = Math.min(quotientFamilialReduction, quotientFamilialCap);
    const cappedFinalTax = grossTax - cappedReduction;
    
    // Calcul du taux marginal
    const marginalRate = getMarginalRate(incomePerShare);
    const effectiveRate = taxableIncome > 0 ? (cappedFinalTax / taxableIncome) * 100 : 0;
    
    // CEHR
    const cehr = calculateCEHR(taxableIncome, familialShares);
    
    // Détail par tranche
    const taxBreakdown = calculateTaxBreakdown(incomePerShare);
    
    // Net mensuel
    const monthlyNet = (totalGrossIncome - cappedFinalTax - cehr) / 12;
    
    setResult({
      totalGrossIncome,
      totalDeductions,
      taxableIncome,
      familialShares,
      incomePerShare,
      grossTax,
      quotientFamilialReduction: cappedReduction,
      quotientFamilialCap,
      finalTax: cappedFinalTax,
      effectiveRate,
      marginalRate,
      cehr,
      taxBreakdown,
      monthlyNet
    });
  };
  
  const calculateQuotientFamilialCap = (shares: number, children: number): number => {
    // Plafonnement 2024
    const baseShares = formData.maritalStatus === 'married' ? 2 : 1;
    const additionalShares = shares - baseShares;
    
    if (children === 1) {
      return 1678; // Première demi-part
    } else if (children === 2) {
      return 1678; // Deuxième demi-part devient une part entière
    } else if (children >= 3) {
      return 1678 + (children - 2) * 3356; // Parts supplémentaires
    }
    
    return 0;
  };
  
  const getMarginalRate = (incomePerShare: number): number => {
    for (const bracket of IR_BRACKETS_2024) {
      if (incomePerShare > bracket.min && (bracket.max === null || incomePerShare <= bracket.max)) {
        return bracket.rate;
      }
    }
    return 0;
  };
  
  const calculateTaxBreakdown = (incomePerShare: number) => {
    const breakdown = [];
    
    for (let i = 0; i < IR_BRACKETS_2024.length; i++) {
      const bracket = IR_BRACKETS_2024[i];
      const max = bracket.max || incomePerShare;
      const taxableInBracket = Math.max(0, Math.min(incomePerShare, max) - bracket.min);
      const tax = taxableInBracket * (bracket.rate / 100);
      
      if (taxableInBracket > 0) {
        breakdown.push({
          bracket: i + 1,
          min: bracket.min,
          max: bracket.max,
          rate: bracket.rate,
          taxableAmount: taxableInBracket,
          tax
        });
      }
    }
    
    return breakdown;
  };
  
  const handleEmailSubmit = async (email: string, acceptNewsletter: boolean) => {
    setIsGeneratingPDF(true);
    
    try {
      const saveResponse = await fetch('/api/simulations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          simulatorType: 'impot-revenu',
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
          simulatorType: 'impot-revenu',
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
      a.download = `simulation-impot-revenu-${new Date().toISOString().split('T')[0]}.pdf`;
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
        simulatorType="impot-revenu"
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
              <Users className="w-5 h-5" />
              <span>Situation familiale</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Situation maritale</Label>
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
                  <SelectItem value="single">Célibataire/Veuf/Divorcé</SelectItem>
                  <SelectItem value="married">Marié/Pacsé</SelectItem>
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
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="hasDisability"
                checked={formData.hasDisability}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  hasDisability: e.target.checked 
                }))}
                className="rounded"
              />
              <Label htmlFor="hasDisability" className="text-sm">
                Personne handicapée dans le foyer
              </Label>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Euro className="w-5 h-5" />
              <span>Revenus annuels</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="salaryIncome">Salaires et traitements (€)</Label>
              <Input
                id="salaryIncome"
                type="number"
                value={formData.salaryIncome}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  salaryIncome: parseFloat(e.target.value) || 0 
                }))}
                placeholder="45000"
              />
            </div>
            
            <div>
              <Label htmlFor="pensionIncome">Pensions et retraites (€)</Label>
              <Input
                id="pensionIncome"
                type="number"
                value={formData.pensionIncome}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  pensionIncome: parseFloat(e.target.value) || 0 
                }))}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label htmlFor="businessIncome">Bénéfices industriels et commerciaux (€)</Label>
              <Input
                id="businessIncome"
                type="number"
                value={formData.businessIncome}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  businessIncome: parseFloat(e.target.value) || 0 
                }))}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label htmlFor="propertyIncome">Revenus fonciers (€)</Label>
              <Input
                id="propertyIncome"
                type="number"
                value={formData.propertyIncome}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  propertyIncome: parseFloat(e.target.value) || 0 
                }))}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label htmlFor="capitalIncome">Revenus de capitaux mobiliers (€)</Label>
              <Input
                id="capitalIncome"
                type="number"
                value={formData.capitalIncome}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  capitalIncome: parseFloat(e.target.value) || 0 
                }))}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label htmlFor="otherIncome">Autres revenus (€)</Label>
              <Input
                id="otherIncome"
                type="number"
                value={formData.otherIncome}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  otherIncome: parseFloat(e.target.value) || 0 
                }))}
                placeholder="0"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingDown className="w-5 h-5" />
              <span>Charges et déductions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Frais professionnels (salaires)</Label>
              <Select 
                value={formData.employmentExpenseChoice} 
                onValueChange={(value: 'standard' | 'actual') => 
                  setFormData(prev => ({ ...prev, employmentExpenseChoice: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Déduction standard (10%)</SelectItem>
                  <SelectItem value="actual">Frais réels</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {formData.employmentExpenseChoice === 'actual' && (
              <div>
                <Label htmlFor="employmentExpenses">Montant des frais réels (€)</Label>
                <Input
                  id="employmentExpenses"
                  type="number"
                  value={formData.employmentExpenses}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    employmentExpenses: parseFloat(e.target.value) || 0 
                  }))}
                  placeholder="0"
                />
              </div>
            )}
            
            {formData.propertyIncome > 0 && (
              <>
                <div>
                  <Label>Régime foncier</Label>
                  <Select 
                    value={formData.propertyRegime} 
                    onValueChange={(value: 'micro' | 'real') => 
                      setFormData(prev => ({ ...prev, propertyRegime: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="micro">Micro-foncier (30% d'abattement)</SelectItem>
                      <SelectItem value="real">Régime réel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.propertyRegime === 'real' && (
                  <div>
                    <Label htmlFor="propertyExpenses">Charges foncières déductibles (€)</Label>
                    <Input
                      id="propertyExpenses"
                      type="number"
                      value={formData.propertyExpenses}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        propertyExpenses: parseFloat(e.target.value) || 0 
                      }))}
                      placeholder="0"
                    />
                  </div>
                )}
              </>
            )}
            
            <div>
              <Label htmlFor="pensionContributions">Cotisations retraite déductibles (€)</Label>
              <Input
                id="pensionContributions"
                type="number"
                value={formData.pensionContributions}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  pensionContributions: parseFloat(e.target.value) || 0 
                }))}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label htmlFor="alimonyPaid">Pensions alimentaires versées (€)</Label>
              <Input
                id="alimonyPaid"
                type="number"
                value={formData.alimonyPaid}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  alimonyPaid: parseFloat(e.target.value) || 0 
                }))}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label htmlFor="charitableDonations">Dons aux œuvres (€)</Label>
              <Input
                id="charitableDonations"
                type="number"
                value={formData.charitableDonations}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  charitableDonations: parseFloat(e.target.value) || 0 
                }))}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label htmlFor="otherDeductions">Autres déductions (€)</Label>
              <Input
                id="otherDeductions"
                type="number"
                value={formData.otherDeductions}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  otherDeductions: parseFloat(e.target.value) || 0 
                }))}
                placeholder="0"
              />
            </div>
          </CardContent>
        </Card>
        
        <Button onClick={calculate} className="w-full" size="lg">
          <Calculator className="w-4 h-4 mr-2" />
          Calculer mon impôt
        </Button>
      </div>
      
      {/* Résultats */}
      <div className="space-y-6">
        {result ? (
          <Card>
            <CardHeader>
              <CardTitle>Votre impôt sur le revenu 2024</CardTitle>
              <CardDescription>
                Calcul basé sur {result.familialShares} parts fiscales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="synthesis" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="synthesis">Synthèse</TabsTrigger>
                  <TabsTrigger value="breakdown">Détail</TabsTrigger>
                  <TabsTrigger value="rates">Taux</TabsTrigger>
                </TabsList>
                
                <TabsContent value="synthesis" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">Revenus bruts</p>
                      <p className="text-lg font-bold text-blue-600">
                        {formatCurrency(result.totalGrossIncome)}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-600">Revenu imposable</p>
                      <p className="text-lg font-bold text-orange-600">
                        {formatCurrency(result.taxableIncome)}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-red-50 rounded-lg">
                      <p className="text-sm text-gray-600">Impôt à payer</p>
                      <p className="text-lg font-bold text-red-600">
                        {formatCurrency(result.finalTax)}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">Revenu net mensuel</p>
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(result.monthlyNet)}
                      </p>
                    </div>
                  </div>
                  
                  {result.quotientFamilialReduction > 0 && (
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Économie quotient familial :</span>
                        <span className="text-lg font-bold text-purple-600">
                          -{formatCurrency(result.quotientFamilialReduction)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Réduction d'impôt grâce à vos {result.familialShares} parts fiscales
                      </p>
                    </div>
                  )}
                  
                  {result.cehr > 0 && (
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>CEHR :</strong> {formatCurrency(result.cehr)} de contribution exceptionnelle sur les hauts revenus s'ajoute à votre impôt.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-green-500">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Taux d'imposition effectif :</span>
                      <span className="text-lg font-bold">
                        {formatPercentage(result.effectiveRate)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-medium">Taux marginal :</span>
                      <span className="text-lg font-bold">
                        {formatPercentage(result.marginalRate)}
                      </span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="breakdown" className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Calcul par tranche</h4>
                    {result.taxBreakdown.map((bracket, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            Tranche {bracket.bracket} ({formatPercentage(bracket.rate)})
                          </span>
                          <span className="font-medium">{formatCurrency(bracket.tax)}</span>
                        </div>
                        <div className="text-xs text-gray-600">
                          {formatCurrency(bracket.min)} à {bracket.max ? formatCurrency(bracket.max) : '+'} 
                          {' • '}
                          Revenu imposable : {formatCurrency(bracket.taxableAmount)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2 text-sm border-t pt-3">
                    <div className="flex justify-between">
                      <span>Impôt brut :</span>
                      <span className="font-medium">{formatCurrency(result.grossTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Réduction quotient familial :</span>
                      <span className="font-medium text-green-600">
                        -{formatCurrency(result.quotientFamilialReduction)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Impôt net :</span>
                      <span className="font-bold">{formatCurrency(result.finalTax)}</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="rates" className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-3">Barème 2024 (par part)</h4>
                      <div className="space-y-2 text-sm">
                        {IR_BRACKETS_2024.map((bracket, index) => (
                          <div key={index} className="flex justify-between">
                            <span>
                              {formatCurrency(bracket.min)} à {bracket.max ? formatCurrency(bracket.max) : '+'}
                            </span>
                            <span className="font-medium">{formatPercentage(bracket.rate)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-3">Votre situation</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Revenu par part :</span>
                          <span className="font-medium">{formatCurrency(result.incomePerShare)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Nombre de parts :</span>
                          <span className="font-medium">{result.familialShares}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tranche marginale :</span>
                          <span className="font-medium">{formatPercentage(result.marginalRate)}</span>
                        </div>
                      </div>
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
                  Télécharger le calcul détaillé
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-8">
              <div className="text-center text-gray-500">
                <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Remplissez le formulaire pour calculer votre impôt</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
