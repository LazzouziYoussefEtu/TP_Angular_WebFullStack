import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User } from '../models/User';

/**
 * LoginService
 * Centralized authentication service handling sign-in, sign-up, and sign-out logic.
 * Rewritten to use Observables and manage internal state.
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  // State: Who is currently logged in?
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Mock Database: Internal list of users
  private users: User[] = [
    { userId: 'u1', email: 'test@example.com', firstName: 'Test' } as any
  ];

  constructor() {}

  /**
   * Sign in user with email (Simulating API call)
   * @param email The email to sign in with
   * @returns Observable of the User if found, or throws error
   */
  signIn(email: string): Observable<User> {
    const user = this.users.find(u => u.email === email);

    if (!user) {
      return throwError(() => new Error('User not found.'));
    }

    // Simulate network delay
    return of(user).pipe(
      delay(500),
      tap(u => {
        this.currentUserSubject.next(u); // Update state
        console.log('Signed in successfully:', u.firstName);
      })
    );
  }

  /**
   * Register a new user
   * @returns Observable of the newly created User
   */
  register(firstName: string, lastName: string, email: string): Observable<User> {
    // 1. Validation
    if (!firstName || !email) {
      return throwError(() => new Error('Please fill in all fields.'));
    }

    // 2. Check duplicates
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      return throwError(() => new Error('User with this email already exists.'));
    }

    // 3. Create User
    const newUser: User = {
      userId: 'u' + Date.now(),
      email: email,
      firstName: firstName,
      // lastName can be added to User model if needed
    } as any;

    // 4. Save and Login
    this.users.push(newUser);
    
    return of(newUser).pipe(
      delay(500),
      tap(u => {
        this.currentUserSubject.next(u); // Auto-login after register
        console.log('Registered successfully:', u.firstName);
      })
    );
  }

  /**
   * Sign out the current user
   */
  signOut(): void {
    this.currentUserSubject.next(null);
  }

  /**
   * Get current logged-in user value (Snapshot)
   */
  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}
