
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
import { Home, Calculator, Euro, FileText, Info, Download } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/tax-utils';

interface AcquisitionFormData {
  // Bien immobilier
  propertyPrice: number;
  propertyType: 'neuf' | 'ancien';
  location: 'france' | 'etranger';
  
  // Financement
  loanAmount: number;
  loanDuration: number;
  interestRate: number;
  insuranceRate: number;
  
  // Frais d'acquisition
  notaryFeesRate: number;
  agencyFeesRate: number;
  registrationFeesRate: number;
  expertiseFeesRate: number;
  
  // Taxes
  transferTax: boolean;
  landRegistryTax: boolean;
  
  // Usage
  propertyUse: 'principale' | 'secondaire' | 'locative';
  firstTimeBuyer: boolean;
}

interface AcquisitionResult {
  propertyPrice: number;
  
  // Frais d'acquisition
  notaryFees: number;
  agencyFees: number;
  registrationFees: number;
  expertiseFees: number;
  transferTaxAmount: number;
  landRegistryTaxAmount: number;
  totalAcquisitionFees: number;
  
  // Coût total
  totalCost: number;
  totalCostWithFees: number;
  
  // Financement
  loanDetails: {
    amount: number;
    monthlyPayment: number;
    totalInterest: number;
    totalInsurance: number;
    totalCost: number;
  };
  
  // Apport nécessaire
  requiredDownPayment: number;
  
  // Taxes annuelles
  annualTaxes: {
    propertyTax: number;
    housingTax: number;
  };
}

