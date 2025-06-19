
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LawyerCard from '@/components/lawyer-card';

interface Lawyer {
  id: string;
  nomComplet: string;
  ville: string;
  adresseCabinet: string;
  telephone: string;
  email: string;
  anneesExperience: number;
  biographie: string;
  isPremium: boolean;
  specializations: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

interface City {
  id: string;
  name: string;
  slug: string;
}

interface Specialization {
  id: string;
  name: string;
  slug: string;
}

export default function TrouverAvocatPage() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesResponse, specializationsResponse] = await Promise.all([
          fetch('/api/cities'),
          fetch('/api/specializations'),
        ]);

        const citiesData = await citiesResponse.json();
        const specializationsData = await specializationsResponse.json();

        setCities(citiesData.cities || []);
        setSpecializations(specializationsData.specializations || []);
      } catch (error) {
        console.error('Error fetching filter data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchLawyers = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCity !== 'all') params.append('ville', selectedCity);
        if (selectedSpecialty !== 'all') params.append('specialite', selectedSpecialty);
        if (searchQuery) params.append('search', searchQuery);
        params.append('limit', '50');

        const response = await fetch(`/api/lawyers?${params.toString()}`);
        const data = await response.json();
        setLawyers(data.lawyers || []);
      } catch (error) {
        console.error('Error fetching lawyers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, [selectedCity, selectedSpecialty, searchQuery]);

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
              Nos avocats fiscalistes
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Choisissez votre avocat fiscaliste en fonction de votre ville ou de la spécialité recherchée
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher par nom ou mot-clé..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <MapPin className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Toutes les villes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les villes</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Toutes les spécialités" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les spécialités</SelectItem>
                {specializations.map((spec) => (
                  <SelectItem key={spec.id} value={spec.slug}>
                    {spec.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={() => {
                setSelectedCity('all');
                setSelectedSpecialty('all');
                setSearchQuery('');
              }}
              variant="outline"
            >
              Réinitialiser
            </Button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span>
                {loading ? 'Chargement...' : `${lawyers.length} avocat${lawyers.length > 1 ? 's' : ''} trouvé${lawyers.length > 1 ? 's' : ''}`}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : lawyers.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {lawyers.map((lawyer, index) => (
                <LawyerCard key={lawyer.id} lawyer={lawyer} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun avocat trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                Aucun avocat ne correspond à vos critères de recherche.
              </p>
              <Button 
                onClick={() => {
                  setSelectedCity('all');
                  setSelectedSpecialty('all');
                  setSearchQuery('');
                }}
              >
                Réinitialiser les filtres
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
