import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User } from '../models/User';
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
    const newUser: User = {
      userId: 'u' + Date.now(),
      email: email,
      firstName: firstName,
    } as any;

    return of(newUser).pipe(
      delay(500),
      tap(u => {
        // After successful registration, we might want to automatically sign in the user
        // This is a simplified approach; a real app would likely have a separate sign-in after registration
        this.currentUserSubject.next(u);
        this.userService.setCurrentUser(u); // Update UserService's current user
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
