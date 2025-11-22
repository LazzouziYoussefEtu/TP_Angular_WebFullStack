import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  // C'est ici que nous centralisons la liste de produits !
  // Dans une vraie app, cette liste viendrait d'une base de données.
  private products: Product[] = [
    this.createProduct("P001", "Tablette SAM 12 Pouce", "2334 DH", "tablette-sam12.jpg"),
    this.createProduct("P002", "IPHONE 14 PRO", "13000 DH", "iphone14pro.jpg"),
    this.createProduct("P003", "SMART TV 42 P", "4000 DH", "smarttv42p.jpg"),
    this.createProduct("P004", "PC Portable Gamer", "8500 DH", "iphone14pro2.jpg") // J'en ai ajouté un pour l'exemple :)
  ];

  constructor() { }

  // Une méthode utilitaire pour créer proprement les objets (facultatif mais propre)
  private createProduct(id: string, title: string, price: string, images: string): Product {
    let p = new Product(id);
    p.productTitle = title;
    p.productPrice = price;
    p.productImage = images;
    return p;
  }

  // La méthode que le composant va appeler
  public getProducts(): Product[] {
    return this.products;
  }
}
