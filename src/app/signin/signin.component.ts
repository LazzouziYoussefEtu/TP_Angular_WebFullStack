import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { IUserCredentials } from '../models/User';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
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

  constructor(
    private loginService: LoginService, 
    private router: Router,
    private translate: TranslateService
  ) {} 

  close() {
    this.router.navigate(['/home']);
  }

  signIn() {
    this.isLoading = true;
    this.isError = false;
    this.message = this.translate.instant('AUTH.SIGNING_IN');

    this.loginService.login(this.credentials).subscribe({
      next: (user) => {
        this.isLoading = false;
        this.translate.get('AUTH.WELCOME_USER', { name: user.firstName }).subscribe(msg => {
          this.message = msg;
        });
        setTimeout(() => this.router.navigate(['/catalog']), 1000);
      },
      error: (err: Error) => {
        this.isLoading = false;
        this.isError = true;
        this.message = err.message; 
        console.error('Login error:', err);
      }
    });
  }
}