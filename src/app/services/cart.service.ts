import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/ShoppingCart';
import { Product } from '../models/Product';
import { ShoppingCartItem } from '../models/ShoppingCartItem';

/**
 * CartService
 * Keeps the application shopping cart state and provides methods to manipulate it.
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {
  removeFromCart(item : ShoppingCartItem) {
    const deletedproductName = item.itemProduct.productTitle;
    console.log(`${deletedproductName} a été retiré du panier !`);
    this.cart.removeItem(item);
  }
  // akouter un compteur d'items dans le panier
  public productCount: number = 0;
  // On instancie le panier ici
  public cart: ShoppingCart = new ShoppingCart();

  constructor() { }

  // Méthode utilitaire pour transformer un Product en Item et l'ajouter
  addToCart(product: Product) {
    const item = new ShoppingCartItem(product);
    this.cart.addItem(item);
    this.productCount++;
    alert(`${product.productTitle} a été ajouté au panier !`);
  }

  getCartItems() {
    return this.cart.itemsProduct;
  }
}