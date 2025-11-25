import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
  public getUsers(): User[] {
    return this.users;
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
