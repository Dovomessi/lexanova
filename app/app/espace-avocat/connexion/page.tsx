
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ConnexionAvocatPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nomComplet: '',
    telephone: '',
    ville: '',
    barreau: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Connexion
        const response = await fetch('/api/auth/lawyer/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erreur de connexion');
        }

        // Redirection vers le dashboard
        window.location.href = '/espace-avocat';
      } else {
        // Inscription
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Les mots de passe ne correspondent pas');
        }

        // Pour l'inscription, nous aurions besoin de cityId et autres champs
        // Pour simplifier, on utilise des valeurs par défaut
        const response = await fetch('/api/auth/lawyer/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            nomComplet: formData.nomComplet,
            telephone: formData.telephone,
            ville: formData.ville,
            adresseCabinet: `${formData.ville}, France`,
            anneesExperience: 5,
            biographie: `Avocat fiscaliste basé à ${formData.ville}`,
            cityId: 'default-city-id', // À améliorer avec une vraie sélection
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erreur lors de l\'inscription');
        }

        setError('');
        alert('Compte créé avec succès ! En attente de validation par notre équipe.');
        setIsLogin(true); // Basculer vers la connexion
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="bg-[var(--lexanova-blue)]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-[var(--lexanova-blue)]" />
            </div>
            <CardTitle className="text-2xl">
              {isLogin ? 'Connexion Avocat' : 'Inscription Avocat'}
            </CardTitle>
            <p className="text-gray-600">
              {isLogin 
                ? 'Accédez à votre espace professionnel' 
                : 'Créez votre compte avocat'
              }
            </p>
          </CardHeader>
          
          <CardContent>
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="nomComplet">Nom complet *</Label>
                    <Input
                      id="nomComplet"
                      value={formData.nomComplet}
                      onChange={(e) => setFormData(prev => ({ ...prev, nomComplet: e.target.value }))}
                      placeholder="Votre nom et prénom"
                      required={!isLogin}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="telephone">Téléphone *</Label>
                      <Input
                        id="telephone"
                        value={formData.telephone}
                        onChange={(e) => setFormData(prev => ({ ...prev, telephone: e.target.value }))}
                        placeholder="06 12 34 56 78"
                        required={!isLogin}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ville">Ville *</Label>
                      <Input
                        id="ville"
                        value={formData.ville}
                        onChange={(e) => setFormData(prev => ({ ...prev, ville: e.target.value }))}
                        placeholder="Paris"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="barreau">Barreau d'inscription *</Label>
                    <Input
                      id="barreau"
                      value={formData.barreau}
                      onChange={(e) => setFormData(prev => ({ ...prev, barreau: e.target.value }))}
                      placeholder="Ex: Barreau de Paris"
                      required={!isLogin}
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="votre.email@exemple.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Mot de passe *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="••••••••"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Se souvenir de moi
                  </label>
                  <Link href="#" className="text-[var(--lexanova-blue)] hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)]/90"
                disabled={loading}
              >
                {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setFormData({
                      email: '',
                      password: '',
                      confirmPassword: '',
                      nomComplet: '',
                      telephone: '',
                      ville: '',
                      barreau: '',
                    });
                  }}
                  className="ml-1 text-[var(--lexanova-blue)] hover:underline font-medium"
                >
                  {isLogin ? "Créer un compte" : "Se connecter"}
                </button>
              </p>
            </div>

            {!isLogin && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800">
                  En créant un compte, vous acceptez nos{' '}
                  <Link href="/cgu" className="underline">
                    conditions d'utilisation
                  </Link>{' '}
                  et notre{' '}
                  <Link href="/politique-confidentialite" className="underline">
                    politique de confidentialité
                  </Link>.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/espace-avocat/devenir-partenaire" className="text-[var(--lexanova-blue)] hover:underline">
            Découvrir les avantages partenaires
          </Link>
        </div>
      </div>
    </div>
  );
}
