# Lexanova - Plateforme Juridique et Fiscale

Lexanova est une plateforme web moderne dédiée aux services juridiques et fiscaux, offrant des outils de simulation, des guides pratiques et un annuaire d'avocats spécialisés.

## 🚀 Fonctionnalités

### Navigation Complète
- **Guides Fiscaux** : Ressources et guides pratiques
- **Simulateurs** : 6 simulateurs fiscaux interactifs
- **Histoires Fiscales** : Cas d'études et exemples pratiques
- **Annuaire d'Avocats** : Base de données de 49 avocats spécialisés
- **Dashboard Avocat** : Interface de gestion pour les professionnels

### Simulateurs Fiscaux
1. Simulateur d'impôt sur le revenu
2. Simulateur de TVA
3. Simulateur de charges sociales
4. Simulateur d'impôt sur les sociétés
5. Simulateur de plus-values immobilières
6. Simulateur de droits de succession

### Technologies Utilisées
- **Frontend** : Next.js 14, React 18, TypeScript
- **Styling** : Tailwind CSS, Radix UI
- **Base de données** : Prisma ORM
- **Authentification** : NextAuth.js
- **Graphiques** : Chart.js, Plotly.js, Recharts
- **Animations** : Framer Motion

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn
- Base de données (PostgreSQL recommandé)

## 🛠️ Installation

1. **Cloner le repository**
```bash
git clone https://github.com/Dovomessi/lexanova.git
cd lexanova
```

2. **Installer les dépendances**
```bash
cd app
npm install
```

3. **Configuration de l'environnement**
```bash
cp .env.example .env
```
Remplir les variables d'environnement dans le fichier `.env` :
- `DATABASE_URL` : URL de connexion à la base de données
- `NEXTAUTH_SECRET` : Clé secrète pour l'authentification
- `NEXTAUTH_URL` : URL de base de l'application

4. **Initialiser la base de données**
```bash
npx prisma generate
npx prisma db push
```

5. **Peupler la base de données avec les 49 avocats**
```bash
npm run seed
```

## 🚀 Démarrage

### Mode développement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:3000`

### Mode production
```bash
npm run build
npm run start
```

## 📁 Structure du Projet

```
app/
├── components/          # Composants React réutilisables
├── pages/              # Pages Next.js
├── lib/                # Utilitaires et configurations
├── prisma/             # Schéma et migrations de base de données
├── scripts/            # Scripts de seeding et maintenance
├── styles/             # Styles globaux
└── public/             # Assets statiques
```

## 🗄️ Base de Données

Le projet utilise Prisma comme ORM avec une base de données contenant :
- **Avocats** : 49 profils d'avocats avec spécialisations
- **Utilisateurs** : Système d'authentification
- **Simulations** : Historique des calculs fiscaux

## 🎨 Design

- Interface moderne et responsive
- Logo Lexanova intégré
- Thème sombre/clair
- Animations fluides avec Framer Motion
- Composants accessibles avec Radix UI

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :
- Desktop (1024px+)
- Tablette (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Scripts Disponibles

- `npm run dev` : Démarrage en mode développement
- `npm run build` : Construction pour la production
- `npm run start` : Démarrage en mode production
- `npm run lint` : Vérification du code
- `npm run seed` : Peuplement de la base de données

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support, contactez l'équipe de développement.

---

**Lexanova** - Votre partenaire juridique et fiscal digital
