import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../models/Product';
import { ShoppingCartItem } from '../models/ShoppingCartItem';

describe('CartService', () => {
  let service: CartService;

  const mockProduct: Product = {
    productID: '1',
    productTitle: 'Test Product',
    productPrice: '10.00',
    productImage: 'img.jpg',
    category: 'Test',
    productDescription: 'Desc',
    description: 'Long Desc'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    // Mock alert to prevent window blocking during tests
    spyOn(window, 'alert'); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to cart', () => {
    service.addToCart(mockProduct);
    expect(service.cart.itemsProduct.length).toBe(1);
    expect(service.cart.itemsProduct[0].itemProduct).toEqual(mockProduct);
    expect(service.productCount).toBe(1);
  });

  it('should increment quantity if item already exists in cart', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct);
    
    // Assuming implementation merges items with same ID. 
    // Based on provided ShoppingCartItem.ts code logic, let's verify if CartService handles merging or just pushes to list.
    // The previous code review implies CartService uses ShoppingCart which delegates to ShoppingCartItem logic or array push.
    // Let's assume standard cart behavior:
    expect(service.cart.itemsProduct.length).toBe(1);
    expect(service.cart.itemsProduct[0].quantity).toBe(2);
  });

  it('should remove item from cart', () => {
    service.addToCart(mockProduct);
    const itemToRemove = service.cart.itemsProduct[0];
    
    service.removeFromCart(itemToRemove);
    expect(service.cart.itemsProduct.length).toBe(0);
  });
});