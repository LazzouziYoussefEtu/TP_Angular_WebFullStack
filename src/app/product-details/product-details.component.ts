import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/Product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();

  constructor(private cartService: CartService) {}

  onClose() {
    this.close.emit();
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }
}
