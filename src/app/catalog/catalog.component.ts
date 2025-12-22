import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/Product';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-catalog',
  imports: [FormsModule, ProductDetailsComponent, TranslateModule, CommonModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit, OnDestroy {
  filteredProducts: Product[] = [];
  categories: string[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  private _searchTerm: string = "";
  private _selectedCategory: string = "";
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  
  selectedProduct: Product | null = null;

  get searchTerm(): string { return this._searchTerm; }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.searchSubject.next(value);
  }

  get selectedCategory(): string { return this._selectedCategory; }
  set selectedCategory(value: string) {
    this._selectedCategory = value;
    this.loadProducts();
  }

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) { 
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.loadProducts();
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProducts() {
    this.isLoading = true;
    this.cdr.markForCheck(); // Signal update start
    this.productService.getProducts(this._searchTerm, this._selectedCategory)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (products) => {
        this.filteredProducts = products;
        // Populate categories only on initial load to keep dropdown populated
        if (this.categories.length === 0 && !this._searchTerm && !this._selectedCategory) {
          this.categories = [...new Set(products.map(p => p.category))];
        }
        this.isLoading = false;
        this.cdr.markForCheck(); // Signal update end
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.errorMessage = this.translate.instant('CATALOG.ERROR_FETCH');
        this.isLoading = false;
        this.cdr.markForCheck(); // Signal error update
      }
    });
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  openProductDetails(product: Product) {
    this.selectedProduct = product;
    this.cdr.markForCheck();
  }

  closeProductDetails() {
    this.selectedProduct = null;
    this.cdr.markForCheck();
  }
}
