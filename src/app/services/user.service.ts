import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient) { }

  // Current authenticated user management
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  /** Returns the current user as an observable */
  public getCurrentUser(): Observable<User | null> {
    return this.currentUser$;
  }

  /** Sets the current authenticated user */
  public setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }

  /** Sign the current user out (sets current user to null) */
  public signOut(): void {
    this.currentUserSubject.next(null);
  }

  /** Sign in by credentials */
  public signIn(credentials: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signin`, credentials).pipe(
      tap(user => {
        this.setCurrentUser(user);
      })
    );
  }
}
