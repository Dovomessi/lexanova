
'use client';

import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Phone, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LawyerCardProps {
  lawyer: {
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
  };
  index?: number;
}

// Function to generate avatar color based on name
const generateAvatarColor = (name: string) => {
  const colors = [
    'bg-blue-500',
    'bg-purple-500', 
    'bg-green-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-teal-500'
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

// Function to get initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export default function LawyerCard({ lawyer, index = 0 }: LawyerCardProps) {
  const avatarColor = generateAvatarColor(lawyer.nomComplet);
  const initials = getInitials(lawyer.nomComplet);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
    >
      {lawyer.isPremium && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-1 text-xs font-medium rounded-bl-lg">
          <Star className="w-3 h-3 inline mr-1" />
          Premium
        </div>
      )}
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <div className={`relative w-16 h-16 ${avatarColor} rounded-full flex-shrink-0 flex items-center justify-center text-white font-semibold text-lg`}>
            {initials.length >= 2 ? (
              <span>{initials}</span>
            ) : (
              <User className="w-8 h-8" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-[var(--lexanova-blue)] transition-colors">
              Me {lawyer.nomComplet}
            </h3>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{lawyer.ville}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <Clock className="w-4 h-4 mr-1" />
              <span>{lawyer.anneesExperience} ans d'expérience</span>
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {lawyer.specializations.slice(0, 3).map((spec) => (
              <span 
                key={spec.id}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
              >
                {spec.name}
              </span>
            ))}
            {lawyer.specializations.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{lawyer.specializations.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Biography */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {lawyer.biographie}
        </p>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            className="flex-1 bg-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)]/90"
          >
            <Phone className="w-4 h-4 mr-2" />
            Prendre RDV
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="border-[var(--lexanova-violet)] text-[var(--lexanova-violet)] hover:bg-[var(--lexanova-violet)] hover:text-white"
          >
            <Mail className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
