import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  public getProducts(search: string = '', category: string = ''): Observable<Product[]> {
    const params: any = {};
    if (search) params.search = search;
    if (category) params.category = category;

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('ProductService Error:', error);
        return throwError(() => new Error('Failed to fetch products. Please try again later.'));
      })
    );
  }
}
