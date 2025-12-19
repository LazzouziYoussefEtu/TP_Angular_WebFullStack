import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service'; // Use LoginService
import { IUserCredentials } from '../models/User';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule], // Keep FormsModule
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  message: string | null = null;
  signInError: boolean = false;
  credentials: IUserCredentials = {
    email: '',
    password: ''
  };

  constructor(private loginService: LoginService, private router: Router) {} // Inject LoginService

  close() {
    this.router.navigate(['/home']);
  }

  signIn() {
    this.signInError = false;
    this.message = 'Signing in...';
    this.loginService.login(this.credentials).subscribe({ // Call loginService.login
      next: () => {
        this.message = null;
        this.router.navigate(['/catalog']);
        console.log('Sign-in successful');
      },
      error: (error) => {
        this.message = null;
        this.signInError = true;
        console.error('Login failed:', error); // Log the error for debugging
      }
    });
  }
}

