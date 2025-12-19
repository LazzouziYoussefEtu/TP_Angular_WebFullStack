import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { IUserCredentials } from '../models/User';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(private userService: UserService, private router: Router) {}

  close() {
    this.router.navigate(['/home']);
  }

  signIn() {
    this.signInError = false;
    this.message = 'Signing in...';
    this.userService.signIn(this.credentials).subscribe({
      next: () => {
        this.message = null;
        this.router.navigate(['/catalog']);
        console.log('Sign-in successful');
      },
      error: () => {
        this.message = null;
        this.signInError = true;
      }
    });
  }
}

