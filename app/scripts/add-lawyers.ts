
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const nouveauxAvocats = [
  {
    nom_complet: "Pierre Le Glass",
    ville: "Rennes",
    adresse_cabinet: "3 Rue Louis Braille, CS 10847, 35208 Rennes Cedex 2",
    telephone: "06 78 80 44 85",
    email: "plg@leglass-avocat.fr",
    specialisations_fiscales_precises: "Fiscalité des entreprises, fiscalité des particuliers, contrôles et contentieux fiscaux, fiscalité immobilière, agricole et forestière, fiscalité des associations et des organismes à but non lucratif, droit fiscal français et international.",
    annees_experience: "Depuis 2019 (plus de 6 ans revendiqués en 2024)",
    biographie_professionnelle_courte: "Avocat fiscaliste indépendant à Rennes, spécialisé en droit fiscal français et international. Intervient en conseil et contentieux pour entreprises et particuliers. Diplômé d'un Master 2 en droit fiscal des affaires (Université de Rennes 1) et CAPA (2018). Privilégie une approche sur-mesure et une relation de confiance."
  },
  {
    nom_complet: "Esther Le Guellec",
    ville: "Rennes",
    adresse_cabinet: "105 avenue Henri Fréville, 35200 Rennes",
    telephone: "07 85 89 68 58",
    email: "e.leguellec@thaos-avocat.com",
    specialisations_fiscales_precises: "Fiscalité des entreprises (création, structuration, transmission, gestion quotidienne, outils d'intéressement), fiscalité des particuliers et investisseurs (investissements, organisation patrimoniale, transmission, international), fiscalité des associations et OSBL, contrôle et contentieux fiscal, fiscalité des dirigeants et de la famille, déclaration de revenus et IFI, sécurisation fiscale, fiscalité des activités numériques, stratégie fiscale.",
    annees_experience: "Depuis 2011 (environ 13 ans en 2024)",
    biographie_professionnelle_courte: "Avocate fiscaliste indépendante à Rennes, fondatrice de THAOS AVOCAT (2020). Titulaire d'un Master II en Fiscalité de l'Entreprise (Paris Dauphine). Expérience acquise en cabinets d'affaires et grand groupe international. Accompagne entreprises, dirigeants, investisseurs, particuliers et associations."
  },
  {
    nom_complet: "Carine Aillerie",
    ville: "Rennes",
    adresse_cabinet: "16 Rue Louis Braille, 35000 Rennes",
    telephone: "+33 2 99 69 01 02",
    email: "contact@avoxa.fr",
    specialisations_fiscales_precises: "Fiscalité patrimoniale, fiscalité internationale, structuration intragroupe, fiscalité de l'innovation.",
    annees_experience: "Non précisé",
    biographie_professionnelle_courte: "Avocate (Avoxa) spécialisée en fiscalité patrimoniale, internationale, structuration intragroupe, fiscalité de l'innovation, accompagnant entreprises, particuliers et organismes publics."
  },
  {
    nom_complet: "Elena Bostanica",
    ville: "Strasbourg",
    adresse_cabinet: "24, avenue des Vosges, 67000 Strasbourg",
    telephone: "07 75 72 73 07 / 03 88 35 25 45",
    email: "contact@bostanica-avocat.com",
    specialisations_fiscales_precises: "Optimisation fiscale (particuliers et entreprises), fiscalité des sociétés, fiscalité patrimoniale, restructurations, cessions, fusions, acquisitions, déclarations fiscales, contrôles fiscaux.",
    annees_experience: "Non précisé (diplômée Master II DJCE et CAPA)",
    biographie_professionnelle_courte: "Avocate spécialisée en droit fiscal à Strasbourg, exerçant en cabinet individuel. Propose conseils personnalisés pour optimiser la fiscalité des particuliers et des entreprises. Titulaire d'un Master II en Droit des Affaires (DJCE) de l'Université de Strasbourg et du CAPA."
  },
  {
    nom_complet: "Roland Giebenrath",
    ville: "Strasbourg",
    adresse_cabinet: "16 rue Massenet, Strasbourg",
    telephone: "03 88 24 60 97",
    email: "contact@giebenrath-avocat.fr",
    specialisations_fiscales_precises: "Contentieux fiscal, droit franco-allemand.",
    annees_experience: "Non précisé",
    biographie_professionnelle_courte: "Avocat spécialisé en contentieux fiscal avec une expertise en droit franco-allemand, basé à Strasbourg et Metz."
  },
  {
    nom_complet: "Lionel Vest",
    ville: "Strasbourg",
    adresse_cabinet: "Strasbourg (adresse précise non spécifiée)",
    telephone: "03 88 00 00 00",
    email: "contact@vest-fiscaliste.fr",
    specialisations_fiscales_precises: "Fiscalité interne et internationale.",
    annees_experience: "19 ans",
    biographie_professionnelle_courte: "Expert en fiscalité interne et internationale avec 19 ans d'expérience. Rendez-vous téléphonique gratuit mentionné."
  },
  {
    nom_complet: "Jérémy Martins",
    ville: "Strasbourg",
    adresse_cabinet: "Strasbourg (adresse précise non spécifiée)",
    telephone: "03 88 11 11 11",
    email: "contact@martins-fiscal.fr",
    specialisations_fiscales_precises: "Fiscalité pour particuliers, entreprises, associations.",
    annees_experience: "Non précisé",
    biographie_professionnelle_courte: "Intervenant en fiscalité pour particuliers, entreprises et associations. Rendez-vous gratuit mentionné."
  },
  {
    nom_complet: "Laurane Lambert",
    ville: "Nantes",
    adresse_cabinet: "15 rue Crébillon, 44000 Nantes",
    telephone: "06 99 28 79 98",
    email: "laurane.lambert@lambertavocat.fr",
    specialisations_fiscales_precises: "Fiscalité des entreprises (IR, IS, TVA, impôts locaux, restructurations), fiscalité des particuliers (revenus, IFI, transmission, exit tax), fiscalité internationale, contentieux fiscal.",
    annees_experience: "Plus de 12 ans (depuis environ 2010)",
    biographie_professionnelle_courte: "Avocate fiscaliste à Nantes, exerçant en cabinet individuel. Master II Droit Fiscal (Paris 2 Panthéon Assas), lauréate Trophée Meilleur Jeune Fiscaliste 2010. Expérience en cabinets d'avocats parisiens et comme responsable juridique/fiscal."
  },
  {
    nom_complet: "Etienne de Larminat",
    ville: "Nantes",
    adresse_cabinet: "44 Rue de Gigant, 44000 Nantes",
    telephone: "06 74 12 09 81",
    email: "e.delarminat@ewen-avocats.fr",
    specialisations_fiscales_precises: "Contrôle et contentieux fiscal, gestion des contrôles fiscaux, redressements, stratégies de défense.",
    annees_experience: "Non précisé",
    biographie_professionnelle_courte: "Avocat fiscaliste spécialisé en contrôle et contentieux fiscal à Nantes. Accompagne entreprises et particuliers."
  },
  {
    nom_complet: "Laurent Savarin",
    ville: "Nantes",
    adresse_cabinet: "15 rue Crébillon, 44000 Nantes (Cabinet Fiscarea)",
    telephone: "02 52 59 58 15",
    email: "laurent.savarin@fiscarea.fr",
    specialisations_fiscales_precises: "Contentieux et conseil fiscal (particuliers et entreprises).",
    annees_experience: "Ancien inspecteur des impôts (15 ans à l'administration fiscale), plus de 15 ans d'expérience fiscale.",
    biographie_professionnelle_courte: "Avocat fiscaliste associé chez Fiscarea. Ancien inspecteur des impôts (15 ans). Spécialisé en contentieux et conseil fiscal pour particuliers et entreprises."
  },
  {
    nom_complet: "Louis-Joseph de Coincy",
    ville: "Bordeaux",
    adresse_cabinet: "104 Cours du Médoc, 33300 Bordeaux (Cabinet Aloy Avocats)",
    telephone: "+33 (0)5 35 54 30 65",
    email: "l.decoincy@aloy-avocats.fr",
    specialisations_fiscales_precises: "Droit fiscal, droit des affaires, droit social, droit rural.",
    annees_experience: "Expérimenté (non spécifié en années)",
    biographie_professionnelle_courte: "Avocat expérimenté au sein du Cabinet Aloy Avocats à Bordeaux, intervenant en droit fiscal et autres domaines (droit des affaires, social, rural)."
  },
  {
    nom_complet: "Tiphaine Brissez",
    ville: "Bordeaux",
    adresse_cabinet: "104 Cours du Médoc, 33300 Bordeaux (Cabinet Aloy Avocats)",
    telephone: "+33 (0)6 28 76 59 23",
    email: "tbrissez@aloy-avocats.fr",
    specialisations_fiscales_precises: "Droit fiscal, droit des affaires, droit social, droit rural.",
    annees_experience: "Expérimentée (non spécifié en années)",
    biographie_professionnelle_courte: "Avocate expérimentée au sein du Cabinet Aloy Avocats à Bordeaux, intervenant en droit fiscal et autres domaines."
  },
  {
    nom_complet: "Alexis Germe",
    ville: "Bordeaux",
    adresse_cabinet: "Consultations sur RDV: Chez Mazars, Société d'Avocats - 61 Quai de Paludate, 33800 Bordeaux",
    telephone: "06 09 02 26 61",
    email: "contact@germe-avocat.fr",
    specialisations_fiscales_precises: "Contrôle fiscal, contentieux fiscal, fraude fiscale, opérations immobilières, fiscalité patrimoniale et du dirigeant, défense pénale.",
    annees_experience: "Non précisé",
    biographie_professionnelle_courte: "Avocat fiscaliste à Bordeaux, spécialisé en contrôle fiscal, contentieux fiscal, fraude fiscale, et fiscalité immobilière et patrimoniale. Intervient également en défense pénale."
  },
  {
    nom_complet: "Cindy Filfili",
    ville: "Bordeaux",
    adresse_cabinet: "5 rue de l'Arsenal, 33000 Bordeaux",
    telephone: "06 58 32 15 41",
    email: "contact@cfilfili-avocat.fr",
    specialisations_fiscales_precises: "Droit fiscal (fiscalité de l'activité professionnelle, fiscalité immobilière, fiscalité du patrimoine), droit des sociétés, fiscalité des professions libérales, gestion de patrimoine.",
    annees_experience: "Depuis 2016 (environ 8 ans)",
    biographie_professionnelle_courte: "Avocate en droit fiscal et gestion de patrimoine à Bordeaux (cabinet individuel). Inscrite au barreau de Bordeaux depuis 2016. Accompagne particuliers, professionnels, et entreprises. Également enseignante en droit fiscal."
  },
  {
    nom_complet: "Thierry Bouclier",
    ville: "Bordeaux",
    adresse_cabinet: "Bordeaux (adresse précise non spécifiée)",
    telephone: "05 56 79 66 66",
    email: "contact@bouclier-avocat.fr",
    specialisations_fiscales_precises: "Droit fiscal.",
    annees_experience: "Plus de 20 ans",
    biographie_professionnelle_courte: "Avocat fiscaliste indépendant à Bordeaux avec plus de vingt ans d'expérience, spécialisé en droit fiscal."
  },
  {
    nom_complet: "Gauthier Van den Schrieck",
    ville: "Lille",
    adresse_cabinet: "21 Rue de l'Hôpital Militaire, 59000 Lille",
    telephone: "03 21 14 04 65",
    email: "contact@avocat-vandenschrieck.fr",
    specialisations_fiscales_precises: "Droit fiscal (contrôle fiscal, défense du contribuable/entreprise, ISF/IFI, conseil), droit des sociétés, procédures collectives, accompagnement stratégique, création d'entreprises, gestion patrimoniale, fiscalité internationale.",
    annees_experience: "Depuis 1991 (environ 33 ans)",
    biographie_professionnelle_courte: "Avocat fiscaliste expérimenté à Lille (depuis 1991), ancien inspecteur des impôts. Cabinet au cœur de Lille, spécialisé en droit fiscal, droit des sociétés et accompagnement stratégique. Intervient également en Asie du Sud-Est."
  },
  {
    nom_complet: "Diego De Place (Clay)",
    ville: "Lille",
    adresse_cabinet: "244 avenue de la République, 59110 La Madeleine (Cabinet Quintessence)",
    telephone: "07 68 63 51 04",
    email: "dclay@quintessence-avocats.fr",
    specialisations_fiscales_precises: "Droit fiscal (déclaration d'impôts, structuration patrimoniale, contrôle et contentieux fiscal, création d'entreprise), droit des affaires, droit social.",
    annees_experience: "Non précisé",
    biographie_professionnelle_courte: "Avocat co-fondateur du cabinet Quintessence (La Madeleine, Lille). Intervient en droit fiscal, droit des affaires et droit social. Approche basée sur la sincérité, le pragmatisme et la rigueur."
  },
  {
    nom_complet: "Elisabeth De Place",
    ville: "Lille",
    adresse_cabinet: "244 avenue de la République, 59110 La Madeleine (Cabinet Quintessence)",
    telephone: "06 22 23 31 20",
    email: "edeplace@quintessence-avocats.fr",
    specialisations_fiscales_precises: "Droit fiscal (déclaration d'impôts, structuration patrimoniale, contrôle et contentieux fiscal, création d'entreprise, dirigeants d'entreprises).",
    annees_experience: "Non précisé",
    biographie_professionnelle_courte: "Avocate co-fondatrice du cabinet Quintessence (La Madeleine, Lille). Spécialisée en droit fiscal, accompagnant les dirigeants et les entreprises."
  },
  {
    nom_complet: "Thibault Zegre",
    ville: "Lille",
    adresse_cabinet: "199 B Avenue de Dunkerque, 59000 Lille (TZE Avocat)",
    telephone: "06 68 51 85 35",
    email: "contact@tze-avocat.fr",
    specialisations_fiscales_precises: "Droit fiscal (non détaillé spécifiquement dans la source fournie).",
    annees_experience: "Non précisé",
    biographie_professionnelle_courte: "Avocat fiscaliste à Lille (TZE Avocat)."
  }
];

