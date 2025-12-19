# TP4 Angular : Application E-Commerce Avancée

**Université Abdelmalek Essaâdi** | **Faculté Polydisciplinaire - Larache**  
**Module :** Programmation Full Stack  
**Professeur :** M. KOUISSI Mohamed  
**Année Universitaire :** 2025/2026

---

## 📝 Description du Projet

Application e-commerce complète développée en **Angular 21** (dernière version stable 2024-11) avec une architecture modulaire, standalone components, et gestion avancée du panier avec interface intuitive.

**Dernière mise à jour :** 2025-12-19. Dépendances mises à jour vers les dernières versions stables (Angular 21, TypeScript 5.9, Node.js LTS compatible).

---

## 🎯 Fonctionnalités Principales

### ✅ Catalogue Produits
- **Affichage dynamique** de 10 produits avec descriptions multi-lignes (données statiques embarquées)
- **Recherche en temps réel** par titre de produit
- **Filtrage par catégories** (Tablettes, Smartphones, Téléviseurs, Ordinateurs, Audio, Wearables, Livres, Photo, Imprimantes)
- **Clics sur produit** → Ouverture modal avec détails complets
- Images produit, prix, catégorie et référence

### 🛍️ Modal Détails Produit
- **Vue détaillée** avec image produit et description complète (3+ lignes)
- **Sélecteur de quantité** ajustable (min: 1, max: 999)
- **Bouton "Ajouter au panier"** avec la quantité sélectionnée
- **Fermeture** via bouton ✕ ou clic sur fond gris
- Design responsive avec overlay semi-transparent

### 🛒 Panier Avancé
- **Affichage tableau** de tous les articles du panier
- **Quantités avec badges colorés** (un point couleur par unité)
- **Contrôles de quantité** : boutons − et + pour ajuster directement
- **Suppression d'articles** avec bouton "Retirer 🗑️"
- **Actions panier** : "Vider le panier ��" et "Confirmer la commande ✅"
- **Message panier vide** avec lien retour au catalogue

### 🧭 Navigation
- **Barre de navigation sticky** en haut (Catalogue | Mon Panier)
- **Liens de navigation** fonctionnels avec routeur Angular
- Design cohérent et ergonomique

---

## 🛠️ Architecture Technique

### Structure du Projet
```
src/app/
├── models/                    # Classes métiers
│   ├── Product.ts            # Modèle produit (titre, prix, image, catégorie, description)
│   ├── ShoppingCart.ts        # Panier (collection d'articles)
│   └── ShoppingCartItem.ts    # Élément du panier (produit + quantité)
│
├── services/                  # Injection de dépendances
│   ├── product.service.ts     # Fournit la liste des 10 produits
│   └── cart.service.ts        # Gère l'état global du panier (Singleton)
│
├── components/
│   ├── catalog/
│   │   ├── catalog.component.ts
│   │   ├── catalog.component.html
│   │   └── catalog.component.css
│   ├── cart/
│   │   ├── cart.component.ts
│   │   ├── cart.component.html
│   │   └── cart.component.css
│   ├── product-details/       # Modal pour détails produit
│   │   ├── product-details.component.ts
│   │   ├── product-details.component.html
│   │   └── product-details.component.css
│   └── app.component.*        # Composant racine
│
├── app.routes.ts              # Routage (Catalog ↔ Cart)
└── assets/images/             # Images produits
```

