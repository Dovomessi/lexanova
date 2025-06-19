
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

async function main() {
  console.log('🌱 Starting database seeding...');

  // Load lawyers data
  const dataPath = path.join(process.cwd(), 'data', 'avocats_fiscalistes.json');
  const lawyersData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  // 1. Create cities
  console.log('📍 Creating cities...');
  const cities = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'];
  const cityRecords = [];

  for (const cityName of cities) {
    const city = await prisma.city.upsert({
      where: { slug: createSlug(cityName) },
      update: {},
      create: {
        name: cityName,
        slug: createSlug(cityName),
      },
    });
    cityRecords.push(city);
    console.log(`✅ City created: ${cityName}`);
  }

  // 2. Create specializations
  console.log('🎯 Creating specializations...');
  const allSpecializations = new Set<string>();
  
  // Extract all unique specializations from lawyers data
  lawyersData.avocats.forEach((avocat: any) => {
    avocat.specialisations_fiscales.forEach((spec: string) => {
      allSpecializations.add(spec);
    });
  });

  const specializationRecords = [];
  for (const specName of Array.from(allSpecializations)) {
    const spec = await prisma.specialization.upsert({
      where: { slug: createSlug(specName) },
      update: {},
      create: {
        name: specName,
        slug: createSlug(specName),
      },
    });
    specializationRecords.push(spec);
    console.log(`✅ Specialization created: ${specName}`);
  }

  // 3. Create article categories
  console.log('📚 Creating article categories...');
  const categories = [
    { name: 'Fiscalité des dirigeants', description: 'Conseils fiscaux pour dirigeants d\'entreprise' },
    { name: 'Fiscalité patrimoniale', description: 'Gestion et optimisation du patrimoine' },
    { name: 'Fiscalité internationale', description: 'Fiscalité transfrontalière et résidence fiscale' },
    { name: 'Fiscalité immobilière', description: 'Fiscalité de l\'investissement immobilier' },
    { name: 'Fiscalité des particuliers', description: 'Impôt sur le revenu et obligations fiscales' },
    { name: 'Fiscalité des entreprises', description: 'Impôt sur les sociétés et TVA' },
  ];

  const categoryRecords = [];
  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { slug: createSlug(cat.name) },
      update: {},
      create: {
        name: cat.name,
        slug: createSlug(cat.name),
        description: cat.description,
      },
    });
    categoryRecords.push(category);
    console.log(`✅ Category created: ${cat.name}`);
  }

  // 4. Create lawyers
  console.log('👨‍💼 Creating lawyers...');
  let lawyerCount = 0;

  for (const avocatData of lawyersData.avocats) {
    // Find city
    const city = cityRecords.find(c => c.name === avocatData.ville);
    if (!city) {
      console.log(`❌ City not found for lawyer: ${avocatData.nom_complet} (${avocatData.ville})`);
      continue;
    }

    // Find specializations
    const lawyerSpecs = [];
    for (const specName of avocatData.specialisations_fiscales) {
      const spec = specializationRecords.find(s => s.name === specName);
      if (spec) {
        lawyerSpecs.push(spec);
      }
    }

    try {
      const lawyer = await prisma.lawyer.upsert({
        where: { email: avocatData.email },
        update: {},
        create: {
          nomComplet: avocatData.nom_complet,
          ville: avocatData.ville,
          adresseCabinet: avocatData.adresse_cabinet,
          telephone: avocatData.telephone,
          email: avocatData.email,
          anneesExperience: avocatData.annees_experience,
          biographie: avocatData.biographie,
          slug: createSlug(avocatData.nom_complet),
          cityId: city.id,
          isPremium: Math.random() > 0.7, // 30% chance of being premium
          specializations: {
            connect: lawyerSpecs.map(spec => ({ id: spec.id })),
          },
        },
      });
      lawyerCount++;
      console.log(`✅ Lawyer created: ${avocatData.nom_complet} (${avocatData.ville})`);
    } catch (error) {
      console.log(`❌ Error creating lawyer ${avocatData.nom_complet}:`, error);
    }
  }

  // 5. Create fiscal domains
  console.log('🏛️ Creating fiscal domains...');
  const fiscalDomains = [
    {
      name: 'Fiscalité des Entreprises',
      description: 'Impôt sur les sociétés, TVA, régimes spéciaux et optimisation fiscale pour les entreprises.',
      icon: 'Building2',
      color: '#1E40AF',
      order: 1,
    },
    {
      name: 'Fiscalité Internationale',
      description: 'Conventions fiscales, résidence fiscale, prix de transfert et fiscalité transfrontalière.',
      icon: 'Globe',
      color: '#059669',
      order: 2,
    },
    {
      name: 'Fiscalité Immobilière',
      description: 'Plus-values immobilières, IFI, LMNP et investissement locatif.',
      icon: 'Home',
      color: '#DC2626',
      order: 3,
    },
    {
      name: 'Fiscalité Patrimoniale',
      description: 'Transmission, donation, succession et gestion de patrimoine.',
      icon: 'Coins',
      color: '#7C3AED',
      order: 4,
    },
    {
      name: 'Fiscalité des Dirigeants',
      description: 'Rémunération des dirigeants, stock-options et pacte Dutreil.',
      icon: 'UserCheck',
      color: '#EA580C',
      order: 5,
    },
    {
      name: 'Fiscalité des Particuliers',
      description: 'Impôt sur le revenu, revenus fonciers et niches fiscales.',
      icon: 'User',
      color: '#0891B2',
      order: 6,
    },
  ];

  const fiscalDomainRecords = [];
  for (const domain of fiscalDomains) {
    const fiscalDomain = await prisma.fiscalDomain.upsert({
      where: { slug: createSlug(domain.name) },
      update: {},
      create: {
        name: domain.name,
        slug: createSlug(domain.name),
        description: domain.description,
        icon: domain.icon,
        color: domain.color,
        order: domain.order,
        metaTitle: `${domain.name} - Guides et Conseils Fiscaux`,
        metaDescription: domain.description,
      },
    });
    fiscalDomainRecords.push(fiscalDomain);
    console.log(`✅ Fiscal domain created: ${domain.name}`);
  }

  // 6. Create blog tags
  console.log('🏷️ Creating blog tags...');
  const blogTags = [
    { name: 'Actualités fiscales', color: '#3B82F6' },
    { name: 'Conseils pratiques', color: '#10B981' },
    { name: 'Décryptage juridique', color: '#F59E0B' },
    { name: 'Optimisation', color: '#8B5CF6' },
    { name: 'Nouveautés légales', color: '#EF4444' },
    { name: 'Jurisprudence', color: '#6366F1' },
    { name: 'Entreprises', color: '#EC4899' },
    { name: 'Particuliers', color: '#14B8A6' },
  ];

  const blogTagRecords = [];
  for (const tag of blogTags) {
    const blogTag = await prisma.blogTag.upsert({
      where: { slug: createSlug(tag.name) },
      update: {},
      create: {
        name: tag.name,
        slug: createSlug(tag.name),
        color: tag.color,
      },
    });
    blogTagRecords.push(blogTag);
    console.log(`✅ Blog tag created: ${tag.name}`);
  }

  // 7. Create sample articles
  console.log('📝 Creating sample articles...');
  const sampleArticles = [
    {
      title: 'Dividendes de Source Étrangère : Tout savoir sur l\'Imposition en France',
      excerpt: 'Guide complet sur l\'imposition des dividendes étrangers et les conventions fiscales internationales.',
      content: 'Les dividendes de source étrangère constituent un enjeu fiscal majeur pour les investisseurs français...',
      author: 'AMOUZOUVI-DOVO Folly Germain',
      category: 'Fiscalité internationale',
      fiscalDomain: 'Fiscalité Internationale',
      readTime: 8,
    },
    {
      title: 'Résidence Fiscale et Location Meublée : Guide Pratique 2025',
      excerpt: 'Comprendre les règles de résidence fiscale et leurs impacts sur la location meublée.',
      content: 'La détermination de la résidence fiscale est cruciale pour l\'optimisation de vos revenus locatifs...',
      author: 'AMOUZOUVI-DOVO Folly Germain',
      category: 'Fiscalité immobilière',
      fiscalDomain: 'Fiscalité Immobilière',
      readTime: 6,
    },
    {
      title: 'Pacte Dutreil : Optimiser la Transmission d\'Entreprise',
      excerpt: 'Les avantages fiscaux du pacte Dutreil pour la transmission d\'entreprises familiales.',
      content: 'Le pacte Dutreil permet de bénéficier d\'un abattement de 75% sur la valeur des parts...',
      author: 'AMOUZOUVI-DOVO Folly Germain',
      category: 'Fiscalité des dirigeants',
      fiscalDomain: 'Fiscalité des Dirigeants',
      readTime: 10,
    },
    {
      title: 'IFI 2025 : Nouveautés et Stratégies d\'Optimisation',
      excerpt: 'Les dernières évolutions de l\'Impôt sur la Fortune Immobilière et conseils d\'optimisation.',
      content: 'L\'IFI continue d\'évoluer et nécessite une stratégie patrimoniale adaptée...',
      author: 'AMOUZOUVI-DOVO Folly Germain',
      category: 'Fiscalité patrimoniale',
      fiscalDomain: 'Fiscalité Patrimoniale',
      readTime: 7,
    },
    {
      title: 'Calcul des Revenus Fonciers : Méthodes et Déductions',
      excerpt: 'Guide pratique pour optimiser la déclaration de vos revenus fonciers.',
      content: 'Le calcul des revenus fonciers nécessite une connaissance précise des déductions possibles...',
      author: 'AMOUZOUVI-DOVO Folly Germain',
      category: 'Fiscalité des particuliers',
      fiscalDomain: 'Fiscalité des Particuliers',
      readTime: 5,
    },
    {
      title: 'IS et Plus-Values : Optimisation Fiscale pour les Entreprises',
      excerpt: 'Stratégies d\'optimisation de l\'impôt sur les sociétés et du régime des plus-values.',
      content: 'L\'optimisation de l\'IS et des plus-values nécessite une approche globale...',
      author: 'AMOUZOUVI-DOVO Folly Germain',
      category: 'Fiscalité des entreprises',
      fiscalDomain: 'Fiscalité des Entreprises',
      readTime: 9,
    },
  ];

  for (const articleData of sampleArticles) {
    const category = categoryRecords.find(c => c.name === articleData.category);
    const fiscalDomain = fiscalDomainRecords.find(d => d.name === articleData.fiscalDomain);
    if (!category) continue;

    try {
      const article = await prisma.article.upsert({
        where: { slug: createSlug(articleData.title) },
        update: {},
        create: {
          title: articleData.title,
          slug: createSlug(articleData.title),
          content: articleData.content,
          excerpt: articleData.excerpt,
          author: articleData.author,
          readTime: articleData.readTime,
          isPublished: true,
          publishedAt: new Date(),
          categoryId: category.id,
          fiscalDomainId: fiscalDomain?.id,
          metaTitle: articleData.title,
          metaDescription: articleData.excerpt,
        },
      });
      console.log(`✅ Article created: ${articleData.title}`);
    } catch (error) {
      console.log(`❌ Error creating article ${articleData.title}:`, error);
    }
  }

  // 8. Create blog posts
  console.log('📰 Creating blog posts...');
  const sampleBlogPosts = [
    {
      title: 'Loi de Finances 2025 : Ce qui change pour les entreprises',
      excerpt: 'Analyse des principales nouveautés fiscales 2025 qui impactent les entreprises françaises.',
      content: 'La loi de finances 2025 apporte des changements significatifs pour les entreprises. Découvrez les nouvelles mesures qui entreront en vigueur...',
      author: 'Maître Sophie Dubois',
      authorBio: 'Avocate fiscaliste spécialisée en droit des entreprises',
      image: 'https://c8.alamy.com/comp/EHXEYX/businessman-reading-a-financial-newspaper-outside-office-building-EHXEYX.jpg',
      fiscalDomain: 'Fiscalité des Entreprises',
      tags: ['Actualités fiscales', 'Nouveautés légales', 'Entreprises'],
      readTime: 7,
      isFeatured: true,
    },
    {
      title: 'Optimisation fiscale vs Évasion fiscale : Comprendre la différence',
      excerpt: 'Guide juridique pour distinguer l\'optimisation fiscale légale de l\'évasion fiscale.',
      content: 'La frontière entre optimisation fiscale et évasion fiscale peut parfois sembler floue. Cet article vous aide à comprendre les nuances...',
      author: 'Maître Jean Martin',
      authorBio: 'Expert en conformité fiscale internationale',
      image: 'https://img.freepik.com/premium-photo/gavel-scales-justice-law-books-white-background_334364-31322.jpg',
      fiscalDomain: 'Fiscalité Internationale',
      tags: ['Décryptage juridique', 'Conseils pratiques'],
      readTime: 6,
      isFeatured: true,
    },
    {
      title: 'Investissement locatif 2025 : Nouvelles niches fiscales',
      excerpt: 'Tour d\'horizon des dispositifs fiscaux pour optimiser vos investissements immobiliers.',
      content: 'L\'investissement locatif bénéficie de nombreux dispositifs fiscaux. Découvrez les opportunités 2025...',
      author: 'Maître Claire Rousseau',
      authorBio: 'Spécialiste en fiscalité immobilière et patrimoniale',
      image: 'https://i.pinimg.com/originals/cf/19/65/cf1965d11f64bfb5d58d0999befbdcd5.jpg',
      fiscalDomain: 'Fiscalité Immobilière',
      tags: ['Optimisation', 'Particuliers'],
      readTime: 8,
      isFeatured: false,
    },
    {
      title: 'Jurisprudence récente : Impact sur la fiscalité des holdings',
      excerpt: 'Analyse de l\'arrêt récent de la Cour de cassation sur le régime fiscal des holdings.',
      content: 'Un récent arrêt de la Cour de cassation vient clarifier le régime fiscal applicable aux holdings familiales...',
      author: 'Maître Pierre Lefevre',
      authorBio: 'Docteur en droit fiscal, expert en restructurations',
      image: 'https://live.staticflickr.com/7301/26682691294_385a8a19c4_b.jpg',
      fiscalDomain: 'Fiscalité des Dirigeants',
      tags: ['Jurisprudence', 'Décryptage juridique'],
      readTime: 10,
      isFeatured: false,
    },
  ];

  for (const blogData of sampleBlogPosts) {
    const fiscalDomain = fiscalDomainRecords.find(d => d.name === blogData.fiscalDomain);
    const tags = blogTagRecords.filter(tag => blogData.tags.includes(tag.name));

    try {
      const blogPost = await prisma.blogPost.upsert({
        where: { slug: createSlug(blogData.title) },
        update: {},
        create: {
          title: blogData.title,
          slug: createSlug(blogData.title),
          content: blogData.content,
          excerpt: blogData.excerpt,
          author: blogData.author,
          authorBio: blogData.authorBio,
          image: blogData.image,
          readTime: blogData.readTime,
          isPublished: true,
          isFeatured: blogData.isFeatured,
          publishedAt: new Date(),
          fiscalDomainId: fiscalDomain?.id,
          metaTitle: blogData.title,
          metaDescription: blogData.excerpt,
          tags: {
            connect: tags.map(tag => ({ id: tag.id })),
          },
        },
      });
      console.log(`✅ Blog post created: ${blogData.title}`);
    } catch (error) {
      console.log(`❌ Error creating blog post ${blogData.title}:`, error);
    }
  }

  // 9. Create case studies
  console.log('⚖️ Creating case studies...');
  const sampleCaseStudies = [
    {
      title: 'L\'Entrepreneur et la Restructuration Fiscale : Un Pari Gagnant',
      story: 'Marc, dirigeant d\'une PME en croissance de 50 salariés, faisait face à une charge fiscale croissante qui menaçait ses projets de développement. Son entreprise générait 5M€ de chiffre d\'affaires mais subissait une pression fiscale de 33% sur les bénéfices.',
      legalIssue: 'Comment optimiser la structure fiscale d\'une entreprise en croissance tout en respectant la réglementation et en préparant une transmission future ?',
      solution: 'Après analyse, nous avons mis en place une holding de tête permettant de bénéficier du régime mère-fille, optimisé les rémunérations dirigeant, et structuré un pacte Dutreil pour la transmission. Un audit fiscal préalable a sécurisé l\'opération.',
      outcome: 'Résultat : 40% d\'économie d\'impôt sur 3 ans, soit 600k€ économisés, réinvestis dans l\'innovation. L\'entreprise a pu recruter 15 personnes supplémentaires et Marc a sécurisé la transmission à ses enfants avec un abattement de 75%.',
      excerpt: 'Comment une restructuration fiscale intelligente a permis à un entrepreneur d\'économiser 600k€ d\'impôts.',
      image: 'https://c8.alamy.com/comp/2C8PAEE/successful-businessman-walking-forward-on-growth-charts-2C8PAEE.jpg',
      fiscalDomain: 'Fiscalité des Dirigeants',
      complexity: 'advanced',
      readTime: 12,
      isFeatured: true,
    },
    {
      title: 'La Famille Investisseur et l\'Optimisation Patrimoniale',
      story: 'La famille Durand possédait un patrimoine immobilier de 2M€ réparti entre résidence principale et 3 biens locatifs. Face à l\'IFI et aux revenus fonciers taxés à 45%, ils cherchaient une stratégie d\'optimisation.',
      legalIssue: 'Comment réduire l\'impact de l\'IFI et optimiser la fiscalité des revenus locatifs tout en préparant la transmission du patrimoine ?',
      solution: 'Mise en place d\'une SCI familiale avec démembrement de propriété, transformation d\'un bien en LMNP, et structuration d\'une donation avec réserve d\'usufruit. Chaque étape a été minutieusement planifiée sur 5 ans.',
      outcome: 'Économie de 50k€/an sur l\'IFI, réduction de 35% de l\'imposition des revenus locatifs, et transmission optimisée de 800k€ avec abattement fiscal. Le patrimoine familial est désormais structuré pour les générations futures.',
      excerpt: 'Stratégie patrimoniale complète pour une famille ayant économisé 250k€ d\'impôts sur 5 ans.',
      image: 'https://i.pinimg.com/originals/9f/23/b2/9f23b2ac8333dc75864aa730d6fc3166.png',
      fiscalDomain: 'Fiscalité Patrimoniale',
      complexity: 'intermediate',
      readTime: 10,
      isFeatured: true,
    },
    {
      title: 'Le Défi de l\'Expatrié : Résidence Fiscale et Double Imposition',
      story: 'Thomas, cadre dirigeant français, a été muté à Singapour pour 4 ans tout en conservant des biens immobiliers en France. Sa situation fiscale était devenue un casse-tête entre les deux juridictions.',
      legalIssue: 'Comment déterminer la résidence fiscale et éviter la double imposition sur les revenus français et singapouriens ?',
      solution: 'Analyse approfondie de la convention fiscale France-Singapour, organisation du départ fiscal, mise en place d\'une gestion locative optimisée et structuration des revenus pour bénéficier des accords bilatéraux.',
      outcome: 'Thomas a pu s\'établir fiscalement à Singapour, économisant 180k€ d\'impôts français sur 4 ans, tout en conservant ses investissements locatifs français sous un régime fiscal optimisé.',
      excerpt: 'Comment un expatrié a économisé 180k€ d\'impôts grâce à une stratégie fiscale internationale.',
      image: 'https://get.pxhere.com/photo/trunk-airport-tourist-travel-trolley-waiting-traveler-bag-business-room-tourism-international-tour-departure-design-terminal-boarding-suitcase-voyage-screenshot-1330974.jpg',
      fiscalDomain: 'Fiscalité Internationale',
      complexity: 'advanced',
      readTime: 9,
      isFeatured: false,
    },
  ];

  for (const caseData of sampleCaseStudies) {
    const fiscalDomain = fiscalDomainRecords.find(d => d.name === caseData.fiscalDomain);

    try {
      const caseStudy = await prisma.caseStudy.upsert({
        where: { slug: createSlug(caseData.title) },
        update: {},
        create: {
          title: caseData.title,
          slug: createSlug(caseData.title),
          story: caseData.story,
          legalIssue: caseData.legalIssue,
          solution: caseData.solution,
          outcome: caseData.outcome,
          excerpt: caseData.excerpt,
          image: caseData.image,
          readTime: caseData.readTime,
          complexity: caseData.complexity,
          isPublished: true,
          isFeatured: caseData.isFeatured,
          publishedAt: new Date(),
          fiscalDomainId: fiscalDomain?.id,
          metaTitle: caseData.title,
          metaDescription: caseData.excerpt,
        },
      });
      console.log(`✅ Case study created: ${caseData.title}`);
    } catch (error) {
      console.log(`❌ Error creating case study ${caseData.title}:`, error);
    }
  }

  // 10. Create tax rates for simulators
  console.log('💰 Creating tax rates...');
  const taxRates = [
    // Impôt sur le revenu
    { category: 'ir', name: 'Tranche 1', value: 0, description: 'Jusqu\'à 11 294 €', validFrom: new Date('2024-01-01') },
    { category: 'ir', name: 'Tranche 2', value: 11, description: 'De 11 295 € à 28 797 €', validFrom: new Date('2024-01-01') },
    { category: 'ir', name: 'Tranche 3', value: 30, description: 'De 28 798 € à 82 341 €', validFrom: new Date('2024-01-01') },
    { category: 'ir', name: 'Tranche 4', value: 41, description: 'De 82 342 € à 177 106 €', validFrom: new Date('2024-01-01') },
    { category: 'ir', name: 'Tranche 5', value: 45, description: 'Au-delà de 177 106 €', validFrom: new Date('2024-01-01') },
    
    // Prélèvements sociaux
    { category: 'ps', name: 'Taux général', value: 17.2, description: 'Prélèvements sociaux sur revenus du capital', validFrom: new Date('2024-01-01') },
    { category: 'ps', name: 'CSG déductible', value: 6.8, description: 'CSG déductible', validFrom: new Date('2024-01-01') },
    { category: 'ps', name: 'CSG non déductible', value: 2.4, description: 'CSG non déductible', validFrom: new Date('2024-01-01') },
    { category: 'ps', name: 'CRDS', value: 0.5, description: 'CRDS', validFrom: new Date('2024-01-01') },
    
    // Impôt sur les sociétés
    { category: 'is', name: 'Taux réduit', value: 15, description: 'Jusqu\'à 42 500 € (PME)', validFrom: new Date('2024-01-01') },
    { category: 'is', name: 'Taux normal', value: 25, description: 'Au-delà de 42 500 €', validFrom: new Date('2024-01-01') },
    
    // PFU
    { category: 'pfu', name: 'IR', value: 12.8, description: 'Impôt sur le revenu forfaitaire', validFrom: new Date('2024-01-01') },
    { category: 'pfu', name: 'PS', value: 17.2, description: 'Prélèvements sociaux forfaitaires', validFrom: new Date('2024-01-01') },
    { category: 'pfu', name: 'Total', value: 30, description: 'Prélèvement forfaitaire unique total', validFrom: new Date('2024-01-01') },
    
    // Droits de donation
    { category: 'donation', name: 'Abattement enfant', value: 100000, description: 'Abattement parent-enfant (€)', validFrom: new Date('2024-01-01') },
    { category: 'donation', name: 'Abattement conjoint', value: 80724, description: 'Abattement entre époux (€)', validFrom: new Date('2024-01-01') },
    { category: 'donation', name: 'Abattement petit-enfant', value: 31865, description: 'Abattement grand-parent/petit-enfant (€)', validFrom: new Date('2024-01-01') },
    
    // Cotisations sociales TNS
    { category: 'social_tns', name: 'Maladie', value: 6.35, description: 'Assurance maladie-maternité', validFrom: new Date('2024-01-01') },
    { category: 'social_tns', name: 'Retraite base', value: 17.75, description: 'Retraite de base', validFrom: new Date('2024-01-01') },
    { category: 'social_tns', name: 'Retraite complémentaire', value: 7, description: 'Retraite complémentaire', validFrom: new Date('2024-01-01') },
    { category: 'social_tns', name: 'Invalidité-décès', value: 1.3, description: 'Invalidité-décès', validFrom: new Date('2024-01-01') },
    { category: 'social_tns', name: 'Allocations familiales', value: 3.1, description: 'Allocations familiales', validFrom: new Date('2024-01-01') },
    { category: 'social_tns', name: 'CSG-CRDS', value: 9.7, description: 'CSG-CRDS', validFrom: new Date('2024-01-01') },
    
    // Micro-entreprise
    { category: 'micro', name: 'BIC Vente', value: 1, description: 'Cotisations sociales BIC vente (%)', validFrom: new Date('2024-01-01') },
    { category: 'micro', name: 'BIC Services', value: 22, description: 'Cotisations sociales BIC services (%)', validFrom: new Date('2024-01-01') },
    { category: 'micro', name: 'BNC', value: 22, description: 'Cotisations sociales BNC (%)', validFrom: new Date('2024-01-01') },
    { category: 'micro', name: 'VFL BIC Vente', value: 1, description: 'Versement libératoire BIC vente (%)', validFrom: new Date('2024-01-01') },
    { category: 'micro', name: 'VFL BIC Services', value: 1.7, description: 'Versement libératoire BIC services (%)', validFrom: new Date('2024-01-01') },
    { category: 'micro', name: 'VFL BNC', value: 2.2, description: 'Versement libératoire BNC (%)', validFrom: new Date('2024-01-01') }
  ];

  for (const rate of taxRates) {
    try {
      await prisma.taxRate.upsert({
        where: { 
          category_name_validFrom: {
            category: rate.category,
            name: rate.name,
            validFrom: rate.validFrom
          }
        },
        update: {},
        create: rate
      });
      console.log(`✅ Tax rate created: ${rate.category} - ${rate.name}`);
    } catch (error) {
      console.log(`❌ Error creating tax rate ${rate.category} - ${rate.name}:`, error);
    }
  }

  // 11. Create resources
  console.log('📋 Creating resources...');
  const sampleResources = [
    {
      title: 'Modèle de Pacte Dutreil',
      description: 'Modèle type de pacte Dutreil pour l\'engagement collectif de conservation des titres.',
      type: 'template',
      format: 'DOCX',
      fileSize: '150 KB',
      fiscalDomain: 'Fiscalité des Dirigeants',
    },
    {
      title: 'Guide de Calcul IFI 2025',
      description: 'Guide complet pour calculer et déclarer l\'Impôt sur la Fortune Immobilière.',
      type: 'guide',
      format: 'PDF',
      fileSize: '2.1 MB',
      fiscalDomain: 'Fiscalité Patrimoniale',
    },
    {
      title: 'Checklist Résidence Fiscale',
      description: 'Liste de vérification pour déterminer votre résidence fiscale.',
      type: 'document',
      format: 'PDF',
      fileSize: '500 KB',
      fiscalDomain: 'Fiscalité Internationale',
    },
    {
      title: 'Formulaire de Déclaration LMNP',
      description: 'Modèle pré-rempli pour la déclaration des revenus en Loueur Meublé Non Professionnel.',
      type: 'form',
      format: 'XLSX',
      fileSize: '80 KB',
      fiscalDomain: 'Fiscalité Immobilière',
    },
  ];

  for (const resourceData of sampleResources) {
    const fiscalDomain = fiscalDomainRecords.find(d => d.name === resourceData.fiscalDomain);

    try {
      const resource = await prisma.resource.upsert({
        where: { slug: createSlug(resourceData.title) },
        update: {},
        create: {
          title: resourceData.title,
          slug: createSlug(resourceData.title),
          description: resourceData.description,
          type: resourceData.type,
          format: resourceData.format,
          fileSize: resourceData.fileSize,
          fiscalDomainId: fiscalDomain?.id,
        },
      });
      console.log(`✅ Resource created: ${resourceData.title}`);
    } catch (error) {
      console.log(`❌ Error creating resource ${resourceData.title}:`, error);
    }
  }

  console.log('✨ Database seeding completed!');
  console.log(`📊 Summary:`);
  console.log(`   - Cities: ${cities.length}`);
  console.log(`   - Specializations: ${allSpecializations.size}`);
  console.log(`   - Categories: ${categories.length}`);
  console.log(`   - Fiscal Domains: ${fiscalDomains.length}`);
  console.log(`   - Blog Tags: ${blogTags.length}`);
  console.log(`   - Lawyers: ${lawyerCount}`);
  console.log(`   - Articles: ${sampleArticles.length}`);
  console.log(`   - Blog Posts: ${sampleBlogPosts.length}`);
  console.log(`   - Case Studies: ${sampleCaseStudies.length}`);
  console.log(`   - Resources: ${sampleResources.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