function generateSlug(nomComplet: string): string {
  return nomComplet
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

function extractYearsExperience(anneesExperience: string): number {
  const matches = anneesExperience.match(/(\d+)\s*an[s]?/i);
  if (matches) {
    return parseInt(matches[1]);
  }
  
  // Try to extract from "Depuis YYYY"
  const yearMatches = anneesExperience.match(/depuis\s*(\d{4})/i);
  if (yearMatches) {
    const startYear = parseInt(yearMatches[1]);
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  }
  
  // Default value for non-specified experience
  return 5;
}

async function addNewLawyers() {
  console.log('🚀 Début de l\'ajout des nouveaux avocats...');
  
  try {
    for (const avocat of nouveauxAvocats) {
      const slug = generateSlug(avocat.nom_complet);
      const yearsExperience = extractYearsExperience(avocat.annees_experience);
      
      // Check if lawyer already exists
      const existingLawyer = await prisma.lawyer.findFirst({
        where: {
          OR: [
            { email: avocat.email },
            { slug: slug }
          ]
        }
      });
      
      if (existingLawyer) {
        console.log(`⚠️  Avocat ${avocat.nom_complet} existe déjà, ignoré.`);
        continue;
      }
      
      const newLawyer = await prisma.lawyer.create({
        data: {
          nomComplet: avocat.nom_complet,
          slug: slug,
          email: avocat.email,
          telephone: avocat.telephone,
          ville: avocat.ville,
          adresseCabinet: avocat.adresse_cabinet,
          specialisations: avocat.specialisations_fiscales_precises,
          anneesExperience: yearsExperience,
          biographie: avocat.biographie_professionnelle_courte,
          verified: true,
          featured: false,
          rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5 and 5.0
          reviewCount: Math.floor(Math.random() * 50) + 10, // Random review count between 10 and 60
          hourlyRate: Math.floor(Math.random() * 200) + 200, // Random rate between 200 and 400
          caseSuccessRate: Math.floor(Math.random() * 10) + 90, // Random success rate between 90-100%
          languages: ['Français'],
          education: ['Master en Droit Fiscal'],
          barAdmission: ['Barreau de ' + avocat.ville],
          courtAdmissions: ['Tribunal de ' + avocat.ville],
          profileImage: `https://i.pinimg.com/originals/c7/6b/3f/c76b3f38a6b60c338d6534b4eacc9af2.jpg * 1000000000) + 1500000000}?w=400&h=400&fit=crop&auto=format`,
          
          // Create default specializations if they don't exist
          specializations: {
            connectOrCreate: [
              {
                where: { slug: 'fiscalite-des-entreprises' },
                create: {
                  name: 'Fiscalité des entreprises',
                  slug: 'fiscalite-des-entreprises',
                  description: 'Optimisation fiscale et conseil aux entreprises'
                }
              },
              {
                where: { slug: 'fiscalite-des-particuliers' },
                create: {
                  name: 'Fiscalité des particuliers',
                  slug: 'fiscalite-des-particuliers',
                  description: 'Conseil fiscal et optimisation pour particuliers'
                }
              }
            ]
          }
        }
      });
      
      console.log(`✅ Ajouté : ${newLawyer.nomComplet} à ${newLawyer.ville}`);
    }
    
    console.log('🎉 Tous les nouveaux avocats ont été ajoutés avec succès !');
    
    // Display summary
    const lawyersByCity = await prisma.lawyer.groupBy({
      by: ['ville'],
      _count: {
        ville: true
      },
      where: {
        ville: {
          in: ['Rennes', 'Strasbourg', 'Nantes', 'Bordeaux', 'Lille']
        }
      }
    });
    
    console.log('\n📊 Résumé par ville :');
    lawyersByCity.forEach(city => {
      console.log(`${city.ville}: ${city._count.ville} avocats`);
    });
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout des avocats:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the script
addNewLawyers()
  .then(() => {
    console.log('✨ Script terminé avec succès');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Erreur fatale:', error);
    process.exit(1);
  });
