# TP Angular : Application E-Commerce

**Université Abdelmalek Essaâdi** **Faculté Polydisciplinaire - Larache** **Module :** Programmation Full Stack  
**Professeur :** M. KOUISSI Mohamed  
**Année Universitaire :** 2025/2026

---

## 📝 Description du TP

Ce projet a été réalisé dans le cadre des travaux pratiques du module Angular. L'objectif était de créer une application de catalogue en ligne mettant en œuvre les concepts fondamentaux du framework vus en cours (Chapitres 4 à 9), notamment l'architecture orientée services et la communication entre composants.

## 🎯 Objectifs Réalisés

Conformément au cahier des charges, l'application intègre :

1.  **Architecture MVC & Modèles (TypeScript)**
    * Création des classes modèles strictes : `Product`, `User`, `ShoppingCart`, `ShoppingCartItem`.
    * Encapsulation des données (Getters/Setters).

2.  **Composants (Components)**
    * `CatalogComponent` : Affichage de la liste des produits (codés en dur dans le service).
    * `CartComponent` : Gestion de l'affichage du panier et du total.

3.  **Services & Injection de Dépendances (DI)**
    * Implémentation d'un `CartService` (Singleton) pour persister l'état du panier à travers l'application.
    * Implémentation d'un `ProductService` pour centraliser la source de données des produits.
    * Injection de ces services dans les constructeurs des composants.

4.  **Data Binding & Directives**
    * Utilisation de l'interpolation `{{ }}` et du Property Binding `[]` (ex: images).
    * Utilisation des directives structurelles `*ngFor` (listes) et `*ngIf` (état du panier vide).
    * Event Binding `(click)` pour l'ajout et la suppression d'articles.

5.  **Gestion des Assets**
    * Intégration des images produits stockées localement dans `src/assets/images`.

## 🛠️ Structure du Projet

L'architecture respecte la séparation des responsabilités :

```text
src/app/
├── models/              # Classes métiers (Logique pure)
│   ├── Product.ts
│   ├── ShoppingCart.ts
│   └── ...
├── services/            # Gestion des données (Fournisseurs)
│   ├── product.service.ts
│   └── cart.service.ts
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

