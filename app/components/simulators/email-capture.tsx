
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Mail, Shield } from 'lucide-react';

interface EmailCaptureProps {
  onEmailSubmit: (email: string, acceptNewsletter: boolean) => void;
  isGenerating?: boolean;
  simulatorType: string;
}

export function EmailCapture({ onEmailSubmit, isGenerating = false, simulatorType }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [acceptNewsletter, setAcceptNewsletter] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { email?: string } = {};
    
    if (!email) {
      newErrors.email = 'Veuillez saisir votre adresse email';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Veuillez saisir une adresse email valide';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onEmailSubmit(email, acceptNewsletter);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Download className="w-6 h-6 text-white" />
        </div>
        <CardTitle>Télécharger votre simulation</CardTitle>
        <CardDescription>
          Recevez votre rapport détaillé au format PDF par email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Adresse email *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@exemple.com"
                className="pl-10"
                disabled={isGenerating}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="newsletter"
              checked={acceptNewsletter}
              onCheckedChange={(checked) => setAcceptNewsletter(checked as boolean)}
              disabled={isGenerating}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="newsletter"
                className="text-sm font-normal cursor-pointer"
              >
                Recevoir notre newsletter fiscale mensuelle
              </Label>
              <p className="text-xs text-gray-500">
                Conseils fiscaux, nouveautés légales et actualités Lexanova
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
            <Shield className="w-4 h-4 text-green-600 mt-0.5" />
            <div className="text-xs text-gray-600">
              <p className="font-medium text-gray-900 mb-1">Vos données sont protégées</p>
              <p>
                Conformément au RGPD, vos données ne sont utilisées que pour vous envoyer 
                le rapport demandé et notre newsletter si vous y consentez. 
                Vous pouvez vous désabonner à tout moment.
              </p>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Génération en cours...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Télécharger le rapport PDF
              </>
            )}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            En téléchargeant ce rapport, vous acceptez nos{' '}
            <a href="/cgu" className="text-blue-600 hover:underline">conditions d'utilisation</a>
            {' '}et notre{' '}
            <a href="/politique-confidentialite" className="text-blue-600 hover:underline">politique de confidentialité</a>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
