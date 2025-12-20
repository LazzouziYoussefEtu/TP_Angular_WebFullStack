import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/Product';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  imports: [FormsModule, ProductDetailsComponent, TranslateModule, CommonModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: String[] = [];

  private _searchTerm: string = "";
  private _selectedCategory: string = "";
  selectedProduct: Product | null = null;

  get searchTerm(): string { return this._searchTerm; }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.applyFilters();
  }

  get selectedCategory(): string { return this._selectedCategory; }
  set selectedCategory(value: string) {
    this._selectedCategory = value;
    this.applyFilters();
  }

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = this.products;
      this.categories = [...new Set(this.products.map(p => p.category))];
    });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.productTitle.toLowerCase().includes(this._searchTerm.toLowerCase());
      const matchesCategory = this._selectedCategory === "" || product.category === this._selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  openProductDetails(product: Product) {
    this.selectedProduct = product;
  }

  closeProductDetails() {
    this.selectedProduct = null;
  }
}
