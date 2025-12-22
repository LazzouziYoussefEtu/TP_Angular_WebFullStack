# TP4 Angular : Application E-Commerce Full Stack & Multilingue

**Université Abdelmalek Essaâdi** | **Faculté Polydisciplinaire - Larache**  
**Module :** Programmation Full Stack  
**Professeur :** M. KOUISSI Mohamed  
**Année Universitaire :** 2025/2026

---

## 📝 Description du Projet

Application e-commerce avancée développée en **Angular 21** intégrant un backend **Laravel 12**, un support complet du **mode sombre**, une internationalisation (**i18n**) et une architecture réactive basée sur les **Observables**.


---

## 🎯 Fonctionnalités Principales

### 🌓 Mode Sombre Unifié
- **Thématisation complète** via variables CSS natives.
- **Persistance du choix** dans le `localStorage`.
- **Icônes monocolores** (SVG) qui s'inversent (Noir/Blanc) selon le thème.
- **Logos dynamiques** : Version dégradée pour le mode clair, version blanche pour le mode sombre.

### 🌍 Support Multilingue (i18n)
- **Internationalisation complète** avec `@ngx-translate`.
- **Langues supportées** : Français (FR) et Anglais (EN).
- **Traduction dynamique** des catégories, messages d'erreur, et interfaces.
- **Persistance de la langue** préférée.

### 📡 Intégration API Réelle
- **Backend Laravel** : Les produits et l'authentification sont gérés par une API Laravel robuste.
- **Gestion des Environnements** : Utilisation de `src/environments/environment.ts` pour centraliser les configurations (API URL, Langue par défaut, etc.).
- **Authentification réelle** : Système de Sign-In via POST API avec gestion des erreurs et états de chargement.
- **Gestion asynchrone** : Utilisation intensive de `HttpClient` et RxJS.

### ✅ Catalogue Produits
- **Récupération dynamique** via `/api/products`.
- **Recherche et filtrage** instantanés.
- **Traduction des catégories** (Tablettes, Smartphones, etc.).
- **États de chargement** et gestion des erreurs de connexion.

### 🛒 Panier & Modal
- **Gestion réactive** des quantités.
- **Badges colorés** par unité.
- **Modal de détails** avec images haute qualité et descriptions traduites.

---

## 🛠️ Architecture Technique

### Structure du Projet
```
/
├── laravel-backend/           # Backend Laravel 12 (Port 8000)
│   ├── app/Http/Controllers/  # Contrôleurs (AuthController, ProductController, UserController)
│   ├── routes/api.php         # Endpoints : /api/signin, /api/products, /api/users
│   └── .env                   # Configuration backend
│
├── src/
│   ├── environments/          # Variables d'environnement Angular
│   │   └── environment.ts     # Configuration partagée (apiUrl, defaultLang, etc.)
│   ├── app/
│   │   ├── models/            # Modèles de données (Product, User, Cart)
│   │   ├── services/          # Services (LoginService, ProductService, UserService)
│   │   ├── components/        # Composants Standalone
│   │   ├── assets/
│   │   │   ├── i18n/          # Fichiers de traduction (en.json, fr.json)
│   │   │   ├── icons/         # Icônes SVG monocolores
│   │   │   └── images/        # Assets graphiques (PNG logos)
│   │   └── app.config.ts      # Config HttpClient et TranslateModule
```

### Technologies Utilisées
- **Angular 21** (Standalone, Signals, Block control flow)
- **Laravel 12** (Backend API, Eloquent ORM)
- **@ngx-translate** (Internationalisation)
- **RxJS** (Gestion des flux asynchrones)
- **CSS Variables** (Thématisation dynamique)

---

## 🚀 Installation & Démarrage

### 1. Installation

#### Frontend
```bash
npm install
```

#### Backend (Laravel)
```bash
cd laravel-backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
```

### 2. Lancer le Projet

#### Terminal 1 : Laravel Backend
```bash
cd laravel-backend
php artisan serve
```
Le backend sera disponible sur **http://localhost:8000**.

