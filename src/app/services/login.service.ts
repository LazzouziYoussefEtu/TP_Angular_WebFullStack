import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/User';

/**
 * LoginService
 * Centralized authentication service handling sign-in, sign-up, and sign-out logic.
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authMessageSubject = new BehaviorSubject<string | null>(null);
  public authMessage$ = this.authMessageSubject.asObservable();

  constructor(private userService: UserService, private router: Router) {}

  /**
   * Sign in user with provided ID
   * @param userId The ID of the user to sign in
   * @returns True if sign in successful, false otherwise
   */
  signIn(userId: string): boolean {
    const user = this.userService.getUser(userId);
    if (!user) {
      this.authMessageSubject.next('User not found.');
      return false;
    }

    this.userService.signIn(userId);
    this.authMessageSubject.next('Signed in successfully!');

    // Navigate to home after delay
    setTimeout(() => {
      this.router.navigate(['/home']);
      this.clearMessage();
    }, 1000);

    return true;
  }

  /**
   * Register a new user with provided details
   * @param firstName User's first name
   * @param lastName User's last name
   * @param email User's email
   * @param password User's password (not stored, for demo purposes)
   * @returns True if registration successful, false otherwise
   */
  register(firstName: string, lastName: string, email: string, password: string): boolean {
    // Validate all fields are provided
    if (!firstName || !lastName || !email || !password) {
      this.authMessageSubject.next('Please fill in all fields.');
      return false;
    }

    // Check if email already exists (simple validation)
    const existingUser = this.userService.getUsers().find(u => u.firstName === firstName && u.lastName === lastName);
    if (existingUser) {
      this.authMessageSubject.next('User with this name already exists.');
      return false;
    }

    // Create and add new user
    const newUserId = 'U' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const newUser = new User(newUserId);
    newUser.firstName = firstName;
    newUser.lastName = lastName;

    this.userService.addUser(newUser);
    this.userService.signIn(newUserId);
    this.authMessageSubject.next('Registered and signed in successfully!');

    // Navigate to home after delay
    setTimeout(() => {
      this.router.navigate(['/home']);
      this.clearMessage();
    }, 1000);

    return true;
  }

  /**
   * Sign out the current user
   */
  signOut(): void {
    this.userService.signOut();
    this.authMessageSubject.next('Signed out successfully.');
    this.router.navigate(['/home']);
    setTimeout(() => this.clearMessage(), 1500);
  }

  /**
   * Get current logged-in user
   * @returns Observable of current user
   */
  getCurrentUser(): Observable<User | null> {
    return this.userService.getCurrentUser();
  }

  /**
   * Clear authentication message
   */
  clearMessage(): void {
    this.authMessageSubject.next(null);
  }

  /**
   * Get all available users (for sign-in selection)
   * @returns Array of all users
   */
  getAvailableUsers(): User[] {
    return this.userService.getUsers();
  }
}
