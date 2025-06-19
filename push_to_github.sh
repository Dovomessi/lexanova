#!/bin/bash

# Configuration
OWNER="Dovomessi"
REPO="lexanova_web_projet"
BRANCH="main"

# Fonction pour créer un fichier sur GitHub
create_github_file() {
    local file_path="$1"
    local github_path="$2"
    local message="$3"
    
    if [ -f "$file_path" ]; then
        echo "Pushing $github_path..."
        # Ici on utiliserait l'API GitHub, mais pour simplifier on va juste lister les fichiers
        echo "File: $github_path"
    fi
}

# Fichiers de configuration essentiels
create_github_file "app/tailwind.config.ts" "tailwind.config.ts" "Add Tailwind configuration"
create_github_file "app/tsconfig.json" "tsconfig.json" "Add TypeScript configuration"
create_github_file "app/postcss.config.js" "postcss.config.js" "Add PostCSS configuration"
create_github_file "app/components.json" "components.json" "Add components configuration"

# Structure des dossiers principaux
echo "=== Structure du projet ==="
find app -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" -o -name "*.json" \) \
    ! -path "*/node_modules/*" \
    ! -path "*/.next/*" \
    ! -path "*/.yarn/*" \
    ! -path "*/build/*" \
    | head -30

