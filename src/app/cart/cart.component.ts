import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- Toujours importer ça
import { CartService } from '../services/cart.service';
import { ShoppingCartItem } from '../models/ShoppingCartItem';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule], // <--- On l'ajoute ici aussi
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // ... (le reste de votre code CartComponent reste identique)

  get cartItems(): ShoppingCartItem[] {
    return this.cartService.cart.itemsProduct;
  }

  constructor(private cartService: CartService) { }

  ngOnInit(): void { }

  buy() {
    if (this.cartItems.length > 0) {
      alert("Achat réussi !");
    } else {
      alert("Votre panier est vide !");
    }
  }
  removeproductfromcart(item: ShoppingCartItem) {
   this.cartService.removeFromCart(item); 
  }
  clearCart() {
    this.cartService.cart.clearCart();
  }
}