export function AcquisitionImmobiliereSimulator() {
  const [formData, setFormData] = useState<AcquisitionFormData>({
    propertyPrice: 300000,
    propertyType: 'ancien',
    location: 'france',
    
    loanAmount: 240000,
    loanDuration: 20,
    interestRate: 3.5,
    insuranceRate: 0.36,
    
    notaryFeesRate: 7.5,
    agencyFeesRate: 5,
    registrationFeesRate: 0.7,
    expertiseFeesRate: 0.2,
    
    transferTax: true,
    landRegistryTax: true,
    
    propertyUse: 'principale',
    firstTimeBuyer: false
  });
  
  const [result, setResult] = useState<AcquisitionResult | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const calculate = () => {
    const { propertyPrice } = formData;
    
    // Calcul des frais d'acquisition
    const notaryFees = propertyPrice * (formData.notaryFeesRate / 100);
    const agencyFees = propertyPrice * (formData.agencyFeesRate / 100);
    const registrationFees = propertyPrice * (formData.registrationFeesRate / 100);
    const expertiseFees = propertyPrice * (formData.expertiseFeesRate / 100);
    
    // Taxes de transfert
    let transferTaxAmount = 0;
    if (formData.transferTax) {
      transferTaxAmount = formData.propertyType === 'ancien' 
        ? propertyPrice * 0.054 // 5,4% pour l'ancien
        : propertyPrice * 0.002; // 0,2% pour le neuf
    }
    
    // Taxe de publicité foncière
    let landRegistryTaxAmount = 0;
    if (formData.landRegistryTax) {
      landRegistryTaxAmount = propertyPrice * 0.0015; // 0,15%
    }
    
    const totalAcquisitionFees = notaryFees + agencyFees + registrationFees + 
                                expertiseFees + transferTaxAmount + landRegistryTaxAmount;
    
    const totalCostWithFees = propertyPrice + totalAcquisitionFees;
    
    // Calcul du financement
    const monthlyRate = formData.interestRate / 100 / 12;
    const numberOfPayments = formData.loanDuration * 12;
    
    const monthlyPayment = formData.loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalInterest = (monthlyPayment * numberOfPayments) - formData.loanAmount;
    
    const monthlyInsurance = formData.loanAmount * (formData.insuranceRate / 100) / 12;
    const totalInsurance = monthlyInsurance * numberOfPayments;
    
    const totalLoanCost = formData.loanAmount + totalInterest + totalInsurance;
    
    // Apport nécessaire
    const requiredDownPayment = totalCostWithFees - formData.loanAmount;
    
    // Taxes annuelles estimées
    const propertyTax = propertyPrice * 0.012; // 1,2% estimation
    const housingTax = formData.propertyUse === 'principale' ? propertyPrice * 0.008 : 0; // 0,8% si résidence principale
    
    setResult({
      propertyPrice,
      notaryFees,
      agencyFees,
      registrationFees,
      expertiseFees,
      transferTaxAmount,
      landRegistryTaxAmount,
      totalAcquisitionFees,
      totalCost: propertyPrice,
      totalCostWithFees,
      loanDetails: {
        amount: formData.loanAmount,
        monthlyPayment: monthlyPayment + monthlyInsurance,
        totalInterest,
        totalInsurance,
        totalCost: totalLoanCost
      },
      requiredDownPayment,
      annualTaxes: {
        propertyTax,
        housingTax
      }
    });
  };
  
  const handleEmailSubmit = async (email: string, acceptNewsletter: boolean) => {
    setIsGeneratingPDF(true);
    
    try {
      const saveResponse = await fetch('/api/simulations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          simulatorType: 'acquisition-immobiliere',
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
          simulatorType: 'acquisition-immobiliere',
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
      a.download = `simulation-acquisition-immobiliere-${new Date().toISOString().split('T')[0]}.pdf`;
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
        simulatorType="acquisition-immobiliere"
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
              <Home className="w-5 h-5" />
              <span>Bien immobilier</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="propertyPrice">Prix du bien (€)</Label>
              <Input
                id="propertyPrice"
                type="number"
                value={formData.propertyPrice}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  propertyPrice: parseFloat(e.target.value) || 0 
                }))}
                placeholder="300000"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Type de bien</Label>
                <Select 
                  value={formData.propertyType} 
                  onValueChange={(value: 'neuf' | 'ancien') => 
                    setFormData(prev => ({ ...prev, propertyType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neuf">Neuf</SelectItem>
                    <SelectItem value="ancien">Ancien</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Localisation</Label>
                <Select 
                  value={formData.location} 
                  onValueChange={(value: 'france' | 'etranger') => 
                    setFormData(prev => ({ ...prev, location: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="france">France</SelectItem>
                    <SelectItem value="etranger">Étranger</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Usage du bien</Label>
              <Select 
                value={formData.propertyUse} 
                onValueChange={(value: 'principale' | 'secondaire' | 'locative') => 
                  setFormData(prev => ({ ...prev, propertyUse: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="principale">Résidence principale</SelectItem>
                  <SelectItem value="secondaire">Résidence secondaire</SelectItem>
                  <SelectItem value="locative">Investissement locatif</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="firstTimeBuyer"
                checked={formData.firstTimeBuyer}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  firstTimeBuyer: e.target.checked 
                }))}
                className="rounded"
              />
              <Label htmlFor="firstTimeBuyer" className="text-sm">
                Premier achat immobilier
              </Label>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Euro className="w-5 h-5" />
              <span>Financement</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="loanAmount">Montant emprunté (€)</Label>
              <Input
                id="loanAmount"
                type="number"
                value={formData.loanAmount}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  loanAmount: parseFloat(e.target.value) || 0 
                }))}
                placeholder="240000"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="loanDuration">Durée (années)</Label>
                <Input
                  id="loanDuration"
                  type="number"
                  value={formData.loanDuration}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    loanDuration: parseInt(e.target.value) || 0 
                  }))}
                  placeholder="20"
                />
              </div>
              
              <div>
                <Label htmlFor="interestRate">Taux d'intérêt (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  value={formData.interestRate}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    interestRate: parseFloat(e.target.value) || 0 
                  }))}
                  placeholder="3.5"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="insuranceRate">Taux assurance (%)</Label>
              <Input
                id="insuranceRate"
                type="number"
                step="0.01"
                value={formData.insuranceRate}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  insuranceRate: parseFloat(e.target.value) || 0 
                }))}
                placeholder="0.36"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Frais et taxes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="notaryFeesRate">Frais de notaire (%)</Label>
                <Input
                  id="notaryFeesRate"
                  type="number"
                  step="0.1"
                  value={formData.notaryFeesRate}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    notaryFeesRate: parseFloat(e.target.value) || 0 
                  }))}
                  placeholder="7.5"
                />
              </div>
              
              <div>
                <Label htmlFor="agencyFeesRate">Frais d'agence (%)</Label>
                <Input
                  id="agencyFeesRate"
                  type="number"
                  step="0.1"
                  value={formData.agencyFeesRate}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    agencyFeesRate: parseFloat(e.target.value) || 0 
                  }))}
                  placeholder="5"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="registrationFeesRate">Frais d'enregistrement (%)</Label>
                <Input
                  id="registrationFeesRate"
                  type="number"
                  step="0.1"
                  value={formData.registrationFeesRate}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    registrationFeesRate: parseFloat(e.target.value) || 0 
                  }))}
                  placeholder="0.7"
                />
              </div>
              
              <div>
                <Label htmlFor="expertiseFeesRate">Frais d'expertise (%)</Label>
                <Input
                  id="expertiseFeesRate"
                  type="number"
                  step="0.1"
                  value={formData.expertiseFeesRate}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    expertiseFeesRate: parseFloat(e.target.value) || 0 
                  }))}
                  placeholder="0.2"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="transferTax"
                  checked={formData.transferTax}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    transferTax: e.target.checked 
                  }))}
                  className="rounded"
                />
                <Label htmlFor="transferTax" className="text-sm">
                  Droits de mutation (5,4% ancien / 0,2% neuf)
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="landRegistryTax"
                  checked={formData.landRegistryTax}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    landRegistryTax: e.target.checked 
                  }))}
                  className="rounded"
                />
                <Label htmlFor="landRegistryTax" className="text-sm">
                  Taxe de publicité foncière (0,15%)
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Button onClick={calculate} className="w-full" size="lg">
          <Calculator className="w-4 h-4 mr-2" />
          Calculer les frais d'acquisition
        </Button>
      </div>
      
      {/* Résultats */}
      <div className="space-y-6">
        {result ? (
          <Card>
            <CardHeader>
              <CardTitle>Coût total de l'acquisition</CardTitle>
              <CardDescription>
                Détail des frais et du financement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="costs" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="costs">Coûts</TabsTrigger>
                  <TabsTrigger value="financing">Financement</TabsTrigger>
                  <TabsTrigger value="taxes">Taxes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="costs" className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Prix du bien :</span>
                        <span className="text-lg font-bold text-blue-600">
                          {formatCurrency(result.propertyPrice)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Frais de notaire :</span>
                        <span className="font-medium">{formatCurrency(result.notaryFees)}</span>
                      </div>
                      
                      {result.agencyFees > 0 && (
                        <div className="flex justify-between">
                          <span>Frais d'agence :</span>
                          <span className="font-medium">{formatCurrency(result.agencyFees)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span>Frais d'enregistrement :</span>
                        <span className="font-medium">{formatCurrency(result.registrationFees)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Frais d'expertise :</span>
                        <span className="font-medium">{formatCurrency(result.expertiseFees)}</span>
                      </div>
                      
                      {result.transferTaxAmount > 0 && (
                        <div className="flex justify-between">
                          <span>Droits de mutation :</span>
                          <span className="font-medium">{formatCurrency(result.transferTaxAmount)}</span>
                        </div>
                      )}
                      
                      {result.landRegistryTaxAmount > 0 && (
                        <div className="flex justify-between">
                          <span>Taxe publicité foncière :</span>
                          <span className="font-medium">{formatCurrency(result.landRegistryTaxAmount)}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg border-t-2 border-orange-500">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Total frais d'acquisition :</span>
                        <span className="text-lg font-bold text-orange-600">
                          {formatCurrency(result.totalAcquisitionFees)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        {formatPercentage((result.totalAcquisitionFees / result.propertyPrice) * 100)} du prix du bien
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border-t-2 border-green-500">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Coût total :</span>
                        <span className="text-lg font-bold text-green-600">
                          {formatCurrency(result.totalCostWithFees)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Apport nécessaire :</span>
                        <span className="font-bold text-red-600">
                          {formatCurrency(result.requiredDownPayment)}
                        </span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="financing" className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-3">Détails du financement</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Montant emprunté :</span>
                          <span className="font-medium">{formatCurrency(result.loanDetails.amount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mensualité (capital + intérêts + assurance) :</span>
                          <span className="font-medium text-purple-600">
                            {formatCurrency(result.loanDetails.monthlyPayment)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Coût total des intérêts :</span>
                          <span className="font-medium">{formatCurrency(result.loanDetails.totalInterest)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Coût total de l'assurance :</span>
                          <span className="font-medium">{formatCurrency(result.loanDetails.totalInsurance)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium">Coût total du crédit :</span>
                          <span className="font-bold">{formatCurrency(result.loanDetails.totalCost)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Sur {formData.loanDuration} ans, vous rembourserez au total{' '}
                        <strong>{formatCurrency(result.loanDetails.totalCost)}</strong>, soit{' '}
                        <strong>{formatCurrency(result.loanDetails.totalCost - result.loanDetails.amount)}</strong> d'intérêts et d'assurance.
                      </AlertDescription>
                    </Alert>
                  </div>
                </TabsContent>
                
                <TabsContent value="taxes" className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-medium text-red-900 mb-3">Taxes annuelles estimées</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Taxe foncière :</span>
                          <span className="font-medium">{formatCurrency(result.annualTaxes.propertyTax)}</span>
                        </div>
                        
                        {result.annualTaxes.housingTax > 0 && (
                          <div className="flex justify-between">
                            <span>Taxe d'habitation :</span>
                            <span className="font-medium">{formatCurrency(result.annualTaxes.housingTax)}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium">Total taxes annuelles :</span>
                          <span className="font-bold">
                            {formatCurrency(result.annualTaxes.propertyTax + result.annualTaxes.housingTax)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Soit par mois :</span>
                          <span className="text-sm font-medium">
                            {formatCurrency((result.annualTaxes.propertyTax + result.annualTaxes.housingTax) / 12)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Ces estimations de taxes sont basées sur des moyennes nationales. 
                        Les taux réels varient selon la commune et peuvent évoluer chaque année.
                      </AlertDescription>
                    </Alert>
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
                  Télécharger le plan de financement
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-8">
              <div className="text-center text-gray-500">
                <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Remplissez le formulaire pour calculer les frais d'acquisition</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
