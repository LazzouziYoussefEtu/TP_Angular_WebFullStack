import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

/**
 * RegisterComponent
 * Standalone form component allowing new user registration.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  message: string | null = null;

  constructor(private userService: UserService) {}

  /** Register a new user with provided details */
  register() {
    if (!this.firstName || !this.lastName || !this.email || !this.password) {
      this.message = 'Please fill in all fields.';
      return;
    }

    // Create and add a new user
    const newUserId = 'U' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const newUser = new (require('../models/User').User)(newUserId);
    newUser.firstName = this.firstName;
    newUser.lastName = this.lastName;

    this.userService.addUser(newUser);
    this.userService.signIn(newUserId);
    this.message = 'Registered and signed in successfully!';

    // Clear form
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }
}
