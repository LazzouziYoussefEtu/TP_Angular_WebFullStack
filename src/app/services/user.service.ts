import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addUser(name: string, email: string): Observable<any> {
    return this.http.post(this.baseUrl, { name, email });
  }

  deleteUser(email: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${email}`);
  }

  deleteLastUser(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/last`);
  }
}
