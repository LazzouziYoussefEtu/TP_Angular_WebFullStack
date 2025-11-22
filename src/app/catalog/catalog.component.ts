import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- 1. IMPORT ESSENTIEL
import { Product } from '../models/Product';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-catalog',
  standalone: true,          // <--- Ce mode est activé par défaut
  imports: [CommonModule],   // <--- 2. C'est ici qu'on répare l'erreur ngFor
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.productTitle} a été ajouté au panier !`);
  }
}