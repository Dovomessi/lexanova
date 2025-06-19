#!/bin/bash

echo "=== SCRIPT DE DÉPLOIEMENT LEXANOVA SUR GITHUB ==="
echo "Repository: https://github.com/Dovomessi/lexanova"
echo "Projet: 707 fichiers, 192,514 lignes de code"
echo ""

cd /home/ubuntu/lexanova-nextjs

# Vérifier si on est dans un repo git
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "Initialisation du repository Git..."
    git init
fi

# Configurer le remote origin
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "Ajout du remote origin..."
    git remote add origin https://github.com/Dovomessi/lexanova.git
fi

# Ajouter tous les fichiers
echo "Ajout de tous les fichiers..."
git add .

# Commit
echo "Création du commit..."
git commit -m "Complete Lexanova Next.js application - 707 files, 192K+ lines
- Tax simulators (IR, IS, TVA, etc.)
- Lawyer database with 500+ entries
- Admin dashboard
- User authentication
- Complete documentation
- Deployment guides" || echo "Rien à committer"

# Configurer la branche principale
git branch -M main

echo ""
echo "=== AUTHENTIFICATION REQUISE ==="
echo "Vous devez vous authentifier avec GitHub."
echo ""
echo "Option 1 - GitHub CLI (Recommandé):"
echo "  gh auth login --web"
echo "  Code d'authentification: 8E77-41FA"
echo "  URL: https://github.com/login/device"
echo ""
echo "Option 2 - Token personnel:"
echo "  export GITHUB_TOKEN=your_token_here"
echo "  gh auth login --with-token <<< \$GITHUB_TOKEN"
echo ""
echo "Option 3 - SSH (si configuré):"
echo "  git remote set-url origin git@github.com:Dovomessi/lexanova.git"
echo ""

# Tentative de push
echo "Tentative de push..."
if git push -u origin main; then
    echo ""
    echo "✅ SUCCÈS ! Code poussé sur GitHub"
    echo "🔗 Repository: https://github.com/Dovomessi/lexanova"
    echo "📊 Statistiques:"
    echo "   - 707 fichiers"
    echo "   - 192,514 lignes de code"
    echo "   - Application Next.js complète"
    echo ""
else
    echo ""
    echo "❌ ÉCHEC - Authentification requise"
    echo ""
    echo "Pour résoudre:"
    echo "1. Authentifiez-vous avec: gh auth login --web"
    echo "2. Ou configurez un token: export GITHUB_TOKEN=your_token"
    echo "3. Puis relancez: ./github_push.sh"
    echo ""
fi