#### Terminal 2 : Angular Frontend
```bash
npm start
```
L'application est disponible sur **http://localhost:4200**.

---

## ⚙️ Configuration des Environnements

Le fichier `src/environments/environment.ts` contient les variables partagées :
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
  defaultLang: 'fr',
  appTitle: 'my-shop',
  i18nPath: './assets/i18n/'
};
```

---

## 🔑 Identifiants de Test
- **Email :** `test@example.com` (ou celui configuré dans les seeders Laravel)
- **Mot de passe :** `password`

---

## 📸 Captures d'écran & Explications Techniques

### ☀️ Mode Clair (Light Mode)
Organisé dans le dossier `screenshots/light-mode/`

#### 🏠 Accueil & Identité Visuelle
| Accueil | Code de changement de Logo |
| :---: | :--- |
| ![Home Light](screenshots/light-mode/homePageLightMode.png) | **Logos Dynamiques :** Utilisation de l'attribut `[src]` lié à la variable `isDarkTheme`. <br> ```html <img [src]="isDarkTheme ? '...white.png' : '...gradient.png'"> ``` |

#### 📦 Gestion du Catalogue
| Catalogue | Internationalisation (i18n) |
| :---: | :--- |
| ![Catalog Light](screenshots/light-mode/catalogPageLightMode.png) | **Pipe Translate :** Traduction à la volée des titres et des catégories. <br> ```html <th>{{ 'CATALOG.TABLE.NAME' | translate }}</th> <td>{{ 'CATEGORIES.' + p.category | translate }}</td> ``` |

#### 🔍 Détails & 🛒 Panier
| Détails Produit | Panier |
| :---: | :---: |
| ![Details Light](screenshots/light-mode/productDetailsPageLightMode.png) | ![Cart Light](screenshots/light-mode/CartPageLightMode.png) |

**Logique du Panier :**
- **Badges dynamiques :** Génération de points colorés via une boucle `@for` sur la quantité.
- **Service API :** Les produits sont récupérés de manière asynchrone via `ProductService`.

#### 🔐 Authentification
| Connexion Réussie | Logique de Connexion |
| :---: | :--- |
| ![Login Success](screenshots/light-mode/successfulLoginPageLightMode.png) | **API POST :** Envoi des credentials au serveur Laravel et réception de l'objet User. <br> ```typescript this.loginService.login(creds).subscribe(...) ``` |

### 🌙 Mode Sombre (Dark Mode)
Organisé dans le dossier `screenshots/dark-mode/`

| Accueil | Catalogue |
| :---: | :---: |
| ![Home Dark](screenshots/dark-mode/homePageDarkMode.png) | ![Catalog Dark](screenshots/dark-mode/catalogPageDarkMode.png) |

#### 🎨 Implémentation du Thème
Le passage au mode sombre est géré par une classe globale `.dark-theme` sur le `body`, pilotée par des variables CSS natives :
```css
body.dark-theme {
  --bg-color: #121212;
  --text-color: #e0e0e0;
  --icon-color: #fff; /* Inversion automatique des icônes SVG */
}
```

| Détails Produit | Panier |
| :---: | :---: |
| ![Details Dark](screenshots/dark-mode/productDetailsPageDarkMode.png) | ![Cart Dark](screenshots/dark-mode/CartPagedarkMode.png) |

#### ⚠️ Gestion des Erreurs
| Erreur Connexion | Description |
| :---: | :--- |
| ![Login Error](screenshots/dark-mode/unsuccessfulLoginPageDarkMode.png) | **Feedback Utilisateur :** Messages d'erreur traduits et stylisés avec une variable `--btn-danger-bg`. |

---

## 👨‍💻 Auteur

**Youssef Lazzouzi**  
Étudiant - SMI-0211/23  
Filière : Licence Développement Informatique et Méthodes DevOps

---

## 📄 Licence
Travail académique - Université Abdelmalek Essaâdi.