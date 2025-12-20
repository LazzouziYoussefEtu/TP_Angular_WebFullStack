import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ShoppingCartItem } from '../models/ShoppingCartItem';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cart',
    imports: [TranslateModule, CommonModule],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // ... (le reste de votre code CartComponent reste identique)

  get cartItems(): ShoppingCartItem[] {
    return this.cartService.cart.itemsProduct;
  }

  constructor(
    private cartService: CartService,
    private translate: TranslateService
  ) { }

  // A small palette to cycle through for quantity badges
  public qtyColors: string[] = ['#28a745', '#007bff', '#ffc107', '#fd7e14', '#6f42c1', '#20c997', '#e83e8c'];

  // Helper to build an array [0..n-1] for *ngFor
  range(n: number): number[] {
    return Array.from({ length: Math.max(0, n) }, (_, i) => i);
  }

  getColor(index: number): string {
    return this.qtyColors[index % this.qtyColors.length];
  }

  ngOnInit(): void { }

  buy() {
    if (this.cartItems.length > 0) {
      alert(this.translate.instant('CART.PURCHASE_SUCCESS'));
    } else {
      alert(this.translate.instant('CART.PURCHASE_EMPTY'));
    }
  }
  removeproductfromcart(item: ShoppingCartItem) {
   this.cartService.removeFromCart(item); 
  }

  incrementQuantity(item: ShoppingCartItem) {
    item.quantity += 1;
  }

  decrementQuantity(item: ShoppingCartItem) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    }
  }

  clearCart() {
    this.cartService.cart.clearCart();
  }
}