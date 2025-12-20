import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/ShoppingCart';
import { Product } from '../models/Product';
import { ShoppingCartItem } from '../models/ShoppingCartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public productCount: number = 0;
  public cart: ShoppingCart = new ShoppingCart();

  constructor() { }

  addToCart(product: Product) {
    const item = new ShoppingCartItem(product);
    this.cart.addItem(item);
    this.productCount++;
    alert(`${product.productTitle} a été ajouté au panier !`);
  }

  removeFromCart(item: ShoppingCartItem) {
    this.cart.removeItem(item);
  }

  getCartItems() {
    return this.cart.itemsProduct;
  }
}
