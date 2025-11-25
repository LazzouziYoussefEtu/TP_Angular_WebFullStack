# TP4 Angular : Application E-Commerce Avancée

**Université Abdelmalek Essaâdi** | **Faculté Polydisciplinaire - Larache**  
**Module :** Programmation Full Stack  
**Professeur :** M. KOUISSI Mohamed  
**Année Universitaire :** 2025/2026

---

## 📝 Description du Projet

Application e-commerce complète développée en **Angular 17** avec une architecture modulaire, standalone components, et gestion avancée du panier avec interface intuitive.

---

## 🎯 Fonctionnalités Principales

### ✅ Catalogue Produits
- **Affichage dynamique** de 10 produits avec descriptions multi-lignes
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
- **Actions panier** : "Vider le panier 🧹" et "Confirmer la commande ✅"
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
│   ├── product-details/       # Modal modal
│   │   ├── product-details.component.ts
│   │   ├── product-details.component.html
│   │   └── product-details.component.css
│   └── app.component.*        # Composant racine
│
├── app.routes.ts              # Routage (Catalog ↔ Cart)
└── assets/images/             # Images produits
```

### Technologies Utilisées
- **Angular 17** avec Standalone Components
- **TypeScript** strict
- **RxJS** (services réactifs)
- **Angular Router** pour la navigation
- **Angular Forms** (ngModel) pour les entrées utilisateur
- **CSS3** pour styling responsive

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
  itemsProduct: ShoppingCartItem[]  // Liste d'articles
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
- Node.js 18+ et npm
- Angular CLI 17+

### Installation
```bash
# Cloner le dépôt
git clone <repo-url>
cd TP4

# Installer les dépendances
npm install
```

### Lancer l'application
```bash
npm start
```
L'app démarre sur **http://localhost:4200**

### Build production
```bash
npm run build
```
Les fichiers générés sont dans `dist/tp4/`

---

## 🔄 Flux de Données

1. **ProductService** fournit 10 produits codés en dur
2. **CatalogComponent** affiche les produits (search + filter)
3. Clic produit → **ProductDetailsComponent** modal
4. Sélectionner quantité → **"Ajouter au panier"**
5. **CartService** (Singleton) persiste l'état global
6. **CartComponent** affiche tous les articles avec quantités ajustables
7. Boutons ± modifient les quantités en temps réel

---

## � Points Clés de Programmation

✅ **Architecture modulaire** avec Standalone Components  
✅ **Injection de dépendances** (providedIn: 'root')  
✅ **Data binding bidirectionnel** ([(ngModel)])  
✅ **Directives** (*ngIf, *ngFor)  
✅ **Event binding** ((click), (change))  
✅ **Property binding** ([value], [style], [class])  
✅ **Routing** entre pages  
✅ **Gestion d'état** avec service Singleton  
✅ **Composants imbriqués** avec @Input/@Output  
✅ **Styling dynamique** avec [ngStyle] et [ngClass]

---

## 📝 Notes de Développement

- Les descriptions produits utilisent `\n` pour les retours à la ligne
- CSS `white-space: pre-wrap` préserve les sauts de ligne
- Les badges de quantité boucle une palette de 7 couleurs
- Le panier persiste tant que la page reste ouverte (Singleton CartService)
- Navigation responsive avec flexbox et média queries

---

## 👨‍💻 Auteur

**Youssef Lazzouzi**  
Étudiant - Faculté Polydisciplinaire de Larache

---

## 📄 Licence

Ce projet est un travail académique pour le module de Programmation Full Stack.
├── catalog/             # Vue Catalogue
├── cart/                # Vue Panier
└── app.routes.ts        # Configuration du routage
````

## 🚀 Instructions d'exécution

1.  **Installation des dépendances** :

    ```bash
    npm install
    ```

2.  **Lancement du serveur** :

    ```bash
    ng serve
    ```

3.  **Utilisation** :

      * Accédez à `http://localhost:4200`.
      * Naviguez entre le Catalogue et le Panier via le menu.
      * Ajoutez des produits et visualisez la mise à jour du panier en temps réel.

## 👤 Étudiant

  * **Nom / Prénom** : Lazzouzi Youssef
  * **Filière** : Licence Développement Informatique et Méthodes DevOps

