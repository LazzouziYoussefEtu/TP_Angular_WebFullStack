import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CatalogComponent } from './catalog.component';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { Product } from '../models/Product';
import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';

// Mock ProductDetailsComponent
@Component({
  selector: 'app-product-details',
  template: ''
})
class MockProductDetailsComponent {
  @Input() product: any;
  @Output() close = new EventEmitter<void>();
}

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockCartService: jasmine.SpyObj<CartService>;

  const mockProducts: Product[] = [
    { productID: '1', productTitle: 'P1', productPrice: '10', category: 'C1', productImage: 'img1', productDescription: 'd1', description: 'desc1' },
    { productID: '2', productTitle: 'P2', productPrice: '20', category: 'C2', productImage: 'img2', productDescription: 'd2', description: 'desc2' }
  ];

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['getProducts']);
    mockCartService = jasmine.createSpyObj('CartService', ['addToCart']);

    await TestBed.configureTestingModule({
      imports: [ CatalogComponent, TranslateModule.forRoot(), FormsModule ],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: CartService, useValue: mockCartService }
      ]
    })
    .overrideComponent(CatalogComponent, {
      remove: { imports: [ MockProductDetailsComponent ] }, // In case it was imported directly
      add: { imports: [ MockProductDetailsComponent ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    mockProductService.getProducts.and.returnValue(of([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    mockProductService.getProducts.and.returnValue(of(mockProducts));
    fixture.detectChanges(); // triggers ngOnInit

    expect(component.filteredProducts.length).toBe(2);
    expect(component.isLoading).toBeFalse();
    expect(mockProductService.getProducts).toHaveBeenCalledWith('', '');
  });

  it('should populate categories from products on initial load', () => {
    mockProductService.getProducts.and.returnValue(of(mockProducts));
    fixture.detectChanges();

    expect(component.categories).toContain('C1');
    expect(component.categories).toContain('C2');
  });

  it('should call getProducts when searchTerm changes (debounced)', fakeAsync(() => {
    mockProductService.getProducts.and.returnValue(of(mockProducts));
    fixture.detectChanges(); // initial load

    component.searchTerm = 'search query';
    tick(300); // wait for debounce

    expect(mockProductService.getProducts).toHaveBeenCalledWith('search query', '');
  }));

  it('should call getProducts when category is selected', () => {
    mockProductService.getProducts.and.returnValue(of(mockProducts));
    fixture.detectChanges();

    component.selectedCategory = 'C1';
    
    expect(mockProductService.getProducts).toHaveBeenCalledWith('', 'C1');
  });

  it('should add product to cart', () => {
    mockProductService.getProducts.and.returnValue(of([]));
    fixture.detectChanges();
    
    component.onAddToCart(mockProducts[0]);
    expect(mockCartService.addToCart).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('should handle product details selection', () => {
    mockProductService.getProducts.and.returnValue(of([]));
    fixture.detectChanges();

    expect(component.selectedProduct).toBeNull();
    component.openProductDetails(mockProducts[0]);
    expect(component.selectedProduct).toEqual(mockProducts[0]);
    
    component.closeProductDetails();
    expect(component.selectedProduct).toBeNull();
  });

  it('should handle error when loading products', () => {
    mockProductService.getProducts.and.returnValue(throwError(() => new Error('API Error')));
    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    expect(component.errorMessage).toBeTruthy();
    expect(component.filteredProducts).toEqual([]);
  });
});