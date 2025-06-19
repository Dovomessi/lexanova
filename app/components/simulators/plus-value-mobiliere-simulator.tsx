
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
import { TrendingUp, Calculator, DollarSign, Info, Download, AlertTriangle } from 'lucide-react';
import { 
  calculateProgressiveIR, 
  calculateFamilialShares, 
  calculateSecuritiesAbatements,
  calculateCEHR,
  formatCurrency, 
  formatPercentage,
  PFU_2024
} from '@/lib/tax-utils';

interface MobiliereFormData {
  // Année de référence
  year: number;
  
  // Foyer fiscal
  maritalStatus: 'single' | 'married';
  shares: number;
  taxableIncome: number;
  otherRFR: number;
  rfrN1: number;
  rfrN2: number;
  
  // Revenus mobiliers
  capitalGains: number;
  dividendsWithAbatement: number;
  otherCapitalIncome: number;
  deductibleExpenses: number;
  
  // Options et abattements
  enhancedAbatement: boolean;
  fixedAbatement: boolean;
  detentionYears: number;
  quotientSystem: boolean;
}

interface MobiliereResult {
  capitalGains: number;
  adjustedCapitalGains: number;
  
  // PFU
  pfuTax: number;
  pfuSocialTax: number;
  pfuTotal: number;
  
  // Barème progressif
  progressiveIR: number;
  progressiveSocial: number;
  progressiveTotal: number;
  
  // Optimal
  optimalRegime: 'pfu' | 'progressive';
  optimalTax: number;
  netAmount: number;
  
  // CEHR
  cehr: number;
  
  // Détails
  detentionAbatement: number;
  enhancedAbatementAmount: number;
  fixedAbatementAmount: number;
}