### Technologies Utilisées
- **Angular 21** (dernière version stable) avec Standalone Components et contrôle de flux par blocs
- **TypeScript 5.9** strict avec ES2022 comme cible
- **RxJS** pour services réactifs
- **Angular Router** pour la navigation SPA
- **Angular Forms** (ngModel) pour les entrées utilisateur
- **CSS3** pour styling responsive
- **Express.js 5.x** pour le backend API (séparé de l'application Angular)
- **@angular/platform-server** et **@angular/ssr** pour le Server-Side Rendering (SSR)
- **zone.js 0.15** pour gestion des zones asynchrones
- **Node.js 20 LTS** (recommandé) ou 24 LTS

---

## 📦 Dépendances Principales

### Angular 21.x (2024-11 Latest)
- @angular/core, @angular/common, @angular/router, @angular/forms
- @angular/platform-browser, @angular/platform-browser-dynamic
- @angular/platform-server (SSR)
- @angular/ssr (Server-side rendering utilities)
- @angular/animations

### Développement & Build
- @angular/cli 21.x (tooling)
- @angular/compiler-cli 21.x (TypeScript compiler)
- @angular/build 21.x (build system)
- typescript 5.9.x (language)
- zone.js 0.15.x (async handling)

### Serveur
- express 5.x (HTTP server, SSR)
- @types/express 5.x (TypeScript types)
- @types/node 24.x (Node.js types)

### Testing
- jasmine-core 5.12.x (test framework)
- karma 6.4.x (test runner)

---

## 📦 Modèles de Données

### Product
```typescript
class Product {
  productID: string           // Identifiant unique
  productTitle: string        // Nom du produit
  productPrice: string        // Prix (ex: "2334 DH")
  productImage: string        // Chemin relatif image
  category: string            // Catégorie
  productDescription: string  // Description multi-ligne
}
```

### ShoppingCartItem
```typescript
class ShoppingCartItem {
  itemProduct: Product   // Référence produit
  quantity: number       // Nombre d'unités
  addProduct()          // Incrémente quantité
  subtractProduct()     // Décrémente quantité
}
```

### ShoppingCart
```typescript
class ShoppingCart {
  cartItems: ShoppingCartItem[]  // Liste d'articles dans le panier
  addItem()                         // Ajoute un article
  removeItem()                      // Retire un article
  clearCart()                       // Vide le panier
}
```

---

## 🎨 Caractéristiques UX/UI

### Palette de Couleurs
- **Primaire (Vert)** : #009879 (Navigation, boutons principaux)
- **Secondaire (Bleu)** : #007bff (Quantité, détails)
- **Succès (Vert)** : #28a745 (Bouton confirmer)
- **Danger (Rouge)** : #dc3545 (Bouton supprimer)
- **Attention (Jaune)** : #ffc107 (Bouton vider)

### Badges de Quantité
- Affiche un **point coloré** par unité (cyclant sur 7 couleurs)
- Permet une visualisation rapide des quantités
- Accessible avec titre "Unit N" au survol

### Responsivité
- Tables avec scroll horizontal sur mobile
- Modal adaptée à toutes les tailles
- Navigation sticky en haut pour accès permanent

---

## 🚀 Installation & Démarrage

### Prérequis
- **Node.js 20 LTS** (recommandé) ou 24 LTS (Node 25+ fonctionne mais n'est pas LTS)
- **npm 10+** ou **yarn**
- Angular CLI 21+

### Installation
```bash
# 1. Cloner le dépôt
# Remplacez <YOUR_REPO_URL> par l'URL de votre dépôt GitHub si vous l'avez forké.
# Sinon, utilisez l'URL du dépôt original :
git clone https://github.com/LazzouziYoussefEtu/TP_Angular_WebFullStack.git 
cd TP4

# 2. Installer les dépendances du projet principal
npm install

# 3. Naviguer vers le répertoire de l'API et installer ses dépendances
cd api-server
npm install
cd ..
```

### Lancer l'application (Mode développement)

Pour que l'application fonctionne correctement, le serveur API doit être démarré en premier.

```bash
# Démarrer le serveur API (dans un terminal séparé)
node api-server/index.js
```

Ensuite, dans un autre terminal, lancez l'application Angular :

```bash
# Lancer l'application Angular
npm start
```
L'app démarre sur **http://localhost:4200** avec hot-reload automatique.

### 🔑 Fonctionnalité de Connexion (Sign In)

Une fonctionnalité de connexion a été implémentée pour l'application, utilisant une **authentification mockée** à des fins de démonstration.

Vous pouvez tester cette fonctionnalité en utilisant les identifiants suivants :

*   **Email :** `user@example.com`
*   **Mot de passe :** `password123`

Après la connexion, une icône d'utilisateur apparaîtra dans l'en-tête, vous permettant de vous déconnecter.

### Build production
```bash
npm run build
```
Les fichiers optimisés sont générés dans `dist/tp4/`.

### Build avec Server-Side Rendering (SSR)
```bash
npm run build
npm run serve:ssr:TP4
```
Lance le serveur SSR sur **http://localhost:4200**.

---

## �� Flux de Données

1. **ProductService** fournit 10 produits (liste statique embarquée dans l'application Angular)
2. **CatalogComponent** affiche les produits avec filtrage et recherche
3. Clic sur produit → **ProductDetailsComponent** modal avec overlay
4. Utilisateur sélectionne quantité → **"Ajouter au panier"**
5. **CartService** (Singleton) persiste l'état global du panier
6. **CartComponent** affiche tous les articles avec:
   - Badges de quantité colorés (point par unité)
   - Boutons ± pour ajuster quantité en temps réel
   - Bouton supprimer pour retirer un article
7. Boutons d'action : "Vider panier" ou "Confirmer commande"

---

## 📝 Points Clés de Programmation

✅ **Angular 21 Standalone Components** (pas de NgModules)  
✅ **Control Flow par blocs** (@if, @for, @switch au lieu de *ngIf, *ngFor)  
✅ **Injection de dépendances** (providedIn: 'root')  
✅ **Data binding bidirectionnel** ([(ngModel)])  
✅ **Event binding** ((click), (change))  
✅ **Property binding** ([value], [style], [class])  
✅ **Routing** avec Router et Routes  
✅ **Gestion d'état** avec service Singleton  
✅ **Composants imbriqués** avec @Input/@Output  
✅ **Styling dynamique** avec [ngStyle] et [ngClass]  

---

## 📝 Notes de Développement

- Les descriptions produits utilisent `\n` pour les retours à la ligne
- CSS `white-space: pre-wrap` préserve les sauts de ligne dans les descriptions
- Les badges de quantité boucle une palette de 7 couleurs
- Le panier persiste tant que la page reste ouverte (Singleton CartService)
- Navigation responsive avec flexbox et média queries
- Migration Angular 18 → 21 : blocs de contrôle remplacent les directives structurelles
- TypeScript 5.9 avec ES2022 comme cible (support des APIs modernes)
- SSR configuré avec Express 5.x et @angular/ssr

---

## 🔧 Historique des Mises à Jour

### v2.0 (2024-11-25) - Upgrade Dépendances
- ✅ Angular 18 → 21 via migrations officielles (18→19→20→21)
- ✅ TypeScript 5.4 → 5.9 (ES2022)
- ✅ zone.js 0.14 → 0.15
- ✅ express 4.21 → 5.x
- ✅ @types/node 18 → 24
- ✅ Conversion au contrôle de flux par blocs (@if, @for)
- ✅ Mise à jour du serveur SSR (provideServerRendering → @angular/ssr)
- ✅ Tous les packages aux dernières versions stables
- ✅ Build et tests fonctionnels

### v1.0 (2024-11-24) - Release Initial
- Architecture e-commerce complète
- 10 produits avec catégories et descriptions multi-lignes
- Modal détails produit avec quantité ajustable
- Panier avec badges colorés et boutons ± quantité
- Navigation topbar sticky
- Responsive design complet

---

## 👨‍💻 Auteur

**Youssef Lazzouzi**  
Étudiant - Faculté Polydisciplinaire de Larache  
Filière : Licence Développement Informatique et Méthodes DevOps

---

## 📄 Licence

Ce projet est un travail académique pour le module de Programmation Full Stack.
