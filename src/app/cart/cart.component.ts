import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ShoppingCartItem } from '../models/ShoppingCartItem';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RangePipe } from '../pipes/range.pipe';

@Component({
  selector: 'app-cart',
  imports: [TranslateModule, CommonModule, RangePipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  get cartItems(): ShoppingCartItem[] {
    return this.cartService.cart.itemsProduct;
  }

  public qtyColors: string[] = ['#28a745', '#007bff', '#ffc107', '#fd7e14', '#6f42c1', '#20c997', '#e83e8c'];

  constructor(
    private cartService: CartService,
    private translate: TranslateService
  ) { }

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
