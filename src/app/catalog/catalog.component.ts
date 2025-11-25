import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/Product';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
    selector: 'app-catalog',
    imports: [CommonModule, FormsModule, ProductDetailsComponent],
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  // Liste des catégories uniques extraites des produits
  categories: String[] = [];

  // Variables de filtrage
  private _searchTerm: string = "";
  private _selectedCategory: string = "";

  // Produit sélectionné pour afficher le modal détails (null = fermé)
  selectedProduct: Product | null = null;

  // GETTER & SETTER pour la recherche texte
  get searchTerm(): string { return this._searchTerm; }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.applyFilters(); // On réapplique les filtres à chaque changement
  }

  // GETTER & SETTER pour la catégorie
  get selectedCategory(): string { return this._selectedCategory; }
  set selectedCategory(value: string) {
    this._selectedCategory = value;
    this.applyFilters(); // On réapplique les filtres à chaque changement
  }

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;

    // MAGIE : On extrait les catégories uniques automatiquement
    // On prend toutes les catégories, et 'new Set' supprime les doublons
    this.categories = [...new Set(this.products.map(p => p.category))];
  }

  // La super méthode qui combine les deux filtres
  applyFilters() {
    this.filteredProducts = this.products.filter(product => {

      // 1. Vérifier si le texte correspond (ou si la recherche est vide)
      const matchesSearch = product.productTitle.toLowerCase().includes(this._searchTerm.toLowerCase());

      // 2. Vérifier si la catégorie correspond (ou si aucune catégorie n'est sélectionnée)
      const matchesCategory = this._selectedCategory === "" || product.category === this._selectedCategory;

      // On garde le produit SEULEMENT si les deux conditions sont vraies
      return matchesSearch && matchesCategory;
    });
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  // Ouvre la fenêtre de détails
  openProductDetails(product: Product) {
    this.selectedProduct = product;
  }

  // Ferme la fenêtre de détails
  closeProductDetails() {
    this.selectedProduct = null;
  }
}