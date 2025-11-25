import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/Product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();

  quantity: number = 1;

  constructor(private cartService: CartService) {}

  onClose() {
    this.close.emit();
  }

  addToCart() {
    if (this.product && this.quantity > 0) {
      for (let i = 0; i < this.quantity; i++) {
        this.cartService.addToCart(this.product);
      }
      this.quantity = 1; // reset after adding
    }
  }
}