export function PlusValueMobiliereSimulator() {
  const [formData, setFormData] = useState<MobiliereFormData>({
    year: 2024,
    maritalStatus: 'married',
    shares: 2,
    taxableIncome: 60000,
    otherRFR: 0,
    rfrN1: 60000,
    rfrN2: 55000,
    
    capitalGains: 50000,
    dividendsWithAbatement: 5000,
    otherCapitalIncome: 0,
    deductibleExpenses: 500,
    
    enhancedAbatement: false,
    fixedAbatement: false,
    detentionYears: 3,
    quotientSystem: false
  });
  
  const [result, setResult] = useState<MobiliereResult | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const calculate = () => {
    let adjustedCapitalGains = formData.capitalGains;
    let detentionAbatement = 0;
    let enhancedAbatementAmount = 0;
    let fixedAbatementAmount = 0;
    
    // Abattement pour durée de détention (titres acquis avant 2018)
    if (formData.year >= 2018 && formData.detentionYears >= 2) {
      detentionAbatement = calculateSecuritiesAbatements(formData.detentionYears);
      adjustedCapitalGains *= (1 - detentionAbatement / 100);
    }
    
    // Abattement renforcé
    if (formData.enhancedAbatement) {
      enhancedAbatementAmount = adjustedCapitalGains * 0.5;
      adjustedCapitalGains *= 0.5;
    }
    
    // Abattement fixe
    if (formData.fixedAbatement) {
      fixedAbatementAmount = Math.min(500000, adjustedCapitalGains);
      adjustedCapitalGains = Math.max(0, adjustedCapitalGains - 500000);
    }
    
    // Calcul PFU
    const pfuTax = adjustedCapitalGains * PFU_2024.IR_RATE;
    const pfuSocialTax = adjustedCapitalGains * PFU_2024.SOCIAL_RATE;
    const pfuTotal = pfuTax + pfuSocialTax;
    
    // Calcul barème progressif
    // Pour les dividendes avec abattement de 40%
    const adjustedDividends = formData.dividendsWithAbatement * 0.6; // Après abattement
    const totalCapitalIncome = adjustedCapitalGains + adjustedDividends + formData.otherCapitalIncome - formData.deductibleExpenses;
    
    const totalTaxableIncome = formData.taxableIncome + totalCapitalIncome;
    const totalIR = calculateProgressiveIR(totalTaxableIncome, formData.shares);
    const baseIR = calculateProgressiveIR(formData.taxableIncome, formData.shares);
    const progressiveIR = totalIR - baseIR;
    
    // Système du quotient si applicable
    let finalProgressiveIR = progressiveIR;
    if (formData.quotientSystem) {
      const averageIncome = (formData.taxableIncome + formData.rfrN1 + formData.rfrN2) / 3;
      if (totalCapitalIncome > averageIncome) {
        // Atténuation de la progressivité
        finalProgressiveIR *= 0.75;
      }
    }
    
    const progressiveSocial = (adjustedCapitalGains + formData.otherCapitalIncome) * 0.172;
    const progressiveTotal = finalProgressiveIR + progressiveSocial;
    
    // Régime optimal
    const optimalRegime: 'pfu' | 'progressive' = pfuTotal <= progressiveTotal ? 'pfu' : 'progressive';
    const optimalTax = Math.min(pfuTotal, progressiveTotal);
    
    // CEHR
    const totalRFR = formData.taxableIncome + adjustedCapitalGains + formData.otherRFR;
    const cehr = calculateCEHR(totalRFR, formData.shares);
    
    const netAmount = formData.capitalGains + formData.dividendsWithAbatement + formData.otherCapitalIncome - optimalTax - cehr;
    
    setResult({
      capitalGains: formData.capitalGains,
      adjustedCapitalGains,
      pfuTax,
      pfuSocialTax,
      pfuTotal,
      progressiveIR: finalProgressiveIR,
      progressiveSocial,
      progressiveTotal,
      optimalRegime,
      optimalTax,
      netAmount,
      cehr,
      detentionAbatement,
      enhancedAbatementAmount,
      fixedAbatementAmount
    });
  };
  
  const handleEmailSubmit = async (email: string, acceptNewsletter: boolean) => {
    setIsGeneratingPDF(true);
    
    try {
      const saveResponse = await fetch('/api/simulations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          simulatorType: 'plus-value-mobiliere',
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
          simulatorType: 'plus-value-mobiliere',
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
      a.download = `simulation-plus-value-mobiliere-${new Date().toISOString().split('T')[0]}.pdf`;
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
        simulatorType="plus-value-mobiliere"
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
              <DollarSign className="w-5 h-5" />
              <span>Foyer fiscal</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Année de référence</Label>
              <Select 
                value={formData.year.toString()} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, year: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
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
                    <SelectItem value="single">Célibataire/Veuf</SelectItem>
                    <SelectItem value="married">Marié(e)</SelectItem>
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
                placeholder="60000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Hors revenus et plus-values mobiliers pouvant bénéficier du PFU
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
                  placeholder="60000"
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
                  placeholder="55000"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Revenus mobiliers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="capitalGains">Plus-values mobilières (€)</Label>
              <Input
                id="capitalGains"
                type="number"
                value={formData.capitalGains}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  capitalGains: parseFloat(e.target.value) || 0 
                }))}
                placeholder="50000"
              />
            </div>
            
            <div>
              <Label htmlFor="dividendsWithAbatement">
                Dividendes éligibles à l'abattement 40% (€)
              </Label>
              <Input
                id="dividendsWithAbatement"
                type="number"
                value={formData.dividendsWithAbatement}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  dividendsWithAbatement: parseFloat(e.target.value) || 0 
                }))}
                placeholder="5000"
              />
            </div>
            
            <div>
              <Label htmlFor="otherCapitalIncome">
                Autres revenus mobiliers (€)
              </Label>
              <Input
                id="otherCapitalIncome"
                type="number"
                value={formData.otherCapitalIncome}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  otherCapitalIncome: parseFloat(e.target.value) || 0 
                }))}
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                Intérêts, revenus ne pouvant pas bénéficier de l'abattement
              </p>
            </div>
            
            <div>
              <Label htmlFor="deductibleExpenses">
                Frais déductibles (€)
              </Label>
              <Input
                id="deductibleExpenses"
                type="number"
                value={formData.deductibleExpenses}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  deductibleExpenses: parseFloat(e.target.value) || 0 
                }))}
                placeholder="500"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Options et abattements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
                placeholder="3"
              />
              <p className="text-xs text-gray-500 mt-1">
                Pour les titres acquis avant 2018
              </p>
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
                  Abattement fixe 500 000 €
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
        
        <Button onClick={calculate} className="w-full" size="lg">
          <Calculator className="w-4 h-4 mr-2" />
          Calculer l'imposition
        </Button>
      </div>
      
      {/* Résultats */}
      <div className="space-y-6">
        {result ? (
          <Card>
            <CardHeader>
              <CardTitle>Résultat du calcul fiscal</CardTitle>
              <CardDescription>
                Régime optimal : <Badge variant="outline">{result.optimalRegime === 'pfu' ? 'PFU (30%)' : 'Barème progressif'}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="synthesis" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="synthesis">Synthèse</TabsTrigger>
                  <TabsTrigger value="comparison">Comparaison</TabsTrigger>
                  <TabsTrigger value="details">Détails</TabsTrigger>
                </TabsList>
                
                <TabsContent value="synthesis" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">Plus-value brute</p>
                      <p className="text-lg font-bold text-blue-600">
                        {formatCurrency(result.capitalGains)}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-600">Plus-value ajustée</p>
                      <p className="text-lg font-bold text-orange-600">
                        {formatCurrency(result.adjustedCapitalGains)}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-red-50 rounded-lg">
                      <p className="text-sm text-gray-600">Impôt optimal</p>
                      <p className="text-lg font-bold text-red-600">
                        {formatCurrency(result.optimalTax)}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">Net après impôt</p>
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(result.netAmount)}
                      </p>
                    </div>
                  </div>
                  
                  {result.cehr > 0 && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>CEHR applicable :</strong> {formatCurrency(result.cehr)} de contribution exceptionnelle sur les hauts revenus.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-green-500">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Taux d'imposition effectif :</span>
                      <span className="text-lg font-bold">
                        {formatPercentage((result.optimalTax / result.capitalGains) * 100)}
                      </span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="comparison" className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-medium text-purple-900 mb-3">PFU (Prélèvement Forfaitaire Unique)</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Impôt sur le revenu (12,8%) :</span>
                          <span className="font-medium">{formatCurrency(result.pfuTax)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Prélèvements sociaux (17,2%) :</span>
                          <span className="font-medium">{formatCurrency(result.pfuSocialTax)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium">Total PFU :</span>
                          <span className="font-bold">{formatCurrency(result.pfuTotal)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                      <h4 className="font-medium text-indigo-900 mb-3">Barème progressif</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Impôt sur le revenu :</span>
                          <span className="font-medium">{formatCurrency(result.progressiveIR)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Prélèvements sociaux :</span>
                          <span className="font-medium">{formatCurrency(result.progressiveSocial)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium">Total barème :</span>
                          <span className="font-bold">{formatCurrency(result.progressiveTotal)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Le régime <strong>{result.optimalRegime === 'pfu' ? 'PFU' : 'barème progressif'}</strong> est plus avantageux 
                        avec une économie de <strong>{formatCurrency(Math.abs(result.pfuTotal - result.progressiveTotal))}</strong>.
                      </AlertDescription>
                    </Alert>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Abattements appliqués</h4>
                      <div className="text-sm space-y-1">
                        {result.detentionAbatement > 0 && (
                          <div className="flex justify-between">
                            <span>Abattement durée de détention :</span>
                            <span>{formatPercentage(result.detentionAbatement)}</span>
                          </div>
                        )}
                        {result.enhancedAbatementAmount > 0 && (
                          <div className="flex justify-between">
                            <span>Abattement renforcé :</span>
                            <span>{formatCurrency(result.enhancedAbatementAmount)}</span>
                          </div>
                        )}
                        {result.fixedAbatementAmount > 0 && (
                          <div className="flex justify-between">
                            <span>Abattement fixe :</span>
                            <span>{formatCurrency(result.fixedAbatementAmount)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Calcul détaillé</h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Plus-value brute :</span>
                          <span>{formatCurrency(result.capitalGains)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Plus-value imposable :</span>
                          <span>{formatCurrency(result.adjustedCapitalGains)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taux d'abattement total :</span>
                          <span>
                            {formatPercentage(((result.capitalGains - result.adjustedCapitalGains) / result.capitalGains) * 100)}
                          </span>
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
                  Télécharger l'analyse détaillée
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-8">
              <div className="text-center text-gray-500">
                <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Remplissez le formulaire pour calculer votre imposition</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
