
# Lexanova - Plateforme d'Apprentissage Juridique

Lexanova est une plateforme moderne d'apprentissage juridique construite avec Next.js, TypeScript et Supabase.

## 🚀 Fonctionnalités

- Interface utilisateur moderne et responsive
- Authentification sécurisée
- Gestion des cours et contenus juridiques
- Base de données Supabase
- Déploiement optimisé pour Vercel

## 🛠️ Technologies

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Authentification**: NextAuth.js
- **Déploiement**: Vercel

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn
- Compte Supabase
- Compte Vercel (pour le déploiement)

## 🔧 Installation

1. Clonez le repository :
```bash
git clone https://github.com/Dovomessi/lexanova_web_projet.git
cd lexanova_web_projet
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
```bash
cp .env.example .env
```

Puis remplissez le fichier `.env` avec vos propres valeurs :
- `DATABASE_URL` : URL de votre base de données Supabase
- `NEXTAUTH_URL` : URL de votre application (localhost en dev, domaine Vercel en prod)
- `NEXTAUTH_SECRET` : Clé secrète pour NextAuth.js
- `NEXT_PUBLIC_SUPABASE_URL` : URL publique de votre projet Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` : Clé anonyme de votre projet Supabase

4. Lancez le serveur de développement :
```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

## 🚀 Déploiement sur Vercel

1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement dans le dashboard Vercel
3. Déployez automatiquement à chaque push sur la branche main

### Variables d'environnement requises sur Vercel :
- `DATABASE_URL`
- `NEXTAUTH_URL` 
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📁 Structure du projet

```
lexanova-nextjs/
├── app/                 # Pages et composants Next.js 14 (App Router)
├── components/          # Composants réutilisables
├── lib/                # Utilitaires et configurations
├── public/             # Assets statiques
├── styles/             # Styles CSS/Tailwind
└── types/              # Types TypeScript
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.
