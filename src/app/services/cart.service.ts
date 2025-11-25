import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/ShoppingCart';
import { Product } from '../models/Product';
import { ShoppingCartItem } from '../models/ShoppingCartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  removeFromCart(item : ShoppingCartItem) {
    const deletedproductName = item.itemProduct.productTitle;
    console.log(`${deletedproductName} a été retiré du panier !`);
    this.cart.removeItem(item);
  }
  // On instancie le panier ici
  public cart: ShoppingCart = new ShoppingCart();

  constructor() { }

  // Méthode utilitaire pour transformer un Product en Item et l'ajouter
  addToCart(product: Product) {
    const item = new ShoppingCartItem(product);
    this.cart.addItem(item);
    console.log("Produit ajouté via le service :", product.productTitle);
    alert(`${product.productTitle} a été ajouté au panier !`);
  }

  getCartItems() {
    return this.cart.itemsProduct;
  }
}