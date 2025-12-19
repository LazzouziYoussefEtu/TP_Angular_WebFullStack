import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap, map } from 'rxjs/operators';
import { User, IUserCredentials } from '../models/User';
import { UserService } from './user.service'; // Import UserService

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

  constructor(private userService: UserService) {} // Inject UserService

  login(credentials: IUserCredentials): Observable<User> {
    const { email, password } = credentials;

    // Simulate API call
    return of(null).pipe(
      delay(1000), // Simulate network delay
      tap(() => {
        if (email === 'user@example.com' && password === 'password123') {
          const mockUser: User = new User('user123'); // Instantiate User
          mockUser.email = 'user@example.com';
          mockUser.firstName = 'Test';
          mockUser.lastName = 'User';
          mockUser.password = 'password123'; // Add password for completeness

          this.currentUserSubject.next(mockUser);
          // this.userService.setCurrentUser(mockUser); // REMOVED
          console.log('Logged in successfully:', mockUser.email);
        } else {
          throw new Error('Invalid email or password');
        }
      }),
      // Map to return the current user (or throw error)
      // This is a simplification; a real auth flow would return tokens etc.
      map(() => this.currentUserSubject.value as User)
    );
  }

  /**
   * Register a new user
   * (This method would typically interact with a backend API for registration)
   * @returns Observable of the newly created User
   */
  register(firstName: string, lastName: string, email: string): Observable<User> {
    // For now, this is a mock registration
    if (!firstName || !email) {
      return throwError(() => new Error('Please fill in all fields.'));
    }

    // Simulate successful registration
    const newUser: User = new User('u' + Date.now()); // Instantiate User
    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName; // Set last name for completeness

    return of(newUser).pipe(
      delay(500),
      tap(u => {
        // After successful registration, we might want to automatically sign in the user
        // This is a simplified approach; a real app would likely have a separate sign-in after registration
        this.currentUserSubject.next(u);
        // this.userService.setCurrentUser(u); // REMOVED
        console.log('Registered successfully:', u.firstName);
      })
    );
  }

  /**
   * Sign out the current user
   */
  signOut(): void {
    this.currentUserSubject.next(null);
    this.userService.signOut(); // Also sign out from UserService
  }
}
