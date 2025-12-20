import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { User, IUserCredentials } from '../models/User';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

/**
 * LoginService
 * Centralized authentication service handling sign-in, sign-up, and sign-out logic.
 * Rewritten to use Observables and manage internal state.
 */
interface AuthResponse {
  message: string;
  user: User;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl : string = 'http://localhost:3001'
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: IUserCredentials) : Observable<User> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/api/signin`, credentials).pipe(
      tap((response: AuthResponse) => {
        this.currentUserSubject.next(response.user);
        console.log('Utilisateur stocké dans le service:', response.user);
      }),
      map((response: AuthResponse) => response.user),
      catchError(this.handleError)
    );
  }

  signOut(): void {
    this.currentUserSubject.next(null);
    console.log('Utilisateur déconnecté');
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur inconnue est survenue';
    if (error.status === 401) {
      errorMessage = 'Email ou mot de passe incorrect';
    }
    return throwError(() => new Error(errorMessage));
  }
  
}
