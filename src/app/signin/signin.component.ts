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
  credentials: IUserCredentials = {
    email: '',
    password: ''
  };

  message: string | null = null;
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {} 

  close() {
    this.router.navigate(['/home']);
  }

  signIn() {
    this.isLoading = true;
    this.isError = false;
    this.message = 'Connexion en cours...';

    this.loginService.login(this.credentials).subscribe({
      next: (user) => {
        this.isLoading = false;
        this.message = `Bienvenue ${user.firstName} !`;
        setTimeout(() => this.router.navigate(['/catalog']), 1000);
      },
      error: (err: Error) => {
        this.isLoading = false;
        this.isError = true;
        this.message = err.message; 
        console.error('Échec:', err);
      }
    });
  }
}

