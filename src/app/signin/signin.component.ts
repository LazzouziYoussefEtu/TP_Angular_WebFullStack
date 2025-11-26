import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  message: string | null = null;

  constructor(private userService: UserService) {}

  // Simulated sign-in: signs in the first user if credentials are non-empty
  signIn() {
    if (!this.email || !this.password) {
      this.message = 'Please enter email and password.';
      return;
    }

    // For now we sign in the first available user as a placeholder
    this.userService.getUsers().subscribe(users => {
      const user = users[0];
      if (user) {
        this.userService.signIn(user.userId as unknown as string);
        this.message = 'Signed in successfully.';
      } else {
        this.message = 'No user found to sign in.';
      }
    });
  }
}
