import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  currentUser: string = "";
  users: Array<any> = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  addUserAction(): void {
    if (this.currentUser) {
      // For demonstration, we'll generate a dummy email based on the name
      const dummyEmail = this.currentUser.toLowerCase().replace(/ /g, '.') + '@example.com';
      this.userService.addUser(this.currentUser, dummyEmail).subscribe(() => {
        this.loadUsers();
        this.currentUser = "";
      });
    }
  }

  deleteLastUserAction(): void {
    this.userService.deleteLastUser().subscribe(() => this.loadUsers());
  }

  deleteUserByName(user: any): void {
    this.userService.deleteUser(user.email).subscribe(() => this.loadUsers());
  }
}