import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/products`).pipe(
      map(data => data.map(item => {
        const p = new Product(item.productID);
        p.productTitle = item.productTitle;
        p.productPrice = item.productPrice;
        p.productImage = item.productImage;
        p.category = item.category;
        p.productDescription = item.productDescription;
        return p;
      }))
    );
  }
}