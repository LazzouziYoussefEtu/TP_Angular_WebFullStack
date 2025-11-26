import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * UserService
   * Manages an in-memory list of users and exposes the currently authenticated user as an observable.
   */

  // Centralized list of users
  // In a real app, this list would come from a database.
  private users: User[] = [
    this.createUser("U001", "John", "Doe", 28, "Member"),
    this.createUser("U002", "Jane", "Smith", 35, "Admin"),
    this.createUser("U003", "Ahmed", "Hassan", 31, "Member"),
    this.createUser("U004", "Fatima", "Benahmed", 27, "Member"),
    this.createUser("U005", "Mohammed", "Benjelloun", 42, "Admin"),
    this.createUser("U006", "Sophia", "Martin", 29, "Member"),
    this.createUser("U007", "Carlos", "Garcia", 38, "Member"),
    this.createUser("U008", "Emma", "Williams", 26, "Guest"),
    this.createUser("U009", "David", "Johnson", 45, "Admin"),
    this.createUser("U010", "Lisa", "Anderson", 33, "Member")
  ];

  constructor() { }

  // Utility method to create user objects
  private createUser(userId: string, firstName: string, lastName: string, age: number, userType: string): User {
    let user = new User(userId);
    user.firstName = firstName;
    user.lastName = lastName;
    user.age = age;
    user.userType = userType as any; // Cast to userType enum
    return user;
  }

// Get all users
public getUsers(): Observable<User[]> {
    return of(this.users);
}

// Current authenticated user management
private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(this.users.length ? this.users[0] : null);
public currentUser$ = this.currentUserSubject.asObservable();

/** Returns the current user as an observable */
public getCurrentUser(): Observable<User | null> {
  return this.currentUser$;
}

/** Sign the current user out (sets current user to null) */
public signOut(): void {
  this.currentUserSubject.next(null);
}

/** Sign in by userId (if found) */
public signIn(userId: string): void {
  const user = this.getUserById(userId) ?? null;
  this.currentUserSubject.next(user);
}


  // Get user by ID
  public getUserById(userId: string): User | undefined {
    return this.users.find(user => user.userId === userId);
  }

  // Add new user
  public addUser(user: User): void {
    this.users.push(user);
  }

  // Remove user by ID
  public removeUser(userId: string): void {
    const index = this.users.findIndex(user => user.userId === userId);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }

  // Get users by type
  public getUsersByType(userType: string): User[] {
    return this.users.filter(user => user.userType.toString() === userType);
  }

  // Update user
  public updateUser(userId: string, updatedUser: Partial<User>): void {
    const user = this.getUserById(userId);
    if (user) {
      Object.assign(user, updatedUser);
    }
  }
}
